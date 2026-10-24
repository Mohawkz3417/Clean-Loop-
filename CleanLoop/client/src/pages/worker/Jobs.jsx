import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Marker, Popup } from 'react-leaflet';
import { List, Map as MapIcon, ChevronRight, Power, Star, Zap } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { getLocation, nearCity } from '../../lib/geo.js';
import { BellButton } from '../../layouts/MobileShell.jsx';
import JobCard from '../../components/JobCard.jsx';
import { Segmented, Skeleton, Empty, CategoryTile, CATEGORY_LABEL } from '../../components/ui.jsx';
import { BaseMap, dotIcon, meIcon, InvalidateOnResize } from '../../components/maps.jsx';
import { inr, firstName, dist } from '../../lib/format.js';

const SEV_COLOR = { low: '#14A06B', medium: '#F5A524', high: '#F27B1F', critical: '#F0574A' };

export function useOrigin(meta, user) {
  const [origin, setOrigin] = useState(null);
  useEffect(() => {
    if (!meta || !user) return;
    let alive = true;
    const ward = meta.wards.find((w) => w.id === user.ward) || meta.wards[0];
    // show jobs right away from the last known position, then refine with GPS
    setOrigin(user.lat != null ? { lat: user.lat, lng: user.lng, gps: false } : { lat: ward.lat, lng: ward.lng, gps: false });
    getLocation({ timeout: 8000 }).then((g) => {
      if (alive && g.ok && nearCity(g, ward)) setOrigin({ lat: g.lat, lng: g.lng, gps: true });
    });
    return () => { alive = false; };
  }, [meta, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  return origin;
}

export default function Jobs() {
  const { user, setUser } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const { t } = useI18n();
  const nav = useNavigate();
  const origin = useOrigin(meta, user);
  const [jobs, setJobs] = useState(null);
  const [active, setActive] = useState([]);
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const [today, setToday] = useState(null);

  const load = () => {
    if (!origin) return;
    get(`/jobs/feed?lat=${origin.lat}&lng=${origin.lng}`).then((r) => setJobs(r.jobs)).catch(() => setJobs([]));
    get(`/jobs/active?lat=${origin.lat}&lng=${origin.lng}`).then((r) => setActive(r.jobs)).catch(() => {});
  };
  useEffect(() => { load(); const id = setInterval(load, 25000); return () => clearInterval(id); }, [origin]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { get('/worker/earnings').then(setToday).catch(() => {}); }, []);
  useEffect(() => { if (origin && user?.online) post('/worker/status', { lat: origin.lat, lng: origin.lng }).catch(() => {}); }, [origin]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleOnline = async () => {
    const r = await post('/worker/status', { online: !user.online, lat: origin?.lat, lng: origin?.lng });
    setUser(r.user);
    toast(r.user.online ? 'You are online. New jobs nearby will notify you.' : 'You are offline.', 'info');
  };

  const claim = async (job) => {
    try {
      await post(`/jobs/${job.id}/claim`);
      toast(`Job claimed - ${inr(job.yourPay)}. Head to the spot.`);
      nav(`/worker/job/${job.id}`);
      return true;
    } catch (e) { toast(e.message, 'error'); load(); return false; }
  };

  const list = useMemo(() => {
    let l = jobs || [];
    if (filter === 'near') l = l.filter((j) => j.distance < 2500);
    if (filter === 'pay') l = [...l].sort((a, b) => b.yourPay - a.yourPay);
    if (filter === 'urgent') l = l.filter((j) => j.overdue || ['high', 'critical'].includes(j.ai?.severity));
    return l;
  }, [jobs, filter]);

  return (
    <div>
      <header className="px-4 pb-3 pt-[max(env(safe-area-inset-top),18px)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-faint">Vanakkam,</p>
            <h1 className="text-2xl font-bold">{firstName(user?.name)}</h1>
          </div>
          <div className="flex items-center gap-2">
            <BellButton to="/worker/notifications" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-[26px] bg-ink p-3 pl-4 text-white">
          <div className="flex-1">
            <p className="text-xs text-white/60">Today</p>
            <p className="font-display text-2xl font-bold text-lime">{today ? inr(today.today) : '—'}</p>
            <p className="flex items-center gap-1 text-[11px] text-white/60"><Star size={11} className="fill-marigold text-marigold" />{user?.rating?.toFixed?.(2) || '—'} · {user?.tier || 'Bronze'} · {user?.jobsDone || 0} jobs</p>
          </div>
          <button onClick={toggleOnline} className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition ${user?.online ? 'bg-lime text-canopy-900 shadow-glow' : 'bg-white/10 text-white'}`}>
            <Power size={18} />{user?.online ? t('online') : t('goOnline')}
          </button>
        </div>
        {user?.approved === false && <p className="mt-3 rounded-2xl bg-marigold-soft px-4 py-3 text-sm text-marigold-deep">Your account is waiting for approval by the ward office. You can browse jobs but not claim them yet.</p>}
      </header>

      {active.length > 0 && (
        <div className="px-4">
          <p className="mb-2 text-sm font-semibold">{t('active')} ({active.length})</p>
          <div className="space-y-2">
            {active.map((j) => (
              <Link key={j.id} to={`/worker/job/${j.id}`} className="flex items-center gap-3 rounded-3xl border-2 border-lime bg-lime-soft p-3">
                <CategoryTile category={j.ai?.category} size={42} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{CATEGORY_LABEL[j.ai?.category]} · {wardName(meta, j.ward)}</p>
                  <p className="text-xs text-ink-soft">{j.status === 'claimed' ? `Go to the spot · ${dist(j.distance)}` : j.status === 'in_progress' ? 'Cleanup in progress' : j.status === 'verifying' ? 'Waiting for manual check' : 'Disputed - under review'}{j.assignedByAdmin ? ' · assigned by admin' : ''}</p>
                </div>
                <span className="font-display font-bold text-canopy">{inr(j.yourPay)}</span>
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-2 px-4">
        <h2 className="text-lg font-bold">{t('nearby')} <span className="text-ink-faint">{jobs ? list.length : ''}</span></h2>
        <div className="flex rounded-full bg-white p-1 shadow-lift">
          {[['list', List], ['map', MapIcon]].map(([v, I]) => <button key={v} onClick={() => setView(v)} className={`rounded-full p-2 ${view === v ? 'bg-canopy text-white' : 'text-ink-faint'}`} aria-label={`${v} view`}><I size={18} /></button>)}
        </div>
      </div>
      <div className="no-scrollbar mt-3 overflow-x-auto px-4">
        <Segmented value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All' }, { value: 'near', label: 'Under 2.5 km' }, { value: 'pay', label: 'Best pay' }, { value: 'urgent', label: 'Urgent' }]} />
      </div>

      <div className="mt-3 px-4">
        {!jobs ? <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-44" />)}</div>
          : view === 'map' ? (
            <div className="h-[460px] overflow-hidden rounded-3xl shadow-lift">
              <BaseMap center={[origin.lat, origin.lng]} zoom={14}>
                <InvalidateOnResize />
                <Marker position={[origin.lat, origin.lng]} icon={meIcon()} />
                {list.map((j) => (
                  <Marker key={j.id} position={[j.lat, j.lng]} icon={dotIcon(SEV_COLOR[j.ai?.severity], { size: 18, pulse: j.overdue, label: j.payUnit === 'Rs' ? `₹${j.yourPay}` : `${j.yourPay}` })}>
                    <Popup>
                      <p className="font-semibold">{CATEGORY_LABEL[j.ai?.category]}</p>
                      <p className="text-xs">{dist(j.distance)} · {meta?.volumes?.[j.ai?.volume]?.label}</p>
                      {j.eligible ? <button onClick={() => claim(j)} className="btn-primary btn-sm mt-2 w-full">Claim ₹{j.yourPay}</button> : <p className="mt-1 text-xs text-coral">{j.lockedReason}</p>}
                    </Popup>
                  </Marker>
                ))}
              </BaseMap>
            </div>
          ) : list.length === 0 ? <Empty icon="Sparkles" title="No open jobs right now" body="Stay online - you will be notified when a new spot is reported nearby." />
            : (
              <div className="space-y-3">
                <AnimatePresence>
                  {list.map((j) => <JobCard key={j.id} job={j} onClaim={claim} wardLabel={wardName(meta, j.ward)} volumeLabel={meta?.volumes?.[j.ai?.volume]?.label} />)}
                </AnimatePresence>
              </div>
            )}
        {jobs && origin && !origin.gps && <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint"><Zap size={12} />Distances are from your ward because GPS is off or you are outside the demo city.</p>}
      </div>
    </div>
  );
}
