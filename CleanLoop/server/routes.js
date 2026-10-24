import express from 'express';
import crypto from 'node:crypto';
import { config } from './config.js';
import {
  db, find, filter, insert, update, save, saveImage, readImageAsBase64, settings,
} from './db.js';
import { authOptional, requireRole, signToken, publicUser, hashPassword, checkPassword } from './auth.js';
import {
  CATEGORIES, VOLUMES, SEVERITY, POINTS, WARDS, BADGES, REWARD_CATALOG, GOV_SERVICES, SEGREGATION_GUIDE,
  CITIZEN_LEVELS, DUPLICATE_RADIUS_M, GEOFENCE_M, DAILY_REWARDED_REPORTS, REPORTER_FINE_SHARE,
  normalizeCategory, severityFromScore, payoutFor, levelFor, wardFor, distanceM, hamming, workerTier,
} from './domain.js';
import {
  now, logActivity, notify, addPoints, addMoney, addFund, fundSummary, grantBadge, checkCitizenBadges,
  checkWorkerBadges, slaDeadline, estimatedKg, co2For, enrichReport, cityStats, wardScores, hotspots,
  runEscalations, releasePayout, workerPayFor, distanceOk,
} from './logic.js';
import { aiStatus, cloudAnalyze, cloudVerify } from './ai.js';
import { sendPayout, lookupVehicle, notifyCorporation, integrationStatus, sendSms } from './integrations.js';
import { reseed } from './seed.js';

export const api = express.Router();
api.use(authOptional);

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const bad = (res, msg, code = 400) => res.status(code).json({ error: msg });
const HOUR = 3600 * 1000;
const ACTIVE = ['open', 'review', 'claimed', 'in_progress', 'verifying', 'disputed'];
const isOpen = (r) => !['completed', 'rejected'].includes(r.status);

function toDataUrl(url) {
  const img = readImageAsBase64(url);
  return img ? `data:${img.mime};base64,${img.data}` : null;
}

// ======================================================================= meta
api.get('/meta', (req, res) => {
  res.json({
    categories: CATEGORIES, volumes: VOLUMES, severity: SEVERITY, wards: WARDS, badges: BADGES,
    catalog: REWARD_CATALOG, govServices: GOV_SERVICES, segregation: SEGREGATION_GUIDE, levels: CITIZEN_LEVELS,
    points: POINTS, geofenceM: GEOFENCE_M, demoMode: config.demoMode, ai: aiStatus(), integrations: integrationStatus(),
  });
});

api.get('/health', (req, res) => res.json({ ok: true, time: now() }));

// ======================================================================= auth
api.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const u = find('users', (x) => x.email.toLowerCase() === String(email || '').toLowerCase().trim());
  if (!u || !checkPassword(password, u.password)) return bad(res, 'Email or password is incorrect.', 401);
  if (u.suspended) return bad(res, 'This account is suspended. Contact your ward office.', 403);
  res.json({ token: signToken(u), user: publicUser(u) });
});

api.post('/auth/demo', (req, res) => {
  if (!config.demoMode) return bad(res, 'Demo logins are turned off.', 403);
  const role = req.body?.role;
  const email = { citizen: 'citizen@cleanloop.in', worker: 'worker@cleanloop.in', admin: 'admin@cleanloop.in' }[role];
  const u = email && find('users', (x) => x.email === email);
  if (!u) return bad(res, 'Demo account not found. Run "npm run reset" to recreate demo data.', 404);
  res.json({ token: signToken(u), user: publicUser(u) });
});

api.post('/auth/register', (req, res) => {
  const { name, email, password, role = 'citizen', phone = '', ward, workerType = 'gig', upi = '' } = req.body || {};
  if (!name || !email || !password) return bad(res, 'Name, email and password are required.');
  if (String(password).length < 6) return bad(res, 'Use a password with at least 6 characters.');
  if (!['citizen', 'worker'].includes(role)) return bad(res, 'You can register as a citizen or a worker.');
  if (find('users', (x) => x.email.toLowerCase() === email.toLowerCase().trim())) return bad(res, 'An account with this email already exists.', 409);
  const base = {
    name: String(name).trim(), email: email.toLowerCase().trim(), password: hashPassword(password), role, phone,
    ward: ward || 'adyar', badges: [], points: 0, lifetimePoints: 0, wallet: 0, trustScore: 70, upi,
  };
  const extra = role === 'worker'
    ? { workerType: ['gig', 'informal', 'salaried'].includes(workerType) ? workerType : 'gig', approved: workerType !== 'salaried', hazardCertified: false,
        hasVehicle: false, rating: 0, ratingCount: 0, jobsDone: 0, heldEarnings: 0, totalEarned: 0, online: false, tier: 'Bronze', insured: true }
    : { confirmations: 0 };
  const u = insert('users', { ...base, ...extra });
  logActivity('signup', `${u.name} joined as a ${role === 'worker' ? (extra.workerType === 'informal' ? 'informal-sector worker' : 'worker') : 'citizen'}`);
  notify(u.id, 'Welcome to CleanLoop', role === 'worker'
    ? 'Go online to see cleanup jobs near you. Every job pays the amount shown on the card.'
    : 'Snap a photo of any garbage spot. Our AI does the rest, and you earn points when it is cleaned.');
  res.json({ token: signToken(u), user: publicUser(u) });
});

api.get('/auth/me', requireRole(), (req, res) => res.json({ user: publicUser(req.user) }));

api.post('/me/profile', requireRole(), (req, res) => {
  const { name, phone, ward, upi, language } = req.body || {};
  update('users', req.user.id, {
    ...(name ? { name } : {}), ...(phone !== undefined ? { phone } : {}), ...(ward ? { ward } : {}),
    ...(upi !== undefined ? { upi } : {}), ...(language ? { language } : {}),
  });
  res.json({ user: publicUser(req.user) });
});

// ======================================================================= AI
api.get('/ai/status', (req, res) => res.json(aiStatus()));

api.post('/ai/analyze', requireRole(), wrap(async (req, res) => {
  const result = await cloudAnalyze({ image: req.body?.image });
  res.json({ cloud: result });
}));

api.post('/ai/verify', requireRole(), wrap(async (req, res) => {
  const result = await cloudVerify({ before: req.body?.before, after: req.body?.after });
  res.json({ cloud: result });
}));

// ======================================================================= public
api.get('/public/stats', (req, res) => {
  const recent = db.reports
    .filter((r) => r.status === 'completed')
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 12)
    .map((r) => ({
      id: r.id, ward: r.ward, category: r.ai?.category, volume: r.ai?.volume, severity: r.ai?.severity,
      photo: r.photo, afterPhoto: r.afterPhoto, completedAt: r.completedAt, createdAt: r.createdAt,
      hours: Math.round(((new Date(r.completedAt) - new Date(r.createdAt)) / HOUR) * 10) / 10,
      workerName: find('users', r.assignedTo)?.name?.split(' ')[0] || 'A worker',
    }));
  const daily = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const e = new Date(d); e.setDate(e.getDate() + 1);
    const inDay = (t) => t && new Date(t) >= d && new Date(t) < e;
    daily.push({
      date: d.toISOString().slice(0, 10),
      reported: db.reports.filter((r) => inDay(r.createdAt)).length,
      cleaned: db.reports.filter((r) => r.status === 'completed' && inDay(r.completedAt)).length,
    });
  }
  const spotlight = db.users.find((u) => u.role === 'worker' && u.spotlight);
  res.json({
    stats: cityStats(), wards: wardScores(), recent, daily,
    spotlight: spotlight ? { name: spotlight.name, ward: spotlight.ward, jobsDone: spotlight.jobsDone, rating: spotlight.rating, workerType: spotlight.workerType, quote: spotlight.quote } : null,
    map: db.reports.filter((r) => r.status !== 'rejected').map((r) => ({ id: r.id, lat: r.lat, lng: r.lng, status: r.status, category: r.ai?.category, severity: r.ai?.severity })),
  });
});

api.get('/leaderboard', (req, res) => {
  const citizens = db.users.filter((u) => u.role === 'citizen' && !u.suspended)
    .sort((a, b) => (b.lifetimePoints || 0) - (a.lifetimePoints || 0)).slice(0, 25)
    .map((u, i) => ({ rank: i + 1, id: u.id, name: u.name, ward: u.ward, points: u.lifetimePoints || 0, level: levelFor(u.lifetimePoints || 0).name, badges: (u.badges || []).length }));
  const workers = db.users.filter((u) => u.role === 'worker' && u.approved !== false)
    .sort((a, b) => (b.jobsDone || 0) * (b.rating || 1) - (a.jobsDone || 0) * (a.rating || 1)).slice(0, 25)
    .map((u, i) => ({ rank: i + 1, id: u.id, name: u.name, ward: u.ward, jobsDone: u.jobsDone || 0, rating: u.rating || 0, tier: workerTier(u), workerType: u.workerType }));
  const wardPoints = {};
  for (const u of db.users.filter((x) => x.role === 'citizen')) wardPoints[u.ward] = (wardPoints[u.ward] || 0) + (u.lifetimePoints || 0);
  const wards = wardScores().map((w) => ({ ...w, points: wardPoints[w.id] || 0 }))
    .sort((a, b) => b.score * 100 + b.points / 100 - (a.score * 100 + a.points / 100))
    .map((w, i) => ({ rank: i + 1, ...w }));
  res.json({ citizens, workers, wards });
});

