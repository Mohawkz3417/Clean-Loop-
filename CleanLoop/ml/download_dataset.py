"""Downloads the open TrashNet dataset (2,527 photos, 6 waste types) into ml/dataset.

    python ml/download_dataset.py

Then add your own folders/photos (e.g. ml/dataset/organic, ml/dataset/ewaste)
and run  python ml/train.py
"""
import io
import os
import shutil
import urllib.request
import zipfile

URL = "https://raw.githubusercontent.com/garythung/trashnet/master/data/dataset-resized.zip"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "dataset")

print("Downloading TrashNet (~43 MB)...")
data = urllib.request.urlopen(URL).read()
with zipfile.ZipFile(io.BytesIO(data)) as z:
    z.extractall(HERE)
src = os.path.join(HERE, "dataset-resized")
os.makedirs(OUT, exist_ok=True)
for cls in os.listdir(src):
    p = os.path.join(src, cls)
    if os.path.isdir(p):
        dst = os.path.join(OUT, cls)
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.move(p, dst)
shutil.rmtree(src, ignore_errors=True)
shutil.rmtree(os.path.join(HERE, "__MACOSX"), ignore_errors=True)
for cls in sorted(os.listdir(OUT)):
    if os.path.isdir(os.path.join(OUT, cls)):
        print(f"  {cls}: {len(os.listdir(os.path.join(OUT, cls)))} photos")
print(f"Done. Dataset is in {OUT}")
