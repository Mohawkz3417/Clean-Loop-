import { useEffect, useMemo, useState } from 'react';
import { Marker, Popup, Circle, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Flame, MapPin, HardHat, Gavel, Radar, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { BaseMap, HeatLayer, dotIcon, InvalidateOnResize, CHENNAI } from '../../components/maps.jsx';
import { CATEGORY_LABEL, Skeleton } from '../../components/ui.jsx';
import { timeAgo } from '../../lib/format.js';

function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo([target.lat, target.lng], 16, { duration: 0.8 }); }, [target, map]);
  return null;
}

export default function LiveMap() {
  const meta = useMeta();
  const nav = useNavigate();
  const [d, setD] = useState(null);
  const [reports, setReports] = useState([]);
  const [layers, setLayers] = useState({ heat: true, reports: true, hotspots: true, workers: true, dumping: true });
  const [target, setTarget] = useState(null);

  useEffect(() => {
    get('/admin/hotspots').then(setD).catch(() => {});
    get('/admin/reports?status=active').then((r) => setReports(r.reports)).catch(() => {});
  }, []);
  const predicted = useMemo(() => (d?.hotspots || []).filter((h) => h.predicted).slice(0, 12), [d]);
  const toggle = (k) => setLayers((l) => ({ ...l, [k]: !l[k] }));
  const SEV = { low: '#4FA82E', medium: '#F5A524', high: '#F27B1F', critical: '#F0574A' };

  return (
    <div>
      <PageHead title="Live map & hotspots" sub="Heatmap of every report, open jobs, worker positions and predicted dumping hotspots" />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <section className="panel relative h-[620px] overflow-hidden">
          <div className="absolute left-3 top-3 z-[500] flex flex-wrap gap-1.5">
            {[['heat', 'Heatmap', Flame], ['reports', 'Open reports', MapPin], ['hotspots', 'Predicted hotspots', Radar], ['workers', 'Workers', HardHat], ['dumping', 'Dumping cases', Gavel]].map(([k, l, I]) => (
              <button key={k} onClick={() => toggle(k)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur transition ${layers[k] ? 'border-lime/50 bg-night/80 text-lime' : 'border-night-line bg-night/70 text-night-muted'}`}><I size={13} />{l}</button>
            ))}
          </div>
          {!d ? <Skeleton className="h-full rounded-none" /> : (
            <BaseMap center={CHENNAI} zoom={12} dark>
              <InvalidateOnResize />
              <FlyTo target={target} />
              {layers.heat && <HeatLayer points={d.points} />}
              {layers.hotspots && predicted.map((h) => (
                <Circle key={h.key} center={[h.lat, h.lng]} radius={180 + h.risk * 2} pathOptions={{ color: '#F0574A', weight: 1.5, dashArray: '6 6', fillColor: '#F0574A', fillOpacity: 0.08 }}>
                  <Popup><p className="font-semibold">Predicted hotspot · risk {h.risk}</p><p className="text-xs">{h.reports} reports · {CATEGORY_LABEL[h.topCategory]}</p><p className="mt-1 text-xs">{h.action}</p></Popup>
                </Circle>
              ))}
              {layers.reports && reports.map((r) => (
                <Marker key={r.id} position={[r.lat, r.lng]} icon={dotIcon(SEV[r.ai?.severity] || '#F5A524', { size: 12, ring: '#081322', pulse: r.overdue })} eventHandlers={{ click: () => {} }}>
                  <Popup><p className="font-semibold">{CATEGORY_LABEL[r.ai?.category]} · {r.ai?.severity}</p><p className="text-xs">{wardName(meta, r.ward)} · {timeAgo(r.createdAt)} · {r.status}</p><button className="mt-1 text-xs font-semibold text-canopy underline" onClick={() => nav(`/admin/reports?open=${r.id}`)}>Open report</button></Popup>
                </Marker>
              ))}
              {layers.workers && d.workers.map((w) => (
                <Marker key={w.id} position={[w.lat, w.lng]} icon={dotIcon(w.online ? '#B6F04A' : '#8EA3BF', { size: 14, ring: '#0E5E4A' })}>
                  <Popup><p className="font-semibold">{w.name}</p><p className="text-xs">{w.online ? 'Online' : 'Offline'}</p></Popup>
                </Marker>
              ))}
              {layers.dumping && d.violations.map((v) => (
                <Marker key={v.id} position={[v.lat, v.lng]} icon={dotIcon('#B57CFF', { size: 12, ring: '#081322' })}>
                  <Popup><p className="font-semibold">Illegal dumping case</p><p className="text-xs">{v.status.replace(/_/g, ' ')}</p></Popup>
                </Marker>
              ))}
            </BaseMap>
          )}
          <div className="absolute bottom-3 left-3 z-[500] rounded-xl border border-night-line bg-night/85 px-3 py-2 text-[11px] text-night-muted backdrop-blur">
            <div className="flex items-center gap-3">
              {Object.entries(SEV).map(([k, c]) => <span key={k} className="flex items-center gap-1 capitalize"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{k}</span>)}
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-lime" />Worker</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#B57CFF]" />Dumping</span>
            </div>
          </div>
        </section>

        <section className="panel flex h-[620px] flex-col">
          <div className="border-b border-night-line p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Radar size={18} className="text-coral" />Predicted hotspots</h2>
            <p className="mt-1 text-xs text-night-muted">Spots where waste keeps coming back after cleanups, weighted by how recent the reports are. Act before the next pile appears.</p>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {predicted.map((h, i) => (
              <motion.button key={h.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} onClick={() => setTarget({ ...h })} className="w-full rounded-2xl border border-night-line bg-night-raised/60 p-3 text-left hover:border-coral/50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{wardName(meta, h.ward)}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${h.risk >= 75 ? 'bg-coral/20 text-coral' : 'bg-marigold/20 text-marigold'}`}>Risk {h.risk}</span>
                </div>
                <p className="mt-0.5 text-xs text-night-muted">{h.reports} reports · {h.repeatAfterCleanup} repeat after cleanup · mostly {CATEGORY_LABEL[h.topCategory].toLowerCase()}{h.dumping ? ` · ${h.dumping} dumping case${h.dumping > 1 ? 's' : ''}` : ''}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-lime"><Megaphone size={13} className="mt-px shrink-0" />{h.action}</p>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
