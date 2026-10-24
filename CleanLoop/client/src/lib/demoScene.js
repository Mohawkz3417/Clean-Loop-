// Draws a synthetic street photo for demo mode, so the full flow (report ->
// AI -> cleanup -> before/after verification) can be shown on a laptop with no
// camera. Same seed = same street; `clean: true` draws it without the waste.
// Every image carries a "DEMO PHOTO" watermark so it is never mistaken for a real one.
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const PALETTES = {
  plastic: ['#2F80ED', '#EB5757', '#F2C94C', '#27AE60', '#ffffff', '#9B51E0', '#56CCF2'],
  organic: ['#6B8E23', '#8B5A2B', '#A0522D', '#556B2F', '#DAA520', '#7CFC00'],
  construction: ['#9E9E9E', '#BDBDBD', '#8D6E63', '#A1887F', '#757575', '#D7CCC8'],
  medical: ['#FFFFFF', '#E0F7FA', '#F44336', '#90CAF9', '#FFCDD2'],
  paper: ['#C8A165', '#E8D5B0', '#FFFFFF', '#D9B98C', '#B08850'],
  mixed: ['#2F80ED', '#EB5757', '#F2C94C', '#6B8E23', '#ffffff', '#8B5A2B', '#333333'],
};

export function drawDemoScene({ seed = 7, clean = false, kind = 'mixed', width = 1024, height = 768 } = {}) {
  const r = rng(seed);
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const g = c.getContext('2d');
  const horizon = height * (0.42 + r() * 0.08);

  // wall
  const wallHue = [28, 40, 190, 12, 150][Math.floor(r() * 5)];
  g.fillStyle = `hsl(${wallHue} 35% ${62 + r() * 12}%)`;
  g.fillRect(0, 0, width, horizon);
  for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(0,0,0,${r() * 0.06})`; g.fillRect(r() * width, r() * horizon, 2 + r() * 30, 1 + r() * 4); }
  // wall bands, a door and a poster
  g.fillStyle = `hsl(${wallHue} 30% 40%)`; g.fillRect(0, horizon - 26, width, 26);
  const doorX = width * (0.08 + r() * 0.15);
  g.fillStyle = '#5b3a29'; g.fillRect(doorX, horizon * 0.25, width * 0.12, horizon * 0.75 - 26);
  g.fillStyle = '#3d2618'; g.fillRect(doorX + 10, horizon * 0.28, width * 0.12 - 20, horizon * 0.6);
  const px = width * (0.6 + r() * 0.2);
  g.fillStyle = '#f4e3c1'; g.fillRect(px, horizon * 0.2, 120, 150);
  g.fillStyle = '#c0392b'; g.fillRect(px + 12, horizon * 0.2 + 14, 96, 24);
  g.fillStyle = '#34495e'; for (let k = 0; k < 5; k++) g.fillRect(px + 12, horizon * 0.2 + 52 + k * 16, 60 + r() * 36, 6);
  // pole
  const poleX = width * (0.85 + r() * 0.08);
  g.fillStyle = '#4a4a4a'; g.fillRect(poleX, 0, 14, horizon + 40);
  // ground with tiles
  const grd = g.createLinearGradient(0, horizon, 0, height);
  grd.addColorStop(0, '#9a9488'); grd.addColorStop(1, '#6f6a60');
  g.fillStyle = grd; g.fillRect(0, horizon, width, height - horizon);
  g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2;
  for (let k = 0; k < 9; k++) { const y = horizon + ((height - horizon) * (k / 9) ** 1.6); g.beginPath(); g.moveTo(0, y); g.lineTo(width, y); g.stroke(); }
  for (let k = -6; k < 14; k++) { g.beginPath(); g.moveTo(width / 2 + k * 40, horizon); g.lineTo(width / 2 + k * 160, height); g.stroke(); }
  for (let i = 0; i < 600; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${r() * 0.06})`; g.fillRect(r() * width, horizon + r() * (height - horizon), 2, 2); }
  // tree shadow
  g.fillStyle = 'rgba(20,40,20,.18)';
  g.beginPath(); g.ellipse(width * 0.15, height * 0.82, 160, 40, 0, 0, Math.PI * 2); g.fill();

  // the waste (drawn from its own RNG so the background above is identical either way)
  if (!clean) {
    const w = rng(seed * 31 + 7);
    const pal = PALETTES[kind] || PALETTES.mixed;
    const cx = width * 0.5; const cy = horizon + (height - horizon) * 0.55;
    const n = 70 + Math.floor(w() * 50);
    for (let i = 0; i < n; i++) {
      const ang = w() * Math.PI * 2; const rad = Math.pow(w(), 0.6) * width * 0.26;
      const x = cx + Math.cos(ang) * rad * 1.3; const y = cy + Math.sin(ang) * rad * 0.42;
      const col = pal[Math.floor(w() * pal.length)];
      g.save(); g.translate(x, y); g.rotate(w() * Math.PI * 2);
      const t = w();
      if (kind === 'construction' || t < 0.3) { // bags / rubble
        g.fillStyle = kind === 'construction' ? col : '#1d1d1d';
        g.beginPath(); g.ellipse(0, 0, 18 + w() * 30, 14 + w() * 20, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.ellipse(-6, -6, 8, 5, 0, 0, Math.PI * 2); g.fill();
      } else if (t < 0.6) { // bottles
        g.fillStyle = col; g.fillRect(-6, -22, 12 + w() * 6, 40 + w() * 14);
        g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(-3, -20, 3, 30);
        g.fillStyle = '#222'; g.fillRect(-4, -28, 8, 6);
      } else if (t < 0.85) { // wrappers / paper
        g.fillStyle = col; g.beginPath(); g.moveTo(-14, -10); g.lineTo(16, -14); g.lineTo(12, 12); g.lineTo(-16, 8); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(0,0,0,.25)'; g.stroke();
      } else { // leaves / scraps
        g.fillStyle = kind === 'medical' ? '#F44336' : col; g.beginPath(); g.arc(0, 0, 6 + w() * 8, 0, Math.PI * 2); g.fill();
      }
      g.restore();
    }
    g.fillStyle = 'rgba(30,25,20,.25)';
    g.beginPath(); g.ellipse(cx, cy + 50, width * 0.3, 36, 0, 0, Math.PI * 2); g.fill();
  }
  // subtle lighting change between shots
  if (clean) { g.fillStyle = 'rgba(255,240,210,.05)'; g.fillRect(0, 0, width, height); }
  // watermark
  g.font = '600 22px system-ui, sans-serif';
  g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(16, height - 46, 150, 32);
  g.fillStyle = '#0E5E4A'; g.fillText('DEMO PHOTO', 26, height - 22);
  return c;
}
