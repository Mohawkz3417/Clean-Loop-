import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, animate, useInView } from 'framer-motion';
import { X, CupSoda, Newspaper, Wine, Magnet, Leaf, Cpu, Construction, Syringe, Trash2, Footprints, Eye, Recycle, Megaphone, Users, Package, ShieldAlert, CheckCheck, BadgeCheck, Trophy, HardHat, Star, Sparkles, Bus, TrainFront, Landmark, Sprout, Coffee, TreePine, Truck, Hammer, Circle, LoaderCircle, Inbox, MapPin, Bell, Camera, ClipboardList, Briefcase, Wallet, Gift, Search, CalendarDays, Route, ShieldCheck, Gavel, Store, Siren } from 'lucide-react';

const Icons = { CupSoda, Newspaper, Wine, Magnet, Leaf, Cpu, Construction, Syringe, Trash2, Footprints, Eye, Recycle, Megaphone, Users, Package, ShieldAlert, CheckCheck, BadgeCheck, Trophy, HardHat, Star, Sparkles, Bus, TrainFront, Landmark, Sprout, Coffee, TreePine, Truck, Hammer, Circle, LoaderCircle, Inbox, MapPin, Bell, Camera, ClipboardList, Briefcase, Wallet, Gift, Search, CalendarDays, Route, ShieldCheck, Gavel, Store, Siren };

export const CATEGORY_ICON = {
  plastic: 'CupSoda', paper: 'Newspaper', glass: 'Wine', metal: 'Magnet', organic: 'Leaf',
  ewaste: 'Cpu', construction: 'Construction', medical: 'Syringe', mixed: 'Trash2',
};
export const CATEGORY_COLOR = {
  plastic: '#2F80ED', paper: '#C08A3E', glass: '#3BB3A6', metal: '#7B8794', organic: '#5E9E3A',
  ewaste: '#8E5CF6', construction: '#A0715A', medical: '#F0574A', mixed: '#5B6B66',
};
export const CATEGORY_LABEL = {
  plastic: 'Plastic', paper: 'Paper & cardboard', glass: 'Glass', metal: 'Metal', organic: 'Organic / wet',
  ewaste: 'E-waste', construction: 'Construction debris', medical: 'Medical / biohazard', mixed: 'Mixed waste',
};
export const SEVERITY_STYLE = {
  low: { label: 'Low', cls: 'bg-canopy-50 text-canopy-700 border-canopy-100', dot: '#14A06B' },
  medium: { label: 'Medium', cls: 'bg-marigold-soft text-marigold-deep border-marigold/30', dot: '#F5A524' },
  high: { label: 'High', cls: 'bg-[#FFE6CF] text-[#B65A00] border-[#F7A65A]/40', dot: '#F27B1F' },
  critical: { label: 'Critical', cls: 'bg-coral-soft text-coral-deep border-coral/30', dot: '#F0574A' },
};
export const STATUS_STYLE = {
  open: { label: 'Waiting for a worker', short: 'Open', cls: 'bg-marigold-soft text-marigold-deep' },
  review: { label: 'Under review', short: 'Review', cls: 'bg-[#EDE7FE] text-[#5B3BC4]' },
  claimed: { label: 'Worker on the way', short: 'Claimed', cls: 'bg-[#E0EDFF] text-[#1F5FBF]' },
  in_progress: { label: 'Cleanup in progress', short: 'In progress', cls: 'bg-[#E0EDFF] text-[#1F5FBF]' },
  verifying: { label: 'Checking the cleanup', short: 'Verifying', cls: 'bg-[#EDE7FE] text-[#5B3BC4]' },
  completed: { label: 'Cleaned', short: 'Cleaned', cls: 'bg-canopy-50 text-canopy-700' },
  disputed: { label: 'Disputed', short: 'Disputed', cls: 'bg-coral-soft text-coral-deep' },
  rejected: { label: 'Rejected', short: 'Rejected', cls: 'bg-[#ECEFEE] text-ink-faint' },
};

export function Icon({ name, ...p }) {
  const C = Icons[name] || Icons.Circle;
  return <C {...p} />;
}

