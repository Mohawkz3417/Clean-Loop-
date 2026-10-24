import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, HardHat } from 'lucide-react';
import AuthLayout from './AuthLayout.jsx';
import { useAuth, homeFor } from '../lib/auth.jsx';
import { useMeta } from '../lib/meta.jsx';
import { Spinner } from '../components/ui.jsx';

const WORKER_TYPES = [
  { id: 'gig', label: 'Gig worker', sub: 'Pick jobs when you are free, paid per job' },
  { id: 'informal', label: 'Waste picker', sub: 'Informal sector - get recognised, paid work' },
  { id: 'salaried', label: 'Municipal staff', sub: 'Salaried, with a per-job incentive (needs approval)' },
];

export default function Register() {
  const { register } = useAuth();
  const meta = useMeta();
  const nav = useNavigate();
  const [f, setF] = useState({ role: 'citizen', workerType: 'gig', name: '', email: '', phone: '', ward: 'adyar', password: '', upi: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try { const u = await register(f); nav(homeFor(u.role)); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <AuthLayout title="Join CleanLoop" sub="It takes a minute. You can start reporting right after.">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[{ id: 'citizen', label: 'I want to report', icon: Smartphone }, { id: 'worker', label: 'I want to clean & earn', icon: HardHat }].map((r) => (
            <button type="button" key={r.id} onClick={() => set('role')(r.id)} className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-3.5 text-left transition ${f.role === r.id ? 'border-canopy bg-canopy-50' : 'border-line bg-white'}`}>
              <r.icon size={22} className="text-canopy" /><span className="text-sm font-semibold">{r.label}</span>
            </button>
          ))}
        </div>
        {f.role === 'worker' && (
          <div className="space-y-2">
            {WORKER_TYPES.map((w) => (
              <label key={w.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 ${f.workerType === w.id ? 'border-canopy bg-canopy-50' : 'border-line bg-white'}`}>
                <input type="radio" name="wt" className="mt-1 accent-canopy" checked={f.workerType === w.id} onChange={() => set('workerType')(w.id)} />
                <span><span className="block text-sm font-semibold">{w.label}</span><span className="block text-xs text-ink-faint">{w.sub}</span></span>
              </label>
            ))}
          </div>
        )}
        <label className="block"><span className="label">Full name</span><input className="field" value={f.name} onChange={set('name')} required /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="label">Email</span><input className="field" type="email" value={f.email} onChange={set('email')} required /></label>
          <label className="block"><span className="label">Phone</span><input className="field" type="tel" value={f.phone} onChange={set('phone')} placeholder="98xxx xxxxx" /></label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="label">Your ward</span>
            <select className="field" value={f.ward} onChange={set('ward')}>{(meta?.wards || []).map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select>
          </label>
          <label className="block"><span className="label">Password</span><input className="field" type="password" minLength={6} value={f.password} onChange={set('password')} required /></label>
        </div>
        {f.role === 'worker' && <label className="block"><span className="label">UPI ID for payouts</span><input className="field" value={f.upi} onChange={set('upi')} placeholder="name@bank" /></label>}
        {error && <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral-deep">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>{busy && <Spinner />}Create account</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-soft">Already have an account? <Link to="/login" className="font-semibold text-canopy hover:underline">Sign in</Link></p>
    </AuthLayout>
  );
}
