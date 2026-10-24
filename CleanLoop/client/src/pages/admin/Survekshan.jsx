import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { get } from '../../lib/api.js';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Skeleton, Logo } from '../../components/ui.jsx';
import { inr, kg, dateTime } from '../../lib/format.js';

export default function Survekshan() {
  const [d, setD] = useState(null);
  useEffect(() => { get('/admin/survekshan').then(setD).catch(() => {}); }, []);
  return (
    <div>
      <div className="no-print"><PageHead title="Swachh Survekshan-style report" sub="A ready-to-submit summary of the city's cleanliness performance, generated from live data" actions={<button className="nbtn-lime" onClick={() => window.print()}><Printer size={15} />Print / save as PDF</button>} /></div>
      {!d ? <Skeleton className="h-[600px]" /> : (
        <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-ink shadow-float print:max-w-none print:rounded-none print:p-0 print:shadow-none sm:p-10">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div>
              <Logo size={30} />
              <h2 className="mt-4 text-3xl font-bold">City cleanliness performance report</h2>
              <p className="mt-1 text-ink-soft">{d.city} · {d.period}</p>
            </div>
            <div className="rounded-3xl bg-canopy px-6 py-4 text-center text-white">
              <p className="text-xs text-white/70">Overall score</p>
              <p className="font-display text-5xl font-bold text-lime">{d.overall}</p>
              <p className="text-xs text-white/70">out of 100</p>
            </div>
          </header>

          <section className="mt-6">
            <h3 className="text-lg font-bold">1. Scoring components</h3>
            <table className="mt-3 w-full text-sm">
              <thead><tr className="border-b border-line text-left text-ink-faint"><th className="py-2 font-medium">Component</th><th className="py-2 text-right font-medium">Value</th><th className="py-2 text-right font-medium">Weight</th><th className="py-2 text-right font-medium">Points</th></tr></thead>
              <tbody>{d.components.map((c) => (
                <tr key={c.key} className="border-b border-line/60"><td className="py-2.5">{c.title}</td><td className="num py-2.5 text-right">{c.value}{c.unit}</td><td className="num py-2.5 text-right">{c.weight}%</td><td className="num py-2.5 text-right font-semibold">{Math.round(Math.min(100, c.value) * c.weight / 100)}</td></tr>
              ))}</tbody>
            </table>
          </section>

          <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[['Reports received', d.stats.totalReports], ['Spots cleaned', d.stats.completedReports], ['Waste removed', kg(d.stats.kgRemoved)], ['CO₂ avoided', kg(d.stats.co2SavedKg)], ['Avg. resolution', `${d.stats.avgResolutionHours} h`], ['Within SLA', `${d.stats.slaCompliance}%`], ['Active citizens', d.stats.citizens], ['Fines collected', inr(d.violations.collected)]].map(([l, v]) => (
              <div key={l} className="rounded-2xl bg-mist p-3"><p className="font-display text-xl font-bold">{v}</p><p className="text-xs text-ink-faint">{l}</p></div>
            ))}
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-bold">2. Ward-wise performance</h3>
            <table className="mt-3 w-full text-sm">
              <thead><tr className="border-b border-line text-left text-ink-faint"><th className="py-2 font-medium">Ward</th><th className="py-2 font-medium">Zone</th><th className="py-2 text-right font-medium">Score</th><th className="py-2 text-right font-medium">Grade</th><th className="py-2 text-right font-medium">Reports</th><th className="py-2 text-right font-medium">Resolved</th><th className="py-2 text-right font-medium">Waste</th></tr></thead>
              <tbody>{d.wards.map((w) => (
                <tr key={w.id} className="border-b border-line/60"><td className="py-2">{w.name}</td><td className="py-2 text-ink-soft">{w.zone}</td><td className="num py-2 text-right font-semibold">{w.score}</td><td className="py-2 text-right">{w.grade}</td><td className="num py-2 text-right">{w.reports}</td><td className="num py-2 text-right">{w.resolutionRate}%</td><td className="num py-2 text-right">{kg(w.kg)}</td></tr>
              ))}</tbody>
            </table>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line p-4">
              <h3 className="font-bold">3. Inclusion of informal waste pickers</h3>
              <p className="mt-2 text-sm text-ink-soft">{d.informal.workers} informal-sector waste pickers registered on the platform earned {inr(d.informal.earnings)} through verified cleanup work, with accident insurance and digital payouts.</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <h3 className="font-bold">4. Enforcement against littering</h3>
              <p className="mt-2 text-sm text-ink-soft">{d.violations.total} illegal dumping cases were reported by citizens with photo evidence. {d.violations.fined} resulted in fines, collecting {inr(d.violations.collected)}; reporters received 20% as an incentive.</p>
            </div>
          </section>
          <footer className="mt-8 border-t border-line pt-4 text-xs text-ink-faint">Generated by CleanLoop on {dateTime(d.generatedAt)} from live platform data. Demo dataset - figures are illustrative.</footer>
        </article>
      )}
    </div>
  );
}