// ======================================================================= citizen: reports
function findDuplicate({ lat, lng, phash, category, excludeUser }) {
  let best = null;
  for (const r of db.reports) {
    if (!isOpen(r) || r.lat == null) continue;
    const d = distanceM({ lat, lng }, r);
    if (d > DUPLICATE_RADIUS_M) continue;
    const h = hamming(phash, r.phash);
    const similar = h <= 14 || d <= 15 || (d <= 25 && r.ai?.category === category);
    if (!similar) continue;
    const score = d + h;
    if (!best || score < best.score) best = { report: r, distance: Math.round(d), hamming: h, score };
  }
  return best;
}

api.post('/reports/check-duplicate', requireRole('citizen'), (req, res) => {
  const { lat, lng, phash, category } = req.body || {};
  const dup = findDuplicate({ lat, lng, phash, category: normalizeCategory(category) });
  const reused = db.reports.some((r) => r.citizenId === req.user.id && r.phash && hamming(r.phash, phash) <= 4);
  res.json({
    reused,
    duplicate: dup ? { id: dup.report.id, distance: dup.distance, status: dup.report.status, confirmations: (dup.report.confirmations || []).length, category: dup.report.ai?.category } : null,
  });
});

api.post('/reports', requireRole('citizen'), wrap(async (req, res) => {
  const u = req.user;
  const { image, lat, lng, accuracy, ai = {}, phash, captureMode = 'camera', capturedAt, note = '', address = '' } = req.body || {};
  if (lat == null || lng == null) return bad(res, 'Location is required. Allow location access or drop a pin on the map.');
  if (!image) return bad(res, 'A photo is required.');
  if (captureMode !== 'camera' && !config.demoMode) return bad(res, 'Photos must be taken with the in-app camera.');
  if (ai.isWaste === false && ai.provider === 'gemini') return bad(res, 'The AI could not find any waste in this photo. Retake it with the garbage clearly in frame.', 422);

  // Re-used photo by the same person: block and lower trust.
  if (phash && db.reports.some((r) => r.citizenId === u.id && r.phash && hamming(r.phash, phash) <= 4)) {
    u.trustScore = Math.max(0, (u.trustScore || 70) - 5);
    save();
    return bad(res, 'This photo was already used in one of your reports. Take a fresh photo of the spot.', 409);
  }

  const category = normalizeCategory(ai.category);
  const volume = VOLUMES[ai.volume] ? ai.volume : 'pile';
  const severityScore = Math.max(0, Math.min(100, Math.round(Number(ai.severityScore) || 40)));
  const analysis = {
    provider: ai.provider || 'offline', providerLabel: ai.providerLabel || 'Offline AI (on device)',
    category, secondary: (ai.secondary || []).map(normalizeCategory), confidence: Number(ai.confidence) || 0.6,
    volume, severityScore, severity: severityFromScore(severityScore),
    hazard: Boolean(ai.hazard) || CATEGORIES[category].hazard, hazardNote: ai.hazardNote || '',
    items: (ai.items || []).slice(0, 6), recyclablePercent: Number(ai.recyclablePercent) || 0,
    summary: ai.summary || '', workerNote: ai.workerNote || '', correctedByUser: Boolean(ai.correctedByUser),
    modelLabel: ai.modelLabel || null,
  };

  const dup = findDuplicate({ lat, lng, phash, category });
  const photo = saveImage(image, 'rep');

  if (dup) {
    const r = dup.report;
    r.confirmations = r.confirmations || [];
    const already = r.citizenId === u.id || r.confirmations.some((c) => c.userId === u.id);
    if (!already) {
      r.confirmations.push({ userId: u.id, at: now(), photo, distance: dup.distance });
      r.ai.severityScore = Math.min(100, (r.ai.severityScore || 40) + 5);
      r.ai.severity = severityFromScore(r.ai.severityScore);
      addPoints(u.id, POINTS.confirmation, 'Confirmed an existing report', { reportId: r.id });
      notify(r.citizenId, 'Your report was confirmed', `Another citizen confirmed the spot you reported. Priority raised to ${r.ai.severity}.`, { reportId: r.id });
    }
    save();
    return res.json({ merged: true, alreadyConfirmed: already, report: enrichReport(r, u), distance: dup.distance, pointsAwarded: already ? 0 : POINTS.confirmation });
  }

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayCount = db.reports.filter((r) => r.citizenId === u.id && new Date(r.createdAt) >= today).length;
  const rewardEligible = todayCount < DAILY_REWARDED_REPORTS;
  const lowTrust = (u.trustScore ?? 70) < 35;
  const ward = wardFor(lat, lng);

  const r = insert('reports', {
    type: 'garbage', citizenId: u.id, photo, lat: Number(lat), lng: Number(lng), accuracy: accuracy || null,
    address: address || `${ward.name}, Chennai`, ward: ward.id, phash: phash || null, captureMode, capturedAt: capturedAt || now(),
    note: String(note).slice(0, 300), ai: analysis,
    status: lowTrust ? 'review' : 'open',
    payout: Math.round(payoutFor(category, volume, analysis.severity) * (settings().payMultiplier || 1)),
    pointsPending: rewardEligible ? SEVERITY[analysis.severity].points : 0,
    rewardEligible, confirmations: [], slaDeadline: slaDeadline(analysis.severity), escalationLevel: 0,
    requiresCertified: analysis.hazard, needsVehicle: VOLUMES[volume].needsVehicle,
  });
  logActivity('report', `New ${analysis.severity} ${CATEGORIES[category].label.toLowerCase()} report in ${ward.name}`, { reportId: r.id, lat: r.lat, lng: r.lng });
  if (analysis.severity === 'critical' || analysis.hazard) {
    for (const w of db.users.filter((x) => x.role === 'worker' && x.online && (!analysis.hazard || x.hazardCertified))) {
      notify(w.id, analysis.hazard ? 'Hazardous job nearby' : 'Urgent job nearby', `${CATEGORIES[category].label} in ${ward.name} - Rs ${r.payout}`, { reportId: r.id, kind: 'job' });
    }
  }
  res.json({ merged: false, report: enrichReport(r, u), rewardEligible, lowTrust });
}));

api.get('/reports/mine', requireRole('citizen'), (req, res) => {
  const mine = db.reports.filter((r) => r.citizenId === req.user.id || (r.confirmations || []).some((c) => c.userId === req.user.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((r) => ({ ...enrichReport(r, req.user), isConfirmation: r.citizenId !== req.user.id }));
  res.json({ reports: mine });
});

api.get('/reports/map', requireRole(), (req, res) => {
  const cutoff = Date.now() - 21 * 24 * HOUR;
  const list = db.reports
    .filter((r) => r.status !== 'rejected' && (isOpen(r) || new Date(r.completedAt || r.createdAt).getTime() > cutoff))
    .map((r) => ({ id: r.id, lat: r.lat, lng: r.lng, status: r.status, category: r.ai?.category, severity: r.ai?.severity, volume: r.ai?.volume, photo: r.photo, ward: r.ward, createdAt: r.createdAt, confirmations: (r.confirmations || []).length, mine: r.citizenId === req.user.id }));
  res.json({ reports: list });
});

api.get('/reports/:id', requireRole(), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r) return bad(res, 'Report not found.', 404);
  res.json({ report: enrichReport(r, req.user) });
});

api.post('/reports/:id/confirm-cleanup', requireRole('citizen'), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.citizenId !== req.user.id) return bad(res, 'Only the person who reported this spot can confirm it.', 403);
  if (r.status !== 'completed' || r.citizenConfirmation) return bad(res, 'This cleanup is not waiting for confirmation.');
  const { ok, stars, tipPoints = 0, comment = '' } = req.body || {};
  const w = find('users', r.assignedTo);
  if (ok) {
    r.citizenConfirmation = { ok: true, at: now(), stars: stars || null, comment };
    req.user.confirmations = (req.user.confirmations || 0) + 1;
    addPoints(req.user.id, POINTS.confirmCleanup, 'Confirmed a cleanup', { reportId: r.id });
    if (w && stars) {
      w.rating = Math.round((((w.rating || 0) * (w.ratingCount || 0) + Number(stars)) / ((w.ratingCount || 0) + 1)) * 100) / 100;
      w.ratingCount = (w.ratingCount || 0) + 1;
    }
    const tip = Math.min(Number(tipPoints) || 0, req.user.points || 0);
    if (w && tip > 0) {
      addPoints(req.user.id, -tip, `Thank-you tip for ${w.name}`, { reportId: r.id });
      addMoney(w.id, Math.round(tip * POINTS.rupeesPerPoint), `Thank-you tip from a citizen`, { reportId: r.id, earning: true });
      w.totalEarned = (w.totalEarned || 0) + Math.round(tip * POINTS.rupeesPerPoint);
      notify(w.id, 'You got a thank-you tip', `A citizen tipped you Rs ${Math.round(tip * POINTS.rupeesPerPoint)} for your cleanup${comment ? `: "${comment}"` : '.'}`, { kind: 'tip' });
    }
    if (r.payoutStatus === 'held') releasePayout(r, 'Confirmed by the citizen who reported it.');
    if (w) checkWorkerBadges(w);
    checkCitizenBadges(req.user);
  } else {
    r.citizenConfirmation = { ok: false, at: now(), comment };
    r.status = 'disputed';
    r.payoutStatus = 'on_hold';
    logActivity('dispute', `Citizen disputed a cleanup in ${WARDS.find((x) => x.id === r.ward)?.name}`, { reportId: r.id });
    if (w) notify(w.id, 'Cleanup disputed', 'The reporter says the spot is not clean. An admin will review the photos.', { reportId: r.id });
  }
  save();
  res.json({ report: enrichReport(r, req.user), user: publicUser(req.user) });
});

