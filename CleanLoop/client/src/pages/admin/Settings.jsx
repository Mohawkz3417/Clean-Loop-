import { useEffect, useState } from 'react';
import { Cpu, Plug, SlidersHorizontal, Check, X, FlaskConical, RotateCcw } from 'lucide-react';
import { get, post } from '../../lib/api.js';
import { useToast } from '../../lib/toast.jsx';
import { PageHead } from '../../layouts/AdminShell.jsx';
import { Skeleton, Spinner } from '../../components/ui.jsx';

export default function Settings() {
  const toast = useToast();
  const [d, setD] = useState(null);
  const [m, setM] = useState(null);
  const [f, setF] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    get('/admin/settings').then((x) => { setD(x); setF({ payMultiplier: x.settings.payMultiplier ?? 1, fineDefault: x.settings.fineDefault ?? 1000, vehicleFine: x.settings.vehicleFine ?? 5000 }); }).catch(() => {});
    fetch('/models/waste/metrics.json').then((r) => r.json()).then(setM).catch(() => {});
  }, []);
  const reset = async () => {
    if (!window.confirm('Reset all demo data? Everything added since the start will be replaced with fresh demo data.')) return;
    try { await post('/admin/reset-demo'); toast('Demo data reset. Reloading…'); setTimeout(() => window.location.reload(), 800); } catch (e) { toast(e.message, 'error'); }
  };
  const save = async () => { setBusy(true); try { await post('/admin/settings', f); toast('Settings saved'); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); } };
  const Row = ({ ok, label, detail }) => (
    <div className="flex items-start gap-3 border-b border-night-line/60 py-3 last:border-0">
      <span className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${ok ? 'bg-lime/15 text-lime' : 'bg-night-raised text-night-muted'}`}>{ok ? <Check size={14} /> : <X size={14} />}</span>
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-night-muted">{detail}</p></div>
    </div>
  );
  return (
    <div>
      <PageHead title="Settings & AI" sub="Everything works offline out of the box. Connect real services in the .env file when you are ready." />
      {!d ? <Skeleton className="h-96" /> : (
        <div className="grid gap-4 xl:grid-cols-2">
          <section className="panel p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Cpu size={18} className="text-lime" />AI engine</h2>
            <Row ok label="On-device waste model (TensorFlow.js)" detail={m ? `${m.base}, ${m.classes.length} classes (${m.classes.join(', ')}), ${m.accuracy}% accuracy on ${m.valImages} unseen photos. Trained ${m.trainedAt}.` : 'Loading model info…'} />
            <Row ok={d.ai.gemini.configured} label={`Gemini cloud AI (${d.ai.gemini.model})`} detail={d.ai.gemini.configured ? 'Active: richer severity, volume, hazard and item detection, plus before/after verification.' : 'Optional. Add GEMINI_API_KEY to .env and restart to enable.'} />
            <Row ok label="Fallback chain" detail="Cloud AI first when configured → on-device model → manual review. The app never stops working if a provider fails." />
            {m?.perClass && (
              <div className="mt-3 rounded-2xl bg-night-raised/60 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-night-muted"><FlaskConical size={13} />Per-class accuracy</p>
                <div className="grid grid-cols-3 gap-2 text-xs">{Object.entries(m.perClass).map(([k, v]) => <div key={k} className="flex justify-between rounded-lg bg-night-panel px-2 py-1.5"><span className="capitalize">{k}</span><b>{v}%</b></div>)}</div>
              </div>
            )}
          </section>
          <section className="panel p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Plug size={18} className="text-lime" />Integrations</h2>
            {[['payouts', 'UPI payouts', 'PAYOUT_WEBHOOK_URL'], ['sms', 'SMS alerts', 'SMS_WEBHOOK_URL'], ['vehicleLookup', 'Vehicle registry lookup', 'VEHICLE_LOOKUP_URL'], ['corporation', 'Corporation email / dashboard', 'CORPORATION_WEBHOOK_URL']].map(([k, l, env]) => (
              <Row key={k} ok={d.integrations[k] === 'live'} label={`${l} · ${d.integrations[k]}`} detail={d.integrations[k] === 'live' ? 'Connected.' : `Simulated so every flow can be demoed. Set ${env} in .env to go live.`} />
            ))}
            <Row ok={d.demoMode} label={`Demo mode ${d.demoMode ? 'on' : 'off'}`} detail="Enables quick demo logins, gallery uploads and demo photos for laptop testing, and 'simulate arrival' for workers. Set DEMO_MODE=false for production." />
          </section>
          <section className="panel p-5 xl:col-span-2">
            <h2 className="flex items-center gap-2 text-lg font-bold"><SlidersHorizontal size={18} className="text-lime" />Rules</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="block"><span className="mb-1 block text-xs text-night-muted">Payout multiplier for new jobs</span><input className="nfield" type="number" step="0.1" min="0.5" max="3" value={f.payMultiplier} onChange={(e) => setF({ ...f, payMultiplier: e.target.value })} /></label>
              <label className="block"><span className="mb-1 block text-xs text-night-muted">Default littering fine (₹)</span><input className="nfield" type="number" value={f.fineDefault} onChange={(e) => setF({ ...f, fineDefault: e.target.value })} /></label>
              <label className="block"><span className="mb-1 block text-xs text-night-muted">Commercial vehicle dumping fine (₹)</span><input className="nfield" type="number" value={f.vehicleFine} onChange={(e) => setF({ ...f, vehicleFine: e.target.value })} /></label>
            </div>
            <div className="mt-4 grid gap-2 text-xs text-night-muted sm:grid-cols-4">
              {Object.entries(d.severity).map(([k, v]) => <div key={k} className="rounded-xl bg-night-raised/60 px-3 py-2"><b className="capitalize text-night-text">{k}</b> · {v.slaHours} h SLA · {v.points} pts to reporter</div>)}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="nbtn-lime" disabled={busy} onClick={save}>{busy && <Spinner size={14} />}Save rules</button>
              {d.demoMode && <button className="nbtn" onClick={reset}><RotateCcw size={14} />Reset demo data</button>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
