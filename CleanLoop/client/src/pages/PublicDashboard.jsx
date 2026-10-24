import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleMarker, Tooltip as LTooltip } from 'react-leaflet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, Star, ArrowLeft, Timer, Weight, Leaf, Users } from 'lucide-react';
import { get } from '../lib/api.js';
import { useMeta, wardName } from '../lib/meta.jsx';
import { Logo, CountUp, Skeleton, CATEGORY_LABEL } from '../components/ui.jsx';
import { BaseMap, InvalidateOnResize, CHENNAI } from '../components/maps.jsx';
import { BeforeAfter } from '../components/media.jsx';
import { kg, dateShort, inr } from '../lib/format.js';

const LIGHT = { reported: '#2F80ED', cleaned: '#14A06B' };
const scoreColor = (s) => (s >= 85 ? '#14A06B' : s >= 70 ? '#8DBF2E' : s >= 55 ? '#F5A524' : '#F0574A');

export default function PublicDashboard() {
  const meta = useMeta();
  const [d, setD] = useState(null);
  useEffect(() => { get('/public/stats').then(setD).catch(() => {}); }, []);
  const s = d?.stats;
  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-30 border-b border-line bg-mist/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3"><ArrowLeft size={18} className="text-ink-faint" /><Logo size={30} /></Link>
          <span className="hidden items-center gap-2 text-sm text-ink-soft sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-leaf" />Live city transparency dashboard</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">How clean is the city, right now?</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">Every number here comes straight from citizen reports and verified cleanups. Wards are scored on open complaints, missed deadlines and how quickly they resolve them.</p>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { i: Weight, v: s?.kgRemoved, f: kg, l: 'Waste removed' },
            { i: Leaf, v: s?.co2SavedKg, f: kg, l: 'CO₂ avoided' },
            { i: Timer, v: s?.avgResolutionHours, f: (x) => `${x.toFixed(1)} h`, l: 'Average time to clean' },
            { i: Users, v: s?.citizens, f: undefined, l: 'Citizens reporting' },
          ].map((x, k) => (
            <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.06 }} className="card p-5">
              <x.i size={20} className="text-canopy" />
              <p className="mt-3 font-display text-3xl font-bold">{x.v == null ? '—' : <CountUp value={x.v} format={x.f} />}</p>
              <p className="text-sm text-ink-soft">{x.l}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <section className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-3"><h2 className="text-xl font-bold">Ward cleanliness map</h2><div className="flex gap-3 text-xs text-ink-soft">{[['A', 85], ['B', 70], ['C', 55], ['D', 0]].map(([g, v]) => <span key={g} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: scoreColor(v) }} />{g}</span>)}</div></div>
            <div className="h-[420px]">
              {!d ? <Skeleton className="h-full rounded-none" /> : (
                <BaseMap center={CHENNAI} zoom={11} scrollWheelZoom={false}>
                  <InvalidateOnResize />
                  {d.wards.map((w) => (
                    <CircleMarker key={w.id} center={[w.lat, w.lng]} radius={14 + w.reports / 3} pathOptions={{ color: '#fff', weight: 2, fillColor: scoreColor(w.score), fillOpacity: 0.85 }}>
                      <LTooltip direction="top"><b>{w.name}</b> · score {w.score} · grade {w.grade}<br />{w.open} open · {w.resolutionRate}% resolved</LTooltip>
                    </CircleMarker>
                  ))}
                </BaseMap>
              )}
            </div>
          </section>
          <section className="card p-5">
            <h2 className="text-xl font-bold">Ward ranking</h2>
            <div className="mt-4 space-y-2">
              {(d?.wards || []).map((w, i) => (
                <div key={w.id} className="flex items-center gap-3">
                  <span className="num w-5 text-sm font-bold text-ink-faint">{i + 1}</span>
                  <span className="w-28 truncate text-sm font-medium">{w.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist"><motion.div className="h-full rounded-full" style={{ background: scoreColor(w.score) }} initial={{ width: 0 }} whileInView={{ width: `${w.score}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.03 }} /></div>
                  <span className="num w-8 text-right font-display font-bold">{w.score}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="card mt-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-bold">Reported vs cleaned · last 14 days</h2>
            <div className="flex gap-4 text-xs text-ink-soft"><span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: LIGHT.reported }} />Reported</span><span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: LIGHT.cleaned }} />Cleaned</span></div>
          </div>
          <div className="mt-4 h-60">
            {d && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={d.daily} margin={{ top: 4, right: 6, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="#E2ECE7" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={dateShort} tick={{ fill: '#6F8A82', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={20} />
                  <YAxis allowDecimals={false} tick={{ fill: '#6F8A82', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D5E3DC' }} labelFormatter={dateShort} />
                  <Area type="monotone" dataKey="reported" name="Reported" stroke={LIGHT.reported} strokeWidth={2} fill={LIGHT.reported} fillOpacity={0.08} />
                  <Area type="monotone" dataKey="cleaned" name="Cleaned" stroke={LIGHT.cleaned} strokeWidth={2} fill={LIGHT.cleaned} fillOpacity={0.12} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <section className="card p-5">
            <h2 className="text-xl font-bold">Recently cleaned</h2>
            <p className="text-sm text-ink-soft">Drag the handle to compare before and after.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(d?.recent || []).slice(0, 4).map((r) => (
                <div key={r.id}>
                  <BeforeAfter before={r.photo} after={r.afterPhoto} category={r.category} seed={r.id} className="aspect-[4/3]" />
                  <p className="mt-2 text-sm font-semibold">{CATEGORY_LABEL[r.category]} · {wardName(meta, r.ward)}</p>
                  <p className="text-xs text-ink-faint">Cleaned by {r.workerName} in {r.hours} h</p>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-4">
            {d?.spotlight && (
              <div className="relative overflow-hidden rounded-xl3 bg-canopy p-6 text-white shadow-float">
                <Sparkles size={110} className="absolute -right-6 -top-6 text-lime/15" />
                <p className="text-sm font-semibold text-lime">Worker of the month</p>
                <p className="mt-2 font-display text-2xl font-bold">{d.spotlight.name}</p>
                <p className="text-sm text-white/70">{wardName(meta, d.spotlight.ward)} · {d.spotlight.jobsDone} cleanups · <Star size={12} className="inline fill-marigold text-marigold" /> {d.spotlight.rating}</p>
                {d.spotlight.quote && <p className="mt-4 text-lg leading-snug">“{d.spotlight.quote}”</p>}
              </div>
            )}
            <div className="card p-5">
              <p className="text-sm text-ink-soft">Reward pool funded by recycling, brands and fines</p>
              <p className="mt-1 font-display text-3xl font-bold text-canopy">{s ? inr(s.funds.balance) : '—'}</p>
              <p className="mt-3 text-sm text-ink-soft">{s ? `${inr(s.informalEarnings)} earned by ${s.informalWorkers} informal waste pickers` : ''}</p>
            </div>
            <Link to="/register" className="btn-primary">Join and report your street</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