// ======================================================================= citizen: violations (illegal dumping)
api.post('/violations', requireRole('citizen'), (req, res) => {
  const { images = [], lat, lng, plate = '', vehicleType = '', description = '', facesBlurred = 0, offenderType = 'vehicle' } = req.body || {};
  if (!images.length) return bad(res, 'Add at least one photo as evidence.');
  if (lat == null || lng == null) return bad(res, 'Location is required.');
  if (offenderType === 'vehicle' && !String(plate).trim()) return bad(res, 'Enter the vehicle number so the authority can trace it.');
  const photos = images.slice(0, 4).map((im) => saveImage(im, 'vio')).filter(Boolean);
  const ward = wardFor(lat, lng);
  const v = insert('violations', {
    reporterId: req.user.id, photos, lat: Number(lat), lng: Number(lng), ward: ward.id,
    plate: String(plate).toUpperCase().replace(/\s+/g, ' ').trim(), vehicleType, offenderType,
    description: String(description).slice(0, 500), facesBlurred: Number(facesBlurred) || 0, status: 'under_review',
  });
  logActivity('violation', `Illegal dumping reported in ${ward.name}`, { violationId: v.id });
  res.json({ violation: v });
});

api.get('/violations/mine', requireRole('citizen'), (req, res) => {
  res.json({ violations: db.violations.filter((v) => v.reporterId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

// ======================================================================= citizen: dashboard, wallet, rewards
api.get('/me/dashboard', requireRole(), (req, res) => {
  const u = req.user;
  const out = { user: publicUser(u) };
  if (u.role === 'citizen') {
    const mine = db.reports.filter((r) => r.citizenId === u.id);
    const done = mine.filter((r) => r.status === 'completed');
    const kg = done.reduce((s, r) => s + estimatedKg(r), 0);
    const pickKg = db.pickups.filter((p) => p.citizenId === u.id && p.status === 'completed').reduce((s, p) => s + (p.actualKg || 0), 0);
    out.level = levelFor(u.lifetimePoints || 0);
    const rank = db.users.filter((x) => x.role === 'citizen').sort((a, b) => (b.lifetimePoints || 0) - (a.lifetimePoints || 0)).findIndex((x) => x.id === u.id) + 1;
    out.stats = {
      reports: mine.length, cleaned: done.length, open: mine.filter(isOpen).length,
      kg: Math.round(kg + pickKg), co2: Math.round(done.reduce((s, r) => s + co2For(r.ai?.category, estimatedKg(r)), 0) + pickKg * 0.9),
      rank, violations: db.violations.filter((v) => v.reporterId === u.id).length,
      awaitingConfirmation: done.filter((r) => !r.citizenConfirmation).length,
    };
    out.awaiting = done.filter((r) => !r.citizenConfirmation).slice(0, 3).map((r) => enrichReport(r, u));
    out.ward = wardScores().find((w) => w.id === u.ward);
  }
  if (u.role === 'worker') {
    out.tier = workerTier(u);
  }
  out.unread = db.notifications.filter((n) => n.userId === u.id && !n.read).length;
  res.json(out);
});

api.get('/me/wallet', requireRole(), (req, res) => {
  const tx = db.transactions.filter((t) => t.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 80);
  const red = db.redemptions.filter((t) => t.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ points: req.user.points || 0, wallet: req.user.wallet || 0, transactions: tx, redemptions: red, user: publicUser(req.user) });
});

api.post('/me/withdraw', requireRole(), wrap(async (req, res) => {
  const amount = Math.floor(Number(req.body?.amount) || 0);
  const upi = String(req.body?.upi || req.user.upi || '').trim();
  if (amount < 10) return bad(res, 'The minimum withdrawal is Rs 10.');
  if (amount > (req.user.wallet || 0)) return bad(res, 'That is more than your wallet balance.');
  if (!upi) return bad(res, 'Add your UPI ID first.');
  const p = await sendPayout({ userId: req.user.id, amount, upi, note: 'CleanLoop withdrawal' });
  addMoney(req.user.id, -amount, `Withdrawn to ${upi}`, { reference: p.reference, simulated: p.simulated });
  req.user.upi = upi;
  save();
  res.json({ ok: true, reference: p.reference, simulated: p.simulated, user: publicUser(req.user) });
}));

api.post('/rewards/redeem', requireRole('citizen'), (req, res) => {
  const item = REWARD_CATALOG.find((i) => i.id === req.body?.itemId);
  if (!item) return bad(res, 'Reward not found.', 404);
  if ((req.user.points || 0) < item.cost) return bad(res, `You need ${item.cost - (req.user.points || 0)} more points for this reward.`);
  addPoints(req.user.id, -item.cost, `Redeemed: ${item.title}`);
  const code = `CL-${crypto.randomBytes(3).toString('hex').toUpperCase()}-${item.id.slice(0, 3).toUpperCase()}`;
  const r = insert('redemptions', { userId: req.user.id, itemId: item.id, title: item.title, cost: item.cost, value: item.value, code, partner: item.partner });
  addFund('rewards', item.value, 'out', `Redemption: ${item.title}`);
  res.json({ redemption: r, user: publicUser(req.user) });
});

// ======================================================================= notifications
api.get('/notifications', requireRole(), (req, res) => {
  res.json({ notifications: db.notifications.filter((n) => n.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 50) });
});
api.post('/notifications/read', requireRole(), (req, res) => {
  for (const n of db.notifications) if (n.userId === req.user.id) n.read = true;
  save();
  res.json({ ok: true });
});

// ======================================================================= drives
api.get('/drives', requireRole(), (req, res) => {
  const list = db.drives.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map((d) => ({
    ...d, organizerName: find('users', d.organizerId)?.name || 'Ward office', joined: (d.participants || []).includes(req.user.id), count: (d.participants || []).length,
  }));
  res.json({ drives: list });
});
api.post('/drives', requireRole('citizen', 'admin'), (req, res) => {
  const { title, date, place, lat, lng, description = '', goalKg = 100 } = req.body || {};
  if (!title || !date || !place) return bad(res, 'Title, date and meeting place are required.');
  const w = lat != null ? wardFor(lat, lng) : WARDS.find((x) => x.id === req.user.ward) || WARDS[0];
  const d = insert('drives', { title, date, place, lat: lat ?? w.lat, lng: lng ?? w.lng, ward: w.id, description, goalKg: Number(goalKg) || 100, organizerId: req.user.id, participants: [req.user.id], status: 'upcoming', kgCollected: 0 });
  logActivity('drive', `New cleanup drive "${title}" in ${w.name}`);
  res.json({ drive: d });
});
api.post('/drives/:id/join', requireRole('citizen', 'worker'), (req, res) => {
  const d = find('drives', req.params.id);
  if (!d) return bad(res, 'Drive not found.', 404);
  d.participants = d.participants || [];
  if (!d.participants.includes(req.user.id)) {
    d.participants.push(req.user.id);
    addPoints(req.user.id, POINTS.driveJoin, `Joined drive: ${d.title}`);
    if (req.user.role === 'citizen') checkCitizenBadges(req.user);
  }
  save();
  res.json({ drive: d, user: publicUser(req.user) });
});

// ======================================================================= pickups & gov services
api.get('/pickups/mine', requireRole('citizen'), (req, res) => {
  res.json({ pickups: db.pickups.filter((p) => p.citizenId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});
api.post('/pickups', requireRole('citizen'), (req, res) => {
  const { materials = [], estKg = 5, slot, date, address = '', lat, lng } = req.body || {};
  if (!materials.length) return bad(res, 'Choose at least one material.');
  if (!date || !slot) return bad(res, 'Pick a date and a time slot.');
  const w = lat != null ? wardFor(lat, lng) : WARDS.find((x) => x.id === req.user.ward) || WARDS[0];
  const p = insert('pickups', { citizenId: req.user.id, materials: materials.map(normalizeCategory), estKg: Number(estKg) || 5, slot, date, address, ward: w.id, lat: lat ?? w.lat, lng: lng ?? w.lng, status: 'scheduled' });
  logActivity('pickup', `Doorstep pickup booked in ${w.name}`);
  res.json({ pickup: p });
});
api.get('/services/mine', requireRole('citizen'), (req, res) => {
  res.json({ requests: db.serviceRequests.filter((s) => s.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});
api.post('/services/:id/request', requireRole('citizen'), (req, res) => {
  const svc = GOV_SERVICES.find((s) => s.id === req.params.id);
  if (!svc) return bad(res, 'Service not found.', 404);
  const s = insert('serviceRequests', { userId: req.user.id, serviceId: svc.id, title: svc.title, kind: svc.kind, note: String(req.body?.note || '').slice(0, 300), date: req.body?.date || null, ward: req.user.ward, status: svc.kind === 'event' ? 'registered' : 'submitted' });
  logActivity('service', `${svc.kind === 'event' ? 'Registration' : 'Request'}: ${svc.title}`);
  res.json({ request: s });
});

// ======================================================================= jobs (workers + citizen volunteers)
function jobEligibility(user, r) {
  if (user.role === 'citizen') {
    if (r.citizenId === user.id) return { ok: false, reason: 'You reported this spot' };
    if (r.ai?.hazard) return { ok: false, reason: 'Hazardous - trained workers only' };
    if (!['bag', 'pile'].includes(r.ai?.volume)) return { ok: false, reason: 'Too large for volunteers' };
    return { ok: true };
  }
  if (user.approved === false) return { ok: false, reason: 'Account awaiting approval' };
  if (r.ai?.hazard && !user.hazardCertified) return { ok: false, reason: 'Needs hazard certification' };
  if (VOLUMES[r.ai?.volume]?.needsVehicle && !user.hasVehicle) return { ok: false, reason: 'Needs a vehicle' };
  return { ok: true };
}

function jobView(r, user, origin) {
  const e = jobEligibility(user, r);
  const pay = user.role === 'citizen' ? r.payout * 2 : workerPayFor(user, r.payout);
  return {
    id: r.id, lat: r.lat, lng: r.lng, ward: r.ward, address: r.address, photo: r.photo, status: r.status, ai: r.ai,
    payout: r.payout, yourPay: pay, payUnit: user.role === 'citizen' ? 'points' : 'Rs', createdAt: r.createdAt,
    slaDeadline: r.slaDeadline, overdue: r.slaDeadline && new Date(r.slaDeadline) < new Date(), confirmations: (r.confirmations || []).length,
    distance: origin ? Math.round(distanceM(origin, r)) : null, eligible: e.ok, lockedReason: e.reason || null,
    assignedToYou: r.assignedTo === user.id, claimedAt: r.claimedAt, checkinAt: r.checkinAt, beforePhoto: r.beforePhoto,
    afterPhoto: r.afterPhoto, verification: r.verification, payoutStatus: r.payoutStatus, completedAt: r.completedAt,
    escalationLevel: r.escalationLevel || 0, assignedByAdmin: r.assignedByAdmin || false, note: r.note,
  };
}

function originOf(req, user) {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  if (user.lat != null) return { lat: user.lat, lng: user.lng };
  const w = WARDS.find((x) => x.id === user.ward) || WARDS[0];
  return { lat: w.lat, lng: w.lng };
}

api.get('/jobs/feed', requireRole('worker', 'citizen'), (req, res) => {
  const origin = originOf(req, req.user);
  const jobs = db.reports.filter((r) => r.status === 'open')
    .map((r) => jobView(r, req.user, origin))
    .sort((a, b) => (b.eligible - a.eligible) || ((b.overdue ? 1 : 0) - (a.overdue ? 1 : 0)) || a.distance - b.distance);
  res.json({ jobs, origin });
});

api.get('/jobs/active', requireRole('worker', 'citizen'), (req, res) => {
  const origin = originOf(req, req.user);
  const jobs = db.reports.filter((r) => r.assignedTo === req.user.id && ['claimed', 'in_progress', 'verifying', 'disputed'].includes(r.status))
    .map((r) => jobView(r, req.user, origin));
  res.json({ jobs });
});

api.get('/jobs/history', requireRole('worker', 'citizen'), (req, res) => {
  const jobs = db.reports.filter((r) => r.assignedTo === req.user.id && r.status === 'completed')
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 60)
    .map((r) => ({ ...jobView(r, req.user, null), citizenConfirmation: r.citizenConfirmation }));
  res.json({ jobs });
});

api.post('/jobs/:id/claim', requireRole('worker', 'citizen'), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r) return bad(res, 'Job not found.', 404);
  if (r.status !== 'open') return bad(res, 'Someone else just claimed this job.', 409);
  const e = jobEligibility(req.user, r);
  if (!e.ok) return bad(res, e.reason, 403);
  const activeCount = db.reports.filter((x) => x.assignedTo === req.user.id && ['claimed', 'in_progress'].includes(x.status)).length;
  const limit = req.user.role === 'citizen' ? 1 : 4;
  if (activeCount >= limit) return bad(res, `Finish your current job${limit > 1 ? 's' : ''} first (limit ${limit} at a time).`);
  Object.assign(r, { status: 'claimed', assignedTo: req.user.id, claimedAt: now(), assignedByAdmin: false });
  save();
  logActivity('claim', `${req.user.name.split(' ')[0]} claimed a job in ${WARDS.find((w) => w.id === r.ward)?.name}`, { reportId: r.id });
  notify(r.citizenId, 'A worker is on the way', `${req.user.name.split(' ')[0]} accepted the cleanup of your report.`, { reportId: r.id });
  res.json({ job: jobView(r, req.user, originOf(req, req.user)) });
});

api.post('/jobs/:id/release', requireRole('worker', 'citizen'), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.assignedTo !== req.user.id || !['claimed', 'in_progress'].includes(r.status)) return bad(res, 'You cannot release this job.');
  Object.assign(r, { status: 'open', assignedTo: null, claimedAt: null, checkinAt: null, beforePhoto: null });
  save();
  res.json({ ok: true });
});

api.post('/jobs/:id/checkin', requireRole('worker', 'citizen'), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.assignedTo !== req.user.id) return bad(res, 'This job is not assigned to you.', 403);
  if (r.status !== 'claimed') return bad(res, 'You have already checked in.');
  const { lat, lng, simulated, checklist = [] } = req.body || {};
  const chk = distanceOk({ lat, lng }, r, GEOFENCE_M);
  if (!chk.ok && !(simulated && config.demoMode)) {
    return bad(res, chk.distance == null ? 'We could not read your location. Turn on GPS and try again.' : `You are ${chk.distance} m away. Move within ${GEOFENCE_M} m of the spot to check in.`);
  }
  if (r.ai?.hazard && checklist.length < 3) return bad(res, 'Tick every safety item before starting a hazardous job.');
  Object.assign(r, { status: 'in_progress', checkinAt: now(), checkin: { lat, lng, distance: chk.distance, simulated: Boolean(simulated && !chk.ok), checklist } });
  save();
  res.json({ job: jobView(r, req.user, { lat: lat ?? r.lat, lng: lng ?? r.lng }) });
});

api.post('/jobs/:id/before', requireRole('worker', 'citizen'), (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.assignedTo !== req.user.id || r.status !== 'in_progress') return bad(res, 'Check in at the spot first.');
  const photo = saveImage(req.body?.image, 'bef');
  if (!photo) return bad(res, 'The before photo could not be read.');
  Object.assign(r, { beforePhoto: photo, beforeAt: now(), beforeLoc: { lat: req.body?.lat, lng: req.body?.lng } });
  save();
  res.json({ job: jobView(r, req.user, null) });
});

function completeReport(r, verification, approvedBy = null) {
  const w = find('users', r.assignedTo);
  const reporter = find('users', r.citizenId);
  r.status = 'completed';
  r.completedAt = r.completedAt || now();
  r.verification = { ...(r.verification || {}), ...verification, approvedBy };
  if (r.slaDeadline && new Date(r.completedAt) > new Date(r.slaDeadline)) r.breachedSla = true;
  if (w) {
    w.jobsDone = (w.jobsDone || 0) + 1;
    if (w.role === 'citizen') {
      r.payoutStatus = 'released';
      addPoints(w.id, r.payout * 2, 'Volunteer cleanup completed', { reportId: r.id });
      checkCitizenBadges(w);
    } else {
      r.payoutStatus = 'held';
      w.heldEarnings = (w.heldEarnings || 0) + workerPayFor(w, r.payout);
      checkWorkerBadges(w);
    }
    notify(w.id, 'Cleanup verified', w.role === 'citizen' ? `You earned ${r.payout * 2} points. Thank you!` : `Rs ${workerPayFor(w, r.payout)} is held until the citizen confirms (or 24 h).`, { reportId: r.id });
  }
  if (reporter) {
    if (r.rewardEligible && r.pointsPending) {
      addPoints(reporter.id, r.pointsPending, `Verified report - ${CATEGORIES[r.ai?.category]?.label}`, { reportId: r.id });
      reporter.trustScore = Math.min(100, (reporter.trustScore ?? 70) + 2);
    }
    for (const c of r.confirmations || []) {
      const cu = find('users', c.userId);
      if (cu) cu.trustScore = Math.min(100, (cu.trustScore ?? 70) + 1);
    }
    notify(reporter.id, 'Your spot was cleaned', 'See the before and after photos and confirm the cleanup.', { reportId: r.id, kind: 'confirm' });
    checkCitizenBadges(reporter);
  }
  addFund('operations', w && w.role !== 'citizen' ? workerPayFor(w, r.payout) : 0, 'out', 'Cleanup payout');
  logActivity('cleaned', `${CATEGORIES[r.ai?.category]?.label} spot cleaned in ${WARDS.find((x) => x.id === r.ward)?.name}`, { reportId: r.id });
  save();
}

api.post('/jobs/:id/after', requireRole('worker', 'citizen'), wrap(async (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.assignedTo !== req.user.id || r.status !== 'in_progress') return bad(res, 'This job is not in progress.');
  if (!r.beforePhoto) return bad(res, 'Take the before photo first.');
  const { image, lat, lng, simulated, offline = {} } = req.body || {};
  const gapSec = (Date.now() - new Date(r.beforeAt).getTime()) / 1000;
  if (gapSec < 60 && !config.demoMode) return bad(res, 'Take the after photo once the cleanup is done (at least a minute after the before photo).');
  const loc = distanceOk({ lat, lng }, r, GEOFENCE_M);
  if (!loc.ok && !(simulated && config.demoMode)) return bad(res, `The after photo must be taken at the spot. You are ${loc.distance ?? '?'} m away.`);
  const photo = saveImage(image, 'aft');
  if (!photo) return bad(res, 'The after photo could not be read.');

  let v = {
    provider: 'offline', sceneMatch: Number(offline.sceneMatch) || 0, garbageBefore: Number(offline.garbageBefore) || 0,
    garbageAfter: Number(offline.garbageAfter) || 0, cleared: Boolean(offline.cleared), remark: offline.remark || '',
  };
  const cloud = await cloudVerify({ before: toDataUrl(r.beforePhoto), after: image });
  if (cloud) v = { ...cloud };
  v.distance = loc.distance;
  v.simulatedLocation = Boolean(simulated && !loc.ok);
  v.secondsBetween = Math.round(gapSec);
  v.passed = v.cleared && v.sceneMatch >= 0.5;
  v.at = now();
  Object.assign(r, { afterPhoto: photo, afterAt: now(), verification: v });

  if (v.passed) {
    completeReport(r, v);
  } else {
    r.status = 'verifying';
    logActivity('verify', `Cleanup in ${WARDS.find((x) => x.id === r.ward)?.name} needs a manual check`, { reportId: r.id });
    save();
  }
  res.json({ job: jobView(r, req.user, null), verification: v });
}));

api.get('/worker/earnings', requireRole('worker', 'citizen'), (req, res) => {
  const u = req.user;
  const tx = db.transactions.filter((t) => t.userId === u.id && t.kind === 'money' && t.earning);
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const e = new Date(d); e.setDate(e.getDate() + 1);
    days.push({ date: d.toISOString().slice(0, 10), amount: tx.filter((t) => new Date(t.createdAt) >= d && new Date(t.createdAt) < e).reduce((s, t) => s + t.amount, 0) });
  }
  const sum = (ms) => tx.filter((t) => Date.now() - new Date(t.createdAt).getTime() < ms).reduce((s, t) => s + t.amount, 0);
  res.json({
    today: sum(24 * HOUR), week: sum(7 * 24 * HOUR), month: sum(30 * 24 * HOUR), total: u.totalEarned || 0,
    held: u.heldEarnings || 0, wallet: u.wallet || 0, salary: u.workerType === 'salaried' ? u.monthlySalary || 18500 : null,
    days, tips: tx.filter((t) => /tip/i.test(t.description)).reduce((s, t) => s + t.amount, 0),
    tier: workerTier(u), rating: u.rating, jobsDone: u.jobsDone || 0,
  });
});

