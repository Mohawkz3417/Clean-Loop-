// Loads settings from environment variables and an optional .env file.
// No external packages needed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}
loadEnvFile(path.join(ROOT, '.env'));

const env = process.env;
const bool = (v, d) => (v === undefined || v === '' ? d : ['1', 'true', 'yes', 'on'].includes(String(v).toLowerCase()));

export const config = {
  port: Number(env.PORT || 8080),
  dataDir: path.resolve(ROOT, env.DATA_DIR || 'server/data'),
  // Signs login tokens. Change it in production.
  secret: env.APP_SECRET || 'cleanloop-demo-secret-change-me',
  // Demo mode adds helpers for judges: "simulate arrival", gallery uploads on laptops, quick logins.
  demoMode: bool(env.DEMO_MODE, true),

  // ---- AI providers --------------------------------------------------------
  // Order the server tries cloud AI providers in. The in-browser offline model
  // always runs first and is the final fallback, so the app works with no keys.
  aiProvider: (env.AI_PROVIDER || 'auto').toLowerCase(), // auto | gemini | offline
  gemini: {
    apiKey: env.GEMINI_API_KEY || '',
    model: env.GEMINI_MODEL || 'gemini-2.5-flash',
  },

  // ---- Optional real integrations (all simulated when not configured) ------
  integrations: {
    smsWebhook: env.SMS_WEBHOOK_URL || '',
    payoutWebhook: env.PAYOUT_WEBHOOK_URL || '',
    vehicleLookupUrl: env.VEHICLE_LOOKUP_URL || '',
    corporationEmailWebhook: env.CORPORATION_WEBHOOK_URL || '',
  },
};

export function geminiEnabled() {
  return Boolean(config.gemini.apiKey) && config.aiProvider !== 'offline';
}
