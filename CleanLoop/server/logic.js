// Core business logic shared by the API routes and the background jobs.
import { db, find, filter, insert, update, save } from './db.js';
import {
  BADGES, CATEGORIES, VOLUMES, SEVERITY, POINTS, WARDS, levelFor, workerTier, distanceM,
} from './domain.js';

export const now = () => new Date().toISOString();
const HOUR = 3600 * 1000;

// ---------------------------------------------------------------- activity
export function logActivity(type, text, extra = {}) {
  const a = insert('activity', { type, text, ...extra });
  if (db.activity.length > 400) db.activity.splice(0, db.activity.length - 400);
  return a;
}

export function notify(userId, title, body, extra = {}) {
  if (!userId) return null;
  return insert('notifications', { userId, title, body, read: false, ...extra });
}

// ---------------------------------------------------------------- points & wallet
export function addPoints(userId, points, description, meta = {}) {
  const u = find('users', userId);
  if (!u || !points) return;
  u.points = (u.points || 0) + points;
  if (points > 0) u.lifetimePoints = (u.lifetimePoints || 0) + points;
  insert('transactions', { userId, kind: 'points', points, amount: 0, description, ...meta });
  save();
}

export function addMoney(userId, amount, description, meta = {}) {
  const u = find('users', userId);
  if (!u || !amount) return;
  u.wallet = Math.round(((u.wallet || 0) + amount) * 100) / 100;
  insert('transactions', { userId, kind: 'money', points: 0, amount, description, ...meta });
  save();
}

export function addFund(source, amount, direction, note) {
  return insert('funds', { source, amount: Math.round(amount), direction, note });
}

export function fundSummary() {
  const bySource = {};
  let inflow = 0;
  let outflow = 0;
  for (const f of db.funds) {
    if (f.direction === 'in') {
      inflow += f.amount;
      bySource[f.source] = (bySource[f.source] || 0) + f.amount;
    } else outflow += f.amount;
  }
  return { inflow, outflow, balance: inflow - outflow, bySource };
}

// ---------------------------------------------------------------- badges
export function grantBadge(user, key) {
  if (!user || !BADGES[key]) return false;
  user.badges = user.badges || [];
  if (user.badges.some((b) => b.key === key)) return false;
  user.badges.push({ key, at: now() });
  notify(user.id, `Badge unlocked: ${BADGES[key].name}`, BADGES[key].desc, { kind: 'badge', badge: key });
  save();
  return true;
}

export function checkCitizenBadges(user) {
  const mine = filter('reports', (r) => r.citizenId === user.id && r.status === 'completed');
  if (mine.length >= 1) grantBadge(user, 'first_report');
  if (mine.length >= 10) grantBadge(user, 'hawk_eye');
  if (mine.filter((r) => r.ai?.category === 'plastic').length >= 5) grantBadge(user, 'plastic_buster');
  if (mine.some((r) => r.ai?.hazard)) grantBadge(user, 'hazard_spotter');
  if (filter('drives', (d) => (d.participants || []).includes(user.id)).length >= 3) grantBadge(user, 'community_star');
  const pickedKg = filter('pickups', (p) => p.citizenId === user.id && p.status === 'completed').reduce((s, p) => s + (p.actualKg || 0), 0);
  if (pickedKg >= 25) grantBadge(user, 'recycler');
  if ((user.confirmations || 0) >= 5) grantBadge(user, 'confirmer');
}

export function checkWorkerBadges(w) {
  if ((w.jobsDone || 0) >= 1) grantBadge(w, 'first_job');
  if ((w.jobsDone || 0) >= 50) grantBadge(w, 'fifty_club');
  if (filter('reports', (r) => r.assignedTo === w.id && r.status === 'completed' && r.ai?.hazard).length >= 5) grantBadge(w, 'hazard_hero');
  if ((w.rating || 0) >= 4.8 && (w.ratingCount || 0) >= 5) grantBadge(w, 'five_star');
  w.tier = workerTier(w);
}

// ---------------------------------------------------------------- report helpers
export function slaDeadline(severity, from = Date.now()) {
  return new Date(from + (SEVERITY[severity]?.slaHours || 48) * HOUR).toISOString();
}

export function estimatedKg(r) {
  return r.actualKg || VOLUMES[r.ai?.volume]?.kg || 20;
}

export function co2For(category, kg) {
  return (CATEGORIES[category]?.co2PerKg || 0.4) * kg;
}

export function enrichReport(r, viewer) {
  const citizen = find('users', r.citizenId);
  const worker = r.assignedTo ? find('users', r.assignedTo) : null;
  const out = {
    ...r,
    citizenName: citizen ? citizen.name : 'Citizen',
    workerName: worker ? worker.name : null,
    workerPhone: worker && viewer && viewer.role === 'admin' ? worker.phone : undefined,
    overdue: !['completed', 'rejected'].includes(r.status) && r.slaDeadline && new Date(r.slaDeadline) < new Date(),
  };
  if (viewer && viewer.role === 'worker') delete out.citizenName;
  return out;
}

