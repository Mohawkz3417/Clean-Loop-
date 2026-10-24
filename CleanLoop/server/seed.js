// Generates realistic demo data so the app looks alive the moment it starts.
// Run `npm run reset` to wipe everything and regenerate.
import { hashPassword } from './auth.js';
import { replaceAll, clearUploads, uid } from './db.js';
import {
  CATEGORIES, VOLUMES, SEVERITY, WARDS, POINTS, REWARD_CATALOG, payoutFor, severityFromScore, wardFor, workerTier,
} from './domain.js';

let seed = 20261004;
const rand = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = (a) => a[Math.floor(rand() * a.length)];
const between = (a, b) => a + rand() * (b - a);
const int = (a, b) => Math.floor(between(a, b + 1));
const HOUR = 3600 * 1000;
const ago = (h) => new Date(Date.now() - h * HOUR).toISOString();
const id = (p) => `${p}_${uid()}`;

const FIRST = ['Kavya', 'Arjun', 'Divya', 'Karthik', 'Meena', 'Rahul', 'Priya', 'Vignesh', 'Lakshmi', 'Suresh', 'Anitha', 'Harish', 'Deepa', 'Gokul', 'Nandhini', 'Praveen', 'Swathi', 'Manoj', 'Revathi', 'Ashwin', 'Keerthana', 'Bala', 'Shalini', 'Dinesh', 'Janani', 'Sanjay', 'Pooja', 'Ramesh', 'Aarthi', 'Vikram', 'Sneha', 'Naveen', 'Yamini', 'Farhan', 'Ayesha', 'Joseph', 'Mary', 'Imran', 'Sowmya', 'Hari'];
const LAST = ['Sundar', 'Raman', 'Krishnan', 'Iyer', 'Natarajan', 'Kumar', 'Subramanian', 'Pillai', 'Rajan', 'Venkatesh', 'Selvam', 'Mohan', 'Babu', 'Ganesan', 'Srinivasan', 'Khan', 'Thomas', 'Prakash'];
const WORKER_NAMES = ['Murugan Selvaraj', 'Lakshmi Ammal', 'Ravi Shankar', 'Selvi Muthu', 'Anbu Chezhian', 'Pandian K', 'Kannagi R', 'Mohammed Rafiq', 'Saroja Devi', 'Velu Ramasamy', 'Chitra Arumugam', 'David Raj', 'Thangam P', 'Senthil Kumar'];

const CAT_WEIGHTS = [['plastic', 28], ['mixed', 22], ['organic', 16], ['paper', 9], ['construction', 9], ['glass', 4], ['metal', 4], ['ewaste', 4], ['medical', 4]];
function weightedCat() {
  const total = CAT_WEIGHTS.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [c, w] of CAT_WEIGHTS) { if ((r -= w) < 0) return c; }
  return 'mixed';
}
const ITEMS = {
  plastic: ['PET bottles', 'carry bags', 'food wrappers', 'cups', 'milk packets', 'thermocol'],
  mixed: ['plastic bags', 'food waste', 'paper', 'cloth', 'bottles', 'packaging'],
  organic: ['vegetable waste', 'banana leaves', 'coconut shells', 'flowers', 'food leftovers', 'garden cuttings'],
  paper: ['cardboard boxes', 'newspapers', 'Tetra Paks', 'paper cups', 'cartons'],
  construction: ['broken tiles', 'cement bags', 'bricks', 'sand', 'concrete rubble'],
  glass: ['glass bottles', 'broken glass', 'jars'],
  metal: ['cans', 'scrap iron', 'wires', 'tins'],
  ewaste: ['old CRT monitor', 'cables', 'batteries', 'circuit boards', 'tube lights'],
  medical: ['used syringes', 'masks', 'medicine strips', 'gloves', 'bandages'],
};
const STREETS = ['Main Road', 'Cross Street', 'Bazaar Street', 'Bus stand', 'Market', 'Canal bank', 'School Road', 'Temple Street', '2nd Avenue', 'Railway station', 'Park Road', 'Beach Road'];

