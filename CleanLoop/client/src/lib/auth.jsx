import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, post, tokenStore } from './api.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    if (!tokenStore.get()) { setUser(null); setReady(true); return null; }
    try {
      const { user: u } = await api('/auth/me');
      setUser(u);
      return u;
    } catch {
      setUser(null);
      return null;
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const finish = (r) => { tokenStore.set(r.token); setUser(r.user); return r.user; };
  const login = async (email, password) => finish(await post('/auth/login', { email, password }));
  const demoLogin = async (role) => finish(await post('/auth/demo', { role }));
  const register = async (data) => finish(await post('/auth/register', data));
  const logout = () => { tokenStore.set(null); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, setUser, ready, login, demoLogin, register, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);

export function homeFor(role) {
  return role === 'admin' ? '/admin' : role === 'worker' ? '/worker' : '/app';
}