api.post('/worker/status', requireRole('worker'), (req, res) => {
  const { online, lat, lng } = req.body || {};
  if (online !== undefined) req.user.online = Boolean(online);
  if (lat != null && lng != null) { req.user.lat = Number(lat); req.user.lng = Number(lng); req.user.locAt = now(); }
  save();
  res.json({ user: publicUser(req.user) });
});

api.post('/worker/sos', requireRole('worker', 'citizen'), wrap(async (req, res) => {
  const { lat, lng, message = '' } = req.body || {};
  const s = insert('sos', { userId: req.user.id, name: req.user.name, phone: req.user.phone, lat, lng, message: String(message).slice(0, 200), status: 'open' });
  logActivity('sos', `SOS from ${req.user.name}`, { sosId: s.id, lat, lng });
  await sendSms({ to: 'ward-control-room', message: `SOS from ${req.user.name} (${req.user.phone || 'no phone'}) at ${lat},${lng}` });
  res.json({ sos: s });
}));

// Nearest-neighbour route + 2-opt improvement over the worker's active jobs.
api.get('/worker/route', requireRole('worker', 'citizen'), (req, res) => {
  const origin = originOf(req, req.user);
  const stops = db.reports.filter((r) => r.assignedTo === req.user.id && ['claimed', 'in_progress'].includes(r.status));
  const pts = stops.map((r) => ({ id: r.id, lat: r.lat, lng: r.lng, label: CATEGORIES[r.ai?.category]?.label, payout: r.payout, ward: r.ward }));
  const order = [];
  const left = [...pts];
  let cur = origin;
  while (left.length) {
    let bi = 0;
    left.forEach((p, i) => { if (distanceM(cur, p) < distanceM(cur, left[bi])) bi = i; });
    cur = left.splice(bi, 1)[0];
    order.push(cur);
  }
  const total = (arr) => arr.reduce((s, p, i) => s + distanceM(i ? arr[i - 1] : origin, p), 0);
  let improved = true;
  while (improved && order.length > 3) {
    improved = false;
    for (let i = 0; i < order.length - 1; i++) for (let k = i + 1; k < order.length; k++) {
      const cand = [...order.slice(0, i), ...order.slice(i, k + 1).reverse(), ...order.slice(k + 1)];
      if (total(cand) + 1 < total(order)) { order.splice(0, order.length, ...cand); improved = true; }
    }
  }
  const naive = total(pts);
  const best = total(order);
  res.json({ origin, stops: order, distanceM: Math.round(best), naiveDistanceM: Math.round(naive), etaMin: Math.round(best / 1000 / 18 * 60 + order.length * 12) });
});