export function buildSeed() {
  const users = [];
  const reports = [];
  const transactions = [];
  const notifications = [];
  const activity = [];
  const funds = [];
  const pw = hashPassword('demo123');

  const tx = (userId, kind, points, amount, description, createdAt, extra = {}) =>
    transactions.push({ id: id('tr'), userId, kind, points, amount, description, createdAt, ...extra });
  const note = (userId, title, body, createdAt, extra = {}) =>
    notifications.push({ id: id('no'), userId, title, body, read: false, createdAt, ...extra });
  const act = (type, text, createdAt, extra = {}) => activity.push({ id: id('ac'), type, text, createdAt, ...extra });
  const fund = (source, amount, direction, n, createdAt) => funds.push({ id: id('fu'), source, amount: Math.round(amount), direction, note: n, createdAt });

  // ---------------- people
  const adminUser = { id: 'u_admin', name: 'Ward Control Room', email: 'admin@cleanloop.in', password: hashPassword('admin123'), role: 'admin', phone: '044-2561-0000', ward: 'adyar', createdAt: ago(24 * 90), badges: [] };
  users.push(adminUser);

  const demoCitizen = { id: 'u_citizen', name: 'Kavya Sundar', email: 'citizen@cleanloop.in', password: pw, role: 'citizen', phone: '98400 12345', ward: 'adyar', points: 0, lifetimePoints: 0, wallet: 0, trustScore: 86, badges: [], confirmations: 3, upi: 'kavya@okaxis', createdAt: ago(24 * 75) };
  users.push(demoCitizen);
  const citizens = [demoCitizen];
  for (let i = 0; i < 46; i++) {
    const w = pick(WARDS);
    const c = { id: id('u'), name: `${FIRST[i % FIRST.length]} ${pick(LAST)}`, email: `citizen${i + 1}@example.in`, password: pw, role: 'citizen', phone: '', ward: w.id, points: 0, lifetimePoints: 0, wallet: 0, trustScore: int(48, 98), badges: [], confirmations: int(0, 6), createdAt: ago(int(24 * 5, 24 * 85)) };
    if (i === 7) c.trustScore = 28; // a low-trust account for the moderation demo
    users.push(c); citizens.push(c);
  }

  const workerTypes = ['gig', 'salaried', 'informal', 'salaried', 'gig', 'informal', 'salaried', 'gig', 'informal', 'salaried', 'gig', 'informal', 'gig', 'informal'];
  const workers = [];
  WORKER_NAMES.forEach((name, i) => {
    const w = WARDS[i % WARDS.length];
    const isDemo = i === 0;
    const u = {
      id: isDemo ? 'u_worker' : id('u'), name, email: isDemo ? 'worker@cleanloop.in' : `worker${i + 1}@example.in`, password: pw, role: 'worker',
      phone: `9${int(100000000, 999999999)}`, ward: isDemo ? 'adyar' : w.id, workerType: isDemo ? 'gig' : workerTypes[i],
      approved: !(i === 12 || i === 13), hazardCertified: isDemo || i % 3 === 1, hasVehicle: i % 4 === 2, rating: 0, ratingCount: 0,
      jobsDone: 0, heldEarnings: 0, totalEarned: 0, wallet: 0, online: isDemo ? true : rand() < 0.6, insured: true,
      lat: (isDemo ? 13.0012 : w.lat) + between(-0.008, 0.008), lng: (isDemo ? 80.2565 : w.lng) + between(-0.008, 0.008),
      upi: isDemo ? 'murugan@okicici' : '', badges: [], monthlySalary: 18500, createdAt: ago(int(24 * 20, 24 * 120)),
      quote: isDemo ? 'Every street I clean is a street my children walk on.' : undefined,
    };
    if (u.approved === false) { u.online = false; u.workerType = 'informal'; }
    users.push(u); workers.push(u);
  });
  const demoWorker = workers[0];
  const activeWorkers = workers.filter((w) => w.approved);

  // ---------------- reports
  // Recurring hotspots: same corners keep getting dumped on.
  const hot = [
    { lat: 12.9805, lng: 80.2185, cat: 'mixed' },        // Velachery canal bank
    { lat: 13.0402, lng: 80.2338, cat: 'plastic' },      // T. Nagar market
    { lat: 12.9662, lng: 80.2478, cat: 'construction' }, // Perungudi
    { lat: 13.1120, lng: 80.2940, cat: 'organic' },      // Royapuram fish market
    { lat: 13.0030, lng: 80.2550, cat: 'plastic' },      // Adyar - demo citizen's area
  ];

  function makeReport(opts) {
    const category = opts.category || weightedCat();
    const vol = opts.volume || pick(['bag', 'pile', 'pile', 'pile', 'cart', 'cart', 'truck']);
    const cfg = CATEGORIES[category];
    let sevScore = { bag: 22, pile: 42, cart: 62, truck: 80 }[vol] + int(-8, 12) + (cfg.hazard ? 22 : 0);
    sevScore = Math.max(8, Math.min(98, sevScore));
    const severity = severityFromScore(sevScore);
    const createdH = opts.ageH;
    const ward = wardFor(opts.lat, opts.lng);
    const items = ITEMS[category].slice().sort(() => rand() - 0.5).slice(0, int(2, 4));
    const r = {
      id: id('re'), type: 'garbage', citizenId: opts.citizen.id, photo: null, lat: opts.lat, lng: opts.lng, accuracy: int(5, 25),
      address: `${pick(STREETS)}, ${ward.name}`, ward: ward.id, phash: Array.from({ length: 16 }, () => '0123456789abcdef'[int(0, 15)]).join(''),
      captureMode: 'camera', capturedAt: ago(createdH), note: '', createdAt: ago(createdH),
      ai: {
        provider: 'offline', providerLabel: 'Offline AI (on device)', category, secondary: [], confidence: Math.round(between(0.72, 0.97) * 100) / 100,
        volume: vol, severityScore: sevScore, severity, hazard: cfg.hazard, hazardNote: cfg.hazard ? (category === 'medical' ? 'Sharps and biomedical waste - gloves and a sharps box needed.' : 'Contains batteries / electronics - do not crush or burn.') : '',
        items, recyclablePercent: cfg.valuePerKg > 1 ? int(55, 90) : int(5, 30),
        summary: `${VOLUMES[vol].label} of ${cfg.label.toLowerCase()} near ${ward.name}.`,
        workerNote: cfg.hazard ? 'Wear gloves and mask. Bag hazardous items separately.' : vol === 'truck' ? 'Needs a tipper or tractor - bring two helpers.' : 'Segregate dry and wet waste while bagging.',
      },
      payout: payoutFor(category, vol, severity), pointsPending: SEVERITY[severity].points, rewardEligible: true,
      confirmations: [], slaDeadline: new Date(Date.now() - createdH * HOUR + SEVERITY[severity].slaHours * HOUR).toISOString(),
      escalationLevel: 0, requiresCertified: cfg.hazard, needsVehicle: VOLUMES[vol].needsVehicle, status: 'open',
    };
    const nConf = rand() < 0.35 ? int(1, 4) : 0;
    for (let k = 0; k < nConf; k++) {
      const c = pick(citizens);
      if (c.id !== r.citizenId && !r.confirmations.some((x) => x.userId === c.id)) r.confirmations.push({ userId: c.id, at: ago(createdH - between(0.2, Math.min(createdH, 12))), photo: null, distance: int(4, 30) });
    }
    return r;
  }

  function eligibleWorker(r) {
    const pool = activeWorkers.filter((w) => (!r.ai.hazard || w.hazardCertified) && (!r.needsVehicle || w.hasVehicle));
    const near = pool.filter((w) => w.ward === r.ward);
    return pick(near.length && rand() < 0.7 ? near : pool.length ? pool : activeWorkers);
  }

  function complete(r, hoursToClaim, hoursToFinish) {
    const w = r.forceWorker || eligibleWorker(r);
    delete r.forceWorker;
    const created = new Date(r.createdAt).getTime();
    const claimed = created + hoursToClaim * HOUR;
    const done = Math.min(Date.now() - 0.3 * HOUR, claimed + hoursToFinish * HOUR);
    Object.assign(r, {
      status: 'completed', assignedTo: w.id, claimedAt: new Date(claimed).toISOString(), checkinAt: new Date(claimed + 0.4 * HOUR).toISOString(),
      beforePhoto: null, afterPhoto: null, beforeAt: new Date(claimed + 0.45 * HOUR).toISOString(), afterAt: new Date(done).toISOString(),
      completedAt: new Date(done).toISOString(),
      verification: { provider: r.ai.provider, sceneMatch: Math.round(between(0.74, 0.95) * 100) / 100, garbageBefore: Math.round(between(0.7, 0.96) * 100) / 100, garbageAfter: Math.round(between(0.02, 0.18) * 100) / 100, cleared: true, passed: true, distance: int(3, 35), secondsBetween: Math.round((done - claimed) / 1000) },
      payoutStatus: 'released',
    });
    if (new Date(r.completedAt) > new Date(r.slaDeadline)) r.breachedSla = true;
    const pay = w.workerType === 'salaried' ? Math.round(r.payout * 0.25) : r.payout;
    w.jobsDone += 1;
    w.totalEarned += pay;
    w.wallet += pay;
    tx(w.id, 'money', 0, pay, `${w.workerType === 'salaried' ? 'Performance incentive' : 'Cleanup payout'} - ${CATEGORIES[r.ai.category].label}`, r.completedAt, { reportId: r.id, earning: true });
    const stars = rand() < 0.75 ? pick([4, 5, 5, 5, 5]) : null;
    r.citizenConfirmation = { ok: true, at: new Date(done + 2 * HOUR).toISOString(), stars };
    if (stars) { w.rating = (w.rating * w.ratingCount + stars) / (w.ratingCount + 1); w.ratingCount += 1; }
    const c = users.find((u) => u.id === r.citizenId);
    c.points += r.pointsPending; c.lifetimePoints += r.pointsPending;
    tx(c.id, 'points', r.pointsPending, 0, `Verified report - ${CATEGORIES[r.ai.category].label}`, r.completedAt, { reportId: r.id });
    for (const cf of r.confirmations) {
      const cu = users.find((u) => u.id === cf.userId);
      cu.points += POINTS.confirmation; cu.lifetimePoints += POINTS.confirmation;
      tx(cu.id, 'points', POINTS.confirmation, 0, 'Confirmed an existing report', cf.at, { reportId: r.id });
    }
    fund('operations', pay, 'out', 'Cleanup payout', r.completedAt);
    return w;
  }

  // 1) Historic reports across the city (last 30 days)
  for (let i = 0; i < 150; i++) {
    const w = pick(WARDS);
    const lat = w.lat + between(-0.012, 0.012);
    const lng = w.lng + between(-0.012, 0.012);
    const ageH = between(2, 24 * 30);
    const r = makeReport({ citizen: pick(citizens.slice(1)), lat, lng, ageH });
    const slow = rand() < 0.12;
    if ((ageH > 72 && rand() < 0.97) || (ageH > 30 && ageH <= 72 && rand() < 0.75)) complete(r, between(0.3, 6), slow ? between(20, 60) : between(0.5, 9));
    reports.push(r);
  }
  // 1b) A few fresh open reports in every ward so the city looks live
  for (const w of WARDS) {
    const n = w.id === 'adyar' ? 0 : int(1, 4);
    for (let k = 0; k < n; k++) {
      reports.push(makeReport({ citizen: pick(citizens.slice(1)), lat: w.lat + between(-0.01, 0.01), lng: w.lng + between(-0.01, 0.01), ageH: between(0.5, 20) }));
    }
  }
  // 2) Hotspot clusters - repeat dumping after cleanups
  for (const h of hot) {
    const n = int(5, 8);
    for (let k = 0; k < n; k++) {
      const ageH = between(4, 24 * 28);
      const r = makeReport({ citizen: pick(citizens.slice(1)), lat: h.lat + between(-0.0012, 0.0012), lng: h.lng + between(-0.0012, 0.0012), ageH, category: rand() < 0.75 ? h.cat : undefined });
      if (ageH > 20 && rand() < 0.85) complete(r, between(0.5, 5), between(0.5, 6));
      reports.push(r);
    }
  }

  // 3) The demo citizen's own history
  const kavyaSpots = [
    { lat: 13.0049, lng: 80.2551, ageH: 24 * 21, cat: 'plastic', vol: 'pile', done: true },
    { lat: 13.0071, lng: 80.2592, ageH: 24 * 17, cat: 'organic', vol: 'cart', done: true },
    { lat: 12.9988, lng: 80.2530, ageH: 24 * 12, cat: 'paper', vol: 'pile', done: true },
    { lat: 13.0102, lng: 80.2610, ageH: 24 * 9, cat: 'construction', vol: 'truck', done: true },
    { lat: 13.0021, lng: 80.2499, ageH: 24 * 6, cat: 'plastic', vol: 'bag', done: true },
    { lat: 12.9969, lng: 80.2587, ageH: 24 * 3, cat: 'medical', vol: 'bag', done: true },
    { lat: 13.0060, lng: 80.2525, ageH: 30, cat: 'plastic', vol: 'pile', done: 'await' },
    { lat: 13.0033, lng: 80.2611, ageH: 20, cat: 'mixed', vol: 'cart', done: 'await' },
    { lat: 13.0009, lng: 80.2570, ageH: 5, cat: 'mixed', vol: 'pile', done: 'claimed' },
    { lat: 12.9978, lng: 80.2548, ageH: 2, cat: 'plastic', vol: 'pile', done: false },
  ];
  for (const s of kavyaSpots) {
    const r = makeReport({ citizen: demoCitizen, lat: s.lat, lng: s.lng, ageH: s.ageH, category: s.cat, volume: s.vol });
    if (s.done === true) complete(r, between(0.5, 3), between(0.5, 4));
    if (s.done === 'await') {
      r.forceWorker = demoWorker;
      complete(r, 1.2, 2.5);
      // waiting for Kavya's confirmation, payout held
      const pay = r.payout;
      r.citizenConfirmation = null; r.payoutStatus = 'held';
      demoWorker.wallet -= pay; demoWorker.totalEarned -= pay; demoWorker.heldEarnings += pay;
      transactions.splice(transactions.findIndex((t) => t.reportId === r.id && t.kind === 'money'), 1);
      note(demoCitizen.id, 'Your spot was cleaned', 'See the before and after photos and confirm the cleanup.', r.completedAt, { reportId: r.id, kind: 'confirm' });
    }
    if (s.done === 'claimed') {
      const w = workers[3];
      Object.assign(r, { status: 'claimed', assignedTo: w.id, claimedAt: ago(3.5) });
      note(demoCitizen.id, 'A worker is on the way', `${w.name.split(' ')[0]} accepted the cleanup of your report.`, ago(3.5), { reportId: r.id });
    }
    reports.push(r);
  }

  // 4) Open jobs right around the demo worker (Adyar) so the job feed is full
  const workerJobs = [
    { dLat: 0.0021, dLng: -0.0016, cat: 'plastic', vol: 'pile' },
    { dLat: -0.0034, dLng: 0.0027, cat: 'organic', vol: 'cart' },
    { dLat: 0.0052, dLng: 0.0041, cat: 'medical', vol: 'bag' },
    { dLat: -0.0061, dLng: -0.0049, cat: 'mixed', vol: 'pile' },
    { dLat: 0.0318, dLng: 0.0042, cat: 'construction', vol: 'truck' },
    { dLat: 0.0301, dLng: 0.0071, cat: 'ewaste', vol: 'bag' },
    { dLat: 0.0336, dLng: 0.0021, cat: 'paper', vol: 'bag' },
  ];
  for (const j of workerJobs) {
    const r = makeReport({ citizen: pick(citizens.slice(1)), lat: 13.0012 + j.dLat, lng: 80.2565 + j.dLng, ageH: between(0.4, 9), category: j.cat, volume: j.vol });
    reports.push(r);
  }
  // demo worker's active job
  {
    const r = makeReport({ citizen: pick(citizens.slice(1)), lat: 13.0037, lng: 80.2538, ageH: 2.2, category: 'plastic', volume: 'pile' });
    Object.assign(r, { status: 'claimed', assignedTo: demoWorker.id, claimedAt: ago(0.6) });
    reports.push(r);
  }

  // 5) Moderation queue examples
  const toVerify = reports.filter((r) => r.status === 'open' && r.ward !== 'adyar').slice(0, 2);
  for (const r of toVerify) {
    const w = eligibleWorker(r);
    Object.assign(r, { status: 'verifying', assignedTo: w.id, claimedAt: ago(5), checkinAt: ago(4.5), beforeAt: ago(4.4), afterAt: ago(3.6),
      verification: { provider: 'offline', sceneMatch: 0.41, garbageBefore: 0.82, garbageAfter: 0.36, cleared: false, passed: false, distance: 22, secondsBetween: 2900, remark: 'Scene changed a lot and some waste may remain.' } });
  }
  const toDispute = reports.filter((r) => r.status === 'completed' && r.ward === 'velachery' && r.citizenId !== demoCitizen.id)[0];
  if (toDispute) { toDispute.status = 'disputed'; toDispute.payoutStatus = 'on_hold'; toDispute.citizenConfirmation = { ok: false, at: ago(6), comment: 'Half the pile is still behind the wall.' }; toDispute.completedAt = ago(9); }
  const lowTrust = citizens[8];
  const reviewR = makeReport({ citizen: lowTrust, lat: 13.0835, lng: 80.2120, ageH: 3, category: 'mixed', volume: 'pile' });
  reviewR.status = 'review';
  reports.push(reviewR);

  // Some open jobs in progress for other workers
  for (const r of reports.filter((x) => x.status === 'open' && x.ward !== 'adyar').slice(0, 6)) {
    const w = eligibleWorker(r);
    if (w.id === demoWorker.id) continue;
    Object.assign(r, { status: rand() < 0.5 ? 'claimed' : 'in_progress', assignedTo: w.id, claimedAt: ago(between(0.5, 3)) });
    if (r.status === 'in_progress') r.checkinAt = ago(0.3);
  }

  // SLA escalations for overdue open reports
  for (const r of reports) {
    if (['completed', 'rejected'].includes(r.status)) continue;
    const overdueH = (Date.now() - new Date(r.slaDeadline).getTime()) / HOUR;
    if (overdueH > 0) {
      const lvl = overdueH > 48 ? 3 : overdueH > 24 ? 2 : 1;
      r.escalationLevel = lvl; r.breachedSla = true; r.escalatedTo = ['Ward officer', 'Zonal officer', 'Commissioner'][lvl - 1];
      r.escalations = [{ level: lvl, to: r.escalatedTo, at: ago(Math.max(0.1, overdueH - 1)) }];
    }
  }

  // Worker extras: give the demo worker a long track record
  demoWorker.jobsDone += 78; demoWorker.totalEarned += 21450; demoWorker.wallet += 1840;
  demoWorker.rating = 4.86; demoWorker.ratingCount = Math.max(demoWorker.ratingCount, 64); demoWorker.spotlight = true;
  for (const w of workers) {
    if (w !== demoWorker && w.approved) { w.jobsDone += int(5, 60); w.totalEarned += w.jobsDone * int(60, 140); w.wallet += int(150, 1600); }
    w.rating = w.ratingCount ? Math.round(w.rating * 100) / 100 : (w.approved ? Math.round(between(4.1, 4.9) * 100) / 100 : 0);
    w.ratingCount = Math.max(w.ratingCount, w.approved ? int(5, 40) : 0);
    w.tier = workerTier(w);
  }
  // earnings history for the demo worker (last 14 days)
  for (let d = 13; d >= 0; d--) {
    const n = int(1, 4);
    for (let k = 0; k < n; k++) tx(demoWorker.id, 'money', 0, pick([60, 150, 150, 225, 350]), `Cleanup payout - ${pick(['Plastic', 'Mixed waste', 'Organic / wet', 'Paper & cardboard'])}`, ago(d * 24 + between(1, 10)), { earning: true });
  }
  tx(demoWorker.id, 'money', 0, 30, 'Thank-you tip from a citizen', ago(28), { earning: true });
  tx(demoWorker.id, 'money', 0, -2000, 'Withdrawn to murugan@okicici', ago(24 * 6), { reference: 'SIMUPI8F21A0C9D2', simulated: true });

  // Citizens extra history points (drives, pickups, older activity)
  for (const c of citizens) {
    const extra = c === demoCitizen ? 1700 : int(0, 900);
    c.points += extra; c.lifetimePoints += extra;
    if (extra) tx(c.id, 'points', extra, 0, 'Earlier activity (drives, pickups, confirmations)', ago(24 * 40));
  }
  // a couple of top citizens
  citizens[3].lifetimePoints += 2600; citizens[3].points += 1800;
  citizens[11].lifetimePoints += 1900; citizens[11].points += 1200;

  // ---------------- violations (illegal dumping)
  const vio = [];
  const plates = ['TN 09 BX 4471', 'TN 22 AK 9083', 'TN 07 CM 1150', 'TN 14 Z 6612', 'TN 10 BR 3307', 'TN 11 AP 7720', 'TN 06 Q 2294', 'TN 18 BJ 5409'];
  const vStatus = ['under_review', 'under_review', 'under_review', 'fine_issued', 'fine_issued', 'reward_credited', 'reward_credited', 'rejected'];
  const vTypes = ['Car', 'Goods carrier', 'Two-wheeler', 'Auto rickshaw', 'Car', 'Tipper lorry', 'Two-wheeler', 'Car'];
  plates.forEach((plate, i) => {
    const h = hot[i % hot.length];
    const reporter = i === 5 ? demoCitizen : pick(citizens.slice(1));
    const createdAt = ago(between(3, 24 * 20));
    const v = {
      id: id('vi'), reporterId: reporter.id, photos: [], lat: h.lat + between(-0.002, 0.002), lng: h.lng + between(-0.002, 0.002),
      ward: wardFor(h.lat, h.lng).id, plate, vehicleType: vTypes[i], offenderType: 'vehicle',
      description: pick(['Threw two garbage bags out of the window while driving.', 'Unloaded construction debris on the roadside at night.', 'Dumped a sack of waste near the canal.', 'Shopkeeper unloaded plastic waste from the vehicle onto the footpath.']),
      facesBlurred: int(0, 2), status: vStatus[i], createdAt,
    };
    if (['fine_issued', 'reward_credited'].includes(v.status)) {
      v.fineAmount = v.vehicleType === 'Tipper lorry' || v.vehicleType === 'Goods carrier' ? 5000 : 1000;
      v.section = 'Solid Waste Management bye-laws - littering / dumping';
      v.challanNo = `CL-ECH-${uid().slice(0, 6).toUpperCase()}`; v.fineIssuedAt = ago(between(1, 48));
    }
    if (v.status === 'reward_credited') {
      v.paidAt = ago(between(1, 24)); v.reporterReward = Math.round(v.fineAmount * 0.2);
      reporter.wallet += v.reporterReward;
      tx(reporter.id, 'money', 0, v.reporterReward, 'Reward: 20% of a paid dumping fine', v.paidAt, { violationId: v.id });
      reporter.points += POINTS.violationReporter; reporter.lifetimePoints += POINTS.violationReporter;
      tx(reporter.id, 'points', POINTS.violationReporter, 0, 'Dumping report led to a paid fine', v.paidAt, { violationId: v.id });
      reporter.badges.push({ key: 'whistleblower', at: v.paidAt });
      fund('fines', v.fineAmount, 'in', `Fine paid - challan ${v.challanNo}`, v.paidAt);
      fund('rewards', v.reporterReward, 'out', 'Reporter share of a fine', v.paidAt);
      if (reporter === demoCitizen) note(demoCitizen.id, `Rs ${v.reporterReward} added to your wallet`, 'The fine for the dumping you reported was paid. Thank you for keeping the city clean.', v.paidAt, { kind: 'violation' });
    }
    if (v.status === 'rejected') v.rejectReason = 'Vehicle number not visible in the photos';
    vio.push(v);
  });

  // ---------------- drives
  const drives = [
    { title: 'Elliot\'s Beach morning sweep', date: ago(-24 * 3).slice(0, 10), place: 'Elliot\'s Beach, Besant Nagar', ward: 'adyar', goalKg: 300, description: 'Gloves, bags and water provided. Bring a cap!', status: 'upcoming' },
    { title: 'Velachery lake bund cleanup', date: ago(-24 * 6).slice(0, 10), place: 'Velachery lake, north bund', ward: 'velachery', goalKg: 500, description: 'Join neighbours and students to clear plastic from the lake edge.', status: 'upcoming' },
    { title: 'College NSS plastic-free campus day', date: ago(-24 * 10).slice(0, 10), place: 'Guindy - campus main gate', ward: 'guindy', goalKg: 150, description: 'NSS volunteers + residents. Segregation workshop after the drive.', status: 'upcoming' },
    { title: 'T. Nagar market Sunday cleanup', date: ago(24 * 8).slice(0, 10), place: 'Ranganathan Street entrance', ward: 'tnagar', goalKg: 250, description: 'Traders association drive.', status: 'completed', kgCollected: 312 },
    { title: 'Royapuram fishing harbour drive', date: ago(24 * 15).slice(0, 10), place: 'Kasimedu harbour gate', ward: 'royapuram', goalKg: 400, description: 'With the fisherfolk community.', status: 'completed', kgCollected: 446 },
  ].map((d) => {
    const w = WARDS.find((x) => x.id === d.ward);
    const participants = [];
    const n = d.status === 'completed' ? int(18, 34) : int(6, 22);
    for (let i = 0; i < n; i++) { const c = pick(citizens); if (!participants.includes(c.id)) participants.push(c.id); }
    if (d.ward === 'tnagar' || d.ward === 'royapuram') { if (!participants.includes(demoCitizen.id)) participants.push(demoCitizen.id); }
    return { id: id('dr'), ...d, lat: w.lat + 0.002, lng: w.lng + 0.002, organizerId: pick(citizens.slice(1)).id, participants, kgCollected: d.kgCollected || 0, createdAt: ago(24 * 20) };
  });

  // ---------------- pickups
  const mats = [['plastic', 'paper'], ['paper'], ['plastic', 'metal'], ['ewaste'], ['paper', 'glass'], ['plastic']];
  const pickups = [];
  for (let i = 0; i < 16; i++) {
    const c = i < 3 ? demoCitizen : pick(citizens.slice(1));
    const done = i !== 0 && rand() < 0.65;
    const w = WARDS.find((x) => x.id === c.ward) || WARDS[0];
    const p = { id: id('pk'), citizenId: c.id, materials: pick(mats), estKg: int(3, 15), slot: pick(['8-10 AM', '10-12 PM', '4-6 PM']), date: ago(done ? int(24, 24 * 20) : -int(24, 72)).slice(0, 10), address: `${pick(STREETS)}, ${w.name}`, ward: w.id, lat: w.lat, lng: w.lng, status: done ? 'completed' : 'scheduled', createdAt: ago(int(30, 24 * 22)) };
    if (done) {
      p.actualKg = Math.round(between(3, 14) * 10) / 10; p.pointsAwarded = Math.round(p.actualKg * POINTS.pickupPerKg); p.completedAt = ago(int(20, 24 * 18));
      c.points += p.pointsAwarded; c.lifetimePoints += p.pointsAwarded;
      tx(c.id, 'points', p.pointsAwarded, 0, `Doorstep pickup - ${p.actualKg} kg`, p.completedAt);
    }
    pickups.push(p);
  }

  // ---------------- funds, marketplace
  fund('govt', 500000, 'in', 'Swachh city grant - Q3 allocation', ago(24 * 60));
  fund('epr', 180000, 'in', 'EPR contribution - Aqua Pura Beverages (PET collection)', ago(24 * 45));
  fund('epr', 120000, 'in', 'EPR contribution - Nila Foods (multi-layer plastic)', ago(24 * 33));
  fund('csr', 75000, 'in', 'CSR grant - BrightHome FMCG', ago(24 * 25));
  const listings = [];
  const bids = [];
  const sold = [['plastic', 620, 13.5, 'Kaveri Polymers', 24 * 18], ['paper', 840, 9.2, 'GreenFibre Paper Mills', 24 * 12], ['metal', 160, 31, 'Marina Metal Works', 24 * 5]];
  for (const [m, kg, price, buyer, h] of sold) {
    const l = { id: id('li'), material: m, kg, pricePerKg: price, status: 'sold', soldTo: buyer, soldPricePerKg: price, revenue: Math.round(kg * price), soldAt: ago(h - 6), createdAt: ago(h) };
    listings.push(l);
    fund('recycling', l.revenue, 'in', `${kg} kg ${CATEGORIES[m].label} sold to ${buyer}`, l.soldAt);
  }
  const openL = { id: id('li'), material: 'plastic', kg: 210, pricePerKg: 12, status: 'listed', createdAt: ago(5) };
  listings.push(openL);
  for (const [name, p] of [['EcoCycle Traders', 12.4], ['Kaveri Polymers', 13.1]]) bids.push({ id: id('bi'), listingId: openL.id, recyclerName: name, recyclerId: name === 'Kaveri Polymers' ? 'rc2' : 'rc1', pricePerKg: p, pickupIn: '2 days', createdAt: ago(3) });
  const redemptions = [];
  const redeemed = [[demoCitizen, REWARD_CATALOG[0], 24 * 10], [citizens[3], REWARD_CATALOG[2], 24 * 6], [citizens[11], REWARD_CATALOG[5], 24 * 4]];
  for (const [c, item, h] of redeemed) {
    c.points -= item.cost;
    tx(c.id, 'points', -item.cost, 0, `Redeemed: ${item.title}`, ago(h));
    redemptions.push({ id: id('rd'), userId: c.id, itemId: item.id, title: item.title, cost: item.cost, value: item.value, partner: item.partner, code: `CL-${uid().slice(0, 6).toUpperCase()}-${item.id.slice(0, 3).toUpperCase()}`, createdAt: ago(h) });
    fund('rewards', item.value, 'out', `Redemption: ${item.title}`, ago(h));
  }

  // ---------------- badges from history
  for (const c of citizens) {
    const done = reports.filter((r) => r.citizenId === c.id && r.status === 'completed');
    const give = (k) => { if (!c.badges.some((b) => b.key === k)) c.badges.push({ key: k, at: ago(int(10, 24 * 20)) }); };
    if (done.length >= 1) give('first_report');
    if (done.length >= 10) give('hawk_eye');
    if (done.filter((r) => r.ai.category === 'plastic').length >= 5) give('plastic_buster');
    if (done.some((r) => r.ai.hazard)) give('hazard_spotter');
    if (drives.filter((d) => d.participants.includes(c.id)).length >= 3) give('community_star');
    if (c.confirmations >= 5) give('confirmer');
  }
  for (const w of workers) {
    const give = (k) => { if (!w.badges.some((b) => b.key === k)) w.badges.push({ key: k, at: ago(int(10, 24 * 30)) }); };
    if (w.jobsDone >= 1) give('first_job');
    if (w.jobsDone >= 50) give('fifty_club');
    if (w.rating >= 4.8 && w.ratingCount >= 5) give('five_star');
    if (w.hazardCertified && w.jobsDone > 30) give('hazard_hero');
    if (w.spotlight) give('spotlight');
  }

  // ---------------- alerts, sos, service requests, notifications, activity
  const alerts = [
    { id: id('al'), ward: 'royapuram', wardName: 'Royapuram', severity: 'high', message: 'Royapuram (Zone 5) is facing a cleanliness issue near the fishing harbour: repeated organic waste dumping. Request an extra early-morning collection crew.', sentBy: 'u_admin', channel: 'Corporation dashboard + email (simulated)', simulated: true, status: 'sent', createdAt: ago(30) },
    { id: id('al'), ward: 'perungudi', wardName: 'Perungudi', severity: 'critical', message: 'Construction debris is being dumped repeatedly along the Perungudi service road. Request enforcement patrol and CCTV placement.', sentBy: 'u_admin', channel: 'Corporation dashboard + email (simulated)', simulated: true, status: 'sent', createdAt: ago(24 * 4) },
  ];
  const sosW = workers[5];
  const sos = [{ id: id('so'), userId: sosW.id, name: sosW.name, phone: sosW.phone, lat: sosW.lat, lng: sosW.lng, message: 'Stray dogs near the dump site, need support', status: 'open', createdAt: ago(0.4) }];
  const serviceRequests = [
    { id: id('sr'), userId: demoCitizen.id, serviceId: 'ewaste-camp', title: 'E-waste collection camp', kind: 'event', note: 'Old laptop and two phones', ward: 'adyar', status: 'registered', createdAt: ago(24 * 2) },
    { id: id('sr'), userId: citizens[4].id, serviceId: 'bulk-pickup', title: 'Bulk waste pickup', kind: 'request', note: 'Old sofa and mattress', ward: citizens[4].ward, status: 'submitted', createdAt: ago(20) },
    { id: id('sr'), userId: citizens[9].id, serviceId: 'bin-request', title: 'Request a public bin', kind: 'request', note: 'Bus stop near the school has no bin', ward: citizens[9].ward, status: 'scheduled', createdAt: ago(24 * 3) },
  ];

  note(demoCitizen.id, 'Badge unlocked: Hazard spotter', 'Reported hazardous waste safely', ago(24 * 3 - 5), { kind: 'badge', badge: 'hazard_spotter' });
  note(demoCitizen.id, 'Cleanup drive this weekend', 'Elliot\'s Beach morning sweep is 3 days away. 40 points for joining.', ago(10));
  note(demoWorker.id, 'Worker of the month', 'You were picked for this month\'s spotlight. Thank you, Murugan!', ago(24 * 2), { kind: 'badge' });
  note(demoWorker.id, 'New job assigned to you', 'Plastic in Adyar - Rs 150', ago(0.6), { kind: 'job' });

  const recent = reports.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 14);
  for (const r of recent) act('report', `New ${r.ai.severity} ${CATEGORIES[r.ai.category].label.toLowerCase()} report in ${WARDS.find((w) => w.id === r.ward).name}`, r.createdAt, { reportId: r.id, lat: r.lat, lng: r.lng });
  for (const r of reports.filter((x) => x.status === 'completed').sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 10)) act('cleaned', `${CATEGORIES[r.ai.category].label} spot cleaned in ${WARDS.find((w) => w.id === r.ward).name}`, r.completedAt, { reportId: r.id });
  act('sos', `SOS from ${sosW.name}`, sos[0].createdAt, { sosId: sos[0].id });
  act('market', 'Sold 160 kg metal for Rs 4960 - added to the reward pool', ago(24 * 5 - 6));
  activity.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  for (const u of users) { if (u.wallet !== undefined) u.wallet = Math.round(u.wallet); }

  return {
    users, reports, violations: vio, transactions, redemptions, drives, pickups, listings, bids, funds, alerts, notifications, sos, serviceRequests, activity,
    settings: {
      payMultiplier: 1, fineDefault: 1000, vehicleFine: 5000, seededAt: new Date().toISOString(),
      eprPartners: [
        { name: 'Aqua Pura Beverages', material: 'PET bottles', targetTonnes: 40, collectedTonnes: 27.5, funded: 180000 },
        { name: 'Nila Foods', material: 'Multi-layer plastic', targetTonnes: 25, collectedTonnes: 11.2, funded: 120000 },
        { name: 'BrightHome FMCG', material: 'Rigid plastic', targetTonnes: 18, collectedTonnes: 6.4, funded: 75000 },
      ],
    },
  };
}

export function reseed() {
  seed = 20261004;
  clearUploads();
  replaceAll(buildSeed());
}
