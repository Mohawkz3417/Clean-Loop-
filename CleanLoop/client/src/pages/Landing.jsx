import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera, ScanLine, UserCheck, Sparkles, ShieldCheck, Gift, Recycle, ArrowUpRight, MapPin, Fingerprint, Layers,
  BadgeCheck, Coins, Smartphone, HardHat, LayoutDashboard, Landmark, Factory, Gavel, Building2, Check, Wifi,
} from 'lucide-react';
import { get } from '../lib/api.js';
import { useAuth, homeFor } from '../lib/auth.jsx';
import { useMeta } from '../lib/meta.jsx';
import { useToast } from '../lib/toast.jsx';
import { Logo, CountUp, CategoryTile, Spinner } from '../components/ui.jsx';
import { inr, kg } from '../lib/format.js';

const STAGES = [
  { key: 'report', label: 'Report', icon: Camera },
  { key: 'classify', label: 'Classify', icon: ScanLine },
  { key: 'assign', label: 'Assign', icon: UserCheck },
  { key: 'clean', label: 'Clean', icon: Sparkles },
  { key: 'verify', label: 'Verify', icon: ShieldCheck },
  { key: 'reward', label: 'Reward', icon: Gift },
  { key: 'recycle', label: 'Recycle', icon: Recycle },
];

