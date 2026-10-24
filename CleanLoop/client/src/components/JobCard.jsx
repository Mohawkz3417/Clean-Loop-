import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { MapPin, Lock, ChevronsRight, Timer, Users, AlertTriangle, Truck } from 'lucide-react';
import { CategoryTile, SeverityPill, CATEGORY_LABEL, Spinner } from './ui.jsx';
import { Photo } from './media.jsx';
import { dist, timeAgo, timeUntil } from '../lib/format.js';

// Rapido-style job card: swipe right (or tap the button) to claim.
export default function JobCard({ job, onClaim, wardLabel, volumeLabel }) {
  const x = useMotionValue(0);
  const [busy, setBusy] = useState(false);
  const fill = useTransform(x, [0, 220], ['0%', '100%']);
  const hint = useTransform(x, [0, 120], [1, 0]);

  const claim = async () => {
    setBusy(true);
    const ok = await onClaim(job);
    if (!ok) { setBusy(false); animate(x, 0); }
  };

  return (
    <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 80 }} className={`overflow-hidden rounded-3xl bg-white shadow-lift ${job.eligible ? '' : 'opacity-75'}`}>
      <div className="flex gap-3 p-3">
        <Photo src={job.photo} category={job.ai?.category} seed={job.id} className="h-24 w-24 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5"><CategoryTile category={job.ai?.category} size={22} className="!rounded-md" /><p className="truncate font-semibold">{CATEGORY_LABEL[job.ai?.category]}</p></div>
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-ink-faint"><MapPin size={12} />{dist(job.distance)} · {wardLabel}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-xl font-bold text-canopy">{job.payUnit === 'Rs' ? `₹${job.yourPay}` : job.yourPay}</p>
              <p className="text-[10px] text-ink-faint">{job.payUnit === 'Rs' ? 'you earn' : 'points'}</p>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            <SeverityPill severity={job.ai?.severity} />
            <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-ink-soft">{volumeLabel}</span>
            {job.ai?.hazard && <span className="inline-flex items-center gap-1 rounded-full bg-coral-soft px-2 py-0.5 text-[11px] font-semibold text-coral-deep"><AlertTriangle size={11} />Hazard kit</span>}
            {job.ai?.volume === 'truck' && <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold"><Truck size={11} />Vehicle</span>}
          </div>
          <p className="mt-1.5 flex items-center gap-2 text-[11px] text-ink-faint">
            <span>{timeAgo(job.createdAt)}</span>
            <span className={`inline-flex items-center gap-0.5 ${job.overdue ? 'font-semibold text-coral' : ''}`}><Timer size={11} />{job.overdue ? 'overdue' : `due ${timeUntil(job.slaDeadline)}`}</span>
            {job.confirmations > 0 && <span className="inline-flex items-center gap-0.5"><Users size={11} />{job.confirmations}</span>}
          </p>
        </div>
      </div>
      {job.eligible ? (
        <div className="relative mx-3 mb-3 h-12 overflow-hidden rounded-2xl bg-canopy-50">
          <motion.div className="absolute inset-y-0 left-0 bg-canopy/15" style={{ width: fill }} />
          <motion.p style={{ opacity: hint }} className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-canopy">Swipe to claim</motion.p>
          <motion.button drag="x" dragConstraints={{ left: 0, right: 230 }} dragElastic={0.02} dragMomentum={false} style={{ x }} disabled={busy}
            onDragEnd={() => { if (x.get() > 170) { animate(x, 240); claim(); } else animate(x, 0, { type: 'spring', damping: 20 }); }}
            onClick={() => { if (x.get() < 5) { animate(x, 240); claim(); } }}
            className="absolute left-1 top-1 flex h-10 w-14 cursor-grab items-center justify-center rounded-xl bg-canopy text-lime shadow active:cursor-grabbing" aria-label="Claim this job">
            {busy ? <Spinner size={16} /> : <ChevronsRight size={22} />}
          </motion.button>
        </div>
      ) : (
        <p className="mx-3 mb-3 flex items-center gap-2 rounded-2xl bg-mist px-3 py-2.5 text-xs font-semibold text-ink-soft"><Lock size={14} />{job.lockedReason}</p>
      )}
    </motion.article>
  );
}
