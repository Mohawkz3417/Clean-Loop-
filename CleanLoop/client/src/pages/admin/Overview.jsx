import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ClipboardList, CheckCircle2, Timer, AlarmClock, HardHat, Weight, Leaf, Banknote, ArrowRight, Cpu, Cloud,
  Camera, Sparkles, Siren, Gavel, Megaphone, Store, UserPlus, TrendingUp, ShieldAlert, Truck, CalendarDays,
} from 'lucide-react';
import { get } from '../../lib/api.js';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { CountUp, Skeleton, CATEGORY_LABEL, CATEGORY_COLOR, Icon, CATEGORY_ICON } from '../../components/ui.jsx';
import { inr, kg, timeAgo, dateShort } from '../../lib/format.js';

const ACT_ICON = { report: Camera, cleaned: Sparkles, sos: Siren, violation: Gavel, fine: Gavel, alert: Megaphone, market: Store, signup: UserPlus, escalation: AlarmClock, claim: HardHat, assign: HardHat, dispute: ShieldAlert, verify: ShieldAlert, pickup: Truck, drive: CalendarDays, approve: CheckCircle2, reject: ShieldAlert, spotlight: Sparkles, service: ClipboardList };
export const SERIES = { reported: '#4F8FE8', cleaned: '#4FA82E' };
export const tooltipStyle = { background: '#14263F', border: '1px solid #203656', borderRadius: 12, color: '#E6EEF8', fontSize: 12 };

export function Kpi({ icon: I, label, value, format, sub, tone = 'lime', delay = 0, to }) {
  const tones = { lime: 'text-lime bg-lime/10', coral: 'text-coral bg-coral/10', marigold: 'text-marigold bg-marigold/10', blue: 'text-[#7FB2FF] bg-[#4F8FE8]/15' };
  const body = (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} className="panel h-full p-4 transition hover:border-night-muted/40">
      <div className="flex items-center justify-between"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}><I size={18} /></span>{to && <ArrowRight size={16} className="text-night-muted" />}</div>
      <p className="mt-3 font-display text-[28px] font-bold leading-none text-night-text">{value == null ? '—' : <CountUp value={value} format={format} />}</p>
      <p className="mt-1.5 text-sm text-night-muted">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-night-muted/70">{sub}</p>}
    </motion.div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

