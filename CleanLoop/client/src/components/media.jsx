import { useMemo, useRef, useState } from 'react';
import { CATEGORY_COLOR } from './ui.jsx';

const PAL = {
  plastic: ['#2F80ED', '#EB5757', '#F2C94C', '#56CCF2', '#ffffff'],
  paper: ['#C8A165', '#E8D5B0', '#B08850', '#fff8ea'],
  glass: ['#3BB3A6', '#8FD9CF', '#1E7F75', '#d8f3ef'],
  metal: ['#7B8794', '#A9B4BF', '#4F5A66', '#D0D7DE'],
  organic: ['#5E9E3A', '#8B5A2B', '#A3C35A', '#C9A227'],
  ewaste: ['#8E5CF6', '#2D2A38', '#5B5670', '#C7B8FF'],
  construction: ['#A0715A', '#9E9E9E', '#C6B5A6', '#6E6259'],
  medical: ['#F0574A', '#ffffff', '#90CAF9', '#FFCDD2'],
  mixed: ['#2F80ED', '#EB5757', '#5E9E3A', '#C8A165', '#333'],
};

function seeded(str) {
  let h = 2166136261;
  for (const ch of String(str)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h = (h + 0x6d2b79f5) | 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Illustrated stand-in for demo-data reports that have no real photo.
export function CategoryArt({ category = 'mixed', seed = 'x', clean = false, className = '' }) {
  const color = CATEGORY_COLOR[category] || '#5B6B66';
  const shapes = useMemo(() => {
    const r = seeded(seed + category);
    const pal = PAL[category] || PAL.mixed;
    return Array.from({ length: 26 }, () => {
      const a = r() * Math.PI * 2; const d = Math.pow(r(), 0.7);
      return { x: 160 + Math.cos(a) * d * 95, y: 152 + Math.sin(a) * d * 26 - r() * 18, w: 10 + r() * 22, h: 8 + r() * 16, rot: r() * 360, c: pal[Math.floor(r() * pal.length)], t: r() };
    }).sort((p, q) => p.y - q.y);
  }, [seed, category]);
  const id = `g${String(seed).replace(/\W/g, '')}${clean ? 'c' : ''}`;
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`} role="img" aria-label={clean ? 'Illustration of the cleaned spot' : 'Illustration of the reported waste'}>
      <defs>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={`${color}22`} /><stop offset="1" stopColor={`${color}38`} /></linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9cfc8" /><stop offset="1" stopColor="#a9b1a8" /></linearGradient>
      </defs>
      <rect width="320" height="120" fill={`url(#${id}w)`} />
      <rect width="320" height="120" fill="#f6f8f6" opacity=".55" />
      <rect x="22" y="38" width="46" height="82" rx="3" fill={`${color}40`} />
      <rect x="250" y="20" width="10" height="100" fill="#6b7570" />
      <rect y="112" width="320" height="8" fill={`${color}55`} />
      <rect y="120" width="320" height="100" fill={`url(#${id}g)`} />
      {[140, 160, 185, 215].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#00000014" />)}
      {!clean && <ellipse cx="160" cy="168" rx="120" ry="16" fill="#00000022" />}
      {!clean && shapes.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
          {s.t < 0.35 ? <ellipse rx={s.w * 0.8} ry={s.h * 0.7} fill={category === 'construction' ? s.c : '#262a28'} />
            : s.t < 0.65 ? <rect x={-s.w / 4} y={-s.h} width={s.w / 2.2} height={s.h * 1.6} rx="2" fill={s.c} />
              : <path d={`M${-s.w / 2} ${-s.h / 2} L${s.w / 2} ${-s.h / 1.6} L${s.w / 2.4} ${s.h / 2} L${-s.w / 1.8} ${s.h / 2.4}Z`} fill={s.c} stroke="#0002" />}
        </g>
      ))}
      {clean && <path d="M140 160 l14 12 28-30" fill="none" stroke="#14A06B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />}
    </svg>
  );
}

// Shows a real photo when there is one, otherwise the illustration.
export function Photo({ src, category, seed, clean = false, className = '', alt = '' }) {
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      {src ? <img src={src} alt={alt || 'Report photo'} className="h-full w-full object-cover" loading="lazy" />
        : <CategoryArt category={category} seed={seed} clean={clean} />}
    </div>
  );
}

// Drag-to-compare before / after view.
export function BeforeAfter({ before, after, category, seed, className = '' }) {
  return <BeforeAfterInner before={before} after={after} category={category} seed={seed} className={className} />;
}

function BeforeAfterInner({ before, after, category, seed, className }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const move = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div ref={ref} className={`relative select-none overflow-hidden rounded-3xl bg-mist ${className}`}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => { if (e.buttons) move(e.clientX); }}
      role="slider" aria-label="Compare before and after" aria-valuenow={Math.round(pos)} tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 5)); if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 5)); }}>
      <div className="absolute inset-0"><Photo src={after} category={category} seed={seed} clean className="h-full w-full" /></div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><Photo src={before} category={category} seed={seed} className="h-full w-full" /></div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-canopy shadow-float">⇆</div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white">Before</span>
      <span className="absolute right-3 top-3 rounded-full bg-canopy px-2.5 py-1 text-xs font-semibold text-lime">After</span>
    </div>
  );
}
