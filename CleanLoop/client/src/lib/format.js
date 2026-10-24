export function timeAgo(iso) {
  if (!iso) return '';
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 0) return timeUntil(iso);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function timeUntil(iso) {
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  if (s <= 0) return `${timeAgo(iso).replace(' ago', '')} overdue`;
  if (s < 3600) return `in ${Math.ceil(s / 60)} min`;
  if (s < 86400) return `in ${Math.round(s / 3600)} h`;
  return `in ${Math.round(s / 86400)} d`;
}

export function hoursLeft(iso) {
  return (new Date(iso).getTime() - Date.now()) / 3600000;
}

export const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
export const num = (n) => Math.round(Number(n) || 0).toLocaleString('en-IN');
export const kg = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)} t` : `${Math.round(n)} kg`);
export const dist = (m) => (m == null ? '' : m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`);
export const pct = (v) => `${Math.round((Number(v) || 0) * 100)}%`;
export const dateShort = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
export const dateTime = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
export const firstName = (n) => String(n || '').split(' ')[0];
export const initials = (n) => String(n || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