// ======================================================================= admin
const admin = express.Router();
api.use('/admin', requireRole('admin'), admin);

admin.get('/overview', (req, res) => {
  const stats = cityStats();
  const daily = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const e = new Date(d); e.setDate(e.getDate() + 1);
    const inDay = (t) => t && new Date(t) >= d && new Date(t) < e;
    daily.push({ date: d.toISOString().slice(0, 10), reported: db.reports.filter((r) => inDay(r.createdAt)).length, cleaned: db.reports.filter((r) => r.status === 'completed' && inDay(r.completedAt)).length });
  }
  const byCategory = {};
  const bySeverity = {};
  for (const r of db.reports) {
    byCategory[r.ai?.category || 'mixed'] = (byCategory[r.ai?.category || 'mixed'] || 0) + 1;
    if (isOpen(r)) bySeverity[r.ai?.severity || 'medium'] = (bySeverity[r.ai?.severity || 'medium'] || 0) + 1;
  }
  res.json({
    stats, daily, byCategory, bySeverity, wards: wardScores(),
    activity: db.activity.slice(-25).reverse(),
    pending: {
      verifying: db.reports.filter((r) => r.status === 'verifying').length,
      disputed: db.reports.filter((r) => r.status === 'disputed').length,
      review: db.reports.filter((r) => r.status === 'review').length,
      violations: db.violations.filter((v) => v.status === 'under_review').length,
      workerApprovals: db.users.filter((u) => u.role === 'worker' && u.approved === false).length,
      pickups: db.pickups.filter((p) => p.status === 'scheduled').length,
      sos: db.sos.filter((s) => s.status === 'open').length,
    },
    sos: db.sos.filter((s) => s.status === 'open'),
    ai: aiStatus(), integrations: integrationStatus(),
  });
});

admin.get('/reports', (req, res) => {
  const { status, ward, category, severity, q } = req.query;
  let list = db.reports.slice();
  if (status && status !== 'all') list = list.filter((r) => (status === 'active' ? isOpen(r) : status === 'overdue' ? isOpen(r) && new Date(r.slaDeadline) < new Date() : r.status === status));
  if (ward) list = list.filter((r) => r.ward === ward);
  if (category) list = list.filter((r) => r.ai?.category === category);
  if (severity) list = list.filter((r) => r.ai?.severity === severity);
  if (q) list = list.filter((r) => JSON.stringify([r.id, r.address, r.note, r.ai?.items]).toLowerCase().includes(String(q).toLowerCase()));
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ reports: list.slice(0, 300).map((r) => enrichReport(r, req.user)), total: list.length });
});

