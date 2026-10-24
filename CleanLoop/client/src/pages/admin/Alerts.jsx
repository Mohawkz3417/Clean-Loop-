import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Send, Lightbulb, CheckCircle2 } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Skeleton, Spinner, SeverityPill } from '../../components/ui.jsx';
import { timeAgo } from '../../lib/format.js';

export default function Alerts() {
  const meta = useMeta();
  const toast = useToast();
  const [d, setD] = useState(null);
  const [f, setF] = useState({ ward: '', severity: 'high', message: '' });
  const [busy, setBusy] = useState('');
  const load = () => get('/admin/alerts').then(setD).catch(() => {});
  useEffect(() => { load(); }, []);
  const send = async (body, key) => {
    setBusy(key);
    try { const r = await post('/admin/alerts', body); toast(`Alert sent to the corporation about ${r.alert.wardName}${r.alert.simulated ? ' (simulated delivery)' : ''}`); setF({ ward: '', severity: 'high', message: '' }); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(''); }
  };
  return (
    <div>
      <PageHead title="Area alerts" sub="Tell the corporation which areas are facing a cleanliness problem, with the numbers to back it up" />
      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <section className="panel p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Lightbulb size={18} className="text-marigold" />Suggested alerts</h2>
            <p className="mt-1 text-sm text-night-muted">Generated from ward scores, open reports and missed deadlines.</p>
            <div className="mt-4 space-y-3">
              {!d ? <Skeleton className="h-40" /> : d.suggestions.length === 0 ? <p className="text-sm text-night-muted">All wards are healthy right now.</p> : d.suggestions.map((s, i) => (
                <motion.div key={s.ward} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-night-line bg-night-raised/50 p-4">
                  <div className="flex flex-wrap items-center gap-2"><p className="font-semibold">{s.wardName}</p><SeverityPill severity={s.severity} /><span className="ml-auto text-xs text-night-muted">score {s.score} · {s.overdue} overdue</span></div>
                  <p className="mt-2 text-sm text-night-text/85">{s.message}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="nbtn-lime" disabled={busy === s.ward} onClick={() => send({ ward: s.ward, severity: s.severity, message: s.message }, s.ward)}>{busy === s.ward ? <Spinner size={14} /> : <Send size={14} />}Send to corporation</button>
                    <button className="nbtn" onClick={() => setF({ ward: s.ward, severity: s.severity, message: s.message })}>Edit first</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="panel p-5">
            <h2 className="text-lg font-bold">Sent alerts</h2>
            <div className="mt-3 space-y-2">
              {(d?.alerts || []).map((a) => (
                <div key={a.id} className="flex gap-3 rounded-xl border border-night-line p-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime" />
                  <div className="min-w-0"><p className="text-sm font-semibold">{a.wardName} <span className="font-normal text-night-muted">· {timeAgo(a.createdAt)} · {a.channel}</span></p><p className="mt-0.5 text-sm text-night-text/80">{a.message}</p></div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="panel h-fit p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold"><Megaphone size={18} className="text-lime" />Write an alert</h2>
          <div className="mt-4 space-y-3">
            <label className="block"><span className="mb-1 block text-xs text-night-muted">Ward</span><select className="nfield" value={f.ward} onChange={(e) => setF({ ...f, ward: e.target.value })}><option value="">Choose a ward</option>{meta?.wards.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-xs text-night-muted">Urgency</span><select className="nfield" value={f.severity} onChange={(e) => setF({ ...f, severity: e.target.value })}><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></label>
            <label className="block"><span className="mb-1 block text-xs text-night-muted">Message</span><textarea className="nfield min-h-[140px]" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="What is the problem and what do you need?" /></label>
            <button className="nbtn-lime w-full" disabled={busy === 'form' || !f.ward || !f.message} onClick={() => send(f, 'form')}>{busy === 'form' ? <Spinner size={14} /> : <Send size={14} />}Send alert</button>
            <p className="text-xs text-night-muted">Delivered to the corporation dashboard and email. Set CORPORATION_WEBHOOK_URL in .env for real delivery.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
