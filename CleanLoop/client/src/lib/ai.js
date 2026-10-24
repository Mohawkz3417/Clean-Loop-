// Offline AI engine - runs entirely in the browser with TensorFlow.js.
//
//  * classify(): the CleanLoop waste-material model (MobileNet, trained on TrashNet,
//    see ml/train.py). Retrain with your own photos and drop the new files into
//    public/models/waste/ - nothing here needs to change.
//  * imageStats(): fast pixel statistics (texture, edges, colour spread) used to
//    estimate how much waste is in the frame (volume) and whether a spot is clean.
//  * analyzeOffline(): turns both into the same result shape the cloud AI returns.
//  * verifyCleanupOffline(): compares before/after photos (same place? waste gone?).

const ALIASES = {
  cardboard: 'paper', paper: 'paper', carton: 'paper', plastic: 'plastic', glass: 'glass', metal: 'metal',
  trash: 'mixed', mixed: 'mixed', general: 'mixed', organic: 'organic', food: 'organic', biodegradable: 'organic',
  ewaste: 'ewaste', 'e-waste': 'ewaste', electronics: 'ewaste', battery: 'ewaste', construction: 'construction',
  debris: 'construction', medical: 'medical', biomedical: 'medical', hazardous: 'medical',
};
export const toCategory = (label) => ALIASES[String(label).toLowerCase()] || (['plastic', 'paper', 'glass', 'metal', 'organic', 'ewaste', 'construction', 'medical', 'mixed'].includes(label) ? label : 'mixed');

const HAZARD = new Set(['medical', 'ewaste']);
const RECYCLABLE = { plastic: 80, paper: 85, glass: 75, metal: 90, organic: 10, ewaste: 70, construction: 20, medical: 0, mixed: 30 };
const WORKER_NOTE = {
  plastic: 'Bag plastics separately - they go to the dry-waste recycler.',
  paper: 'Keep paper and cardboard dry; flatten boxes before bagging.',
  glass: 'Wear gloves. Collect broken glass in a box, not a bag.',
  metal: 'Collect metal separately - it has high resale value.',
  organic: 'Use a wet-waste bin; rinse the spot if it smells.',
  ewaste: 'Do not crush or burn. Batteries go in a separate sealed box.',
  construction: 'Use shovels and sacks; large loads need a tipper.',
  medical: 'Gloves, mask and a sharps box are mandatory. Do not touch with bare hands.',
  mixed: 'Segregate into dry, wet and hazardous while bagging.',
};
const ITEM_WORDS = {
  plastic: 'plastic bottles & bags', paper: 'paper & cardboard', glass: 'glass items', metal: 'metal cans & scrap',
  organic: 'organic / food waste', ewaste: 'electronic items', construction: 'debris & rubble', medical: 'medical waste', mixed: 'mixed litter',
};

let modelPromise = null;

export function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import('@tensorflow/tfjs');
      const gpu = await tf.setBackend('webgl').catch(() => false);
      if (!gpu) await tf.setBackend('cpu');
      await tf.ready();
      const [model, labels, metrics] = await Promise.all([
        tf.loadLayersModel('/models/waste/model.json'),
        fetch('/models/waste/labels.json').then((r) => r.json()),
        fetch('/models/waste/metrics.json').then((r) => r.json()).catch(() => null),
      ]);
      const size = metrics?.inputSize || model.inputs[0].shape[1] || 160;
      tf.tidy(() => model.predict(tf.zeros([1, size, size, 3])));
      return { tf, model, labels, metrics, size };
    })();
    modelPromise.catch(() => { modelPromise = null; });
  }
  return modelPromise;
}

export async function modelInfo() {
  try {
    const { metrics, labels } = await loadModel();
    return { ready: true, metrics, labels };
  } catch (e) {
    return { ready: false, error: e.message };
  }
}

