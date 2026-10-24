import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, Building2, Factory, Gavel, HandCoins, Plus, ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Sheet, Skeleton, Spinner, CountUp } from '../../components/ui.jsx';
import { SERIES, tooltipStyle } from './Overview.jsx';
import { inr, timeAgo } from '../../lib/format.js';

const SOURCES = { govt: ['City & state grants', Landmark], epr: ['Brand EPR contributions', Building2], csr: ['CSR grants', HandCoins], recycling: ['Recycling sales', Factory], fines: ['Dumping fines', Gavel] };

export default function Funds() {
  const toast = useToast();
  const [d, setD] = useState(null);
  const [add, setAdd] = useState(false);
  const [f, setF] = useState({ source: 'epr', amount: '', note: '' });
  const [busy, setBusy] = useState(false);
  const load = () => get('/admin/funds').then(setD).catch(() => {});
  useEffect(() => { load(); }, []);
  const submit = async () => {
    setBusy(true);
    try { await post('/admin/funds', { ...f, amount: Number(f.amount) }); toast('Funds added to the reward pool'); setAdd(false); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  const s = d?.summary;
  const srcMax = s ? Math.max(1, ...Object.values(s.bySource)) : 1;
  const months = (d?.months || []).map((m) => ({ ...m, label: new Date(`${m.month}-01`).toLocaleDateString('en-IN', { month: 'short' }) }));
  return (
    <div>
      <PageHead title="Reward pool & funds" sub="Every rupee in and out, so rewards stay sustainable and auditable" actions={<button className="nbtn-lime" onClick={() => setAdd(true)}><Plus size={15} />Record funds</button>} />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="panel p-5"><Wallet size={20} className="text-lime" /><p className="mt-2 font-display text-3xl font-bold">{s ? <CountUp value={s.balance} format={inr} /> : '—'}</p><p className="text-sm text-night-muted">Balance available</p></div>
        <div className="panel p-5"><ArrowDownLeft size={20} className="text-lime" /><p className="mt-2 font-display text-3xl font-bold">{s ? <CountUp value={s.inflow} format={inr} /> : '—'}</p><p className="text-sm text-night-muted">Total in</p></div>
        <div className="panel p-5"><ArrowUpRight size={20} className="text-[#7FB2FF]" /><p className="mt-2 font-display text-3xl font-bold">{s ? <CountUp value={s.outflow} format={inr} /> : '—'}</p><p className="text-sm text-night-muted">Paid out (workers, rewards)</p></div>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Where the money comes from</h2>
          <div className="mt-4 space-y-3">
            {s && Object.entries(s.bySource).sort((a, b) => b[1] - a[1]).map(([k, v], i) => {
              const [label, I] = SOURCES[k] || [k, HandCoins];
              return (
                <div key={k}>
                  <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><I size={16} className="text-lime" />{label}</span><span className="num font-semibold">{inr(v)}</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-night-raised"><motion.div className="h-full rounded-full bg-lime" initial={{ width: 0 }} animate={{ width: `${(v / srcMax) * 100}%` }} transition={{ delay: i * 0.06, duration: 0.8 }} /></div>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">EPR partners (brands)</p>
            <div className="mt-2 space-y-2">
              {(d?.epr || []).map((p) => (
                <div key={p.name} className="rounded-xl border border-night-line p-3">
                  <div className="flex justify-between text-sm"><span className="font-medium">{p.name}</span><span className="text-night-muted">{inr(p.funded)} funded</span></div>
                  <p className="text-xs text-night-muted">{p.material} · {p.collectedTonnes} of {p.targetTonnes} t collected this year</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-night-raised"><div className="h-full rounded-full bg-[#4F8FE8]" style={{ width: `${(p.collectedTonnes / p.targetTonnes) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="panel p-5">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Monthly in vs out</h2>
            <div className="flex gap-4 text-xs text-night-muted"><span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES.cleaned }} />In</span><span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES.reported }} />Out</span></div>
          </div>
          <div className="mt-4 h-56">
            {!d ? <Skeleton className="h-full" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={months} margin={{ top: 4, right: 4, left: 6, bottom: 0 }} barGap={2}>
                  <CartesianGrid stroke="#203656" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: '#8EA3BF', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={{ fill: '#8EA3BF', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [inr(v), n]} cursor={{ fill: 'rgba(255,255,255,.04)' }} />
                  <Bar dataKey="in" name="In" fill={SERIES.cleaned} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="out" name="Out" fill={SERIES.reported} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <h3 className="mt-5 text-sm font-semibold">Ledger</h3>
          <div className="mt-2 max-h-72 space-y-1 overflow-y-auto">
            {(d?.ledger || []).map((x) => (
              <div key={x.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-night-raised/50">
                {x.direction === 'in' ? <ArrowDownLeft size={15} className="text-lime" /> : <ArrowUpRight size={15} className="text-[#7FB2FF]" />}
                <span className="flex-1 truncate">{x.note}</span>
                <span className="text-xs text-night-muted">{timeAgo(x.createdAt)}</span>
                <span className={`num w-24 text-right font-medium ${x.direction === 'in' ? 'text-lime' : ''}`}>{x.direction === 'in' ? '+' : '−'}{inr(x.amount)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Sheet open={add} onClose={() => setAdd(false)} title="Record incoming funds" dark>
        <div className="space-y-3">
          <select className="nfield" value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })}>{Object.entries(SOURCES).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select>
          <input className="nfield" placeholder="Amount (₹)" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value.replace(/\D/g, '') })} />
          <input className="nfield" placeholder="Note, e.g. Q4 EPR - Aqua Pura" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
          <button className="nbtn-lime w-full" disabled={busy || !f.amount} onClick={submit}>{busy && <Spinner size={14} />}Add to reward pool</button>
        </div>
      </Sheet>
    </div>
  );
}
