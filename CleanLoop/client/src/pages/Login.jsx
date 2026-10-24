import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, HardHat, LayoutDashboard } from 'lucide-react';
import AuthLayout from './AuthLayout.jsx';
import { useAuth, homeFor } from '../lib/auth.jsx';
import { useMeta } from '../lib/meta.jsx';
import { Spinner } from '../components/ui.jsx';

export default function Login() {
  const { login, demoLogin } = useAuth();
  const meta = useMeta();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setBusy('form');
    try { const u = await login(email, password); nav(homeFor(u.role)); } catch (err) { setError(err.message); } finally { setBusy(''); }
  };
  const demo = async (role) => {
    setError(''); setBusy(role);
    try { const u = await demoLogin(role); nav(homeFor(u.role)); } catch (err) { setError(err.message); } finally { setBusy(''); }
  };

  return (
    <AuthLayout title="Welcome back" sub="Sign in to report, clean up or manage your city.">
      <form onSubmit={submit} className="space-y-4">
        <label className="block"><span className="label">Email</span><input className="field" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
        <label className="block"><span className="label">Password</span><input className="field" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral-deep">{error}</p>}
        <button className="btn-primary w-full" disabled={busy === 'form'}>{busy === 'form' && <Spinner />}Sign in</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-soft">New here? <Link to="/register" className="font-semibold text-canopy hover:underline">Create an account</Link></p>
      {(meta?.demoMode ?? true) && (
        <div className="mt-8 rounded-3xl border border-line bg-white p-4">
          <p className="text-sm font-semibold">Demo accounts</p>
          <p className="text-xs text-ink-faint">One tap signs you in with pre-filled demo data.</p>
          <div className="mt-3 grid gap-2">
            {[
              { role: 'citizen', label: 'Citizen · Kavya Sundar', cred: 'citizen@cleanloop.in / demo123', icon: Smartphone },
              { role: 'worker', label: 'Worker · Murugan Selvaraj', cred: 'worker@cleanloop.in / demo123', icon: HardHat },
              { role: 'admin', label: 'Admin · Ward Control Room', cred: 'admin@cleanloop.in / admin123', icon: LayoutDashboard },
            ].map((d) => (
              <button key={d.role} onClick={() => demo(d.role)} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-2.5 text-left transition hover:border-canopy-300 hover:bg-mist">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-canopy-50 text-canopy">{busy === d.role ? <Spinner /> : <d.icon size={18} />}</span>
                <span className="min-w-0"><span className="block text-sm font-semibold">{d.label}</span><span className="block truncate text-xs text-ink-faint">{d.cred}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
