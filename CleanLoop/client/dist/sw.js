// CleanLoop service worker: makes the app installable and lets the on-device
// AI model and app screens load without a network. API calls are never cached.
const CACHE = 'cleanloop-v1';
const PRECACHE = ['/', '/manifest.webmanifest', '/logo.svg', '/models/waste/model.json', '/models/waste/labels.json', '/models/waste/metrics.json', '/models/waste/group1-shard1of1.bin'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) return;
  // App navigation: network first, fall back to the cached shell when offline
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then((r) => { caches.open(CACHE).then((c) => c.put('/', r.clone())); return r; }).catch(() => caches.match('/')));
    return;
  }
  // AI model: serve the cached copy instantly, refresh it in the background (picks up retrained models)
  if (url.pathname.startsWith('/models/')) {
    e.respondWith(caches.open(CACHE).then((c) => c.match(e.request).then((hit) => {
      const net = fetch(e.request).then((r) => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // Hashed static assets: cache first
  if (/^\/(assets|icon|logo)/.test(url.pathname) || url.pathname.endsWith('.woff2')) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return r;
    })));
  }
});
