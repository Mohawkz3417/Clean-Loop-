import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Marker, Polyline } from 'react-leaflet';
import { Route as RouteIcon, Clock, Navigation, ChevronRight } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { BaseMap, pinIcon, meIcon, FitBounds, InvalidateOnResize } from '../../components/maps.jsx';
import { Empty, Skeleton } from '../../components/ui.jsx';
import { useOrigin } from './Jobs.jsx';
import { dist, inr } from '../../lib/format.js';

export default function RoutePlan() {
  const { user } = useAuth();
  const meta = useMeta();
  const { t } = useI18n();
  const origin = useOrigin(meta, user);
  const [r, setR] = useState(null);
  useEffect(() => { if (origin) get(`/worker/route?lat=${origin.lat}&lng=${origin.lng}`).then(setR).catch(() => setR({ stops: [] })); }, [origin]);
  const pts = r ? [[r.origin.lat, r.origin.lng], ...r.stops.map((s) => [s.lat, s.lng])] : [];
  const saved = r && r.naiveDistanceM > r.distanceM ? Math.round((1 - r.distanceM / r.naiveDistanceM) * 100) : 0;
  const gmaps = r?.stops?.length ? `https://www.google.com/maps/dir/?api=1&origin=${r.origin.lat},${r.origin.lng}&destination=${r.stops[r.stops.length - 1].lat},${r.stops[r.stops.length - 1].lng}&waypoints=${r.stops.slice(0, -1).map((s) => `${s.lat},${s.lng}`).join('|')}&travelmode=driving` : '#';
  return (
    <div>
      <TopBar title={t('route')} sub="Your claimed jobs in the shortest order" />
      <div className="space-y-3 px-4">
        {!r ? <Skeleton className="h-80" /> : r.stops.length === 0 ? (
          <Empty icon="Route" title="No jobs on your route" body="Claim a few nearby jobs and we'll plan the quickest way to do them all." action={<Link to="/worker" className="btn-primary btn-sm">Find jobs</Link>} />
        ) : (<>
          <div className="h-72 overflow-hidden rounded-3xl shadow-lift">
            <BaseMap center={pts[0]} zoom={14}>
              <InvalidateOnResize />
              <Polyline positions={pts} pathOptions={{ color: '#0E5E4A', weight: 5, opacity: 0.85 }} />
              <Marker position={pts[0]} icon={meIcon()} />
              {r.stops.map((s, i) => <Marker key={s.id} position={[s.lat, s.lng]} icon={pinIcon('#0E5E4A', String(i + 1))} />)}
              <FitBounds points={pts} padding={40} />
            </BaseMap>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white p-3 text-center shadow-lift"><RouteIcon size={18} className="mx-auto text-canopy" /><p className="mt-1 font-display text-lg font-bold">{dist(r.distanceM)}</p><p className="text-[11px] text-ink-faint">total</p></div>
            <div className="rounded-2xl bg-white p-3 text-center shadow-lift"><Clock size={18} className="mx-auto text-canopy" /><p className="mt-1 font-display text-lg font-bold">{r.etaMin} min</p><p className="text-[11px] text-ink-faint">incl. cleaning</p></div>
            <div className="rounded-2xl bg-lime-soft p-3 text-center"><p className="font-display text-2xl font-bold text-lime-deep">{saved}%</p><p className="text-[11px] text-ink-soft">shorter than claim order</p></div>
          </div>
          <div className="space-y-2">
            {r.stops.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={`/worker/job/${s.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canopy font-display font-bold text-lime">{i + 1}</span>
                  <div className="flex-1"><p className="text-sm font-semibold">{s.label}</p><p className="text-xs text-ink-faint">{wardName(meta, s.ward)}</p></div>
                  <span className="font-display font-bold text-canopy">{inr(s.payout)}</span>
                  <ChevronRight size={18} className="text-ink-faint" />
                </Link>
              </motion.div>
            ))}
          </div>
          <a href={gmaps} target="_blank" rel="noreferrer" className="btn-primary w-full"><Navigation size={18} />Start navigation</a>
        </>)}
      </div>
    </div>
  );
}