function StageCard({ stage }) {
  const body = {
    report: (
      <>
        <p className="text-xs text-ink-faint">Kavya, Adyar · 9:42 AM</p>
        <div className="mt-2 h-20 overflow-hidden rounded-xl bg-[linear-gradient(160deg,#cfd8cf,#a9b3a7)]">
          <div className="flex h-full items-end justify-center gap-1 pb-3">{['#2F80ED', '#262a28', '#EB5757', '#F2C94C', '#262a28', '#56CCF2'].map((c, i) => <span key={i} className="rounded-sm" style={{ background: c, width: 8 + (i % 3) * 5, height: 10 + (i % 2) * 10 }} />)}</div>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-ink-soft"><MapPin size={12} />GPS 13.0049, 80.2551 · ±8 m</p>
      </>
    ),
    classify: (
      <>
        <div className="flex items-center gap-2.5"><CategoryTile category="plastic" size={36} /><div><p className="font-semibold">Plastic</p><p className="text-xs text-ink-faint">92% confident</p></div></div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <span className="rounded-lg bg-mist px-2 py-1.5">Volume: <b>Pile</b></span>
          <span className="rounded-lg bg-[#FFE6CF] px-2 py-1.5 text-[#B65A00]">Severity: <b>High</b></span>
          <span className="rounded-lg bg-mist px-2 py-1.5">Recyclable: <b>80%</b></span>
          <span className="rounded-lg bg-mist px-2 py-1.5">Hazard: <b>None</b></span>
        </div>
      </>
    ),
    assign: (
      <>
        <p className="text-xs text-ink-faint">Job sent to 6 workers nearby</p>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-mist px-3 py-2.5">
          <div><p className="font-semibold">Murugan S.</p><p className="text-xs text-ink-faint">600 m away · 4.9 ★</p></div>
          <span className="rounded-full bg-canopy px-2.5 py-1 text-xs font-bold text-lime">₹150</span>
        </div>
        <p className="mt-2 text-xs text-ink-soft">Claimed in 3 min · deadline 24 h</p>
      </>
    ),
    clean: (
      <ul className="space-y-1.5 text-sm">
        {['Checked in at the spot (12 m)', 'Gloves and mask on', 'Before photo taken', 'Waste bagged and segregated'].map((t) => (
          <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-canopy text-white"><Check size={12} /></span>{t}</li>
        ))}
      </ul>
    ),
    verify: (
      <>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-lg bg-[linear-gradient(160deg,#cfd8cf,#9aa596)]"><div className="flex h-full items-end justify-center gap-0.5 pb-2">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-3 w-2 rounded-sm bg-[#262a28]" />)}</div></div>
          <div className="h-16 rounded-lg bg-[linear-gradient(160deg,#cfd8cf,#9aa596)]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs"><span>Same place</span><b className="text-canopy">0.88 match</b></div>
        <div className="mt-1 flex items-center justify-between text-xs"><span>Waste remaining</span><b className="text-canopy">4%</b></div>
      </>
    ),
    reward: (
      <div className="text-center">
        <p className="font-display text-4xl font-bold text-canopy">+45</p>
        <p className="text-sm text-ink-soft">points to Kavya</p>
        <p className="mt-2 rounded-full bg-lime-soft px-3 py-1 text-xs font-semibold text-lime-deep">₹150 released to Murugan</p>
      </div>
    ),
    recycle: (
      <>
        <p className="text-xs text-ink-faint">Recycler marketplace</p>
        <p className="mt-1 font-semibold">620 kg PET sold to Kaveri Polymers</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist"><motion.div className="h-full bg-leaf" initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1 }} /></div>
        <p className="mt-2 text-xs text-ink-soft">₹8,370 added to the citizen reward pool</p>
      </>
    ),
  }[stage.key];
  return (
    <motion.div key={stage.key} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-[210px] rounded-3xl bg-white p-4 text-left shadow-float sm:w-[230px]">
      <p className="mb-2 flex items-center gap-1.5 font-display text-sm font-bold text-canopy"><stage.icon size={16} />{stage.label}</p>
      {body}
    </motion.div>
  );
}

function LoopVisual() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % STAGES.length), 2300);
    return () => clearInterval(t);
  }, []);
  const R = 46;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B6F04A" /><stop offset="1" stopColor="#14A06B" /></linearGradient>
        </defs>
        <circle cx="50" cy="50" r={R} fill="none" stroke="#0E5E4A" strokeOpacity=".12" strokeWidth="0.8" />
        <motion.circle cx="50" cy="50" r={R} fill="none" stroke="url(#ring)" strokeWidth="1.4" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * R} animate={{ strokeDashoffset: 2 * Math.PI * R * (1 - (i + 1) / STAGES.length) }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 50 50)" />
      </svg>
      {STAGES.map((s, k) => {
        const a = (k / STAGES.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(a) * R;
        const y = 50 + Math.sin(a) * R;
        const active = k === i;
        const done = k < i;
        return (
          <button key={s.key} onClick={() => setI(k)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }} aria-label={s.label}>
            <motion.span animate={{ scale: active ? 1.18 : 1 }} className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors sm:h-12 sm:w-12 ${active ? 'border-lime bg-canopy text-lime shadow-glow' : done ? 'border-leaf bg-white text-leaf' : 'border-canopy-100 bg-white text-canopy-300'}`}>
              <s.icon size={20} />
            </motion.span>
            <span className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-xs font-semibold ${active ? 'text-canopy' : 'text-ink-faint'}`}>{s.label}</span>
          </button>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait"><StageCard stage={STAGES[i]} key={i} /></AnimatePresence>
      </div>
    </div>
  );
}

export default function Landing() {
  const { user, demoLogin } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const nav = useNavigate();
  const [stats, setStats] = useState(null);
  const [busy, setBusy] = useState('');

  useEffect(() => { get('/public/stats').then(setStats).catch(() => {}); }, []);

  const tryRole = async (role) => {
    setBusy(role);
    try {
      if (user && user.role === role) return nav(homeFor(role));
      const u = await demoLogin(role);
      nav(homeFor(u.role));
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };

  const s = stats?.stats;
  const funds = s?.funds?.bySource || {};
  const fundRows = [
    { key: 'govt', label: 'City and state grants', icon: Landmark, value: funds.govt || 0 },
    { key: 'epr', label: 'Brands paying for their packaging (EPR) and CSR', icon: Building2, value: (funds.epr || 0) + (funds.csr || 0) },
    { key: 'recycling', label: 'Selling sorted waste to recyclers', icon: Factory, value: funds.recycling || 0 },
    { key: 'fines', label: 'Fines from illegal dumping', icon: Gavel, value: funds.fines || 0 },
  ];
  const fundMax = Math.max(1, ...fundRows.map((f) => f.value));

  return (
    <div className="min-h-screen overflow-x-hidden bg-mist">
      {/* nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo size={34} />
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          <a href="#how" className="hover:text-ink">How it works</a>
          <a href="#roles" className="hover:text-ink">Citizens, workers, cities</a>
          <a href="#money" className="hover:text-ink">Funding</a>
          <Link to="/public" className="hover:text-ink">Live city dashboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? <Link to={homeFor(user.role)} className="btn-primary btn-sm">Open my app</Link> : (<>
            <Link to="/login" className="btn-ghost btn-sm hidden sm:inline-flex">Sign in</Link>
            <Link to="/register" className="btn-primary btn-sm">Join CleanLoop</Link>
          </>)}
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-10">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-[44px] font-extrabold leading-[0.98] sm:text-6xl lg:text-[76px]" style={{ fontVariationSettings: "'wdth' 80" }}>
            Snap the garbage.<br />The city closes the loop.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="mt-6 max-w-xl text-lg text-ink-soft">
            One photo is all it takes. AI identifies the waste and how urgent it is, a nearby worker picks it up like a ride request, the cleanup is checked with before-and-after photos, and everyone who helped gets rewarded from recycling money.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => tryRole('citizen')} className="btn-primary px-6 py-3.5 text-base">{busy === 'citizen' ? <Spinner /> : <Camera size={19} />}Report garbage now</button>
            <Link to="/public" className="btn-ghost px-6 py-3.5 text-base">See the live city dashboard<ArrowUpRight size={18} /></Link>
          </motion.div>

          {(meta?.demoMode ?? true) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-10 max-w-xl rounded-3xl border border-line bg-white/70 p-4 backdrop-blur">
              <p className="px-1 text-sm font-semibold">Explore every side of the app, no signup needed</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  { role: 'citizen', label: 'Citizen app', sub: 'Report & earn', icon: Smartphone },
                  { role: 'worker', label: 'Worker app', sub: 'Claim & clean', icon: HardHat },
                  { role: 'admin', label: 'City dashboard', sub: 'Manage & enforce', icon: LayoutDashboard },
                ].map((r) => (
                  <button key={r.role} onClick={() => tryRole(r.role)} className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-3 text-left transition hover:border-canopy-300 hover:shadow-lift">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canopy-50 text-canopy transition group-hover:bg-canopy group-hover:text-lime">{busy === r.role ? <Spinner /> : <r.icon size={20} />}</span>
                    <span><span className="block text-sm font-semibold">{r.label}</span><span className="block text-xs text-ink-faint">{r.sub}</span></span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <motion.div id="how" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="px-4">
          <LoopVisual />
        </motion.div>
      </section>

      {/* live stats band */}
      <section className="bg-canopy-800 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            { v: s?.kgRemoved, f: (x) => kg(x), l: 'of waste removed from streets in the demo city' },
            { v: s?.co2SavedKg, f: (x) => kg(x), l: 'of CO₂ emissions avoided through recycling and composting' },
            { v: s?.avgResolutionHours, f: (x) => `${x.toFixed(1)} h`, l: 'average time from photo to clean street' },
            { v: s?.informalEarnings, f: (x) => inr(x), l: `earned by ${s?.informalWorkers ?? '…'} informal-sector waste pickers on the platform` },
          ].map((x, k) => (
            <div key={k}>
              <p className="font-display text-4xl font-bold text-lime sm:text-5xl">{x.v == null ? '—' : <CountUp value={x.v} format={x.f} />}</p>
              <p className="mt-2 max-w-[260px] text-sm text-white/70">{x.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* roles */}
      <section id="roles" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">Three apps that talk to each other</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">Citizens see, workers act, the city coordinates. Every action in one app updates the other two instantly.</p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[
            { role: 'citizen', title: 'For citizens', icon: Smartphone, tone: 'bg-white', points: ['Report garbage or illegal dumping with one photo', 'Earn points, badges and cash from fines you help issue', 'Book doorstep recycling pickups and join cleanup drives', 'Learn which bin anything goes in with the AI scanner'] },
            { role: 'worker', title: 'For workers', icon: HardHat, tone: 'bg-canopy text-white', points: ['Nearby cleanup jobs with the pay shown upfront', 'Optimised routes that batch jobs together', 'Instant, transparent payouts and citizen tips', 'SOS button, safety checklists and accident cover'] },
            { role: 'admin', title: 'For the city', icon: LayoutDashboard, tone: 'bg-white', points: ['Live heatmap with predicted dumping hotspots', 'SLA timers that escalate ignored complaints', 'Review dumping evidence and issue fines', 'Sell sorted waste to recyclers and track every rupee'] },
          ].map((r) => (
            <div key={r.role} className={`flex flex-col rounded-[28px] border border-line p-7 shadow-lift ${r.tone}`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${r.role === 'worker' ? 'bg-lime text-canopy-900' : 'bg-canopy-50 text-canopy'}`}><r.icon size={24} /></span>
              <h3 className="mt-5 text-2xl font-bold">{r.title}</h3>
              <ul className={`mt-4 flex-1 space-y-3 text-[15px] ${r.role === 'worker' ? 'text-white/85' : 'text-ink-soft'}`}>
                {r.points.map((p) => <li key={p} className="flex gap-2.5"><Check size={18} className={`mt-0.5 shrink-0 ${r.role === 'worker' ? 'text-lime' : 'text-leaf'}`} />{p}</li>)}
              </ul>
              <button onClick={() => tryRole(r.role)} className={`mt-7 ${r.role === 'worker' ? 'btn-lime' : 'btn-primary'}`}>{busy === r.role ? <Spinner /> : null}Open the {r.role === 'admin' ? 'dashboard' : `${r.role} app`}</button>
            </div>
          ))}
        </div>
      </section>

      {/* anti-fraud */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-bold sm:text-5xl">Rewards that can't be gamed</h2>
            <p className="mt-4 text-lg text-ink-soft">Paying people to report garbage only works if fake reports earn nothing. CleanLoop checks every step before a single point or rupee moves.</p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-mist p-4">
              <Wifi size={22} className="shrink-0 text-canopy" />
              <p className="text-sm text-ink-soft">The waste AI runs on the phone itself, so it works offline. Connect Gemini for richer analysis whenever you want.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Camera, t: 'Camera-only photos', d: 'Photos are taken inside the app with GPS and time stamped at capture. No gallery uploads, no internet images.' },
              { icon: Layers, t: 'Duplicates become confirmations', d: 'A matching photo within 35 m is merged into the first report as a confirmation, which raises its priority.' },
              { icon: Fingerprint, t: 'Before and after, same spot', d: 'Workers must check in within 60 m. AI compares both photos to confirm it is the same place and the waste is gone.' },
              { icon: BadgeCheck, t: 'Paid only after verification', d: 'Points and payouts are released only when the cleanup is verified. Repeated fake reports lower a hidden trust score.' },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-line p-6">
                <x.icon size={26} className="text-canopy" />
                <h3 className="mt-4 text-lg font-bold">{x.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* money */}
      <section id="money" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold sm:text-5xl">Where the reward money comes from</h2>
            <p className="mt-4 text-lg text-ink-soft">Rewards are funded by the waste economy itself. Brands that sell plastic packaging are legally required to pay for its collection, recyclers pay for sorted material, and polluters pay fines.</p>
            <div className="mt-8 rounded-3xl bg-canopy p-6 text-white">
              <p className="text-sm text-white/70">Reward pool balance in the demo city</p>
              <p className="mt-1 font-display text-5xl font-bold text-lime">{s ? <CountUp value={s.funds.balance} format={inr} /> : '—'}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/70"><Coins size={16} />10 points = ₹1 · redeem for bus passes, tax rebates and more</p>
            </div>
          </div>
          <div className="space-y-4 self-center">
            {fundRows.map((f, k) => (
              <div key={f.key} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 font-semibold"><f.icon size={20} className="text-canopy" />{f.label}</span>
                  <span className="num font-display text-lg font-bold">{inr(f.value)}</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-mist">
                  <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#14A06B,#B6F04A)]" initial={{ width: 0 }} whileInView={{ width: `${(f.value / fundMax) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: k * 0.1, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <Logo size={28} />
            <p className="mt-2 max-w-md text-sm text-ink-faint">An AI-powered waste reporting, gig cleanup and recycling-rewards platform. Demo data shows Chennai wards.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/public" className="btn-ghost btn-sm">Public dashboard</Link>
            <Link to="/register" className="btn-primary btn-sm">Create an account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
