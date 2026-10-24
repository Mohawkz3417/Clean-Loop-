import { useEffect, useState } from 'react';
import { Check, Truck, ClipboardList, CalendarDays } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Segmented, Skeleton, CATEGORY_LABEL } from '../../components/ui.jsx';
import { dateShort, timeAgo, kg } from '../../lib/format.js';

export default function Services() {
  const meta = useMeta();
  const toast = useToast();
  const [tab, setTab] = useState('pickups');
  const [pickups, setPickups] = useState(null);
  const [reqs, setReqs] = useState(null);
  const [drives, setDrives] = useState(null);
  const [weights, setWeights] = useState({});
  const load = () => {
    get('/admin/pickups').then((r) => setPickups(r.pickups)).catch(() => setPickups([]));
    get('/admin/service-requests').then((r) => setReqs(r.requests)).catch(() => setReqs([]));
    get('/drives').then((r) => setDrives(r.drives)).catch(() => setDrives([]));
  };
  useEffect(() => { load(); }, []);
  const completePickup = async (p) => {
    try { const r = await post(`/admin/pickups/${p.id}/complete`, { actualKg: Number(weights[p.id] || p.estKg) }); toast(`${r.pickup.actualKg} kg weighed · ${r.pickup.pointsAwarded} points credited`); load(); } catch (e) { toast(e.message, 'error'); }
  };
  const setStatus = async (s, status) => { await post(`/admin/service-requests/${s.id}`, { status }); toast(`Marked ${status}`); load(); };
  const completeDrive = async (d) => { await post(`/admin/drives/${d.id}/complete`, { kgCollected: Number(weights[d.id] || d.goalKg) }); toast('Drive completed · participants rewarded'); load(); };
  return (
    <div>
      <PageHead title="Pickups & city services" sub="Doorstep recycling pickups, government service requests and community drives" />
      <Segmented dark value={tab} onChange={setTab} options={[{ value: 'pickups', label: 'Doorstep pickups' }, { value: 'requests', label: 'Service requests' }, { value: 'drives', label: 'Cleanup drives' }]} />
      <section className="panel mt-4 overflow-x-auto">
        {tab === 'pickups' && (!pickups ? <Skeleton className="m-4 h-60" /> : (
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="border-b border-night-line text-left text-xs text-night-muted"><th className="px-4 py-3 font-medium"><Truck size={13} className="mr-1 inline" />Citizen</th><th className="px-3 py-3 font-medium">Materials</th><th className="px-3 py-3 font-medium">Slot</th><th className="px-3 py-3 font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Weigh & complete</th></tr></thead>
            <tbody>{pickups.map((p) => (
              <tr key={p.id} className="border-b border-night-line/60 last:border-0">
                <td className="px-4 py-2.5"><p className="font-medium">{p.citizenName}</p><p className="text-xs text-night-muted">{p.address || wardName(meta, p.ward)}</p></td>
                <td className="px-3 py-2.5 text-night-muted">{p.materials.map((m) => CATEGORY_LABEL[m]?.split(' ')[0]).join(', ')} · ~{p.estKg} kg</td>
                <td className="px-3 py-2.5">{dateShort(p.date)} · {p.slot}</td>
                <td className="px-3 py-2.5">{p.status === 'completed' ? <span className="text-lime">{p.actualKg} kg · +{p.pointsAwarded} pts</span> : <span className="text-marigold">Scheduled</span>}</td>
                <td className="px-4 py-2.5 text-right">{p.status === 'scheduled' && <div className="flex justify-end gap-1.5"><input className="nfield !w-20 !py-1.5" placeholder={`${p.estKg}`} value={weights[p.id] || ''} onChange={(e) => setWeights({ ...weights, [p.id]: e.target.value })} /><button className="nbtn-lime" onClick={() => completePickup(p)}><Check size={14} />Done</button></div>}</td>
              </tr>
            ))}</tbody>
          </table>
        ))}
        {tab === 'requests' && (!reqs ? <Skeleton className="m-4 h-60" /> : (
          <table className="w-full min-w-[680px] text-sm">
            <thead><tr className="border-b border-night-line text-left text-xs text-night-muted"><th className="px-4 py-3 font-medium"><ClipboardList size={13} className="mr-1 inline" />Request</th><th className="px-3 py-3 font-medium">Citizen</th><th className="px-3 py-3 font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Update</th></tr></thead>
            <tbody>{reqs.map((s) => (
              <tr key={s.id} className="border-b border-night-line/60 last:border-0">
                <td className="px-4 py-2.5"><p className="font-medium">{s.title}</p><p className="text-xs text-night-muted">{s.note || '—'} · {timeAgo(s.createdAt)}</p></td>
                <td className="px-3 py-2.5">{s.userName}<p className="text-xs text-night-muted">{wardName(meta, s.ward)}</p></td>
                <td className="px-3 py-2.5 capitalize">{s.status}</td>
                <td className="px-4 py-2.5 text-right"><div className="flex justify-end gap-1.5">{['scheduled', 'completed'].map((st) => <button key={st} className="nbtn" disabled={s.status === st} onClick={() => setStatus(s, st)}>{st}</button>)}</div></td>
              </tr>
            ))}</tbody>
          </table>
        ))}
        {tab === 'drives' && (!drives ? <Skeleton className="m-4 h-60" /> : (
          <table className="w-full min-w-[680px] text-sm">
            <thead><tr className="border-b border-night-line text-left text-xs text-night-muted"><th className="px-4 py-3 font-medium"><CalendarDays size={13} className="mr-1 inline" />Drive</th><th className="px-3 py-3 font-medium">Date</th><th className="px-3 py-3 text-right font-medium">People</th><th className="px-4 py-3 text-right font-medium">Result</th></tr></thead>
            <tbody>{drives.map((d) => (
              <tr key={d.id} className="border-b border-night-line/60 last:border-0">
                <td className="px-4 py-2.5"><p className="font-medium">{d.title}</p><p className="text-xs text-night-muted">{d.place}</p></td>
                <td className="px-3 py-2.5">{dateShort(d.date)}</td>
                <td className="num px-3 py-2.5 text-right">{d.count}</td>
                <td className="px-4 py-2.5 text-right">{d.status === 'completed' ? <span className="text-lime">{kg(d.kgCollected)} collected</span> : <div className="flex justify-end gap-1.5"><input className="nfield !w-20 !py-1.5" placeholder="kg" value={weights[d.id] || ''} onChange={(e) => setWeights({ ...weights, [d.id]: e.target.value })} /><button className="nbtn-lime" onClick={() => completeDrive(d)}><Check size={14} />Complete</button></div>}</td>
              </tr>
            ))}</tbody>
          </table>
        ))}
      </section>
    </div>
  );
}
