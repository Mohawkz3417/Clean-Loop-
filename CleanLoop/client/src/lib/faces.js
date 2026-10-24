// Blurs faces in evidence photos before they leave the phone (privacy for bystanders).
// Uses the tiny face detector bundled in public/models/face (works offline).
let faceapi = null;

async function load() {
  if (faceapi) return faceapi;
  const tf = await import('@tensorflow/tfjs');
  await tf.ready();
  const m = await import('@vladmandic/face-api/dist/face-api.esm-nobundle.js');
  await m.nets.tinyFaceDetector.loadFromUri('/models/face');
  faceapi = m;
  return m;
}

export async function blurFaces(canvas) {
  try {
    const fa = await load();
    const dets = await fa.detectAllFaces(canvas, new fa.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.45 }));
    const g = canvas.getContext('2d');
    for (const d of dets) {
      const { x, y, width, height } = d.box;
      const pad = Math.max(width, height) * 0.25;
      const bx = Math.max(0, x - pad); const by = Math.max(0, y - pad);
      const bw = Math.min(canvas.width - bx, width + pad * 2); const bh = Math.min(canvas.height - by, height + pad * 2);
      // pixelate: shrink then enlarge the region
      const s = document.createElement('canvas');
      const k = Math.max(4, Math.round(bw / 12));
      s.width = Math.max(1, Math.round(bw / k)); s.height = Math.max(1, Math.round(bh / k));
      s.getContext('2d').drawImage(canvas, bx, by, bw, bh, 0, 0, s.width, s.height);
      g.imageSmoothingEnabled = false;
      g.drawImage(s, 0, 0, s.width, s.height, bx, by, bw, bh);
      g.imageSmoothingEnabled = true;
    }
    return { count: dets.length, ok: true };
  } catch (e) {
    console.warn('Face blur unavailable', e);
    return { count: 0, ok: false, error: e.message };
  }
}
