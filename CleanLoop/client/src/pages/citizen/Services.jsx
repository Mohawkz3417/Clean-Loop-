import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Icon, Sheet, Spinner } from '../../components/ui.jsx';

export default function Services() {
  const meta = useMeta();
  const toast = useToast();
  const { t } = useI18n();
  const [mine, setMine] = useState([]);
  const [open, setOpen] = useState(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => get('/services/mine').then((r) => setMine(r.requests)).catch(() => {});
  useEffect(() => { load(); }, []);
  const submit = async () => {
    setBusy(true);
    try { await post(`/services/${open.id}/request`, { note }); toast(open.kind === 'event' ? 'Registered. You will get a reminder.' : 'Request sent to your ward office.'); setOpen(null); setNote(''); load(); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  return (
    <div>
      <TopBar title={t('govServices')} sub="Government waste services, in one place" back="/app" />
      <div className="space-y-2.5 px-4">
        {meta?.govServices.map((s, i) => {
          const done = mine.find((m) => m.serviceId === s.id);
          return (
            <motion.button key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setOpen(s)} className="flex w-full items-start gap-3 rounded-3xl bg-white p-4 text-left shadow-lift">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#6B4BD6]"><Icon name={s.icon} size={22} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-ink-soft">{s.desc}</p>
                {done && <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-canopy"><CheckCircle2 size={13} />{done.status === 'registered' ? 'Registered' : `Request ${done.status}`}</p>}
              </div>
              <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">{s.kind === 'event' ? 'Register' : 'Request'}</span>
            </motion.button>
          );
        })}
      </div>
      <Sheet open={Boolean(open)} onClose={() => setOpen(null)} title={open?.title || ''}>
        <p className="text-sm text-ink-soft">{open?.desc}</p>
        <textarea className="field mt-4 min-h-[90px]" placeholder={open?.kind === 'event' ? 'What will you bring? (optional)' : 'Describe what you need and the address'} value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={submit} disabled={busy} className="btn-primary mt-4 w-full">{busy && <Spinner />}{open?.kind === 'event' ? 'Register' : 'Send request'}</button>
      </Sheet>
    </div>
  );
}
