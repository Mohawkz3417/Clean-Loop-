"""
CleanLoop - offline waste classifier trainer
=============================================

Trains a MobileNet-based image classifier on the folders inside ./dataset and
exports it straight into the web app (client/public/models/waste/), in the
TensorFlow.js format the browser loads. No converter tools are needed.

Usage (from the project root):
    pip install tensorflow pillow h5py
    python ml/train.py

Optional flags:
    --dataset ml/dataset          folder with one sub-folder per waste type
    --out client/public/models/waste
    --epochs 40
    --size 160                     input image size (pixels)

Add a new waste type by creating a new sub-folder (e.g. dataset/organic/) with
at least ~80 photos, then re-run this script. The app picks up the new model
and labels automatically on the next page load (rebuild the client if you run
the production build: `npm run build` in client/).
"""
import argparse
import json
import os
import random
import sys
import time

import numpy as np

os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
import tensorflow as tf  # noqa: E402
from tensorflow import keras  # noqa: E402

BASE_WEIGHTS_URL = (
    "https://github.com/fchollet/deep-learning-models/releases/download/v0.6/"
    "mobilenet_1_0_224_tf_no_top.h5"
)
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp", ".bmp")


def parse_args():
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.dirname(here)
    p = argparse.ArgumentParser()
    p.add_argument("--dataset", default=os.path.join(here, "dataset"))
    p.add_argument("--out", default=os.path.join(root, "client", "public", "models", "waste"))
    p.add_argument("--weights", default=os.path.join(here, "mobilenet_1_0_224_tf_no_top.h5"))
    p.add_argument("--epochs", type=int, default=40)
    p.add_argument("--size", type=int, default=160)
    p.add_argument("--aug", type=int, default=3, help="augmented copies per image")
    p.add_argument("--seed", type=int, default=7)
    return p.parse_args()


def list_dataset(folder):
    classes = sorted(
        d for d in os.listdir(folder)
        if os.path.isdir(os.path.join(folder, d)) and not d.startswith(".")
    )
    items = []
    for ci, c in enumerate(classes):
        for f in sorted(os.listdir(os.path.join(folder, c))):
            if f.lower().endswith(IMG_EXT):
                items.append((os.path.join(folder, c, f), ci))
    return classes, items


def load_image(path, size):
    raw = tf.io.read_file(path)
    img = tf.io.decode_image(raw, channels=3, expand_animations=False)
    img = tf.image.resize(img, (size, size))
    return img.numpy().astype("float32")


def augment(img, rng):
    size = img.shape[0]
    t = tf.convert_to_tensor(img)
    if rng.random() < 0.5:
        t = tf.image.flip_left_right(t)
    if rng.random() < 0.3:
        t = tf.image.flip_up_down(t)
    k = rng.randint(0, 3)
    t = tf.image.rot90(t, k)
    scale = rng.uniform(0.75, 1.0)
    crop = max(8, int(size * scale))
    t = tf.image.random_crop(t, (crop, crop, 3), seed=rng.randint(0, 10_000))
    t = tf.image.resize(t, (size, size))
    t = tf.image.adjust_brightness(t, rng.uniform(-25, 25))
    t = tf.image.adjust_contrast(t, rng.uniform(0.8, 1.2))
    t = tf.image.adjust_saturation(t, rng.uniform(0.8, 1.25))
    return tf.clip_by_value(t, 0, 255).numpy()


def preprocess(batch):
    return batch / 127.5 - 1.0  # MobileNet expects [-1, 1]


# --------------------------------------------------------------------------
# TensorFlow.js export (layers-model format) without the tensorflowjs package
# --------------------------------------------------------------------------
def _pair(v):
    return list(v) if isinstance(v, (list, tuple)) else [v, v]


