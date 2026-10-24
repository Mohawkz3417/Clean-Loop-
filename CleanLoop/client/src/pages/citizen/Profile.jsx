import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Languages, LogOut, Gavel, ChevronRight, Pencil, Info } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useI18n, LANGUAGES } from '../../lib/i18n.jsx';
import { useToast } from '../../lib/toast.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Avatar, Sheet, Spinner, Icon } from '../../components/ui.jsx';
import { timeAgo, inr } from '../../lib/format.js';

const V_STATUS = {
  under_review: { l: 'Under review', c: 'bg-marigold-soft text-marigold-deep' },
  fine_issued: { l: 'Fine issued', c: 'bg-[#E0EDFF] text-[#1F5FBF]' },
  reward_credited: { l: 'Fine paid · reward credited', c: 'bg-canopy-50 text-canopy-700' },
  rejected: { l: 'Closed', c: 'bg-mist text-ink-faint' },
};

export function EditProfileSheet({ open, onClose }) {
  const { user, setUser } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const [f, setF] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open && user) setF({ name: user.name, phone: user.phone || '', ward: user.ward, upi: user.upi || '' }); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const save = async () => {
    setBusy(true);
    try { const r = await post('/me/profile', f); setUser(r.user); toast('Profile saved'); onClose(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  return (
    <Sheet open={open} onClose={onClose} title="Edit profile">
      <div className="space-y-3">
        <label className="block"><span className="label">Name</span><input className="field" value={f.name || ''} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label className="block"><span className="label">Phone</span><input className="field" value={f.phone || ''} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
        <label className="block"><span className="label">Ward</span><select className="field" value={f.ward} onChange={(e) => setF({ ...f, ward: e.target.value })}>{meta?.wards.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
        <label className="block"><span className="label">UPI ID</span><input className="field" value={f.upi || ''} onChange={(e) => setF({ ...f, upi: e.target.value })} placeholder="name@bank" /></label>
        <button onClick={save} disabled={busy} className="btn-primary w-full">{busy && <Spinner />}Save changes</button>
      </div>
    </Sheet>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const meta = useMeta();
  const { t, lang, setLang } = useI18n();
  const nav = useNavigate();
  const [d, setD] = useState(null);
  const [vio, setVio] = useState([]);
  const [svc, setSvc] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    get('/me/dashboard').then(setD).catch(() => {});
    get('/violations/mine').then((r) => setVio(r.violations)).catch(() => {});
    get('/services/mine').then((r) => setSvc(r.requests)).catch(() => {});
  }, []);

  const trust = user?.trustScore ?? 70;

  return (
    <div>
      <TopBar title={t('profile')} right={<button onClick={() => setEdit(true)} className="rounded-full bg-white p-2.5 shadow-lift" aria-label="Edit profile"><Pencil size={18} /></button>} />
      <div className="space-y-3 px-4">
        <section className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lift">
          <Avatar name={user?.name} size={64} />
          <div className="min-w-0">
            <p className="font-display text-xl font-bold">{user?.name}</p>
            <p className="text-sm text-ink-faint">{d?.level?.name} · {wardName(meta, user?.ward)}</p>
            <p className="text-xs text-ink-faint">{(user?.lifetimePoints || 0).toLocaleString('en-IN')} lifetime points · {(user?.badges || []).length} badges</p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {[[d?.stats?.reports, 'Reports'], [d?.stats?.cleaned, 'Cleaned'], [d?.stats?.violations, 'Dumping cases']].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-white p-3 text-center shadow-lift"><p className="font-display text-2xl font-bold">{v ?? '—'}</p><p className="text-[11px] text-ink-faint">{l}</p></div>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={18} className="text-canopy" />Trust score</p>
            <p className="font-display text-xl font-bold">{trust}<span className="text-sm text-ink-faint">/100</span></p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist"><div className={`h-full rounded-full ${trust >= 60 ? 'bg-leaf' : trust >= 35 ? 'bg-marigold' : 'bg-coral'}`} style={{ width: `${trust}%` }} /></div>
          <p className="mt-2 flex gap-1.5 text-xs text-ink-faint"><Info size={13} className="mt-px shrink-0" />Verified reports raise it. Rejected or fake reports lower it, and below 35 your reports are checked by the ward office first.</p>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><Gavel size={18} className="text-coral" />My dumping reports</p>
          {vio.length === 0 ? <p className="text-sm text-ink-faint">None yet. Spot someone dumping? Report it and earn 20% of the fine.</p> : vio.map((v) => (
            <div key={v.id} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0">
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{v.plate || v.vehicleType}</p><p className="text-xs text-ink-faint">{wardName(meta, v.ward)} · {timeAgo(v.createdAt)}{v.reporterReward ? ` · you got ${inr(v.reporterReward)}` : v.fineAmount ? ` · fine ${inr(v.fineAmount)}` : ''}</p></div>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${V_STATUS[v.status]?.c}`}>{V_STATUS[v.status]?.l}</span>
            </div>
          ))}
        </section>

        {svc.length > 0 && (
          <section className="rounded-3xl bg-white p-4 shadow-lift">
            <p className="mb-2 text-sm font-semibold">My city service requests</p>
            {svc.map((s) => (
              <div key={s.id} className="flex items-center justify-between border-t border-line py-2.5 text-sm first:border-0"><span>{s.title}</span><span className="rounded-full bg-mist px-2.5 py-0.5 text-xs capitalize">{s.status}</span></div>
            ))}
          </section>
        )}

        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><Languages size={18} className="text-canopy" />{t('language')}</p>
          <div className="flex gap-2">{LANGUAGES.map((l) => <button key={l.id} onClick={() => setLang(l.id)} className={`chip flex-1 justify-center ${lang === l.id ? 'border-canopy bg-canopy text-white' : 'border-line'}`}>{l.label}</button>)}</div>
        </section>

        <button onClick={() => nav('/public')} className="flex w-full items-center justify-between rounded-3xl bg-white p-4 text-sm font-semibold shadow-lift">City transparency dashboard<ChevronRight size={18} className="text-ink-faint" /></button>
        <button onClick={() => { logout(); nav('/'); }} className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white p-4 text-sm font-semibold text-coral shadow-lift"><LogOut size={18} />{t('logout')}</button>
      </div>
      <EditProfileSheet open={edit} onClose={() => setEdit(false)} />
    </div>
  );
}
