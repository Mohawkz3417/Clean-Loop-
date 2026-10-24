import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, Plus, CheckCircle2 } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { useMeta, wardName } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Sheet, Spinner, Skeleton, Avatar } from '../../components/ui.jsx';
import { celebrate } from '../../lib/confetti.js';
import { kg } from '../../lib/format.js';

const FACES = ['Arun Kumar', 'Meena Iyer', 'Joseph Raj', 'Divya S', 'Farhan Ali', 'Lakshmi N', 'Vikram P', 'Sneha R'];

export default function Drives() {
  const { setUser } = useAuth();
  const meta = useMeta();
  const toast = useToast();
  const { t } = useI18n();
  const [drives, setDrives] = useState(null);
  const [create, setCreate] = useState(false);
  const [f, setF] = useState({ title: '', date: '', place: '', description: '', goalKg: 100 });
  const [busy, setBusy] = useState('');
  const load = () => get('/drives').then((r) => setDrives(r.drives)).catch(() => setDrives([]));
  useEffect(() => { load(); }, []);

  const join = async (d) => {
    setBusy(d.id);
    try { const r = await post(`/drives/${d.id}/join`); setUser(r.user); celebrate(); toast(`You're in! +50 points. See you at ${d.place}.`); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  const submit = async () => {
    setBusy('create');
    try { await post('/drives', f); toast('Drive created. Neighbours in your ward can join now.'); setCreate(false); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };

  const upcoming = (drives || []).filter((d) => d.status !== 'completed');
  const past = (drives || []).filter((d) => d.status === 'completed');

  return (
    <div>
      <TopBar title={t('cleanupDrives')} sub="Clean up together, earn group badges" back="/app" right={<button onClick={() => setCreate(true)} className="btn-primary btn-sm"><Plus size={16} />Create</button>} />
      <div className="space-y-3 px-4">
        {!drives ? [0, 1].map((i) => <Skeleton key={i} className="h-44" />) : upcoming.map((d, i) => {
          const dt = new Date(d.date);
          return (
            <motion.article key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="overflow-hidden rounded-3xl bg-white shadow-lift">
              <div className="flex gap-4 p-4">
                <div className="flex w-14 shrink-0 flex-col items-center rounded-2xl bg-canopy py-2 text-white">
                  <span className="text-[11px] uppercase text-lime">{dt.toLocaleDateString('en-IN', { month: 'short' })}</span>
                  <span className="font-display text-2xl font-bold leading-none">{dt.getDate()}</span>
                  <span className="text-[10px] text-white/70">{dt.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold leading-tight">{d.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-ink-faint"><MapPin size={12} />{d.place}</p>
                  <p className="mt-2 text-sm text-ink-soft">{d.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">{Array.from({ length: Math.min(4, d.count) }).map((_, k) => <Avatar key={k} name={FACES[(k + d.title.length) % FACES.length]} size={26} className="ring-2 ring-white" />)}</div>
                  <span className="text-xs text-ink-soft"><Users size={12} className="mr-0.5 inline" />{d.count} going · goal {kg(d.goalKg)}</span>
                </div>
                {d.joined ? <span className="flex items-center gap-1 text-sm font-semibold text-canopy"><CheckCircle2 size={16} />Joined</span>
                  : <button onClick={() => join(d)} disabled={busy === d.id} className="btn-primary btn-sm">{busy === d.id && <Spinner size={14} />}Join +50</button>}
              </div>
            </motion.article>
          );
        })}
        {past.length > 0 && <p className="pt-2 text-sm font-semibold">Completed drives</p>}
        {past.map((d) => (
          <div key={d.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canopy-50 text-canopy"><CalendarDays size={20} /></span>
            <div className="flex-1"><p className="text-sm font-semibold">{d.title}</p><p className="text-xs text-ink-faint">{wardName(meta, d.ward)} · {d.count} people</p></div>
            <span className="font-display font-bold text-canopy">{kg(d.kgCollected)}</span>
          </div>
        ))}
      </div>
      <Sheet open={create} onClose={() => setCreate(false)} title="Create a cleanup drive">
        <div className="space-y-3">
          <input className="field" placeholder="Title, e.g. Beach morning sweep" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <input className="field" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
            <input className="field" type="number" min="10" placeholder="Goal kg" value={f.goalKg} onChange={(e) => setF({ ...f, goalKg: e.target.value })} />
          </div>
          <input className="field" placeholder="Meeting place" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} />
          <textarea className="field min-h-[80px]" placeholder="What should people bring?" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          <button onClick={submit} disabled={busy === 'create'} className="btn-primary w-full">{busy === 'create' && <Spinner />}Create drive</button>
        </div>
      </Sheet>
    </div>
  );
}
