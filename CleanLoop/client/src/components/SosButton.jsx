import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Siren, ShieldCheck, Phone } from 'lucide-react';
import { post } from '../lib/api.js';
import { getLocation } from '../lib/geo.js';
import { useAuth } from '../lib/auth.jsx';
import { Sheet } from './ui.jsx';

// Hold for 1.5 s to send an SOS with the worker's location to the ward control room.
export default function SosButton() {
  const { user } = useAuth();
  const [holding, setHolding] = useState(false);
  const [sent, setSent] = useState(null);
  const [error, setError] = useState('');
  const timer = useRef(null);

  const start = () => {
    setHolding(true);
    timer.current = setTimeout(async () => {
      setHolding(false);
      const loc = await getLocation({ timeout: 5000 });
      try {
        const r = await post('/worker/sos', { lat: loc.ok ? loc.lat : user?.lat, lng: loc.ok ? loc.lng : user?.lng, message: 'Needs help on site' });
        setSent(r.sos);
      } catch (e) { setError(e.message); setSent({}); }
    }, 1500);
  };
  const stop = () => { setHolding(false); clearTimeout(timer.current); };

  return (
    <>
      <button
        onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onContextMenu={(e) => e.preventDefault()}
        className="fixed bottom-32 right-4 z-40 flex h-14 w-14 select-none items-center justify-center rounded-full bg-coral text-white shadow-[0_10px_30px_-6px_rgba(240,87,74,.8)] lg:absolute"
        aria-label="SOS - hold for 1.5 seconds to call for help">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
          <motion.circle cx="28" cy="28" r="25" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray={157}
            initial={false} animate={{ strokeDashoffset: holding ? 0 : 157 }} transition={{ duration: holding ? 1.5 : 0.2, ease: 'linear' }} />
        </svg>
        <span className="flex flex-col items-center leading-none"><Siren size={20} /><span className="mt-0.5 text-[10px] font-bold">SOS</span></span>
      </button>
      <Sheet open={Boolean(sent)} onClose={() => { setSent(null); setError(''); }} title={error ? 'SOS not sent' : 'SOS sent'}>
        {error ? <p className="text-coral-deep">{error}</p> : (
          <div className="text-center">
            <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-canopy-50 text-canopy"><ShieldCheck size={32} /></span>
            <p className="font-display text-lg font-semibold">The control room has your location</p>
            <p className="mt-1 text-sm text-ink-soft">Stay where you are if it is safe. Someone will call you shortly. Your accident insurance covers on-duty incidents.</p>
            <a href="tel:112" className="btn-danger mt-5 w-full"><Phone size={18} />Call 112 emergency</a>
          </div>
        )}
      </Sheet>
    </>
  );
}