admin.get('/reports/:id', (req, res) => {
  const r = find('reports', req.params.id);
  if (!r) return bad(res, 'Report not found.', 404);
  const reporter = find('users', r.citizenId);
  const nearbyWorkers = db.users.filter((u) => u.role === 'worker' && u.approved !== false && !u.suspended)
    .map((u) => ({ id: u.id, name: u.name, online: u.online, hazardCertified: u.hazardCertified, hasVehicle: u.hasVehicle, rating: u.rating, workerType: u.workerType, distance: u.lat != null ? Math.round(distanceM(u, r)) : null, active: db.reports.filter((x) => x.assignedTo === u.id && ['claimed', 'in_progress'].includes(x.status)).length, eligible: jobEligibility(u, r).ok }))
    .sort((a, b) => (b.eligible - a.eligible) || (b.online - a.online) || ((a.distance ?? 1e9) - (b.distance ?? 1e9)));
  res.json({
    report: enrichReport(r, req.user),
    reporter: reporter ? { id: reporter.id, name: reporter.name, trustScore: reporter.trustScore, reports: db.reports.filter((x) => x.citizenId === reporter.id).length } : null,
    workers: nearbyWorkers,
    confirmationsDetail: (r.confirmations || []).map((c) => ({ ...c, name: find('users', c.userId)?.name })),
  });
});

admin.post('/reports/:id/assign', (req, res) => {
  const r = find('reports', req.params.id);
  const w = find('users', req.body?.workerId);
  if (!r || !w || w.role !== 'worker') return bad(res, 'Pick a valid report and worker.');
  if (!['open', 'review', 'claimed'].includes(r.status)) return bad(res, 'This report can no longer be reassigned.');
  Object.assign(r, { status: 'claimed', assignedTo: w.id, claimedAt: now(), assignedByAdmin: true, checkinAt: null });
  notify(w.id, 'New job assigned to you', `${CATEGORIES[r.ai?.category]?.label} in ${WARDS.find((x) => x.id === r.ward)?.name} - Rs ${workerPayFor(w, r.payout)}`, { reportId: r.id, kind: 'job' });
  logActivity('assign', `Admin assigned a job to ${w.name}`, { reportId: r.id });
  save();
  res.json({ report: enrichReport(r, req.user) });
});

admin.post('/reports/:id/approve', (req, res) => {
  const r = find('reports', req.params.id);
  if (!r) return bad(res, 'Report not found.', 404);
  if (r.status === 'review') {
    r.status = 'open';
    logActivity('approve', 'Admin approved a report from a low-trust account', { reportId: r.id });
    save();
    return res.json({ report: enrichReport(r, req.user) });
  }
  if (r.status === 'verifying') {
    completeReport(r, { manualApproval: true, passed: true }, req.user.id);
    return res.json({ report: enrichReport(r, req.user) });
  }
  if (r.status === 'disputed') {
    r.status = 'completed';
    r.disputeResolution = { by: req.user.id, at: now(), outcome: 'cleanup upheld' };
    releasePayout(r, 'Dispute resolved in your favour.');
    return res.json({ report: enrichReport(r, req.user) });
  }
  bad(res, 'Nothing to approve on this report.');
});

admin.post('/reports/:id/reject', (req, res) => {
  const r = find('reports', req.params.id);
  if (!r) return bad(res, 'Report not found.', 404);
  const reason = String(req.body?.reason || 'Rejected by admin');
  if (['verifying', 'disputed'].includes(r.status)) {
    // cleanup not accepted -> job goes back to the feed, worker loses rating
    const w = find('users', r.assignedTo);
    if (w) {
      if (r.payoutStatus === 'held' || r.payoutStatus === 'on_hold') w.heldEarnings = Math.max(0, (w.heldEarnings || 0) - workerPayFor(w, r.payout));
      w.rating = Math.max(1, Math.round(((w.rating || 4) - 0.1) * 100) / 100);
      w.flags = (w.flags || 0) + 1;
      if (r.status === 'disputed') w.jobsDone = Math.max(0, (w.jobsDone || 1) - 1);
      notify(w.id, 'Cleanup not accepted', `${reason}. The job has been put back in the feed.`, { reportId: r.id });
    }
    Object.assign(r, { status: 'open', assignedTo: null, checkinAt: null, beforePhoto: null, afterPhoto: null, verification: null, completedAt: null, payoutStatus: null, citizenConfirmation: null, rejectedCleanups: (r.rejectedCleanups || 0) + 1 });
  } else {
    r.status = 'rejected';
    r.rejectReason = reason;
    const c = find('users', r.citizenId);
    if (c) {
      c.trustScore = Math.max(0, (c.trustScore ?? 70) - 10);
      notify(c.id, 'Report rejected', `${reason}. Repeated false reports reduce your rewards.`, { reportId: r.id });
    }
  }
  logActivity('reject', `Admin rejected: ${reason}`, { reportId: r.id });
  save();
  res.json({ report: enrichReport(r, req.user) });
});

admin.post('/reports/:id/payout', (req, res) => {
  const r = find('reports', req.params.id);
  const p = Math.round(Number(req.body?.payout));
  if (!r || !(p > 0)) return bad(res, 'Enter a valid payout.');
  r.payout = p;
  save();
  res.json({ report: enrichReport(r, req.user) });
});

admin.post('/reports/:id/release-payout', (req, res) => {
  const r = find('reports', req.params.id);
  if (!r || r.status !== 'completed') return bad(res, 'Only completed cleanups can be paid.');
  releasePayout(r, 'Released by admin.');
  res.json({ report: enrichReport(r, req.user) });
});

// ---- violations
admin.get('/violations', (req, res) => {
  const list = db.violations.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((v) => {
    const rep = find('users', v.reporterId);
    return { ...v, reporterTrust: rep?.trustScore, reporterAlias: `Citizen #${v.reporterId.slice(-4).toUpperCase()}` };
  });
  res.json({ violations: list, defaults: { fine: settings().fineDefault || 1000, vehicleFine: settings().vehicleFine || 5000 } });
});
admin.post('/violations/:id/lookup', wrap(async (req, res) => {
  const v = find('violations', req.params.id);
  if (!v) return bad(res, 'Not found.', 404);
  v.vehicleInfo = await lookupVehicle(v.plate || 'UNKNOWN');
  save();
  res.json({ violation: v });
}));
admin.post('/violations/:id/fine', (req, res) => {
  const v = find('violations', req.params.id);
  if (!v || v.status !== 'under_review') return bad(res, 'This case is not under review.');
  const amount = Math.round(Number(req.body?.amount) || settings().fineDefault || 1000);
  Object.assign(v, { status: 'fine_issued', fineAmount: amount, section: req.body?.section || 'Solid Waste Management bye-laws - littering / dumping', fineIssuedAt: now(), challanNo: `CL-ECH-${crypto.randomBytes(3).toString('hex').toUpperCase()}` });
  notify(v.reporterId, 'Your dumping report led to a fine', `The authority issued a fine of Rs ${amount}. You will get ${Math.round(REPORTER_FINE_SHARE * 100)}% once it is paid.`, { kind: 'violation' });
  logActivity('fine', `Fine of Rs ${amount} issued for illegal dumping`, { violationId: v.id });
  save();
  res.json({ violation: v });
});
admin.post('/violations/:id/paid', (req, res) => {
  const v = find('violations', req.params.id);
  if (!v || v.status !== 'fine_issued') return bad(res, 'No unpaid fine on this case.');
  const reward = Math.round(v.fineAmount * REPORTER_FINE_SHARE);
  addFund('fines', v.fineAmount, 'in', `Fine paid - challan ${v.challanNo}`);
  addFund('rewards', reward, 'out', 'Reporter share of a fine');
  const rep = find('users', v.reporterId);
  if (rep) {
    addMoney(rep.id, reward, `Reward: ${Math.round(REPORTER_FINE_SHARE * 100)}% of a paid dumping fine`, { violationId: v.id });
    addPoints(rep.id, POINTS.violationReporter, 'Dumping report led to a paid fine', { violationId: v.id });
    rep.trustScore = Math.min(100, (rep.trustScore ?? 70) + 5);
    grantBadge(rep, 'whistleblower');
    notify(rep.id, `Rs ${reward} added to your wallet`, 'The fine for the dumping you reported was paid. Thank you for keeping the city clean.', { kind: 'violation' });
  }
  Object.assign(v, { status: 'reward_credited', paidAt: now(), reporterReward: reward });
  save();
  res.json({ violation: v });
});
admin.post('/violations/:id/reject', (req, res) => {
  const v = find('violations', req.params.id);
  if (!v || v.status !== 'under_review') return bad(res, 'This case is not under review.');
  Object.assign(v, { status: 'rejected', rejectReason: req.body?.reason || 'Insufficient evidence' });
  const rep = find('users', v.reporterId);
  if (rep) {
    rep.trustScore = Math.max(0, (rep.trustScore ?? 70) - 10);
    notify(rep.id, 'Dumping report closed', `${v.rejectReason}. Clear photos with the vehicle number help the authority act.`, { kind: 'violation' });
  }
  save();
  res.json({ violation: v });
});

