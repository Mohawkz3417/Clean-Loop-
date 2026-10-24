// Image helpers: load, downscale, compress to JPEG data URLs, perceptual hash.
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not open that image.'));
    img.src = src;
  });
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('Could not read the file.'));
    r.readAsDataURL(file);
  });
}

export function toCanvas(source, maxSide = 1280) {
  const w = source.videoWidth || source.naturalWidth || source.width;
  const h = source.videoHeight || source.naturalHeight || source.height;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const c = document.createElement('canvas');
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  c.getContext('2d').drawImage(source, 0, 0, c.width, c.height);
  return c;
}

export const canvasToJpeg = (c, q = 0.82) => c.toDataURL('image/jpeg', q);

export async function dataUrlToCanvas(dataUrl, maxSide = 1280) {
  return toCanvas(await loadImage(dataUrl), maxSide);
}

// 64-bit difference hash, hex string. Similar photos have a small Hamming distance.
export function dHash(source) {
  const c = document.createElement('canvas');
  c.width = 9; c.height = 8;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(source, 0, 0, 9, 8);
  const d = ctx.getImageData(0, 0, 9, 8).data;
  const g = [];
  for (let i = 0; i < d.length; i += 4) g.push(d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
  let bits = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += g[y * 9 + x] > g[y * 9 + x + 1] ? '1' : '0';
  let hex = '';
  for (let i = 0; i < 64; i += 4) hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
  return hex;
}