// Returns [{label, category, p}] sorted by probability (test-time augmentation: image + mirror).
export async function classify(canvas) {
  const { tf, model, labels, size } = await loadModel();
  const probs = tf.tidy(() => {
    const x = tf.browser.fromPixels(canvas).toFloat();
    const [h, w] = x.shape;
    const s = Math.min(h, w);
    const crop = x.slice([Math.floor((h - s) / 2), Math.floor((w - s) / 2), 0], [s, s, 3]);
    const img = tf.image.resizeBilinear(crop, [size, size]).div(127.5).sub(1).expandDims(0);
    const batch = tf.concat([img, tf.image.flipLeftRight(img)]);
    return model.predict(batch).mean(0).dataSync();
  });
  // Temperature scaling: softmax outputs are over-confident on photos unlike the
  // training set, so soften them for an honest confidence figure.
  const T = 3;
  const soft = Array.from(probs).map((p) => Math.pow(Math.max(p, 1e-9), 1 / T));
  const sum = soft.reduce((a, b) => a + b, 0);
  return soft.map((p) => p / sum).map((p, i) => ({ label: labels[i], category: toCategory(labels[i]), p })).sort((a, b) => b.p - a.p);
}

// ---------------------------------------------------------------- pixel statistics
function pixels(canvas, size = 96) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(canvas, 0, 0, size, size);
  const d = ctx.getImageData(0, 0, size, size).data;
  const gray = new Float32Array(size * size);
  const rgb = new Float32Array(size * size * 3);
  for (let i = 0, j = 0; i < d.length; i += 4, j++) {
    gray[j] = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
    rgb[j * 3] = d[i]; rgb[j * 3 + 1] = d[i + 1]; rgb[j * 3 + 2] = d[i + 2];
  }
  return { gray, rgb, size };
}

function regionMask(size, region) {
  // center: middle 60% box, border: everything outside the middle 50% box
  return (x, y) => {
    const cx = x / size; const cy = y / size;
    const inCenter = cx > 0.2 && cx < 0.8 && cy > 0.2 && cy < 0.92;
    const inCore = cx > 0.25 && cx < 0.75 && cy > 0.25 && cy < 0.75;
    if (region === 'center') return inCenter;
    if (region === 'border') return !inCore;
    return true;
  };
}

function gradients(gray, size) {
  const g = new Float32Array(size * size);
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    const i = y * size + x;
    const gx = -gray[i - size - 1] - 2 * gray[i - 1] - gray[i + size - 1] + gray[i - size + 1] + 2 * gray[i + 1] + gray[i + size + 1];
    const gy = -gray[i - size - 1] - 2 * gray[i - size] - gray[i - size + 1] + gray[i + size - 1] + 2 * gray[i + size] + gray[i + size + 1];
    g[i] = Math.sqrt(gx * gx + gy * gy);
  }
  return g;
}

export function imageStats(canvas, region = 'center') {
  const { gray, rgb, size } = pixels(canvas);
  const inside = regionMask(size, region);
  const grad = gradients(gray, size);
  let edges = 0; let n = 0;
  let rgS = 0; let ybS = 0; let rgS2 = 0; let ybS2 = 0;
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    if (!inside(x, y)) continue;
    const i = y * size + x;
    n++;
    if (grad[i] > 90) edges++;
    const r = rgb[i * 3]; const gg = rgb[i * 3 + 1]; const b = rgb[i * 3 + 2];
    const rg = r - gg; const yb = 0.5 * (r + gg) - b;
    rgS += rg; ybS += yb; rgS2 += rg * rg; ybS2 += yb * yb;
  }
  const mRg = rgS / n; const mYb = ybS / n;
  const sRg = Math.sqrt(Math.max(0, rgS2 / n - mRg * mRg)); const sYb = Math.sqrt(Math.max(0, ybS2 / n - mYb * mYb));
  const colorfulness = Math.min(1, (Math.sqrt(sRg ** 2 + sYb ** 2) + 0.3 * Math.sqrt(mRg ** 2 + mYb ** 2)) / 90);
  // busy blocks: 8x8 cells whose brightness varies a lot
  const cell = 8; let busy = 0; let cells = 0;
  for (let by = 0; by < size; by += cell) for (let bx = 0; bx < size; bx += cell) {
    if (!inside(bx + cell / 2, by + cell / 2)) continue;
    let s = 0; let s2 = 0; let k = 0;
    for (let y = by; y < by + cell; y++) for (let x = bx; x < bx + cell; x++) { const v = gray[y * size + x]; s += v; s2 += v * v; k++; }
    const sd = Math.sqrt(Math.max(0, s2 / k - (s / k) ** 2));
    cells++;
    if (sd > 24) busy++;
  }
  const edgeDensity = edges / n;
  const busyFrac = busy / cells;
  const clutter = Math.max(0, Math.min(1, 0.5 * busyFrac + 0.3 * Math.min(1, edgeDensity * 3) + 0.2 * colorfulness));
  return { edgeDensity, busyFrac, colorfulness, clutter };
}

