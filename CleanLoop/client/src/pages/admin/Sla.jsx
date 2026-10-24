import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlarmClock, ChevronRight, User, Users, Landmark, Hourglass } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Skeleton, SeverityPill, CATEGORY_LABEL } from '../../components/ui.jsx';
import { timeUntil } from '../../lib/format.js';

const LEVELS = [{ l: 1, t: 'Ward officer', i: User, when: 'Past the deadline' }, { l: 2, t: 'Zonal officer', i: Users, when: '24 h overdue' }, { l: 3, t: 'Commissioner', i: Landmark, when: '48 h overdue' }];

export default function Sla() {
  const meta = useMeta();
  const [d, setD] = useState(null);
  useEffect(() => { get('/admin/sla').then(setD).catch(() => {}); }, []);
  const byLevel = (l) => (d?.breached || []).filter((r) => (r.escalationLevel || 1) === l);
  return (
    <div>
      <PageHead title="SLA & escalations" sub="Every report has a deadline set by its severity. Ignored reports climb the ladder automatically." />
      <div className="grid gap-3 sm:grid-cols-4">
        {d && Object.entries(d.hours).map(([k, h]) => (
          <div key={k} className="panel flex items-center justify-between p-4"><SeverityPill severity={k} /><p className="font-display text-2xl font-bold">{h} h</p></div>
        ))}
      </div>

      <section className="panel mt-4 p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold"><AlarmClock size={18} className="text-coral" />Escalation ladder</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {LEVELS.map((L, k) => (
            <motion.div key={L.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.08 }} className="rounded-2xl border border-night-line bg-night-raised/40 p-4">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${k === 2 ? 'bg-coral/20 text-coral' : k === 1 ? 'bg-[#F27B1F]/20 text-[#F7A65A]' : 'bg-marigold/20 text-marigold'}`}><L.i size={18} /></span>
                <div><p className="font-semibold">Level {L.l} · {L.t}</p><p className="text-xs text-night-muted">{L.when}</p></div>
                <span className="ml-auto font-display text-2xl font-bold">{d ? byLevel(L.l).length : '—'}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {byLevel(L.l).slice(0, 5).map((r) => (
                  <Link key={r.id} to={`/admin/reports?open=${r.id}`} className="flex items-center gap-2 rounded-xl bg-night-panel px-3 py-2 text-sm hover:bg-night-raised">
                    <span className="flex-1 truncate">{CATEGORY_LABEL[r.ai?.category]} · {wardName(meta, r.ward)}</span>
                    <span className="text-xs text-coral">{timeUntil(r.slaDeadline)}</span><ChevronRight size={14} className="text-night-muted" />
                  </Link>
                ))}
                {d && !byLevel(L.l).length && <p className="text-xs text-night-muted">Nothing at this level.</p>}
              </div>
            </motion.div>
          ))}
        </div>
        {d?.dueSoon?.length > 0 && (
          <div className="mt-4 rounded-2xl border border-marigold/30 bg-marigold/5 p-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-marigold"><Hourglass size={15} />{d.dueSoon.length} reports due in the next 6 hours</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{d.dueSoon.map((r) => <Link key={r.id} to={`/admin/reports?open=${r.id}`} className="rounded-full bg-night-raised px-2.5 py-1 text-xs hover:bg-night-line">{wardName(meta, r.ward)} · {timeUntil(r.slaDeadline)}</Link>)}</div>
          </div>
        )}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <section className="panel overflow-x-auto">
          <h2 className="p-5 pb-3 text-lg font-bold">Ward accountability</h2>
          {!d ? <Skeleton className="m-4 h-60" /> : (
            <table className="w-full min-w-[560px] text-sm">
              <thead><tr className="border-y border-night-line text-left text-xs text-night-muted"><th className="px-5 py-2 font-medium">Ward · responsible officer</th><th className="px-3 py-2 font-medium">On-time cleanups</th><th className="px-3 py-2 text-right font-medium">Breached now</th><th className="px-5 py-2 text-right font-medium">Avg time</th></tr></thead>
              <tbody>{d.wards.slice().sort((a, b) => a.slaCompliance - b.slaCompliance).map((w) => (
                <tr key={w.id} className="border-b border-night-line/60 last:border-0">
                  <td className="px-5 py-2.5"><p className="font-medium">{w.name}</p><p className="text-xs text-night-muted">{w.officer}</p></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-night-raised"><div className={`h-full ${w.slaCompliance >= 90 ? 'bg-lime' : w.slaCompliance >= 75 ? 'bg-marigold' : 'bg-coral'}`} style={{ width: `${w.slaCompliance}%` }} /></div><span className="num">{w.slaCompliance}%</span></div></td>
                  <td className={`num px-3 py-2.5 text-right ${w.breachedOpen ? 'font-semibold text-coral' : 'text-night-muted'}`}>{w.breachedOpen}</td>
                  <td className="num px-5 py-2.5 text-right text-night-muted">{w.avgHours != null ? `${w.avgHours} h` : '—'}</td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </section>
        <section className="panel overflow-x-auto">
          <h2 className="p-5 pb-3 text-lg font-bold">Worker turnaround</h2>
          {!d ? <Skeleton className="m-4 h-60" /> : (
            <table className="w-full text-sm">
              <thead><tr className="border-y border-night-line text-left text-xs text-night-muted"><th className="px-5 py-2 font-medium">Worker</th><th className="px-3 py-2 text-right font-medium">Jobs</th><th className="px-3 py-2 text-right font-medium">Claim → clean</th><th className="px-5 py-2 text-right font-medium">On time</th></tr></thead>
              <tbody>{d.workers.slice(0, 10).map((w) => (
                <tr key={w.id} className="border-b border-night-line/60 last:border-0"><td className="px-5 py-2.5">{w.name}</td><td className="num px-3 py-2.5 text-right">{w.jobs}</td><td className="num px-3 py-2.5 text-right text-night-muted">{w.avgHours} h</td><td className="num px-5 py-2.5 text-right">{w.onTime}%</td></tr>
              ))}</tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