def layer_to_tfjs(layer, first=False, input_shape=None):
    cfg = layer.get_config()
    name = layer.name
    cls = layer.__class__.__name__
    out = {"class_name": cls, "config": {"name": name, "trainable": False, "dtype": "float32"}}
    c = out["config"]
    if first:
        c["batch_input_shape"] = [None] + list(input_shape)
    if cls == "ZeroPadding2D":
        c["padding"] = [list(p) for p in cfg["padding"]]
        c["data_format"] = "channels_last"
    elif cls == "Conv2D":
        c.update(
            filters=cfg["filters"], kernel_size=_pair(cfg["kernel_size"]), strides=_pair(cfg["strides"]),
            padding=cfg["padding"], data_format="channels_last", dilation_rate=_pair(cfg["dilation_rate"]),
            activation=cfg["activation"], use_bias=cfg["use_bias"],
            kernel_initializer={"class_name": "Zeros", "config": {}},
            bias_initializer={"class_name": "Zeros", "config": {}},
        )
    elif cls == "DepthwiseConv2D":
        c.update(
            kernel_size=_pair(cfg["kernel_size"]), strides=_pair(cfg["strides"]), padding=cfg["padding"],
            data_format="channels_last", dilation_rate=_pair(cfg["dilation_rate"]),
            depth_multiplier=cfg["depth_multiplier"], activation=cfg["activation"], use_bias=cfg["use_bias"],
            depthwise_initializer={"class_name": "Zeros", "config": {}},
            bias_initializer={"class_name": "Zeros", "config": {}},
        )
    elif cls == "BatchNormalization":
        axis = cfg["axis"]
        c.update(
            axis=axis[0] if isinstance(axis, (list, tuple)) else axis, momentum=cfg["momentum"],
            epsilon=cfg["epsilon"], center=cfg["center"], scale=cfg["scale"],
        )
    elif cls == "ReLU":
        mv = cfg.get("max_value")
        c["max_value"] = None if mv is None else float(mv)
    elif cls == "Activation":
        c["activation"] = cfg["activation"]
    elif cls == "GlobalAveragePooling2D":
        c["data_format"] = "channels_last"
    elif cls == "Dropout":
        c["rate"] = cfg["rate"]
    elif cls == "Dense":
        c.update(
            units=cfg["units"], activation=cfg["activation"], use_bias=cfg["use_bias"],
            kernel_initializer={"class_name": "Zeros", "config": {}},
            bias_initializer={"class_name": "Zeros", "config": {}},
        )
    else:
        raise ValueError(f"Layer type {cls} is not supported by the exporter")
    return out


def export_tfjs(layers, input_shape, out_dir, model_name="cleanloop_waste"):
    os.makedirs(out_dir, exist_ok=True)
    topo_layers, manifest, blobs = [], [], []
    first = True
    for layer in layers:
        if layer.__class__.__name__ == "InputLayer":
            continue
        topo_layers.append(layer_to_tfjs(layer, first, input_shape))
        first = False
        for w in layer.weights:
            arr = w.numpy().astype("<f4")
            short = w.path.split("/")[-1] if hasattr(w, "path") else w.name.split("/")[-1].split(":")[0]
            if layer.__class__.__name__ == "DepthwiseConv2D" and short == "kernel":
                short = "depthwise_kernel"  # TF.js naming
            manifest.append({"name": f"{layer.name}/{short}", "shape": list(arr.shape), "dtype": "float32"})
            blobs.append(arr.tobytes())
    data = b"".join(blobs)
    with open(os.path.join(out_dir, "group1-shard1of1.bin"), "wb") as f:
        f.write(data)
    model_json = {
        "format": "layers-model",
        "generatedBy": "cleanloop-train",
        "convertedBy": None,
        "modelTopology": {
            "class_name": "Sequential",
            "config": {"name": model_name, "layers": topo_layers},
            "keras_version": "2.15.0",
            "backend": "tensorflow",
        },
        "weightsManifest": [{"paths": ["group1-shard1of1.bin"], "weights": manifest}],
    }
    with open(os.path.join(out_dir, "model.json"), "w") as f:
        json.dump(model_json, f)
    return len(data)


