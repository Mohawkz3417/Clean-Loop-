// End-to-end API self test. Run with the server started:  npm test
// It exercises every role and the main business rules, then prints a summary.
const BASE = process.env.BASE || `http://localhost:${process.env.PORT || 8080}`;
let pass = 0;
let fail = 0;
const ok = (cond, msg) => { if (cond) { pass++; console.log('  ✓', msg); } else { fail++; console.log('  ✗', msg); } };

async function call(path, { token, method = 'GET', body } = {}) {
  const r = await fetch(`${BASE}/api${path}`, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, ...j };
}
const demo = async (role) => (await call('/auth/demo', { method: 'POST', body: { role } })).token;
// 1x1 JPEG
const IMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
const hash = () => Array.from({ length: 16 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

(async () => {
  console.log(`CleanLoop self test against ${BASE}\n`);
  const meta = await call('/meta');
  ok(meta.categories && meta.wards?.length === 12, 'meta loads (categories, 12 wards)');
  ok((await call('/public/stats')).stats?.totalReports > 100, 'public stats has demo data');

  const C = await demo('citizen'); const W = await demo('worker'); const A = await demo('admin');
  ok(C && W && A, 'demo logins for all three roles');
  ok((await call('/auth/login', { method: 'POST', body: { email: 'citizen@cleanloop.in', password: 'demo123' } })).token, 'password login works');
  ok((await call('/auth/login', { method: 'POST', body: { email: 'citizen@cleanloop.in', password: 'nope' } })).status === 401, 'wrong password rejected');
  ok((await call('/admin/overview', { token: C })).status === 403, 'citizen cannot open admin API');

  // --- register
  const email = `test${Date.now()}@example.in`;
  const reg = await call('/auth/register', { method: 'POST', body: { name: 'Test Citizen', email, password: 'secret1', role: 'citizen', ward: 'guindy' } });
  ok(reg.token && reg.user.role === 'citizen', 'new citizen can register');
  const T = reg.token;

  // --- report a new spot (far from others)
  const spot = { lat: 13.0101 + Math.random() * 0.01, lng: 80.3301 + Math.random() * 0.01 }; // offshore: never near demo reports
  const ai = { category: 'plastic', volume: 'pile', severityScore: 50, confidence: 0.8, provider: 'offline', items: ['bottles'] };
  const ph = hash();
  const rep = await call('/reports', { token: T, method: 'POST', body: { image: IMG, ...spot, ai, phash: ph, captureMode: 'camera' } });
  ok(rep.report && !rep.merged && rep.report.status === 'open', 'citizen report created and open for workers');
  ok(rep.report.payout === 150 && rep.report.pointsPending === 30, 'payout and pending points computed from severity/volume');
  const rid = rep.report.id;

  // --- same photo again -> blocked
  const again = await call('/reports', { token: T, method: 'POST', body: { image: IMG, lat: spot.lat + 0.01, lng: spot.lng, ai, phash: ph, captureMode: 'camera' } });
  ok(again.status === 409, 'reusing the same photo is blocked');

  // --- another citizen nearby -> merged as confirmation
  const conf = await call('/reports', { token: C, method: 'POST', body: { image: IMG, lat: spot.lat + 0.0001, lng: spot.lng, ai, phash: hash(), captureMode: 'camera' } });
  ok(conf.merged && conf.pointsAwarded === 5, 'nearby duplicate merged as a confirmation (+5 pts)');

  // --- worker claims, checks in (too far -> rejected), simulated arrival works in demo
  const claim = await call(`/jobs/${rid}/claim`, { token: W, method: 'POST' });
  ok(claim.job?.status === 'claimed', 'worker claims the job');
  const far = await call(`/jobs/${rid}/checkin`, { token: W, method: 'POST', body: { lat: spot.lat + 0.02, lng: spot.lng } });
  ok(far.status === 400 && /away/.test(far.error), 'check-in outside the 60 m geofence is refused');
  const near = await call(`/jobs/${rid}/checkin`, { token: W, method: 'POST', body: { lat: spot.lat + 0.0002, lng: spot.lng } });
  ok(near.job?.status === 'in_progress', 'check-in inside the geofence works');
  ok((await call(`/jobs/${rid}/after`, { token: W, method: 'POST', body: { image: IMG, ...spot } })).status === 400, 'after photo needs a before photo first');
  await call(`/jobs/${rid}/before`, { token: W, method: 'POST', body: { image: IMG, ...spot } });
  const after = await call(`/jobs/${rid}/after`, { token: W, method: 'POST', body: { image: IMG, ...spot, offline: { sceneMatch: 0.86, garbageBefore: 0.7, garbageAfter: 0.05, cleared: true } } });
  ok(after.verification?.passed && after.job.status === 'completed' && after.job.payoutStatus === 'held', 'verified cleanup completes the job with payout held');

  // --- reporter confirms -> payout released, points credited
  const before = (await call('/me/wallet', { token: W })).wallet;
  const cc = await call(`/reports/${rid}/confirm-cleanup`, { token: T, method: 'POST', body: { ok: true, stars: 5 } });
  ok(cc.report?.citizenConfirmation?.ok && cc.report.payoutStatus === 'released', 'citizen confirmation releases the payout');
  const afterW = (await call('/me/wallet', { token: W })).wallet;
  ok(afterW - before === 150, 'worker wallet credited with the full gig payout (Rs 150)');
  const me = await call('/auth/me', { token: T });
  ok(me.user.points >= 35 && me.user.badges.some((b) => b.key === 'first_report'), 'reporter gets points and the First step badge');

  // --- failed verification goes to admin
  const spot2 = { lat: 13.0601 + Math.random() * 0.01, lng: 80.3601 };
  const r2 = (await call('/reports', { token: T, method: 'POST', body: { image: IMG, ...spot2, ai: { ...ai, category: 'mixed' }, phash: hash(), captureMode: 'camera' } })).report;
  await call(`/jobs/${r2.id}/claim`, { token: W, method: 'POST' });
  await call(`/jobs/${r2.id}/checkin`, { token: W, method: 'POST', body: spot2 });
  await call(`/jobs/${r2.id}/before`, { token: W, method: 'POST', body: { image: IMG, ...spot2 } });
  const bad = await call(`/jobs/${r2.id}/after`, { token: W, method: 'POST', body: { image: IMG, ...spot2, offline: { sceneMatch: 0.2, garbageBefore: 0.7, garbageAfter: 0.6, cleared: false } } });
  ok(bad.job.status === 'verifying', 'a doubtful cleanup is sent for manual review');
  const appr = await call(`/admin/reports/${r2.id}/approve`, { token: A, method: 'POST' });
  ok(appr.report?.status === 'completed', 'admin can approve a manual review');

  // --- dispute
  const cd = await call(`/reports/${r2.id}/confirm-cleanup`, { token: T, method: 'POST', body: { ok: false, comment: 'still dirty' } });
  ok(cd.report?.status === 'disputed', 'citizen can dispute a cleanup');
  const rej = await call(`/admin/reports/${r2.id}/reject`, { token: A, method: 'POST', body: { reason: 'Not clean' } });
  ok(rej.report?.status === 'open', 'admin rejecting a disputed cleanup puts the job back in the feed');

  // --- violations
  const v = await call('/violations', { token: T, method: 'POST', body: { images: [IMG], ...spot, plate: 'TN 01 AB 1234', vehicleType: 'Car', description: 'test' } });
  ok(v.violation?.status === 'under_review', 'dumping evidence submitted');
  ok((await call(`/admin/violations/${v.violation.id}/lookup`, { token: A, method: 'POST' })).violation?.vehicleInfo?.simulated, 'vehicle lookup (simulated)');
  await call(`/admin/violations/${v.violation.id}/fine`, { token: A, method: 'POST', body: { amount: 1000 } });
  const walletBefore = (await call('/me/wallet', { token: T })).wallet;
  const paid = await call(`/admin/violations/${v.violation.id}/paid`, { token: A, method: 'POST' });
  const walletAfter = (await call('/me/wallet', { token: T })).wallet;
  ok(paid.violation?.status === 'reward_credited' && walletAfter - walletBefore === 200, 'paid fine credits 20% (Rs 200) to the reporter');

  // --- rewards, withdraw
  const red = await call('/rewards/redeem', { token: C, method: 'POST', body: { itemId: 'cafe' } });
  ok(red.redemption?.code, 'citizen redeems points for a voucher');
  const wd = await call('/me/withdraw', { token: T, method: 'POST', body: { amount: 100, upi: 'test@upi' } });
  ok(wd.ok && wd.simulated, 'wallet withdrawal to UPI (simulated payout)');

  // --- pickups, drives, services
  const pk = await call('/pickups', { token: T, method: 'POST', body: { materials: ['plastic'], estKg: 5, date: '2030-01-01', slot: '8-10 AM' } });
  ok(pk.pickup?.status === 'scheduled', 'doorstep pickup booked');
  const pkd = await call(`/admin/pickups/${pk.pickup.id}/complete`, { token: A, method: 'POST', body: { actualKg: 6 } });
  ok(pkd.pickup?.pointsAwarded === 60, 'pickup weighed: 10 points per kg');
  const drives = await call('/drives', { token: T });
  const join = await call(`/drives/${drives.drives.find((d) => d.status === 'upcoming').id}/join`, { token: T, method: 'POST' });
  ok(join.drive?.participants?.length > 0, 'citizen joins a cleanup drive');
  ok((await call('/services/bulk-pickup/request', { token: T, method: 'POST', body: { note: 'sofa' } })).request, 'government service request submitted');

  // --- worker extras
  ok((await call('/worker/route', { token: W })).stops !== undefined, 'route optimiser responds');
  ok((await call('/worker/earnings', { token: W })).days?.length === 14, 'earnings with 14-day history');
  ok((await call('/worker/sos', { token: W, method: 'POST', body: { lat: 13, lng: 80.2 } })).sos?.status === 'open', 'SOS raised');

  // --- admin dashboards
  for (const p of ['overview', 'reports', 'violations', 'workers', 'citizens', 'sla', 'hotspots', 'alerts', 'marketplace', 'funds', 'pickups', 'service-requests', 'survekshan', 'settings', 'sos']) {
    const r = await call(`/admin/${p}`, { token: A });
    ok(r.status !== 403 && r.status !== 500 && !r.error, `admin ${p} loads`);
  }
  const inv = (await call('/admin/marketplace', { token: A })).inventory[0];
  const lst = await call('/admin/marketplace/listings', { token: A, method: 'POST', body: { material: inv.material, kg: Math.min(10, inv.kg), pricePerKg: inv.valuePerKg } });
  const bids = (await call('/admin/marketplace', { token: A })).listings.find((l) => l.id === lst.listing.id).bids;
  const sold = await call(`/admin/marketplace/bids/${bids[0].id}/accept`, { token: A, method: 'POST' });
  ok(sold.revenue > 0, 'recycler bid accepted, revenue added to the reward pool');
  ok((await call('/admin/alerts', { token: A, method: 'POST', body: { ward: 'adyar', message: 'test alert' } })).alert, 'area alert sent to the corporation');

  if (!process.argv.includes('--keep')) {
    await call('/admin/reset-demo', { token: A, method: 'POST' });
    console.log('\n(demo data reset to a clean state)');
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('Self test crashed:', e.message); process.exit(1); });
