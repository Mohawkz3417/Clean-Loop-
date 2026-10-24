// Offline queue: when a report cannot reach the server (no network), it is kept
// on the phone and sent automatically when the connection comes back.
import { post } from './api.js';

const KEY = 'cleanloop.queue';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const write = (q) => { try { localStorage.setItem(KEY, JSON.stringify(q)); return true; } catch { return false; } };

export function queueReport(body) {
  const q = read();
  q.push({ body, at: Date.now() });
  return write(q.slice(-10));
}

export function queuedCount() { return read().length; }

export async function flushQueue(onSent) {
  const q = read();
  if (!q.length || !navigator.onLine) return 0;
  const left = [];
  let sent = 0;
  for (const item of q) {
    try { await post('/reports', item.body); sent++; } catch (e) { if (e.status === 0) left.push(item); }
  }
  write(left);
  if (sent && onSent) onSent(sent);
  return sent;
}