// ---- people
admin.get('/workers', (req, res) => {
  const list = db.users.filter((u) => u.role === 'worker').map((u) => ({
    ...publicUser(u), tier: workerTier(u),
    active: db.reports.filter((r) => r.assignedTo === u.id && ['claimed', 'in_progress'].includes(r.status)).length,
    verifying: db.reports.filter((r) => r.assignedTo === u.id && r.status === 'verifying').length,
  })).sort((a, b) => (a.approved === false ? -1 : 0) - (b.approved === false ? -1 : 0) || (b.jobsDone || 0) - (a.jobsDone || 0));
  res.json({ workers: list });
});
admin.post('/workers/:id', (req, res) => {
  const u = find('users', req.params.id);
  if (!u || u.role !== 'worker') return bad(res, 'Worker not found.', 404);
  const { approved, hazardCertified, suspended, spotlight, hasVehicle, quote } = req.body || {};
  if (approved !== undefined) { u.approved = Boolean(approved); if (u.approved) notify(u.id, 'Account approved', 'You can now claim cleanup jobs. Go online to see jobs near you.'); }
  if (hazardCertified !== undefined) { u.hazardCertified = Boolean(hazardCertified); if (u.hazardCertified) notify(u.id, 'Hazard certification added', 'You can now take medical and e-waste jobs. Always wear your safety kit.'); }
  if (hasVehicle !== undefined) u.hasVehicle = Boolean(hasVehicle);
  if (suspended !== undefined) u.suspended = Boolean(suspended);
  if (spotlight) {
    for (const x of db.users) if (x.role === 'worker') x.spotlight = false;
    u.spotlight = true;
    if (quote) u.quote = quote;
    grantBadge(u, 'spotlight');
    logActivity('spotlight', `${u.name} is the worker of the month`);
  }
  save();
  res.json({ worker: publicUser(u) });
});
admin.get('/citizens', (req, res) => {
  const list = db.users.filter((u) => u.role === 'citizen').map((u) => ({
    ...publicUser(u), level: levelFor(u.lifetimePoints || 0).name,
    reports: db.reports.filter((r) => r.citizenId === u.id).length,
    rejected: db.reports.filter((r) => r.citizenId === u.id && r.status === 'rejected').length,
  })).sort((a, b) => (b.lifetimePoints || 0) - (a.lifetimePoints || 0));
  res.json({ citizens: list });
});
admin.post('/citizens/:id', (req, res) => {
  const u = find('users', req.params.id);
  if (!u || u.role !== 'citizen') return bad(res, 'Citizen not found.', 404);
  if (req.body?.suspended !== undefined) u.suspended = Boolean(req.body.suspended);
  if (req.body?.trustScore !== undefined) u.trustScore = Math.max(0, Math.min(100, Number(req.body.trustScore)));
  save();
  res.json({ citizen: publicUser(u) });
});

// ---- SLA, hotspots, alerts
admin.get('/sla', (req, res) => {
  runEscalations();
  const open = db.reports.filter(isOpen);
  const breached = open.filter((r) => r.slaDeadline && new Date(r.slaDeadline) < new Date())
    .sort((a, b) => (b.escalationLevel || 0) - (a.escalationLevel || 0) || new Date(a.slaDeadline) - new Date(b.slaDeadline))
    .map((r) => enrichReport(r, req.user));
  const dueSoon = open.filter((r) => r.slaDeadline && new Date(r.slaDeadline) >= new Date() && new Date(r.slaDeadline) - Date.now() < 6 * HOUR).map((r) => enrichReport(r, req.user));
  const wards = wardScores().map((w) => {
    const rs = db.reports.filter((r) => r.ward === w.id && r.status === 'completed');
    const ok = rs.filter((r) => !r.breachedSla).length;
    return { ...w, slaCompliance: rs.length ? Math.round((ok / rs.length) * 100) : 100, breachedOpen: open.filter((r) => r.ward === w.id && r.slaDeadline && new Date(r.slaDeadline) < new Date()).length, officer: `${w.name} ward officer` };
  });
  const workers = db.users.filter((u) => u.role === 'worker').map((u) => {
    const rs = db.reports.filter((r) => r.assignedTo === u.id && r.status === 'completed' && r.claimedAt);
    const hrs = rs.map((r) => (new Date(r.completedAt) - new Date(r.claimedAt)) / HOUR);
    return { id: u.id, name: u.name, jobs: rs.length, avgHours: hrs.length ? Math.round((hrs.reduce((a, b) => a + b, 0) / hrs.length) * 10) / 10 : null, onTime: rs.length ? Math.round((rs.filter((r) => !r.breachedSla).length / rs.length) * 100) : null };
  }).filter((w) => w.jobs).sort((a, b) => b.jobs - a.jobs);
  res.json({ breached, dueSoon, wards, workers, hours: Object.fromEntries(Object.entries(SEVERITY).map(([k, v]) => [k, v.slaHours])) });
});

admin.get('/hotspots', (req, res) => {
  res.json({
    hotspots: hotspots(),
    points: db.reports.filter((r) => r.status !== 'rejected').map((r) => [r.lat, r.lng, { low: 0.35, medium: 0.55, high: 0.8, critical: 1 }[r.ai?.severity] || 0.5]),
    workers: db.users.filter((u) => u.role === 'worker' && u.lat != null).map((u) => ({ id: u.id, name: u.name, lat: u.lat, lng: u.lng, online: u.online })),
    violations: db.violations.map((v) => ({ id: v.id, lat: v.lat, lng: v.lng, status: v.status })),
  });
});

admin.get('/alerts', (req, res) => {
  const sent = db.alerts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const suggestions = wardScores().filter((w) => w.score < 70 || w.overdue >= 2).map((w) => ({
    ward: w.id, wardName: w.name, score: w.score, overdue: w.overdue, open: w.open,
    severity: w.score < 50 ? 'critical' : 'high',
    message: `${w.name} (${w.zone}) is facing a cleanliness issue: cleanliness score ${w.score}/100, ${w.open} open reports, ${w.overdue} past the deadline. Request extra collection crews and a site inspection within 24 hours.`,
  }));
  res.json({ alerts: sent, suggestions });
});
admin.post('/alerts', wrap(async (req, res) => {
  const { ward, message, severity = 'high' } = req.body || {};
  if (!ward || !message) return bad(res, 'Pick a ward and write the alert.');
  const result = await notifyCorporation({ ward, message, severity });
  const a = insert('alerts', { ward, wardName: WARDS.find((w) => w.id === ward)?.name, message, severity, sentBy: req.user.id, channel: result.channel, simulated: result.simulated, status: 'sent' });
  logActivity('alert', `Alert sent to the corporation about ${a.wardName}`);
  res.json({ alert: a });
}));

// ---- SOS
admin.get('/sos', (req, res) => res.json({ sos: db.sos.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }));
admin.post('/sos/:id/resolve', (req, res) => {
  const s = find('sos', req.params.id);
  if (!s) return bad(res, 'Not found.', 404);
  Object.assign(s, { status: 'resolved', resolvedAt: now(), resolvedBy: req.user.id, note: req.body?.note || '' });
  notify(s.userId, 'Help is on the way', 'The ward control room has responded to your SOS.', { kind: 'sos' });
  save();
  res.json({ sos: s });
});