export default function Overview() {
  const [d, setD] = useState(null);
  useEffect(() => {
    const load = () => get('/admin/overview').then(setD).catch(() => {});
    load();
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
  }, []);
  const s = d?.stats;
  const cats = d ? Object.entries(d.byCategory).sort((a, b) => b[1] - a[1]) : [];
  const catMax = Math.max(1, ...cats.map((c) => c[1]));
  const sev = d?.bySeverity || {};
  const pend = d?.pending;

  return (
    <div>
      <PageHead title="City overview" sub={`Live from ${s?.totalReports ?? '…'} reports across ${d?.wards?.length ?? 12} wards · refreshes every 20 s`}
        actions={<><Link to="/admin/map" className="nbtn">Open live map</Link><Link to="/admin/survekshan" className="nbtn-lime">Generate city report</Link></>} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi icon={ClipboardList} label="Open reports" value={s?.openReports} sub={`${s?.overdue ?? 0} past deadline`} tone="marigold" to="/admin/reports" />
        <Kpi icon={CheckCircle2} label="Cleaned today" value={s?.resolvedToday} sub={`${s?.completedReports ?? 0} cleaned in total`} delay={0.05} />
        <Kpi icon={Timer} label="Avg. photo to clean" value={s?.avgResolutionHours} format={(v) => `${v.toFixed(1)} h`} sub={`${s?.slaCompliance ?? 0}% within SLA`} tone="blue" delay={0.1} to="/admin/sla" />
        <Kpi icon={HardHat} label="Workers online" value={s?.activeWorkers} sub={`${s?.workers ?? 0} registered · ${s?.informalWorkers ?? 0} informal`} delay={0.15} to="/admin/workers" />
        <Kpi icon={Weight} label="Waste removed" value={s?.kgRemoved} format={kg} delay={0.2} />
        <Kpi icon={Leaf} label="CO₂ avoided" value={s?.co2SavedKg} format={kg} sub={`≈ ${s?.treesEquivalent ?? 0} trees for a year`} delay={0.25} />
        <Kpi icon={Banknote} label="Reward pool" value={s?.funds?.balance} format={inr} sub="Govt + EPR + recycling + fines" delay={0.3} to="/admin/funds" />
        <Kpi icon={Gavel} label="Fines collected" value={s?.finesCollected} format={inr} sub={`${s?.violations ?? 0} dumping cases`} tone="coral" delay={0.35} to="/admin/violations" />
      </div>

      {pend && (pend.verifying + pend.disputed + pend.review + pend.violations + pend.workerApprovals) > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            [pend.verifying, 'cleanups need a manual check', '/admin/reports?status=verifying'],
            [pend.disputed, 'disputed cleanups', '/admin/reports?status=disputed'],
            [pend.review, 'reports from low-trust accounts', '/admin/reports?status=review'],
            [pend.violations, 'dumping cases to review', '/admin/violations'],
            [pend.workerApprovals, 'workers waiting for approval', '/admin/workers'],
            [pend.pickups, 'doorstep pickups scheduled', '/admin/services'],
          ].filter(([n]) => n > 0).map(([n, l, to]) => (
            <Link key={l} to={to} className="inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-marigold/10 px-3.5 py-1.5 text-sm text-marigold hover:bg-marigold/20"><b>{n}</b>{l}<ArrowRight size={14} /></Link>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <section className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Reported vs cleaned · last 14 days</h2>
            <div className="flex gap-4 text-xs text-night-muted">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES.reported }} />Reported</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES.cleaned }} />Cleaned</span>
            </div>
          </div>
          <div className="mt-4 h-64">
            {!d ? <Skeleton className="h-full" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={d.daily} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={SERIES.reported} stopOpacity={0.35} /><stop offset="1" stopColor={SERIES.reported} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={SERIES.cleaned} stopOpacity={0.35} /><stop offset="1" stopColor={SERIES.cleaned} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="#203656" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={dateShort} tick={{ fill: '#8EA3BF', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={20} />
                  <YAxis allowDecimals={false} tick={{ fill: '#8EA3BF', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelFormatter={dateShort} cursor={{ stroke: '#8EA3BF', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="reported" name="Reported" stroke={SERIES.reported} strokeWidth={2} fill="url(#gr)" />
                  <Area type="monotone" dataKey="cleaned" name="Cleaned" stroke={SERIES.cleaned} strokeWidth={2} fill="url(#gc)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="text-lg font-bold">What people report</h2>
          <div className="mt-4 space-y-2.5">
            {!d ? <Skeleton className="h-56" /> : cats.map(([c, n], i) => (
              <div key={c} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${CATEGORY_COLOR[c]}26`, color: CATEGORY_COLOR[c] }}><Icon name={CATEGORY_ICON[c]} size={15} /></span>
                <span className="w-36 truncate text-sm">{CATEGORY_LABEL[c]}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-night-raised"><motion.div className="h-full rounded-full" style={{ background: CATEGORY_COLOR[c] }} initial={{ width: 0 }} animate={{ width: `${(n / catMax) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.8 }} /></div>
                <span className="num w-9 text-right text-sm text-night-muted">{n}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2 border-t border-night-line pt-4 text-center">
            {[['critical', 'Critical', 'text-coral'], ['high', 'High', 'text-[#F7A65A]'], ['medium', 'Medium', 'text-marigold'], ['low', 'Low', 'text-lime']].map(([k, l, c]) => (
              <div key={k}><p className={`font-display text-2xl font-bold ${c}`}>{sev[k] || 0}</p><p className="text-[11px] text-night-muted">{l} open</p></div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <section className="panel overflow-hidden">
          <div className="flex items-center justify-between p-5 pb-3"><h2 className="text-lg font-bold">Ward cleanliness league</h2><Link to="/admin/sla" className="text-sm text-lime hover:underline">SLA by ward</Link></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-y border-night-line text-left text-xs text-night-muted"><th className="px-5 py-2 font-medium">Ward</th><th className="px-3 py-2 font-medium">Score</th><th className="px-3 py-2 text-right font-medium">Open</th><th className="px-3 py-2 text-right font-medium">Overdue</th><th className="px-3 py-2 text-right font-medium">Resolved</th><th className="px-5 py-2 text-right font-medium">Avg time</th></tr></thead>
              <tbody>
                {(d?.wards || []).map((w) => (
                  <tr key={w.id} className="border-b border-night-line/60 last:border-0 hover:bg-night-raised/40">
                    <td className="px-5 py-2.5"><p className="font-medium">{w.name}</p><p className="text-xs text-night-muted">{w.zone}</p></td>
                    <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-night-raised"><div className={`h-full rounded-full ${w.score >= 80 ? 'bg-lime' : w.score >= 60 ? 'bg-marigold' : 'bg-coral'}`} style={{ width: `${w.score}%` }} /></div><span className="num font-semibold">{w.score}</span></div></td>
                    <td className="num px-3 py-2.5 text-right">{w.open}</td>
                    <td className={`num px-3 py-2.5 text-right ${w.overdue ? 'font-semibold text-coral' : 'text-night-muted'}`}>{w.overdue}</td>
                    <td className="num px-3 py-2.5 text-right">{w.resolutionRate}%</td>
                    <td className="num px-5 py-2.5 text-right text-night-muted">{w.avgHours != null ? `${w.avgHours} h` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Live activity</h2><span className="flex items-center gap-1.5 text-xs text-lime"><span className="h-2 w-2 animate-pulse rounded-full bg-lime" />Live</span></div>
          <ul className="mt-3 max-h-[440px] space-y-1 overflow-y-auto pr-1">
            {(d?.activity || []).map((a, i) => {
              const I = ACT_ICON[a.type] || TrendingUp;
              return (
                <motion.li key={a.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-night-raised/50">
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.type === 'sos' || a.type === 'escalation' ? 'bg-coral/15 text-coral' : a.type === 'cleaned' ? 'bg-lime/10 text-lime' : 'bg-night-raised text-night-muted'}`}><I size={15} /></span>
                  <div className="min-w-0"><p className="text-sm">{a.text}</p><p className="text-xs text-night-muted">{timeAgo(a.createdAt)}</p></div>
                </motion.li>
              );
            })}
          </ul>
          {d && (
            <div className="mt-3 flex items-center gap-2 border-t border-night-line pt-3 text-xs text-night-muted">
              {d.ai.cloud.length ? <Cloud size={14} className="text-lime" /> : <Cpu size={14} className="text-lime" />}
              AI: on-device model{d.ai.cloud.length ? ` + Gemini (${d.ai.gemini.model})` : ' (add a Gemini key for cloud analysis)'}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
