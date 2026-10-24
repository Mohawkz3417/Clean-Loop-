import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, HardHat, Truck, ShieldCheck, Sparkles, Ban, Check, Search } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead, AdminAvatar } from '../../layouts/AdminShell.jsx';
import { Segmented, Skeleton } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

const TYPE = { gig: 'Gig', informal: 'Waste picker', salaried: 'Municipal staff' };

export default function Workers() {
  const meta = useMeta();
  const toast = useToast();
  const [list, setList] = useState(null);
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const load = () => get('/admin/workers').then((r) => setList(r.workers)).catch(() => setList([]));
  useEffect(() => { load(); }, []);
  const set = async (w, body, msg) => { try { await post(`/admin/workers/${w.id}`, body); toast(msg); load(); } catch (e) { toast(e.message, 'error'); } };
  const shown = (list || []).filter((w) => (tab === 'all' || (tab === 'pending' ? w.approved === false : tab === 'online' ? w.online : w.workerType === tab)) && w.name.toLowerCase().includes(q.toLowerCase()));
  const pending = (list || []).filter((w) => w.approved === false).length;
  return (
    <div>
      <PageHead title="Workers" sub="Municipal staff, gig workers and informal waste pickers on one platform" />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Segmented dark value={tab} onChange={setTab} options={[{ value: 'all', label: 'All', count: list?.length }, { value: 'pending', label: 'Awaiting approval', count: pending }, { value: 'online', label: 'Online' }, { value: 'informal', label: 'Waste pickers' }, { value: 'salaried', label: 'Staff' }]} />
        <div className="relative ml-auto w-full sm:w-64"><Search size={16} className="absolute left-3 top-3 text-night-muted" /><input className="nfield pl-9" placeholder="Search workers" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {!list ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-48" />) : shown.map((w, i) => (
          <motion.article key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className={`panel p-4 ${w.approved === false ? 'border-marigold/40' : ''} ${w.suspended ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="relative"><AdminAvatar name={w.name} size={44} />{w.online && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-night-panel bg-lime" />}</div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-semibold">{w.name}{w.spotlight && <Sparkles size={14} className="text-lime" />}</p>
                <p className="text-xs text-night-muted">{TYPE[w.workerType]} · {wardName(meta, w.ward)} · {w.tier}</p>
                <p className="mt-1 flex items-center gap-1 text-xs"><Star size={12} className="fill-marigold text-marigold" />{w.rating ? w.rating.toFixed(2) : 'New'} · {w.jobsDone || 0} jobs · {inr(w.totalEarned)} earned</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              <span className={`rounded-full px-2 py-0.5 ${w.hazardCertified ? 'bg-marigold/15 text-marigold' : 'bg-night-raised text-night-muted'}`}><HardHat size={11} className="mr-1 inline" />{w.hazardCertified ? 'Hazard certified' : 'No hazard cert.'}</span>
              <span className={`rounded-full px-2 py-0.5 ${w.hasVehicle ? 'bg-[#4F8FE8]/15 text-[#7FB2FF]' : 'bg-night-raised text-night-muted'}`}><Truck size={11} className="mr-1 inline" />{w.hasVehicle ? 'Vehicle' : 'No vehicle'}</span>
              {w.active > 0 && <span className="rounded-full bg-lime/10 px-2 py-0.5 text-lime">{w.active} active job{w.active > 1 ? 's' : ''}</span>}
              {w.flags > 0 && <span className="rounded-full bg-coral/15 px-2 py-0.5 text-coral">{w.flags} rejected cleanup{w.flags > 1 ? 's' : ''}</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {w.approved === false ? (
                <button className="nbtn-lime" onClick={() => set(w, { approved: true }, `${w.name} approved`)}><Check size={14} />Approve</button>
              ) : (<>
                <button className="nbtn" onClick={() => set(w, { hazardCertified: !w.hazardCertified }, w.hazardCertified ? 'Certification removed' : 'Hazard certification added')}><ShieldCheck size={14} />{w.hazardCertified ? 'Remove cert.' : 'Certify hazard'}</button>
                <button className="nbtn" onClick={() => set(w, { hasVehicle: !w.hasVehicle }, 'Vehicle status updated')}><Truck size={14} />{w.hasVehicle ? 'No vehicle' : 'Has vehicle'}</button>
                {!w.spotlight && <button className="nbtn" onClick={() => set(w, { spotlight: true }, `${w.name} is now worker of the month`)}><Sparkles size={14} />Spotlight</button>}
              </>)}
              <button className="nbtn-danger" onClick={() => set(w, { suspended: !w.suspended }, w.suspended ? 'Reinstated' : 'Suspended')}><Ban size={14} />{w.suspended ? 'Reinstate' : 'Suspend'}</button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
