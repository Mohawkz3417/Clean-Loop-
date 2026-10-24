import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, Cpu, Cloud, Users, Timer, CheckCircle2, Circle, ShieldCheck, Heart } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { CategoryTile, StatusPill, SeverityPill, Skeleton, Sheet, Spinner, CATEGORY_LABEL } from '../../components/ui.jsx';
import { Photo, BeforeAfter } from '../../components/media.jsx';
import { timeAgo, dateTime, inr, timeUntil } from '../../lib/format.js';
import { celebrate } from '../../lib/confetti.js';

export default function ReportDetail() {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const [r, setR] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [stars, setStars] = useState(5);
  const [tip, setTip] = useState(0);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => get(`/reports/${id}`).then((x) => setR(x.report)).catch((e) => toast(e.message, 'error'));
  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirm = async (ok) => {
    setBusy(true);
    try {
      const x = await post(`/reports/${id}/confirm-cleanup`, { ok, stars: ok ? stars : null, tipPoints: ok ? tip : 0, comment });
      setR(x.report); setUser(x.user); setSheet(false);
      if (ok) { celebrate(); toast('Thanks for confirming! +5 points. The worker has been paid.'); } else toast('Dispute sent. The ward office will review the photos.', 'info');
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };

  if (!r) return <div><TopBar title="Report" back /><div className="space-y-3 px-4"><Skeleton className="h-56" /><Skeleton className="h-40" /></div></div>;

  const mine = r.citizenId === user?.id;
  const canConfirm = mine && r.status === 'completed' && !r.citizenConfirmation;
  const steps = [
    { k: 'reported', l: 'Reported', at: r.createdAt, done: true },
    { k: 'claimed', l: r.workerName ? `${r.workerName.split(' ')[0]} took the job` : 'Worker assigned', at: r.claimedAt, done: Boolean(r.claimedAt) },
    { k: 'cleaning', l: 'Cleanup started at the spot', at: r.checkinAt, done: Boolean(r.checkinAt) },
    { k: 'verified', l: 'Cleanup verified by AI', at: r.completedAt, done: r.status === 'completed' || r.status === 'disputed' },
    { k: 'confirmed', l: r.citizenConfirmation?.ok === false ? 'You disputed the cleanup' : 'You confirmed', at: r.citizenConfirmation?.at, done: Boolean(r.citizenConfirmation) },
  ];

  return (
    <div className="pb-6">
      <TopBar title={CATEGORY_LABEL[r.ai?.category]} sub={`${wardName(meta, r.ward)} · ${timeAgo(r.createdAt)}`} back />
      <div className="space-y-3 px-4">
        {r.status === 'completed' || r.status === 'disputed'
          ? <BeforeAfter before={r.beforePhoto || r.photo} after={r.afterPhoto} category={r.ai?.category} seed={r.id} className="aspect-[4/3] w-full" />
          : <Photo src={r.photo} category={r.ai?.category} seed={r.id} className="aspect-[4/3] w-full rounded-3xl" />}

        {canConfirm && (
          <motion.section initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-canopy p-4 text-white">
            <p className="font-display text-lg font-bold">Is the spot clean now?</p>
            <p className="text-sm text-white/75">Your confirmation releases the worker's payment of {inr(r.payout)}.</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setSheet(true)} className="btn-lime flex-1"><ThumbsUp size={18} />Yes, it's clean</button>
              <button onClick={() => confirm(false)} disabled={busy} className="btn flex-1 bg-white/10 text-white"><ThumbsDown size={18} />Not clean</button>
            </div>
          </motion.section>
        )}

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <div className="flex items-center gap-3">
            <CategoryTile category={r.ai?.category} size={46} />
            <div className="flex-1"><p className="font-semibold">{r.ai?.summary || CATEGORY_LABEL[r.ai?.category]}</p><div className="mt-1 flex flex-wrap gap-1"><StatusPill status={r.status} /><SeverityPill severity={r.ai?.severity} /></div></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{meta?.volumes?.[r.ai?.volume]?.label}</p><p className="text-ink-faint">Volume</p></div>
            <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{Math.round((r.ai?.confidence || 0) * 100)}%</p><p className="text-ink-faint">AI confidence</p></div>
            <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{r.confirmations?.length || 0}</p><p className="text-ink-faint">Confirmations</p></div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1">{r.ai?.provider === 'gemini' ? <Cloud size={12} /> : <Cpu size={12} />}{r.ai?.providerLabel}</span>
            {r.status !== 'completed' && r.slaDeadline && <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${r.overdue ? 'bg-coral-soft text-coral-deep' : 'bg-mist'}`}><Timer size={12} />Deadline {timeUntil(r.slaDeadline)}</span>}
            {r.escalatedTo && r.status !== 'completed' && <span className="inline-flex items-center gap-1 rounded-full bg-coral-soft px-2.5 py-1 text-coral-deep">Escalated to {r.escalatedTo}</span>}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-3 text-sm font-semibold">Progress</p>
          <ol className="relative space-y-4 pl-7">
            <span className="absolute bottom-2 left-[9px] top-2 w-0.5 bg-line" />
            {steps.map((s) => (
              <li key={s.k} className="relative">
                <span className={`absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full ${s.done ? 'bg-canopy text-lime' : 'bg-white text-line'}`}>{s.done ? <CheckCircle2 size={14} /> : <Circle size={14} />}</span>
                <p className={`text-sm ${s.done ? 'font-semibold' : 'text-ink-faint'}`}>{s.l}</p>
                {s.at && <p className="text-xs text-ink-faint">{dateTime(s.at)}</p>}
              </li>
            ))}
          </ol>
        </section>

        {r.verification && (
          <section className="rounded-3xl bg-white p-4 shadow-lift">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={18} className="text-canopy" />Cleanup check</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{Math.round((r.verification.sceneMatch || 0) * 100)}%</p><p className="text-ink-faint">Same place</p></div>
              <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{Math.round((r.verification.garbageAfter || 0) * 100)}%</p><p className="text-ink-faint">Waste left</p></div>
              <div className="rounded-2xl bg-mist p-2"><p className="font-display text-base font-bold">{r.verification.distance ?? '—'} m</p><p className="text-ink-faint">From spot</p></div>
            </div>
          </section>
        )}

        {r.confirmations?.length > 0 && <p className="flex items-center gap-2 px-1 text-sm text-ink-soft"><Users size={16} />{r.confirmations.length} other citizen{r.confirmations.length > 1 ? 's' : ''} confirmed this spot.</p>}
        {r.citizenConfirmation?.stars && <p className="flex items-center gap-1 px-1 text-sm text-ink-soft">You rated the worker {Array.from({ length: r.citizenConfirmation.stars }).map((_, i) => <Star key={i} size={14} className="fill-marigold text-marigold" />)}</p>}
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Thank the worker">
        <p className="text-sm text-ink-soft">How was the cleanup by {r.workerName?.split(' ')[0] || 'the worker'}?</p>
        <div className="mt-3 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.button whileTap={{ scale: 0.8 }} key={n} onClick={() => setStars(n)} aria-label={`${n} stars`}><Star size={36} className={n <= stars ? 'fill-marigold text-marigold' : 'text-line'} /></motion.button>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold"><Heart size={16} className="text-coral" />Add a tip from your points</p>
        <div className="mt-2 flex gap-2">{[0, 50, 100, 200].map((p) => <button key={p} onClick={() => setTip(p)} disabled={p > (user?.points || 0)} className={`chip flex-1 justify-center disabled:opacity-40 ${tip === p ? 'border-canopy bg-canopy text-white' : 'border-line'}`}>{p ? `${p} pts` : 'No tip'}</button>)}</div>
        {tip > 0 && <p className="mt-1 text-xs text-ink-faint">{tip} points = {inr(tip * 0.1)} paid to the worker.</p>}
        <input className="field mt-4" placeholder="Say thanks (optional)" value={comment} onChange={(e) => setComment(e.target.value)} maxLength={120} />
        <button onClick={() => confirm(true)} disabled={busy} className="btn-primary mt-4 w-full">{busy && <Spinner />}Confirm cleanup</button>
      </Sheet>
    </div>
  );
}
