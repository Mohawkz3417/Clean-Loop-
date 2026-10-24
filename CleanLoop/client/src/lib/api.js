// Small fetch wrapper for the CleanLoop API.
const KEY = 'cleanloop.token';

export const tokenStore = {
  get: () => { try { return localStorage.getItem(KEY); } catch { return null; } },
  set: (t) => { try { t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch { /* private mode */ } },
};

export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export async function api(path, { method = 'GET', body, signal } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const t = tokenStore.get();
  if (t) headers.Authorization = `Bearer ${t}`;
  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined, signal });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new ApiError('Cannot reach the server. Check that CleanLoop is running and you are online.', 0);
  }
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    if (res.status === 401) tokenStore.set(null);
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status);
  }
  return data;
}

export const get = (p, o) => api(p, o);
export const post = (p, body) => api(p, { method: 'POST', body });
