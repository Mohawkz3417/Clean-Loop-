import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map as MapIcon, ClipboardList, Gavel, HardHat, Users, Timer, Megaphone, Store, Banknote, Truck,
  ScrollText, Settings, LogOut, Siren, Menu, X, Globe,
} from 'lucide-react';
import { useAuth } from '../lib/auth.jsx';
import { get, post } from '../lib/api.js';
import { Logo, Avatar } from '../components/ui.jsx';
import { timeAgo } from '../lib/format.js';
import { useToast } from '../lib/toast.jsx';

const NAV = [
  { group: 'Monitor', items: [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/map', label: 'Live map & hotspots', icon: MapIcon },
    { to: '/admin/sla', label: 'SLA & escalations', icon: Timer, badge: 'overdue' },
  ] },
  { group: 'Operations', items: [
    { to: '/admin/reports', label: 'Reports & jobs', icon: ClipboardList, badge: 'reports' },
    { to: '/admin/violations', label: 'Dumping cases', icon: Gavel, badge: 'violations' },
    { to: '/admin/workers', label: 'Workers', icon: HardHat, badge: 'workerApprovals' },
    { to: '/admin/citizens', label: 'Citizens', icon: Users },
    { to: '/admin/services', label: 'Pickups & services', icon: Truck, badge: 'pickups' },
    { to: '/admin/alerts', label: 'Area alerts', icon: Megaphone },
  ] },
  { group: 'Circular economy', items: [
    { to: '/admin/marketplace', label: 'Recycler marketplace', icon: Store },
    { to: '/admin/funds', label: 'Reward pool & funds', icon: Banknote },
  ] },
  { group: 'Reports', items: [
    { to: '/admin/survekshan', label: 'Survekshan report', icon: ScrollText },
    { to: '/admin/settings', label: 'Settings & AI', icon: Settings },
  ] },
];

export default function AdminShell() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const toast = useToast();
  const [pending, setPending] = useState({});
  const [sos, setSos] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () => get('/admin/overview').then((r) => {
      if (!alive) return;
      setPending({ ...r.pending, reports: r.pending.verifying + r.pending.disputed + r.pending.review, overdue: r.stats.overdue });
      setSos(r.sos);
    }).catch(() => {});
    load();
    const t = setInterval(load, 20000);
    return () => { alive = false; clearInterval(t); };
  }, [loc.pathname]);
  useEffect(() => setOpen(false), [loc.pathname]);

  const resolveSos = async (s) => {
    await post(`/admin/sos/${s.id}/resolve`, { note: 'Control room called the worker' });
    setSos((x) => x.filter((y) => y.id !== s.id));
    toast(`Marked as handled. ${s.name} has been notified.`);
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pb-4 pt-5">
        <Logo size={30} light />
        <button className="rounded-lg p-1.5 hover:bg-night-raised lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
      </div>
      <div className="mx-4 mb-3 rounded-2xl border border-night-line bg-night-raised/60 px-3.5 py-3">
        <p className="text-[11px] text-night-muted">Signed in as</p>
        <p className="text-sm font-semibold">{user?.name}</p>
        <p className="text-xs text-night-muted">Greater Chennai Corporation (demo)</p>
      </div>
      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map((g) => (
          <div key={g.group} className="mb-3">
            <p className="px-3 pb-1.5 pt-2 text-xs font-medium text-night-muted/80">{g.group}</p>
            {g.items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.end}
                className={({ isActive }) => `group relative mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'text-canopy-900' : 'text-night-text/80 hover:bg-night-raised hover:text-night-text'}`}>
                {({ isActive }) => (<>
                  {isActive && <motion.span layoutId="admin-nav" className="absolute inset-0 -z-0 rounded-xl bg-lime" transition={{ type: 'spring', damping: 30, stiffness: 380 }} />}
                  <it.icon size={18} className="relative z-10" />
                  <span className="relative z-10 flex-1">{it.label}</span>
                  {it.badge && pending[it.badge] > 0 && (
                    <span className={`relative z-10 rounded-full px-2 py-0.5 text-[11px] font-bold ${isActive ? 'bg-canopy-900 text-lime' : it.badge === 'overdue' ? 'bg-coral/20 text-coral' : 'bg-marigold/20 text-marigold'}`}>{pending[it.badge]}</span>
                  )}
                </>)}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-night-line p-3">
        <button onClick={() => nav('/public')} className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-night-text/80 hover:bg-night-raised"><Globe size={18} />Public dashboard</button>
        <button onClick={() => { logout(); nav('/'); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-night-text/80 hover:bg-night-raised"><LogOut size={18} />Sign out</button>
      </div>
    </div>
  );

  return (
    <div className="dark-ui min-h-screen bg-night text-night-text">
      <aside className="no-print fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-night-line bg-night-panel lg:block">{sidebar}</aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="absolute inset-y-0 left-0 w-[264px] bg-night-panel">{sidebar}</motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="lg:pl-[264px] print:pl-0">
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-night-line bg-night/85 px-4 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="rounded-lg p-1.5 hover:bg-night-raised" aria-label="Open menu"><Menu size={22} /></button>
          <Logo size={26} light />
        </div>
        <AnimatePresence>
          {sos.map((s) => (
            <motion.div key={s.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-coral/30 bg-coral/15 px-5 py-2.5 text-sm">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white"><span className="absolute inset-0 animate-ping rounded-full bg-coral opacity-50" /><Siren size={16} className="relative" /></span>
                <span className="flex-1"><b>SOS from {s.name}</b> · {s.message || 'Needs help'} · {timeAgo(s.createdAt)}{s.phone ? ` · ${s.phone}` : ''}</span>
                {s.lat && <a className="nbtn" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}>Open location</a>}
                <button onClick={() => resolveSos(s)} className="nbtn-lime">Mark handled</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
          <Outlet context={{ pending }} />
        </main>
      </div>
    </div>
  );
}

export function PageHead({ title, sub, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold sm:text-[28px]">{title}</h1>
        {sub && <p className="mt-1 text-sm text-night-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminAvatar({ name, size = 32 }) {
  return <Avatar name={name} size={size} tone="night" />;
}
