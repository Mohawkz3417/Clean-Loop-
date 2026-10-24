import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, CalendarClock, Scale } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useMeta } from '../../lib/meta.jsx';
import { useToast } from '../../lib/toast.jsx';
import { useI18n } from '../../lib/i18n.jsx';
import { TopBar } from '../../layouts/MobileShell.jsx';
import { Icon, CATEGORY_ICON, CATEGORY_LABEL, CATEGORY_COLOR, Spinner } from '../../components/ui.jsx';
import { celebrate } from '../../lib/confetti.js';
import { dateShort } from '../../lib/format.js';

const MATERIALS = ['plastic', 'paper', 'metal', 'glass', 'ewaste'];
const SLOTS = ['8-10 AM', '10-12 PM', '4-6 PM'];

export default function Pickup() {
  const meta = useMeta();
  const toast = useToast();
  const { t } = useI18n();
  const [mats, setMats] = useState(['plastic', 'paper']);
  const [estKg, setEstKg] = useState(6);
  const days = Array.from({ length: 5 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d.toISOString().slice(0, 10); });
  const [date, setDate] = useState(days[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState([]);
  const load = () => get('/pickups/mine').then((r) => setList(r.pickups)).catch(() => {});
  useEffect(() => { load(); }, []);

  const toggle = (m) => setMats((x) => (x.includes(m) ? x.filter((y) => y !== m) : [...x, m]));
  const estValue = mats.reduce((s, m) => s + (meta?.categories?.[m]?.valuePerKg || 0), 0) / Math.max(1, mats.length) * estKg;

  const book = async () => {
    setBusy(true);
    try {
      await post('/pickups', { materials: mats, estKg, date, slot, address });
      celebrate();
      toast(`Pickup booked for ${dateShort(date)}, ${slot}. You earn 10 points per kg.`);
      load();
    } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };

  return (
    <div>
      <TopBar title={t('bookPickup')} sub="Hand over sorted dry waste, earn points by weight" back="/app" />
      <div className="space-y-3 px-4">
        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold">What are you handing over?</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {MATERIALS.map((m) => (
              <button key={m} onClick={() => toggle(m)} className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-2.5 text-[10px] font-semibold transition ${mats.includes(m) ? 'border-canopy bg-canopy-50' : 'border-line'}`}>
                <Icon name={CATEGORY_ICON[m]} size={20} style={{ color: CATEGORY_COLOR[m] }} />{CATEGORY_LABEL[m].split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm"><span className="font-semibold">Approximate weight</span><span className="font-display text-lg font-bold">{estKg} kg</span></div>
            <input type="range" min="1" max="40" value={estKg} onChange={(e) => setEstKg(Number(e.target.value))} className="mt-2 w-full accent-canopy" />
          </div>
        </section>
        <section className="rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold">When?</p>
          <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
            {days.map((d) => { const x = new Date(d); return (
              <button key={d} onClick={() => setDate(d)} className={`flex min-w-[64px] flex-col items-center rounded-2xl border-2 py-2 ${date === d ? 'border-canopy bg-canopy text-white' : 'border-line'}`}>
                <span className="text-[11px] opacity-80">{x.toLocaleDateString('en-IN', { weekday: 'short' })}</span><span className="font-display text-lg font-bold">{x.getDate()}</span>
              </button>); })}
          </div>
          <div className="mt-3 flex gap-2">{SLOTS.map((s) => <button key={s} onClick={() => setSlot(s)} className={`chip flex-1 justify-center ${slot === s ? 'border-canopy bg-canopy text-white' : 'border-line'}`}>{s}</button>)}</div>
          <input className="field mt-3" placeholder="Door number, street, landmark" value={address} onChange={(e) => setAddress(e.target.value)} />
        </section>
        <section className="flex items-center gap-3 rounded-3xl bg-canopy-50 p-4 text-sm">
          <Scale size={20} className="shrink-0 text-canopy" />
          <p className="text-ink-soft">About <b className="text-ink">{estKg * 10} points</b> after weighing · market value ≈ ₹{Math.round(estValue)} goes into the city reward pool.</p>
        </section>
        <button onClick={book} disabled={busy || !mats.length} className="btn-primary w-full">{busy ? <Spinner /> : <Truck size={18} />}Book pickup</button>

        {list.length > 0 && (
          <section className="pt-3">
            <p className="mb-2 text-sm font-semibold">My pickups</p>
            {list.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="mb-2 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.status === 'completed' ? 'bg-canopy-50 text-canopy' : 'bg-marigold-soft text-marigold-deep'}`}>{p.status === 'completed' ? <CheckCircle2 size={20} /> : <CalendarClock size={20} />}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{p.materials.map((m) => CATEGORY_LABEL[m].split(' ')[0]).join(', ')}</p><p className="text-xs text-ink-faint">{dateShort(p.date)} · {p.slot}</p></div>
                <span className="text-right text-xs">{p.status === 'completed' ? <><b className="text-canopy">+{p.pointsAwarded} pts</b><br />{p.actualKg} kg</> : 'Scheduled'}</span>
              </motion.div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
