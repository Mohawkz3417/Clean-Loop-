// AI provider layer.
//
// How the AI chain works:
//   1. The browser always runs the built-in offline model (TensorFlow.js) first,
//      so every photo gets an instant result with no internet or API key.
//   2. If a cloud provider is configured (GEMINI_API_KEY in .env), the server asks it
//      for a richer analysis (severity, volume, hazards, item list) and it overrides
//      the offline guess.
//   3. If the cloud call fails for any reason, the offline result is kept.
//
// To add another provider (OpenAI, Claude, your own server...), write a function
// with the same shape as geminiAnalyze / geminiVerify and add it to PROVIDERS.
import { config, geminiEnabled } from './config.js';
import { CATEGORIES, VOLUMES, normalizeCategory, severityFromScore } from './domain.js';

const CATEGORY_KEYS = Object.keys(CATEGORIES);
const VOLUME_KEYS = Object.keys(VOLUMES);

function stripDataUrl(dataUrl) {
  const m = String(dataUrl || '').match(/^data:(image\/[a-z]+);base64,(.+)$/);
  return m ? { mime: m[1], data: m[2] } : null;
}

async function callGemini(parts) {
  const { apiKey, model } = config.gemini;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
      }),
    });
    if (!r.ok) throw new Error(`Gemini returned ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    const text = j?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
    return JSON.parse(text.replace(/^```json\s*|```$/g, ''));
  } finally {
    clearTimeout(timer);
  }
}

const ANALYZE_PROMPT = `You are the waste-assessment AI of a municipal cleanliness app in India.
Look at the photo a citizen took and return ONLY a JSON object with these keys:
{
 "isWaste": boolean,              // false if the photo shows no garbage at all
 "category": one of ${JSON.stringify(CATEGORY_KEYS)},  // dominant waste type
 "secondary": array of other categories present (may be empty),
 "confidence": number 0-1,
 "volume": one of ${JSON.stringify(VOLUME_KEYS)},  // bag=fits in one bag, pile=a few bags, cart=hand-cart load, truck=needs a vehicle
 "severityScore": number 0-100,   // consider size, hazard, smell/health risk, blocking drains/roads, near water
 "hazard": boolean,               // medical waste, chemicals, sharp objects, dead animals, batteries, burning
 "hazardNote": short string or "",
 "items": array of up to 6 short item names you can see,
 "recyclablePercent": number 0-100,
 "summary": one short sentence for the citizen,
 "workerNote": one short practical instruction for the cleanup worker (equipment / precautions)
}`;

const VERIFY_PROMPT = `You verify cleanup work for a municipal app. Image 1 was taken BEFORE cleanup, image 2 AFTER.
Return ONLY JSON: {"sameLocation": boolean, "sceneMatch": number 0-1, "garbageBefore": number 0-1, "garbageAfter": number 0-1, "cleared": boolean, "remark": short string}.
"cleared" is true only if it is clearly the same place and the waste is gone or almost gone.`;

async function geminiAnalyze({ image }) {
  const img = stripDataUrl(image);
  if (!img) throw new Error('No image');
  const j = await callGemini([{ text: ANALYZE_PROMPT }, { inline_data: { mime_type: img.mime, data: img.data } }]);
  const category = normalizeCategory(j.category);
  const severityScore = Math.max(0, Math.min(100, Number(j.severityScore) || 40));
  return {
    provider: 'gemini',
    providerLabel: `Gemini (${config.gemini.model})`,
    isWaste: j.isWaste !== false,
    category,
    secondary: (j.secondary || []).map(normalizeCategory).filter((c) => c !== category),
    confidence: Math.max(0, Math.min(1, Number(j.confidence) || 0.8)),
    volume: VOLUME_KEYS.includes(j.volume) ? j.volume : 'pile',
    severityScore,
    severity: severityFromScore(severityScore),
    hazard: Boolean(j.hazard) || CATEGORIES[category].hazard,
    hazardNote: j.hazardNote || '',
    items: Array.isArray(j.items) ? j.items.slice(0, 6) : [],
    recyclablePercent: Number(j.recyclablePercent) || 0,
    summary: j.summary || '',
    workerNote: j.workerNote || '',
  };
}

async function geminiVerify({ before, after }) {
  const a = stripDataUrl(before);
  const b = stripDataUrl(after);
  if (!a || !b) throw new Error('Two images are needed');
  const j = await callGemini([
    { text: VERIFY_PROMPT },
    { inline_data: { mime_type: a.mime, data: a.data } },
    { inline_data: { mime_type: b.mime, data: b.data } },
  ]);
  return {
    provider: 'gemini',
    sceneMatch: Number(j.sceneMatch) || (j.sameLocation ? 0.85 : 0.2),
    garbageBefore: Number(j.garbageBefore) || 0.8,
    garbageAfter: Number(j.garbageAfter) || 0,
    cleared: Boolean(j.cleared) && j.sameLocation !== false,
    remark: j.remark || '',
  };
}

const PROVIDERS = {
  gemini: { enabled: geminiEnabled, analyze: geminiAnalyze, verify: geminiVerify },
};

export function aiStatus() {
  return {
    mode: config.aiProvider,
    cloud: Object.entries(PROVIDERS).filter(([, p]) => p.enabled()).map(([k]) => k),
    gemini: { configured: Boolean(config.gemini.apiKey), model: config.gemini.model },
  };
}

// Returns a cloud analysis or null (caller then keeps the offline result).
export async function cloudAnalyze(input) {
  for (const [name, p] of Object.entries(PROVIDERS)) {
    if (!p.enabled()) continue;
    try {
      return await p.analyze(input);
    } catch (e) {
      console.warn(`[ai] ${name} analyze failed, using offline result:`, e.message);
    }
  }
  return null;
}

export async function cloudVerify(input) {
  for (const [name, p] of Object.entries(PROVIDERS)) {
    if (!p.enabled()) continue;
    try {
      return await p.verify(input);
    } catch (e) {
      console.warn(`[ai] ${name} verify failed, using offline result:`, e.message);
    }
  }
  return null;
}
