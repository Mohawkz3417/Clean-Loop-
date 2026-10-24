import { Link } from 'react-router-dom';
import { Logo } from '../components/ui.jsx';

export default function AuthLayout({ title, sub, children, aside }) {
  return (
    <div className="grid min-h-screen bg-mist lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-canopy-800 p-10 text-white lg:flex lg:flex-col">
        <Link to="/"><Logo size={34} light /></Link>
        <div className="mt-auto max-w-md">
          <p className="font-display text-4xl font-bold leading-tight">Every photo starts a cleanup. Every cleanup pays someone.</p>
          <p className="mt-4 text-white/70">Citizens report, workers clean, the city keeps score. Rewards come from recycling money, brand obligations and fines.</p>
          {aside}
        </div>
        <svg className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-20" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#B6F04A" strokeWidth="6" strokeDasharray="200 60" strokeLinecap="round" /></svg>
      </div>
      <div className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden"><Logo size={30} /></Link>
          <h1 className="mt-6 text-3xl font-bold lg:mt-0">{title}</h1>
          {sub && <p className="mt-2 text-ink-soft">{sub}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