// ---------------------------------------------------------------- stats
export function cityStats() {
  const reports = db.reports;
  const done = reports.filter((r) => r.status === 'completed');
  let kg = 0;
  let co2 = 0;
  const byCategoryKg = {};
  for (const r of done) {
    const k = estimatedKg(r);
    const c = r.ai?.category || 'mixed';
    kg += k;
    co2 += co2For(c, k);
    byCategoryKg[c] = (byCategoryKg[c] || 0) + k;
  }
  for (const p of db.pickups.filter((p) => p.status === 'completed')) {
    for (const m of p.materials || []) {
      const k = (p.actualKg || 0) / Math.max(1, (p.materials || []).length);
      kg += k;
      co2 += co2For(m, k);
      byCategoryKg[m] = (byCategoryKg[m] || 0) + k;
    }
  }
  const resolutionHours = done.filter((r) => r.completedAt).map((r) => (new Date(r.completedAt) - new Date(r.createdAt)) / HOUR);
  const avgResolution = resolutionHours.length ? resolutionHours.reduce((a, b) => a + b, 0) / resolutionHours.length : 0;
  const open = reports.filter((r) => !['completed', 'rejected'].includes(r.status));
  const overdue = open.filter((r) => r.slaDeadline && new Date(r.slaDeadline) < new Date());
  const workers = db.users.filter((u) => u.role === 'worker');
  const informal = workers.filter((w) => w.workerType === 'informal');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const finesPaid = db.violations.filter((v) => v.status === 'fine_paid' || v.status === 'reward_credited');
  return {
    totalReports: reports.length,
    openReports: open.length,
    completedReports: done.length,
    resolvedToday: done.filter((r) => new Date(r.completedAt) >= today).length,
    overdue: overdue.length,
    kgRemoved: Math.round(kg),
    co2SavedKg: Math.round(co2),
    treesEquivalent: Math.round(co2 / 21), // ~21 kg CO2 absorbed per tree per year
    avgResolutionHours: Math.round(avgResolution * 10) / 10,
    slaCompliance: done.length ? Math.round((done.filter((r) => !r.breachedSla).length / done.length) * 100) : 100,
    citizens: db.users.filter((u) => u.role === 'citizen').length,
    workers: workers.length,
    activeWorkers: workers.filter((w) => w.online).length,
    informalWorkers: informal.length,
    informalEarnings: Math.round(informal.reduce((s, w) => s + (w.totalEarned || 0), 0)),
    byCategoryKg: Object.fromEntries(Object.entries(byCategoryKg).map(([k, v]) => [k, Math.round(v)])),
    violations: db.violations.length,
    finesCollected: finesPaid.reduce((s, v) => s + (v.fineAmount || 0), 0),
    drives: db.drives.length,
    funds: fundSummary(),
  };
}

export function wardScores() {
  const cutoff = Date.now() - 30 * 24 * HOUR;
  return WARDS.map((w) => {
    const rs = db.reports.filter((r) => r.ward === w.id && new Date(r.createdAt).getTime() > cutoff);
    const open = rs.filter((r) => !['completed', 'rejected'].includes(r.status));
    const done = rs.filter((r) => r.status === 'completed');
    const sevW = { low: 2, medium: 4, high: 7, critical: 11 };
    const openPenalty = open.reduce((s, r) => s + (sevW[r.ai?.severity] || 4), 0);
    const overdue = open.filter((r) => r.slaDeadline && new Date(r.slaDeadline) < new Date()).length;
    const rate = rs.length ? done.length / rs.length : 1;
    const score = Math.max(30, Math.min(98, Math.round(100 - openPenalty * 0.85 - overdue * 3 - (1 - rate) * 25)));
    const hours = done.filter((r) => r.completedAt).map((r) => (new Date(r.completedAt) - new Date(r.createdAt)) / HOUR);
    return {
      ...w,
      score,
      grade: score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : 'D',
      reports: rs.length,
      open: open.length,
      completed: done.length,
      overdue,
      resolutionRate: Math.round(rate * 100),
      avgHours: hours.length ? Math.round((hours.reduce((a, b) => a + b, 0) / hours.length) * 10) / 10 : null,
      kg: Math.round(done.reduce((s, r) => s + estimatedKg(r), 0)),
    };
  }).sort((a, b) => b.score - a.score);
}

