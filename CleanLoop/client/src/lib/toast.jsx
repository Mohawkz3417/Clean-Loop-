import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const ToastCtx = createContext(() => {});

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((message, kind = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((x) => [...x, { id, message, kind }]);
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), kind === 'error' ? 5200 : 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed inset-x-0 top-3 z-[2000] flex flex-col items-center gap-2 pointer-events-none px-4" role="status" aria-live="polite">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: -16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className={`pointer-events-auto flex max-w-md items-start gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium shadow-float ${t.kind === 'error' ? 'bg-coral text-white' : t.kind === 'info' ? 'bg-ink text-white' : 'bg-canopy text-white'}`}>
              {t.kind === 'error' ? <AlertTriangle size={18} className="mt-px shrink-0" /> : t.kind === 'info' ? <Info size={18} className="mt-px shrink-0" /> : <CheckCircle2 size={18} className="mt-px shrink-0 text-lime" />}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