// ---- marketplace
function inventory() {
  const kg = {};
  for (const r of db.reports.filter((x) => x.status === 'completed')) {
    const c = r.ai?.category || 'mixed';
    const k = estimatedKg(r);
    const rec = (r.ai?.recyclablePercent || (CATEGORIES[c].valuePerKg > 1 ? 70 : 20)) / 100;
    kg[c] = (kg[c] || 0) + k * rec;
  }
  for (const p of db.pickups.filter((x) => x.status === 'completed')) {
    for (const m of p.materials || []) kg[m] = (kg[m] || 0) + (p.actualKg || 0) / Math.max(1, p.materials.length);
  }
  for (const l of db.listings) kg[l.material] = (kg[l.material] || 0) - l.kg;
  return Object.entries(kg).filter(([c]) => CATEGORIES[c] && CATEGORIES[c].valuePerKg > 0)
    .map(([c, v]) => ({ material: c, kg: Math.max(0, Math.round(v)), valuePerKg: CATEGORIES[c].valuePerKg, estValue: Math.max(0, Math.round(v * CATEGORIES[c].valuePerKg)) }))
    .sort((a, b) => b.estValue - a.estValue);
}
const RECYCLERS = [
  { id: 'rc1', name: 'EcoCycle Traders', authorised: true, materials: ['plastic', 'paper', 'metal'] },
  { id: 'rc2', name: 'Kaveri Polymers', authorised: true, materials: ['plastic'] },
  { id: 'rc3', name: 'Marina Metal Works', authorised: true, materials: ['metal', 'ewaste'] },
  { id: 'rc4', name: 'GreenFibre Paper Mills', authorised: true, materials: ['paper'] },
  { id: 'rc5', name: 'CircuitBack E-Recyclers', authorised: true, materials: ['ewaste', 'metal'] },
  { id: 'rc6', name: 'ClearSand Glass Co.', authorised: true, materials: ['glass'] },
];
admin.get('/marketplace', (req, res) => {
  const listings = db.listings.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((l) => ({
    ...l, bids: db.bids.filter((b) => b.listingId === l.id).sort((a, b) => b.pricePerKg - a.pricePerKg),
  }));
  const revenue = db.funds.filter((f) => f.source === 'recycling' && f.direction === 'in').reduce((s, f) => s + f.amount, 0);
  res.json({ inventory: inventory(), listings, recyclers: RECYCLERS, revenue });
});
admin.post('/marketplace/listings', (req, res) => {
  const { material, kg, pricePerKg } = req.body || {};
  const inv = inventory().find((i) => i.material === material);
  const k = Math.round(Number(kg));
  if (!inv || !(k > 0)) return bad(res, 'Choose a material and quantity.');
  if (k > inv.kg) return bad(res, `Only ${inv.kg} kg of ${CATEGORIES[material].label.toLowerCase()} is in stock.`);
  const l = insert('listings', { material, kg: k, pricePerKg: Number(pricePerKg) || CATEGORIES[material].valuePerKg, status: 'listed' });
  // Authorised recyclers respond with bids (simulated marketplace activity)
  const buyers = RECYCLERS.filter((r) => r.materials.includes(material));
  for (const b of (buyers.length ? buyers : RECYCLERS.slice(0, 2))) {
    insert('bids', { listingId: l.id, recyclerId: b.id, recyclerName: b.name, pricePerKg: Math.round(l.pricePerKg * (0.9 + Math.random() * 0.3) * 10) / 10, pickupIn: `${1 + Math.floor(Math.random() * 3)} days` });
  }
  logActivity('market', `${k} kg of ${CATEGORIES[material].label.toLowerCase()} listed for recyclers`);
  res.json({ listing: l });
});
admin.post('/marketplace/bids/:id/accept', (req, res) => {
  const b = find('bids', req.params.id);
  const l = b && find('listings', b.listingId);
  if (!b || !l || l.status !== 'listed') return bad(res, 'This bid is no longer open.');
  const revenue = Math.round(b.pricePerKg * l.kg);
  Object.assign(l, { status: 'sold', soldTo: b.recyclerName, soldPricePerKg: b.pricePerKg, revenue, soldAt: now() });
  b.accepted = true;
  addFund('recycling', revenue, 'in', `${l.kg} kg ${CATEGORIES[l.material].label} sold to ${b.recyclerName}`);
  logActivity('market', `Sold ${l.kg} kg ${CATEGORIES[l.material].label.toLowerCase()} for Rs ${revenue} - added to the reward pool`);
  save();
  res.json({ listing: l, revenue });
});

// ---- funds
admin.get('/funds', (req, res) => {
  const ledger = db.funds.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 120);
  const months = {};
  for (const f of db.funds) {
    const m = f.createdAt.slice(0, 7);
    months[m] = months[m] || { month: m, in: 0, out: 0 };
    months[m][f.direction] += f.amount;
  }
  res.json({ summary: fundSummary(), ledger, months: Object.values(months).sort((a, b) => a.month.localeCompare(b.month)), epr: settings().eprPartners || [] });
});
admin.post('/funds', (req, res) => {
  const { source, amount, note = '' } = req.body || {};
  if (!['govt', 'epr', 'csr', 'recycling', 'fines'].includes(source) || !(Number(amount) > 0)) return bad(res, 'Choose a source and a positive amount.');
  const f = addFund(source, Number(amount), 'in', note || `Funds added (${source})`);
  res.json({ fund: f, summary: fundSummary() });
});

// ---- pickups, services, drives
admin.get('/pickups', (req, res) => {
  res.json({ pickups: db.pickups.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((p) => ({ ...p, citizenName: find('users', p.citizenId)?.name })) });
});
admin.post('/pickups/:id/complete', (req, res) => {
  const p = find('pickups', req.params.id);
  const kg = Number(req.body?.actualKg);
  if (!p || p.status !== 'scheduled') return bad(res, 'This pickup is not open.');
  if (!(kg > 0)) return bad(res, 'Enter the weighed quantity in kg.');
  Object.assign(p, { status: 'completed', actualKg: Math.round(kg * 10) / 10, completedAt: now(), pointsAwarded: Math.round(kg * POINTS.pickupPerKg) });
  addPoints(p.citizenId, p.pointsAwarded, `Doorstep pickup - ${p.actualKg} kg`);
  notify(p.citizenId, 'Pickup completed', `${p.actualKg} kg collected. You earned ${p.pointsAwarded} points.`);
  const c = find('users', p.citizenId);
  if (c) checkCitizenBadges(c);
  save();
  res.json({ pickup: p });
});
admin.get('/service-requests', (req, res) => {
  res.json({ requests: db.serviceRequests.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((s) => ({ ...s, userName: find('users', s.userId)?.name })) });
});
admin.post('/service-requests/:id', (req, res) => {
  const s = find('serviceRequests', req.params.id);
  if (!s) return bad(res, 'Not found.', 404);
  s.status = req.body?.status || 'scheduled';
  notify(s.userId, `${s.title}: ${s.status}`, 'Your ward office has updated your request.');
  save();
  res.json({ request: s });
});
admin.post('/drives/:id/complete', (req, res) => {
  const d = find('drives', req.params.id);
  const kg = Number(req.body?.kgCollected) || 0;
  if (!d) return bad(res, 'Not found.', 404);
  Object.assign(d, { status: 'completed', kgCollected: kg });
  for (const pid of d.participants || []) addPoints(pid, 40, `Drive completed: ${d.title}`);
  save();
  res.json({ drive: d });
});

// ---- Swachh Survekshan-style report
admin.get('/survekshan', (req, res) => {
  const stats = cityStats();
  const wards = wardScores();
  const citizens = db.users.filter((u) => u.role === 'citizen');
  const active = citizens.filter((u) => db.reports.some((r) => r.citizenId === u.id)).length;
  const pickupsDone = db.pickups.filter((p) => p.status === 'completed');
  const segregatedKg = pickupsDone.reduce((s, p) => s + (p.actualKg || 0), 0);
  const recyclableKg = Object.entries(stats.byCategoryKg).filter(([c]) => CATEGORIES[c]?.valuePerKg > 1).reduce((s, [, v]) => s + v, 0);
  const comps = [
    { key: 'grievance', title: 'Grievance redressal within SLA', value: stats.slaCompliance, unit: '%', weight: 25 },
    { key: 'participation', title: 'Citizen participation', value: Math.round((active / Math.max(1, citizens.length)) * 100), unit: '%', weight: 20 },
    { key: 'segregation', title: 'Waste segregated at source / recyclable share', value: Math.round((recyclableKg / Math.max(1, stats.kgRemoved)) * 100), unit: '%', weight: 20 },
    { key: 'ward', title: 'Average ward cleanliness score', value: Math.round(wards.reduce((s, w) => s + w.score, 0) / wards.length), unit: '/100', weight: 20 },
    { key: 'enforcement', title: 'Illegal dumping cases acted on', value: Math.round((db.violations.filter((v) => v.status !== 'under_review').length / Math.max(1, db.violations.length)) * 100), unit: '%', weight: 15 },
  ];
  const overall = Math.round(comps.reduce((s, c) => s + Math.min(100, c.value) * c.weight, 0) / 100);
  res.json({
    city: 'Greater Chennai (demo data)', period: `${new Date(Date.now() - 30 * 24 * HOUR).toDateString()} - ${new Date().toDateString()}`,
    generatedAt: now(), stats, wards, components: comps, overall, segregatedKg: Math.round(segregatedKg),
    informal: { workers: stats.informalWorkers, earnings: stats.informalEarnings },
    violations: { total: db.violations.length, fined: db.violations.filter((v) => ['fine_issued', 'fine_paid', 'reward_credited'].includes(v.status)).length, collected: stats.finesCollected },
  });
});

// ---- demo reset (handy right before presenting)
admin.post('/reset-demo', (req, res) => {
  if (!config.demoMode) return bad(res, 'Reset is only available in demo mode.', 403);
  reseed();
  res.json({ ok: true });
});

// ---- settings
admin.get('/settings', (req, res) => {
  res.json({ settings: settings(), ai: aiStatus(), integrations: integrationStatus(), demoMode: config.demoMode, severity: SEVERITY, volumes: VOLUMES });
});
admin.post('/settings', (req, res) => {
  const s = settings();
  const { payMultiplier, fineDefault, vehicleFine } = req.body || {};
  if (payMultiplier !== undefined) s.payMultiplier = Math.max(0.5, Math.min(3, Number(payMultiplier) || 1));
  if (fineDefault !== undefined) s.fineDefault = Math.max(100, Number(fineDefault) || 1000);
  if (vehicleFine !== undefined) s.vehicleFine = Math.max(100, Number(vehicleFine) || 5000);
  save();
  res.json({ settings: s });
});

api.use((err, req, res, _next) => {
  console.error('[api error]', err);
  res.status(500).json({ error: err.message || 'Something went wrong on the server.' });
});

export { runEscalations };
