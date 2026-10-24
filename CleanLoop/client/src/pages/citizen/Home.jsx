import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Car, ScanLine, Truck, CalendarDays, Landmark, HandHeart, ChevronRight, Award, Leaf, Weight, Wallet, BellRing } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { BellButton } from '../../layouts/MobileShell.jsx';
import { CountUp, ProgressRing, Skeleton, StatusPill, CategoryTile, CATEGORY_LABEL, stagger } from '../../components/ui.jsx';
import { Photo } from '../../components/media.jsx';
import { timeAgo, inr, kg, firstName } from '../../lib/format.js';

export default function Home() {
  const { user } = useAuth();
  const meta = useMeta();
  const { t } = useI18n();
  const [d, setD] = useState(null);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    get('/me/dashboard').then(setD).catch(() => {});
    get('/reports/mine').then((r) => setReports(r.reports)).catch(() => setReports([]));
  }, []);

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const lvl = d?.level;

  return (
    <div className="px-4">
      <header className="flex items-center justify-between pb-4 pt-[max(env(safe-area-inset-top),18px)]">
        <div>
          <p className="text-sm text-ink-faint">{greet}</p>
          <h1 className="text-2xl font-bold">{firstName(user?.name)}</h1>
        </div>
        <BellButton to="/app/notifications" />
      </header>

      {/* impact card */}
      <motion.section {...stagger(0)} className="relative overflow-hidden rounded-[28px] bg-canopy p-5 text-white shadow-float">
        <svg className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 opacity-15" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#B6F04A" strokeWidth="10" strokeDasharray="170 70" strokeLinecap="round" /></svg>
        <div className="flex items-center gap-4">
          <ProgressRing value={lvl?.progress ?? 0} size={78} stroke={7}>
            <Award size={26} className="text-lime" />
          </ProgressRing>
          <div className="min-w-0">
            <p className="text-sm text-white/70">{lvl ? `${lvl.name}${lvl.next ? ` · ${(lvl.nextMin - (user?.lifetimePoints || 0)).toLocaleString('en-IN')} pts to ${lvl.next}` : ''}` : ' '}</p>
            <p className="font-display text-4xl font-bold text-lime"><CountUp value={user?.points || 0} /><span className="ml-1.5 text-base font-semibold text-white/80">{t('points')}</span></p>
            <p className="text-xs text-white/60">≈ {inr((user?.points || 0) * 0.1)} in rewards{d?.stats?.rank ? ` · #${d.stats.rank} in the city` : ''}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { icon: Weight, v: d?.stats?.kg, f: kg, l: t('removed') },
            { icon: Leaf, v: d?.stats?.co2, f: kg, l: t('co2Saved') },
            { icon: Wallet, v: user?.wallet || 0, f: inr, l: 'Cash wallet' },
          ].map((x, i) => (
            <div key={i} className="rounded-2xl bg-white/10 px-3 py-2.5">
              <x.icon size={16} className="text-lime" />
              <p className="mt-1 font-display text-lg font-bold">{x.v == null ? '—' : <CountUp value={x.v} format={x.f} />}</p>
              <p className="text-[11px] text-white/65">{x.l}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* awaiting confirmation */}
      {d?.awaiting?.length > 0 && (
        <motion.div {...stagger(1)}>
          <Link to={`/app/reports/${d.awaiting[0].id}`} className="mt-4 flex items-center gap-3 rounded-3xl border border-lime/60 bg-lime-soft p-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-canopy-900"><BellRing size={20} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{d.awaiting.length === 1 ? 'A spot you reported was cleaned' : `${d.awaiting.length} spots you reported were cleaned`}</p>
              <p className="text-xs text-ink-soft">Check the before and after photos and confirm · +5 pts</p>
            </div>
            <ChevronRight size={20} className="text-ink-faint" />
          </Link>
        </motion.div>
      )}

      {/* primary actions */}
      <motion.div {...stagger(2)} className="mt-4 grid grid-cols-[1.4fr_1fr] gap-3">
        <Link to="/app/report" className="group relative overflow-hidden rounded-3xl bg-ink p-4 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-canopy-900 transition group-active:scale-95"><Camera size={22} /></span>
          <p className="mt-6 font-display text-lg font-bold leading-tight">{t('reportGarbage')}</p>
          <p className="text-xs text-white/60">AI sorts it in seconds</p>
        </Link>
        <Link to="/app/dumping" className="rounded-3xl border border-line bg-white p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-coral-soft text-coral"><Car size={22} /></span>
          <p className="mt-6 font-display text-base font-bold leading-tight">{t('reportDumping')}</p>
          <p className="text-xs text-ink-faint">Earn 20% of the fine</p>
        </Link>
      </motion.div>

      <motion.div {...stagger(3)} className="mt-3 grid grid-cols-4 gap-2">
        {[
          { to: '/app/coach', icon: ScanLine, l: t('segregationCoach'), c: 'text-[#2F80ED] bg-[#E3EEFF]' },
          { to: '/app/pickup', icon: Truck, l: t('bookPickup'), c: 'text-canopy bg-canopy-50' },
          { to: '/app/drives', icon: CalendarDays, l: t('cleanupDrives'), c: 'text-marigold-deep bg-marigold-soft' },
          { to: '/app/services', icon: Landmark, l: t('govServices'), c: 'text-[#6B4BD6] bg-[#EEE8FF]' },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white px-1 py-3 text-center shadow-lift">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${q.c}`}><q.icon size={20} /></span>
            <span className="text-[11px] font-semibold leading-tight">{q.l}</span>
          </Link>
        ))}
      </motion.div>

      <motion.div {...stagger(4)}>
        <Link to="/app/volunteer" className="mt-3 flex items-center gap-3 rounded-3xl bg-white p-3.5 shadow-lift">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canopy-50 text-canopy"><HandHeart size={22} /></span>
          <div className="flex-1"><p className="text-sm font-semibold">Clean a small spot yourself</p><p className="text-xs text-ink-faint">Volunteer jobs near you pay in points</p></div>
          <ChevronRight size={20} className="text-ink-faint" />
        </Link>
      </motion.div>

      {/* ward */}
      {d?.ward && (
        <motion.section {...stagger(5)} className="mt-4 rounded-3xl bg-white p-4 shadow-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-faint">Your ward</p>
              <p className="font-display text-lg font-bold">{d.ward.name}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-bold text-canopy">{d.ward.score}<span className="text-sm text-ink-faint">/100</span></p>
              <p className="text-xs text-ink-faint">cleanliness score · grade {d.ward.grade}</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist"><motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#14A06B,#B6F04A)]" initial={{ width: 0 }} animate={{ width: `${d.ward.score}%` }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} /></div>
          <p className="mt-2 text-xs text-ink-soft">{d.ward.open} open reports · {d.ward.resolutionRate}% resolved in the last 30 days</p>
        </motion.section>
      )}

      {/* reports */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t('myReports')}</h2>
          <Link to="/app/reports" className="text-sm font-semibold text-canopy">{t('seeAll')}</Link>
        </div>
        {!reports ? <div className="space-y-2">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
          : reports.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink-soft">No reports yet. Your first verified report earns the “First step” badge.</div>
          ) : (
            <div className="space-y-2">
              {reports.slice(0, 4).map((r, i) => (
                <motion.div key={r.id} {...stagger(i, 0.04)}>
                  <Link to={`/app/reports/${r.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-lift">
                    <Photo src={r.photo} category={r.ai?.category} seed={r.id} className="h-16 w-16 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5"><CategoryTile category={r.ai?.category} size={20} className="!rounded-md" /><p className="truncate text-sm font-semibold">{CATEGORY_LABEL[r.ai?.category]}</p></div>
                      <p className="mt-0.5 truncate text-xs text-ink-faint">{wardName(meta, r.ward)} · {timeAgo(r.createdAt)}{r.isConfirmation ? ' · you confirmed' : ''}</p>
                      <StatusPill status={r.status} short className="mt-1" />
                    </div>
                    <ChevronRight size={18} className="text-ink-faint" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
      </section>
    </div>
  );
}
