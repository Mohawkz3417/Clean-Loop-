// External services. Each one works in "simulated" mode out of the box and
// switches to the real service when its URL is set in .env.
// Swap the fetch body for the real provider's API (UPI payout gateway, SMS
// gateway, official vehicle registry access, corporation email) when you get access.
import crypto from 'node:crypto';
import { config } from './config.js';

async function postJson(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${url} returned ${r.status}`);
  return r.json().catch(() => ({}));
}

const ref = (p) => `${p}${crypto.randomBytes(5).toString('hex').toUpperCase()}`;

export async function sendPayout({ userId, amount, upi, note }) {
  if (config.integrations.payoutWebhook) {
    const res = await postJson(config.integrations.payoutWebhook, { userId, amount, upi, note });
    return { simulated: false, reference: res.reference || ref('UPI') };
  }
  return { simulated: true, reference: ref('SIMUPI') };
}

export async function sendSms({ to, message }) {
  if (config.integrations.smsWebhook) {
    await postJson(config.integrations.smsWebhook, { to, message });
    return { simulated: false };
  }
  console.log(`[sms:simulated] to ${to}: ${message}`);
  return { simulated: true };
}

// Official vehicle-owner lookup is only available to authorities. In demo mode
// we return a masked placeholder so the admin flow can be shown end to end.
export async function lookupVehicle(plate) {
  if (config.integrations.vehicleLookupUrl) {
    return { simulated: false, ...(await postJson(config.integrations.vehicleLookupUrl, { plate })) };
  }
  const h = crypto.createHash('md5').update(String(plate).toUpperCase()).digest('hex');
  const types = ['Hatchback', 'Sedan', 'SUV', 'Two-wheeler', 'Goods carrier', 'Auto rickshaw'];
  return {
    simulated: true,
    plate: String(plate).toUpperCase(),
    owner: `Registered owner ${h.slice(0, 2).toUpperCase()}*** (masked)`,
    vehicleClass: types[parseInt(h.slice(2, 4), 16) % types.length],
    rto: `TN-${(parseInt(h.slice(4, 6), 16) % 20) + 1}`,
    contactOnFile: true,
  };
}

export async function notifyCorporation({ ward, message, severity }) {
  if (config.integrations.corporationEmailWebhook) {
    await postJson(config.integrations.corporationEmailWebhook, { ward, message, severity });
    return { simulated: false, channel: 'webhook' };
  }
  return { simulated: true, channel: 'Corporation dashboard + email (simulated)' };
}

export function integrationStatus() {
  return {
    payouts: config.integrations.payoutWebhook ? 'live' : 'simulated',
    sms: config.integrations.smsWebhook ? 'live' : 'simulated',
    vehicleLookup: config.integrations.vehicleLookupUrl ? 'live' : 'simulated',
    corporation: config.integrations.corporationEmailWebhook ? 'live' : 'simulated',
  };
}