# --------------------------------------------------------------------------
def main():
    a = parse_args()
    random.seed(a.seed)
    np.random.seed(a.seed)
    tf.random.set_seed(a.seed)
    rng = random.Random(a.seed)

    if not os.path.isdir(a.dataset):
        sys.exit(f"Dataset folder not found: {a.dataset}")
    classes, items = list_dataset(a.dataset)
    if len(classes) < 2:
        sys.exit("Need at least 2 class folders inside the dataset folder.")
    print(f"Classes ({len(classes)}): {classes}")
    print(f"Images: {len(items)}")

    if not os.path.exists(a.weights):
        print("Downloading MobileNet base weights ...")
        a.weights = keras.utils.get_file("mobilenet_1_0_224_tf_no_top.h5", BASE_WEIGHTS_URL)

    S = a.size
    base = keras.applications.MobileNet(
        input_shape=(S, S, 3), alpha=1.0, include_top=False, weights=None
    )
    base.load_weights(a.weights)
    base.trainable = False
    extractor = keras.Sequential([base, keras.layers.GlobalAveragePooling2D()])

    rng.shuffle(items)
    # stratified 85/15 split
    by_class = {}
    for it in items:
        by_class.setdefault(it[1], []).append(it)
    train, val = [], []
    for ci, lst in by_class.items():
        n_val = max(1, int(len(lst) * 0.15))
        val += lst[:n_val]
        train += lst[n_val:]

    def features(pairs, n_aug):
        X, Y = [], []
        batch, ys = [], []
        t0 = time.time()
        for i, (path, y) in enumerate(pairs):
            try:
                img = load_image(path, S)
            except Exception as e:  # unreadable file
                print("  skip", path, e)
                continue
            versions = [img] + [augment(img, rng) for _ in range(n_aug)]
            for v in versions:
                batch.append(v)
                ys.append(y)
            if len(batch) >= 64:
                X.append(extractor.predict(preprocess(np.stack(batch)), verbose=0))
                Y += ys
                batch, ys = [], []
            if (i + 1) % 200 == 0:
                print(f"  {i + 1}/{len(pairs)} images  ({time.time() - t0:.0f}s)")
        if batch:
            X.append(extractor.predict(preprocess(np.stack(batch)), verbose=0))
            Y += ys
        return np.concatenate(X), np.array(Y)

    print("Extracting training features (with augmentation) ...")
    Xtr, Ytr = features(train, a.aug)
    print("Extracting validation features ...")
    Xva, Yva = features(val, 0)

    counts = np.bincount(Ytr, minlength=len(classes)).astype("float32")
    class_weight = {i: float(counts.sum() / (len(classes) * max(c, 1))) for i, c in enumerate(counts)}

    feat_dim = Xtr.shape[1]
    head = keras.Sequential([
        keras.Input(shape=(feat_dim,)),
        keras.layers.Dropout(0.35, name="head_dropout"),
        keras.layers.Dense(256, activation="relu", name="head_dense"),
        keras.layers.Dropout(0.3, name="head_dropout2"),
        keras.layers.Dense(len(classes), activation="softmax", name="head_out"),
    ])
    head.compile(optimizer=keras.optimizers.Adam(1e-3), loss="sparse_categorical_crossentropy", metrics=["accuracy"])
    cb = [
        keras.callbacks.EarlyStopping(monitor="val_accuracy", patience=8, restore_best_weights=True),
        keras.callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=3),
    ]
    head.fit(Xtr, Ytr, validation_data=(Xva, Yva), epochs=a.epochs, batch_size=64,
             class_weight=class_weight, callbacks=cb, verbose=2)
    loss, acc = head.evaluate(Xva, Yva, verbose=0)
    print(f"\nValidation accuracy: {acc * 100:.1f}%")

    pred = head.predict(Xva, verbose=0).argmax(1)
    per_class = {}
    for i, c in enumerate(classes):
        m = Yva == i
        per_class[c] = round(float((pred[m] == i).mean()) * 100, 1) if m.any() else None
    print("Per-class accuracy:", per_class)

    # Export: base MobileNet layers + pooling + head layers, one flat Sequential
    layers = list(base.layers) + [extractor.layers[1]] + list(head.layers)
    size = export_tfjs(layers, (S, S, 3), a.out)
    with open(os.path.join(a.out, "labels.json"), "w") as f:
        json.dump(classes, f)
    with open(os.path.join(a.out, "metrics.json"), "w") as f:
        json.dump({
            "accuracy": round(float(acc) * 100, 1), "perClass": per_class, "classes": classes,
            "inputSize": S, "trainImages": len(train), "valImages": len(val),
            "trainedAt": time.strftime("%Y-%m-%d %H:%M"), "base": "MobileNet v1 (ImageNet)",
        }, f, indent=2)

    print(f"\nExported TF.js model ({size / 1e6:.1f} MB) to {a.out}")
    # The server serves the pre-built app from client/dist, so update that copy too.
    dist = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "client", "dist", "models", "waste")
    if os.path.isdir(os.path.dirname(dist)) and os.path.abspath(dist) != os.path.abspath(a.out):
        import shutil
        os.makedirs(dist, exist_ok=True)
        for f in os.listdir(a.out):
            shutil.copy2(os.path.join(a.out, f), os.path.join(dist, f))
        print(f"Also copied to {dist} - restart the app and refresh the page to use the new model.")


if __name__ == "__main__":
    main()