export function Logo({ size = 32, withText = true, light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={light ? '#B6F04A' : '#0E5E4A'} />
        <path d="M45.5 22.5A16 16 0 1 0 48 32" fill="none" stroke={light ? '#0E5E4A' : '#B6F04A'} strokeWidth="6" strokeLinecap="round" />
        <path d="M41 15l6.5 7.8-9.6 2.4" fill="none" stroke={light ? '#0E5E4A' : '#B6F04A'} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="5" fill={light ? '#0E5E4A' : '#fff'} />
      </svg>
      {withText && <span className={`font-display text-[1.35em] font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>CleanLoop</span>}
    </span>
  );
}

export function CategoryTile({ category, size = 40, className = '' }) {
  const color = CATEGORY_COLOR[category] || '#5B6B66';
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl ${className}`} style={{ width: size, height: size, background: `${color}1A`, color }}>
      <Icon name={CATEGORY_ICON[category] || 'Trash2'} size={size * 0.5} strokeWidth={2.2} />
    </span>
  );
}

export function SeverityPill({ severity, className = '' }) {
  const s = SEVERITY_STYLE[severity] || SEVERITY_STYLE.medium;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.cls} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />{s.label}
    </span>
  );
}

export function StatusPill({ status, short = false, className = '' }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.open;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.cls} ${className}`}>{short ? s.short : s.label}</span>;
}

export function Avatar({ name, size = 40, className = '', tone = 'canopy' }) {
  const ini = String(name || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const hue = [...String(name || '')].reduce((s, ch) => s + ch.charCodeAt(0), 0) % 360;
  const bg = tone === 'night' ? `hsl(${hue} 45% 28%)` : `hsl(${hue} 55% 88%)`;
  const fg = tone === 'night' ? `hsl(${hue} 80% 85%)` : `hsl(${hue} 55% 28%)`;
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${className}`} style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }}>{ini}</span>
  );
}

export function Spinner({ size = 18, className = '' }) {
  return <Icons.LoaderCircle size={size} className={`animate-spin ${className}`} />;
}

export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function CountUp({ value, duration = 1.2, format = (v) => Math.round(v).toLocaleString('en-IN'), className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(prev.current, Number(value) || 0, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(v) });
    prev.current = Number(value) || 0;
    return () => controls.stop();
  }, [value, inView, duration]);
  return <span ref={ref} className={`num ${className}`}>{format(display)}</span>;
}

export function ProgressRing({ value = 0, size = 64, stroke = 7, color = '#B6F04A', track = 'rgba(255,255,255,.18)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - Math.max(0, Math.min(1, value))) }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </span>
  );
}

export function Sheet({ open, onClose, title, children, dark = false, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[1500] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] sm:rounded-[28px] ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'} ${dark ? 'dark-ui bg-night-panel text-night-text border border-night-line' : 'bg-white'} pb-safe`}>
            <div className={`sticky top-0 z-10 flex items-center justify-between px-5 pb-3 pt-4 ${dark ? 'bg-night-panel' : 'bg-white'}`}>
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className={`rounded-full p-2 ${dark ? 'hover:bg-night-raised' : 'hover:bg-mist'}`} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="px-5 pb-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Empty({ icon = 'Sparkles', title, body, action, dark = false }) {
  return (
    <div className={`flex flex-col items-center px-6 py-10 text-center ${dark ? 'text-night-muted' : 'text-ink-soft'}`}>
      <span className={`mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? 'bg-night-raised text-lime' : 'bg-canopy-50 text-canopy'}`}><Icon name={icon} size={26} /></span>
      <p className={`font-display text-lg font-semibold ${dark ? 'text-night-text' : 'text-ink'}`}>{title}</p>
      {body && <p className="mt-1 max-w-xs text-sm">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Segmented({ options, value, onChange, dark = false, className = '' }) {
  return (
    <div className={`relative inline-flex rounded-full p-1 ${dark ? 'bg-night-raised' : 'bg-canopy-50'} ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${active ? (dark ? 'text-canopy-900' : 'text-white') : dark ? 'text-night-muted hover:text-night-text' : 'text-canopy-700'}`}>
            {active && <motion.span layoutId={`seg-${options.map((x) => x.value).join('')}`} className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-lime' : 'bg-canopy'}`} transition={{ type: 'spring', damping: 30, stiffness: 400 }} />}
            {o.label}
            {o.count != null && <span className={`ml-1.5 text-xs ${active ? 'opacity-80' : 'opacity-60'}`}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      {label && <span className="label">{label}</span>}
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

export const fadeUp = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };
export const stagger = (i, base = 0.05) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * base } });
