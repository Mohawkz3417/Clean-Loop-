import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api.js';

const MetaCtx = createContext(null);

export function MetaProvider({ children }) {
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    const loadMeta = () => api('/meta').then((m) => alive && (setMeta(m), setError(null))).catch((e) => { if (alive) { setError(e.message); setTimeout(loadMeta, 3000); } });
    loadMeta();
    return () => { alive = false; };
  }, []);
  return <MetaCtx.Provider value={{ meta, error }}>{children}</MetaCtx.Provider>;
}

export function useMeta() {
  return useContext(MetaCtx).meta;
}
export function useMetaState() {
  return useContext(MetaCtx);
}

export function wardName(meta, id) {
  return meta?.wards?.find((w) => w.id === id)?.name || id;
}
