import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Marker } from 'react-leaflet';
import { LocateFixed, ChevronRight } from 'lucide-react';
import { get } from '../../lib/api.js';
import { getLocation } from '../../lib/geo.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { BaseMap, dotIcon, meIcon, Recenter, InvalidateOnResize } from '../../components/maps.jsx';
import { Segmented, StatusPill, SeverityPill, CATEGORY_LABEL, CATEGORY_COLOR } from '../../components/ui.jsx';
import { Photo } from '../../components/media.jsx';
import { timeAgo } from '../../lib/format.js';

const STATUS_COLOR = { open: '#F5A524', review: '#8E5CF6', claimed: '#2F80ED', in_progress: '#2F80ED', verifying: '#8E5CF6', disputed: '#F0574A', completed: '#14A06B' };

export default function MapView() {
  const meta = useMeta();
  const { user } = useAuth();
  const { t } = useI18n();
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('open');
  const [sel, setSel] = useState(null);
  const [me, setMe] = useState(null);
  const ward = meta?.wards?.find((w) => w.id === user?.ward);
  const [center, setCenter] = useState(null);

  useEffect(() => { get('/reports/map').then((r) => setReports(r.reports)).catch(() => {}); }, []);
  useEffect(() => { if (ward && !center) setCenter([ward.lat, ward.lng]); }, [ward]); // eslint-disable-line react-hooks/exhaustive-deps

  const list = useMemo(() => reports.filter((r) => (filter === 'open' ? r.status !== 'completed' : filter === 'done' ? r.status === 'completed' : r.mine)), [reports, filter]);

  const locate = async () => {
    const g = await getLocation();
    if (g.ok) { setMe([g.lat, g.lng]); setCenter([g.lat, g.lng]); }
  };

  return (
    <div className="relative h-[calc(100vh-0px)] lg:h-[calc(100vh-48px)]">
      <div className="absolute inset-0">
        {center && (
          <BaseMap center={center} zoom={14} zoomControl={false}>
            <InvalidateOnResize />
            <Recenter center={center} />
            {me && <Marker position={me} icon={meIcon()} />}
            {list.map((r) => (
              <Marker key={r.id} position={[r.lat, r.lng]} icon={dotIcon(STATUS_COLOR[r.status] || '#5B6B66', { size: r.severity === 'critical' ? 18 : 14, pulse: r.status === 'open' && (r.severity === 'critical' || r.severity === 'high') })} eventHandlers={{ click: () => setSel(r) }} />
            ))}
          </BaseMap>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] p-4 pt-[max(env(safe-area-inset-top),16px)]">
        <div className="pointer-events-auto flex items-center justify-between gap-2 rounded-3xl bg-white/90 p-2 pl-4 shadow-float backdrop-blur">
          <h1 className="text-lg font-bold">{t('map')}</h1>
          <Segmented value={filter} onChange={setFilter} options={[{ value: 'open', label: 'Open' }, { value: 'done', label: 'Cleaned' }, { value: 'mine', label: 'Mine' }]} />
        </div>
        <div className="pointer-events-auto mt-2 inline-flex flex-wrap gap-x-3 gap-y-1 rounded-2xl bg-white/90 px-3 py-2 text-[11px] font-medium shadow-lift backdrop-blur">
          {[['Open', '#F5A524'], ['Being cleaned', '#2F80ED'], ['Cleaned', '#14A06B'], ['Disputed', '#F0574A']].map(([l, c]) => <span key={l} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{l}</span>)}
        </div>
      </div>
      <button onClick={locate} className="absolute bottom-32 right-4 z-[500] rounded-full bg-white p-3 shadow-float" aria-label="Show my location"><LocateFixed size={22} className="text-canopy" /></button>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="absolute inset-x-3 bottom-28 z-[600]">
            <div className="flex gap-3 rounded-3xl bg-white p-3 shadow-float">
              <Photo src={sel.photo} category={sel.category} seed={sel.id} className="h-20 w-20 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold" style={{ color: CATEGORY_COLOR[sel.category] }}>{CATEGORY_LABEL[sel.category]}</p>
                <p className="text-xs text-ink-faint">{wardName(meta, sel.ward)} · {timeAgo(sel.createdAt)}{sel.confirmations ? ` · ${sel.confirmations} confirmed` : ''}</p>
                <div className="mt-1.5 flex flex-wrap gap-1"><StatusPill status={sel.status} short /><SeverityPill severity={sel.severity} /></div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => setSel(null)} className="text-xs text-ink-faint">Close</button>
                {sel.mine && <Link to={`/app/reports/${sel.id}`} className="flex items-center text-sm font-semibold text-canopy">Open<ChevronRight size={16} /></Link>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
