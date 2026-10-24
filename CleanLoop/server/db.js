// Tiny JSON-file database. Pure JavaScript, works on every OS with no setup.
// All data lives in server/data/db.json; uploaded photos live in server/data/uploads.
// To swap in a real database later (Postgres, MongoDB...), re-implement the
// functions exported here - the rest of the app only talks to this module.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from './config.js';

const DB_FILE = path.join(config.dataDir, 'db.json');
export const UPLOAD_DIR = path.join(config.dataDir, 'uploads');

export const COLLECTIONS = [
  'users', 'reports', 'violations', 'transactions', 'redemptions', 'drives', 'pickups',
  'listings', 'bids', 'funds', 'alerts', 'notifications', 'sos', 'serviceRequests', 'activity',
];

let state = null;
let saveTimer = null;

export function ensureDirs() {
  fs.mkdirSync(config.dataDir, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export function dbExists() {
  return fs.existsSync(DB_FILE);
}

export function load() {
  ensureDirs();
  if (dbExists()) {
    try {
      state = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {
      console.error('Could not read db.json, starting fresh:', e.message);
      state = null;
    }
  }
  if (!state) state = {};
  for (const c of COLLECTIONS) if (!Array.isArray(state[c])) state[c] = [];
  if (!state.settings) state.settings = {};
  return state;
}

export function replaceAll(newState) {
  state = newState;
  for (const c of COLLECTIONS) if (!Array.isArray(state[c])) state[c] = [];
  flush();
}

export function flush() {
  ensureDirs();
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state));
  fs.renameSync(tmp, DB_FILE);
}

export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 150);
}

export const db = new Proxy({}, { get: (_, k) => state[k] });

export function uid(prefix = '') {
  return prefix + crypto.randomBytes(6).toString('hex');
}

export function find(coll, pred) {
  return state[coll].find(typeof pred === 'function' ? pred : (x) => x.id === pred);
}

export function filter(coll, pred) {
  return state[coll].filter(pred);
}

export function insert(coll, doc) {
  const d = { id: doc.id || uid(coll.slice(0, 2) + '_'), createdAt: doc.createdAt || new Date().toISOString(), ...doc };
  state[coll].push(d);
  save();
  return d;
}

export function update(coll, id, patch) {
  const d = find(coll, id);
  if (!d) return null;
  Object.assign(d, typeof patch === 'function' ? patch(d) || {} : patch);
  d.updatedAt = new Date().toISOString();
  save();
  return d;
}

export function remove(coll, id) {
  const i = state[coll].findIndex((x) => x.id === id);
  if (i >= 0) state[coll].splice(i, 1);
  save();
}

export function settings() {
  return state.settings;
}

// Save a base64 data URL image to disk, returns its public URL.
export function saveImage(dataUrl, prefix = 'img') {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const m = dataUrl.match(/^data:image\/(png|jpe?g|webp);base64,(.+)$/);
  if (!m) return null;
  const ext = m[1] === 'png' ? 'png' : m[1] === 'webp' ? 'webp' : 'jpg';
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 8 * 1024 * 1024) throw new Error('Image is larger than 8 MB');
  const name = `${prefix}_${uid()}.${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
  return `/uploads/${name}`;
}

export function readImageAsBase64(url) {
  if (!url || !url.startsWith('/uploads/')) return null;
  const file = path.join(UPLOAD_DIR, path.basename(url));
  if (!fs.existsSync(file)) return null;
  const ext = path.extname(file).slice(1);
  return { mime: ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg', data: fs.readFileSync(file).toString('base64') };
}

export function clearUploads() {
  if (!fs.existsSync(UPLOAD_DIR)) return;
  for (const f of fs.readdirSync(UPLOAD_DIR)) fs.rmSync(path.join(UPLOAD_DIR, f), { force: true });
}
