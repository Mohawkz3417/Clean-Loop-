import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { House, Map as MapIcon, Gift, User, Camera, Briefcase, Route, Wallet, Bell, ChevronLeft } from 'lucide-react';
import { useI18n } from '../lib/i18n.jsx';
import { get } from '../lib/api.js';
import { Logo } from '../components/ui.jsx';
import SosButton from '../components/SosButton.jsx';
import { flushQueue } from '../lib/offlineQueue.js';
import { useToast } from '../lib/toast.jsx';

export function useUnread() {
  const [n, setN] = useState(0);
  const loc = useLocation();
  useEffect(() => {
    let alive = true;
    get('/notifications').then((r) => alive && setN(r.notifications.filter((x) => !x.read).length)).catch(() => {});
    return () => { alive = false; };
  }, [loc.pathname]);
  return n;
}

export function TopBar({ title, back, right, sub, transparent = false }) {
  const nav = useNavigate();
  return (
    <header className={`sticky top-0 z-30 flex items-center gap-2 px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)] ${transparent ? '' : 'bg-mist/85 backdrop-blur-md'}`}>
      {back && (
        <button onClick={() => (typeof back === 'string' ? nav(back) : nav(-1))} className="-ml-1 rounded-full p-2 hover:bg-white" aria-label="Go back"><ChevronLeft size={22} /></button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {sub && <p className="truncate text-xs text-ink-faint">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function BellButton({ to }) {
  const unread = useUnread();
  const nav = useNavigate();
  return (
    <button onClick={() => nav(to)} className="relative rounded-full bg-white p-2.5 shadow-lift" aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}>
      <Bell size={20} />
      {unread > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[11px] font-bold text-white">{unread > 9 ? '9+' : unread}</span>}
    </button>
  );
}

const NAVS = {
  citizen: [
    { to: '/app', icon: House, key: 'home', end: true },
    { to: '/app/map', icon: MapIcon, key: 'map' },
    { to: '/app/report', icon: Camera, key: 'report', fab: true },
    { to: '/app/rewards', icon: Gift, key: 'rewards' },
    { to: '/app/profile', icon: User, key: 'profile' },
  ],
  worker: [
    { to: '/worker', icon: Briefcase, key: 'jobs', end: true },
    { to: '/worker/route', icon: Route, key: 'route' },
    { to: '/worker/earnings', icon: Wallet, key: 'earnings' },
    { to: '/worker/profile', icon: User, key: 'profile' },
  ],
};

export default function MobileShell({ role = 'citizen' }) {
  const { t } = useI18n();
  const loc = useLocation();
  const toast = useToast();
  useEffect(() => {
    if (role !== 'citizen') return undefined;
    const go = () => flushQueue((n) => toast(`Back online - ${n} saved report${n > 1 ? 's were' : ' was'} sent.`));
    go();
    window.addEventListener('online', go);
    return () => window.removeEventListener('online', go);
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps
  const hideNav = /\/report|\/dumping|\/job\//.test(loc.pathname);
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#d6eee2_0%,transparent_60%),radial-gradient(900px_500px_at_110%_10%,#e9f7cf_0%,transparent_55%)] lg:py-6">
      <div className="pointer-events-none fixed left-8 top-8 hidden lg:block"><Logo size={36} /></div>
      <div className="pointer-events-none fixed bottom-8 left-8 hidden max-w-[240px] text-sm text-ink-soft lg:block">
        {role === 'worker' ? 'Worker app preview. On a phone this fills the screen.' : 'Citizen app preview. On a phone this fills the screen and can be installed from the browser menu.'}
      </div>
      <div className="relative mx-auto min-h-screen max-w-[440px] bg-mist lg:h-[calc(100vh-48px)] lg:min-h-0 lg:overflow-hidden lg:rounded-[36px] lg:border lg:border-line lg:shadow-float">
        <div id="app-scroll" className="no-scrollbar lg:h-full lg:overflow-y-auto">
          <main key={loc.pathname} className={`page-enter ${hideNav ? '' : 'pb-28'}`}>
            <Outlet />
          </main>
        </div>
        {role === 'worker' && !hideNav && <SosButton />}
        {!hideNav && (
          <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[440px] px-3 pb-[max(env(safe-area-inset-bottom),10px)] lg:absolute">
            <div className="flex items-end justify-around rounded-[26px] border border-white/70 bg-white/90 px-2 py-2 shadow-float backdrop-blur-xl">
              {NAVS[role].map((n) => n.fab ? (
                <NavLink key={n.to} to={n.to} className="-mt-8 flex flex-col items-center gap-1" aria-label={t(n.key)}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-canopy text-lime shadow-[0_12px_30px_-8px_rgba(14,94,74,.75)] ring-4 ring-mist transition active:scale-95"><n.icon size={26} strokeWidth={2.4} /></span>
                  <span className="text-[11px] font-semibold text-canopy">{t(n.key)}</span>
                </NavLink>
              ) : (
                <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `relative flex w-16 flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-semibold transition ${isActive ? 'text-canopy' : 'text-ink-faint'}`}>
                  {({ isActive }) => (<>
                    {isActive && <motion.span layoutId={`nav-${role}`} className="absolute inset-0 -z-10 rounded-2xl bg-canopy-50" transition={{ type: 'spring', damping: 30, stiffness: 380 }} />}
                    <n.icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                    {t(n.key)}
                  </>)}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
