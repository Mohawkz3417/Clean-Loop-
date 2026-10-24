import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STEPS = ['Reading the materials', 'Estimating the volume', 'Checking for hazards', 'Looking for duplicates nearby'];

// The AI "scan" moment: a sweep line over the photo while the analysis runs.
export default function ScanOverlay({ src, active, steps = STEPS, className = '' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    setI(0);
    const t = setInterval(() => setI((x) => Math.min(steps.length - 1, x + 1)), 650);
    return () => clearInterval(t);
  }, [active, steps.length]);
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-ink ${className}`}>
      <img src={src} alt="Captured" className="h-full w-full object-cover" />
      <AnimatePresence>
        {active && (
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-canopy-900/35" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(182,240,74,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(182,240,74,.35) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute inset-x-0 top-0 h-full animate-scan">
              <div className="h-24 bg-gradient-to-b from-transparent via-lime/25 to-lime/0" />
              <div className="h-[3px] bg-lime shadow-[0_0_24px_6px_rgba(182,240,74,.7)]" />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink/75 px-4 py-3 text-white backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" /></span>
                <motion.span key={i} initial={{ opacity: 0.2, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>{steps[i]}…</motion.span>
              </div>
              <div className="mt-2 flex gap-1">
                {steps.map((_, k) => <span key={k} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${k <= i ? 'bg-lime' : 'bg-white/20'}`} />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
