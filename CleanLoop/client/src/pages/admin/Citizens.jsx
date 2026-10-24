import { useEffect, useState } from 'react';
import { Search, Ban } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead, AdminAvatar } from '../../layouts/AdminShell.jsx';
import { Skeleton } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

export default function Citizens() {
  const meta = useMeta();
  const toast = useToast();
  const [list, setList] = useState(null);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('points');
  const load = () => get('/admin/citizens').then((r) => setList(r.citizens)).catch(() => setList([]));
  useEffect(() => { load(); }, []);
  const toggle = async (c) => { await post(`/admin/citizens/${c.id}`, { suspended: !c.suspended }); toast(c.suspended ? 'Account reinstated' : 'Account suspended'); load(); };
  const shown = (list || []).filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === 'trust' ? (a.trustScore ?? 70) - (b.trustScore ?? 70) : sort === 'reports' ? b.reports - a.reports : (b.lifetimePoints || 0) - (a.lifetimePoints || 0)));
  return (
    <div>
      <PageHead title="Citizens" sub="Trust scores keep rewards fair: verified reports raise them, fake ones lower them" />
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1"><Search size={16} className="absolute left-3 top-3 text-night-muted" /><input className="nfield pl-9" placeholder="Search citizens" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <select className="nfield w-auto" value={sort} onChange={(e) => setSort(e.target.value)}><option value="points">Most points</option><option value="reports">Most reports</option><option value="trust">Lowest trust first</option></select>
      </div>
      <section className="panel overflow-x-auto">
        {!list ? <Skeleton className="m-4 h-80" /> : (
          <table className="w-full min-w-[760px] text-sm">
            <thead><tr className="border-b border-night-line text-left text-xs text-night-muted"><th className="px-4 py-3 font-medium">Citizen</th><th className="px-3 py-3 font-medium">Level</th><th className="px-3 py-3 text-right font-medium">Points</th><th className="px-3 py-3 text-right font-medium">Wallet</th><th className="px-3 py-3 text-right font-medium">Reports</th><th className="px-3 py-3 font-medium">Trust</th><th className="px-4 py-3" /></tr></thead>
            <tbody>
              {shown.map((c) => (
                <tr key={c.id} className={`border-b border-night-line/60 last:border-0 hover:bg-night-raised/40 ${c.suspended ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-2.5"><div className="flex items-center gap-2.5"><AdminAvatar name={c.name} size={32} /><div><p className="font-medium">{c.name}</p><p className="text-xs text-night-muted">{wardName(meta, c.ward)} · {(c.badges || []).length} badges</p></div></div></td>
                  <td className="px-3 py-2.5 text-night-muted">{c.level}</td>
                  <td className="num px-3 py-2.5 text-right">{(c.lifetimePoints || 0).toLocaleString('en-IN')}</td>
                  <td className="num px-3 py-2.5 text-right text-night-muted">{inr(c.wallet)}</td>
                  <td className="num px-3 py-2.5 text-right">{c.reports}{c.rejected ? <span className="text-coral"> ({c.rejected} rejected)</span> : ''}</td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-night-raised"><div className={`h-full ${c.trustScore >= 60 ? 'bg-lime' : c.trustScore >= 35 ? 'bg-marigold' : 'bg-coral'}`} style={{ width: `${c.trustScore}%` }} /></div><span className="num">{c.trustScore}</span></div></td>
                  <td className="px-4 py-2.5 text-right"><button className="nbtn-danger" onClick={() => toggle(c)}><Ban size={13} />{c.suspended ? 'Reinstate' : 'Suspend'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
