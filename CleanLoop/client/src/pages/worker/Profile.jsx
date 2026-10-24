import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, HardHat, Truck, Languages, LogOut, Sparkles, Lock, Pencil, HeartPulse, CalendarDays } from 'lucide-react';
import { get } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useI18n, LANGUAGES } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Avatar, Icon } from '../../components/ui.jsx';
import { EditProfileSheet } from '../citizen/Profile.jsx';
import { timeAgo } from '../../lib/format.js';

const TYPE = { gig: 'Gig worker', informal: 'Waste picker (informal sector)', salaried: 'Municipal staff' };

export default function WorkerProfile() {
  const { user, logout } = useAuth();
  const meta = useMeta();
  const { t, lang, setLang } = useI18n();
  const nav = useNavigate();
  const [hist, setHist] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => { get('/jobs/history').then((r) => setHist(r.jobs)).catch(() => {}); }, []);
  const mine = new Map((user?.badges || []).map((b) => [b.key, b]));
  const badges = meta ? Object.entries(meta.badges).filter(([, b]) => b.role === 'worker') : [];
  return (
    <div>
      <TopBar title={t('profile')} right={<button onClick={() => setEdit(true)} className="rounded-full bg-white p-2.5 shadow-lift" aria-label="Edit profile"><Pencil size={18} /></button>} />
      <div className="space-y-3 px-4">
        {user?.spotlight && (
          <motion.section initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0E5E4A,#14A06B)] p-4 text-white">
            <Sparkles size={80} className="absolute -right-3 -top-3 text-lime/20" />
            <p className="text-sm font-semibold text-lime">Worker of the month</p>
            <p className="mt-1 font-display text-lg font-bold">“{user.quote || 'Proud to keep my city clean.'}”</p>
            <p className="mt-1 text-xs text-white/70">Featured on the public city dashboard</p>
          </motion.section>
        )}
        <section className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lift">
          <Avatar name={user?.name} size={64} />
          <div className="min-w-0">
            <p className="font-display text-xl font-bold">{user?.name}</p>
            <p className="text-sm text-ink-faint">{TYPE[user?.workerType]} · {wardName(meta, user?.ward)}</p>
            <p className="mt-1 flex items-center gap-1 text-sm"><Star size={14} className="fill-marigold text-marigold" /><b>{user?.rating?.toFixed?.(2)}</b><span className="text-ink-faint">({user?.ratingCount} ratings) · {user?.tier}</span></p>
          </div>
        </section>
        <section className="grid grid-cols-3 gap-2 text-center">
          {[
            { i: ShieldCheck, l: 'Verified ID', on: user?.approved !== false },
            { i: HardHat, l: 'Hazard certified', on: user?.hazardCertified },
            { i: Truck, l: 'Has vehicle', on: user?.hasVehicle },
          ].map((c) => (
            <div key={c.l} className={`rounded-2xl p-3 ${c.on ? 'bg-canopy-50 text-canopy' : 'bg-white text-ink-faint'} shadow-lift`}><c.i size={20} className="mx-auto" /><p className="mt-1 text-[11px] font-semibold">{c.l}</p></div>
          ))}
        </section>
        <section className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-lift">
          <HeartPulse size={22} className="shrink-0 text-coral" />
          <div><p className="text-sm font-semibold">Accident insurance active</p><p className="text-xs text-ink-faint">On-duty accidents are covered up to ₹2,00,000. Hold the red SOS button for 1.5 s in an emergency.</p></div>
        </section>
        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-3 text-sm font-semibold">Badges</p>
          <div className="grid grid-cols-5 gap-2">
            {badges.map(([k, b]) => (
              <div key={k} className="flex flex-col items-center text-center" title={b.desc}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${mine.has(k) ? 'bg-canopy text-lime shadow-glow' : 'bg-mist text-ink-faint'}`}>{mine.has(k) ? <Icon name={b.icon} size={20} /> : <Lock size={16} />}</span>
                <p className="mt-1 text-[10px] font-semibold leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={16} />Recent cleanups</p>
          {hist.slice(0, 6).map((j) => (
            <div key={j.id} className="flex items-center justify-between border-t border-line py-2 text-sm first:border-0">
              <span>{meta?.categories?.[j.ai?.category]?.label} · {wardName(meta, j.ward)}</span>
              <span className="text-xs text-ink-faint">{timeAgo(j.completedAt)}{j.citizenConfirmation?.stars ? ` · ${j.citizenConfirmation.stars}★` : ''}</span>
            </div>
          ))}
          {!hist.length && <p className="text-sm text-ink-faint">Completed jobs appear here.</p>}
        </section>
        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><Languages size={18} className="text-canopy" />{t('language')}</p>
          <div className="flex gap-2">{LANGUAGES.map((l) => <button key={l.id} onClick={() => setLang(l.id)} className={`chip flex-1 justify-center ${lang === l.id ? 'border-canopy bg-canopy text-white' : 'border-line'}`}>{l.label}</button>)}</div>
        </section>
        <button onClick={() => { logout(); nav('/'); }} className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white p-4 text-sm font-semibold text-coral shadow-lift"><LogOut size={18} />{t('logout')}</button>
      </div>
      <EditProfileSheet open={edit} onClose={() => setEdit(false)} />
    </div>
  );
}