// Hotspot detection + simple prediction: grid the city into ~300 m cells, weight
// recent reports more, and boost cells where garbage came back after a cleanup.
export function hotspots() {
  const cell = 0.003; // ~330 m
  const cells = new Map();
  const nowMs = Date.now();
  for (const r of db.reports) {
    if (r.status === 'rejected') continue;
    const key = `${Math.round(r.lat / cell)}:${Math.round(r.lng / cell)}`;
    const ageDays = (nowMs - new Date(r.createdAt).getTime()) / (24 * HOUR);
    const weight = Math.exp(-ageDays / 21);
    const c = cells.get(key) || { key, lat: 0, lng: 0, n: 0, weight: 0, cats: {}, repeat: 0, lastAt: 0, ward: r.ward, dumping: 0 };
    c.lat += r.lat; c.lng += r.lng; c.n += 1; c.weight += weight;
    c.cats[r.ai?.category || 'mixed'] = (c.cats[r.ai?.category || 'mixed'] || 0) + 1;
    if (r.status === 'completed') c.repeat += 1;
    c.lastAt = Math.max(c.lastAt, new Date(r.createdAt).getTime());
    cells.set(key, c);
  }
  for (const v of db.violations) {
    const key = `${Math.round(v.lat / cell)}:${Math.round(v.lng / cell)}`;
    const c = cells.get(key);
    if (c) c.dumping += 1;
  }
  const list = [...cells.values()].map((c) => {
    const lat = c.lat / c.n;
    const lng = c.lng / c.n;
    const topCat = Object.entries(c.cats).sort((a, b) => b[1] - a[1])[0][0];
    const risk = Math.min(100, Math.round(c.weight * 18 + (c.repeat > 1 ? c.repeat * 9 : 0) + c.dumping * 12));
    let action = 'Place a twin bin and add the spot to the daily route';
    if (c.dumping > 0) action = 'Install a CCTV camera and a "no dumping" fine board';
    else if (topCat === 'construction') action = 'Notify builders nearby and schedule a C&D debris pickup';
    else if (topCat === 'organic') action = 'Add a wet-waste bin and an early-morning collection slot';
    else if (topCat === 'plastic') action = 'Run a plastic awareness drive with nearby shops';
    else if (topCat === 'medical' || topCat === 'ewaste') action = 'Coordinate with clinics / shops for safe take-back';
    return {
      key: c.key, lat, lng, reports: c.n, risk, repeatAfterCleanup: Math.max(0, c.repeat - 1), dumping: c.dumping,
      topCategory: topCat, ward: c.ward, predicted: risk >= 45, action,
      lastReportAt: new Date(c.lastAt).toISOString(),
    };
  });
  return list.sort((a, b) => b.risk - a.risk);
}

// ---------------------------------------------------------------- SLA escalation
const ESCALATION = ['Ward officer', 'Zonal officer', 'Commissioner'];

export function runEscalations() {
  const nowMs = Date.now();
  let changed = 0;
  for (const r of db.reports) {
    if (['completed', 'rejected'].includes(r.status) || !r.slaDeadline) continue;
    const overdueH = (nowMs - new Date(r.slaDeadline).getTime()) / HOUR;
    if (overdueH <= 0) continue;
    const level = overdueH > 48 ? 3 : overdueH > 24 ? 2 : 1;
    if ((r.escalationLevel || 0) < level) {
      r.escalationLevel = level;
      r.breachedSla = true;
      r.escalatedTo = ESCALATION[level - 1];
      r.escalations = r.escalations || [];
      r.escalations.push({ level, to: ESCALATION[level - 1], at: now() });
      logActivity('escalation', `Report in ${WARDS.find((w) => w.id === r.ward)?.name || r.ward} escalated to ${ESCALATION[level - 1]}`, { reportId: r.id });
      changed++;
    }
  }
  // Auto-release held payouts after 24 h without a dispute
  for (const r of db.reports) {
    if (r.status === 'completed' && r.payoutStatus === 'held' && r.completedAt && nowMs - new Date(r.completedAt).getTime() > 24 * HOUR) {
      releasePayout(r, 'Auto-released after 24 h with no dispute');
      changed++;
    }
  }
  if (changed) save();
  return changed;
}

export function releasePayout(r, note) {
  if (r.payoutStatus === 'released') return;
  const w = find('users', r.assignedTo);
  r.payoutStatus = 'released';
  r.payoutReleasedAt = now();
  if (w) {
    const amount = workerPayFor(w, r.payout);
    w.heldEarnings = Math.max(0, (w.heldEarnings || 0) - amount);
    w.totalEarned = (w.totalEarned || 0) + amount;
    const label = w.workerType === 'salaried' ? 'Performance incentive' : 'Cleanup payout';
    addMoney(w.id, amount, `${label} - ${CATEGORIES[r.ai?.category]?.label || 'Waste'}`, { reportId: r.id, earning: true });
    notify(w.id, 'Payout released', `Rs ${amount} for your cleanup is now in your wallet. ${note || ''}`.trim(), { kind: 'payout', reportId: r.id });
  }
  save();
}

// Salaried municipal staff already get a monthly salary, so they earn a 25%
// performance incentive per task. Gig, informal and volunteer workers get the full payout.
export function workerPayFor(w, payout) {
  return w && w.workerType === 'salaried' ? Math.round(payout * 0.25) : payout;
}

export function distanceOk(a, b, limit) {
  if (!a || !b || a.lat == null || b.lat == null) return { ok: false, distance: null };
  const d = distanceM(a, b);
  return { ok: d <= limit, distance: Math.round(d) };
}