// ---------------------------------------------------------------- full analysis
export async function analyzeOffline(canvas) {
  const t0 = performance.now();
  let preds = [];
  let modelOk = true;
  try { preds = await classify(canvas); } catch (e) { modelOk = false; console.warn('Offline model unavailable', e); }
  const stats = imageStats(canvas, 'center');

  const byCat = {};
  for (const p of preds) byCat[p.category] = (byCat[p.category] || 0) + p.p;
  const ranked = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const category = ranked[0]?.[0] || 'mixed';
  const confidence = Math.min(0.97, ranked[0]?.[1] || 0.5);

  const c = stats.clutter;
  const volume = c < 0.2 ? 'bag' : c < 0.4 ? 'pile' : c < 0.7 ? 'cart' : 'truck';
  const hazard = HAZARD.has(category);
  const base = { bag: 22, pile: 42, cart: 62, truck: 80 }[volume];
  const severityScore = Math.max(5, Math.min(98, Math.round(base + (hazard ? 22 : 0) + (c - 0.4) * 18 + (confidence - 0.6) * 8)));
  const secondary = ranked.slice(1).filter(([, p]) => p > 0.12).map(([k]) => k);
  return {
    provider: 'offline',
    providerLabel: 'Offline AI (on device)',
    modelReady: modelOk,
    category,
    secondary,
    confidence: Math.round(confidence * 100) / 100,
    volume,
    severityScore,
    severity: severityScore >= 80 ? 'critical' : severityScore >= 58 ? 'high' : severityScore >= 35 ? 'medium' : 'low',
    hazard,
    hazardNote: hazard ? WORKER_NOTE[category] : '',
    items: [category, ...secondary].map((k) => ITEM_WORDS[k]),
    recyclablePercent: RECYCLABLE[category],
    summary: '',
    workerNote: WORKER_NOTE[category],
    modelLabel: preds[0]?.label || null,
    probabilities: Object.fromEntries(ranked.map(([k, p]) => [k, Math.round(p * 1000) / 1000])),
    clutter: Math.round(c * 100) / 100,
    ms: Math.round(performance.now() - t0),
  };
}

// ---------------------------------------------------------------- cleanup verification
function borderSignature(canvas) {
  const size = 32;
  const { gray, rgb } = pixels(canvas, size);
  const inside = regionMask(size, 'border');
  const grad = gradients(gray, size);
  const vec = []; const hist = new Float32Array(64);
  let n = 0;
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    if (!inside(x, y)) continue;
    const i = y * size + x;
    vec.push(grad[i] * 0.6 + gray[i] * 0.4);
    const bin = (rgb[i * 3] >> 6) * 16 + (rgb[i * 3 + 1] >> 6) * 4 + (rgb[i * 3 + 2] >> 6);
    hist[bin]++; n++;
  }
  for (let k = 0; k < 64; k++) hist[k] /= n;
  return { vec, hist };
}

function ncc(a, b) {
  const n = Math.min(a.length, b.length);
  let ma = 0; let mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n;
  let num = 0; let da = 0; let db = 0;
  for (let i = 0; i < n; i++) { const x = a[i] - ma; const y = b[i] - mb; num += x * y; da += x * x; db += y * y; }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

export function verifyCleanupOffline(beforeCanvas, afterCanvas) {
  const A = borderSignature(beforeCanvas);
  const B = borderSignature(afterCanvas);
  const corr = Math.max(0, ncc(A.vec, B.vec));
  let inter = 0;
  for (let k = 0; k < 64; k++) inter += Math.min(A.hist[k], B.hist[k]);
  const sceneMatch = Math.round(Math.min(1, 0.6 * corr + 0.4 * inter) * 100) / 100;
  const before = imageStats(beforeCanvas, 'center').clutter;
  const after = imageStats(afterCanvas, 'center').clutter;
  const cleared = after < before * 0.72 || after < 0.12;
  let remark = 'Same spot, waste removed.';
  if (sceneMatch < 0.5) remark = 'The two photos do not look like the same place.';
  else if (!cleared) remark = 'Some waste still seems to be in the frame.';
  return {
    provider: 'offline', sceneMatch, garbageBefore: Math.round(before * 100) / 100, garbageAfter: Math.round(after * 100) / 100,
    cleared, passed: cleared && sceneMatch >= 0.5, remark,
  };
}
