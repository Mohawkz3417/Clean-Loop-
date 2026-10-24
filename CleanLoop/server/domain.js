// Business rules and reference data in one place. Tweak numbers here.

export const CATEGORIES = {
  plastic:      { label: 'Plastic',               bin: 'Dry - recyclable',  hazard: false, co2PerKg: 1.5,  valuePerKg: 12, color: '#2F80ED' },
  paper:        { label: 'Paper & cardboard',     bin: 'Dry - recyclable',  hazard: false, co2PerKg: 0.9,  valuePerKg: 9,  color: '#C08A3E' },
  glass:        { label: 'Glass',                 bin: 'Dry - recyclable',  hazard: false, co2PerKg: 0.3,  valuePerKg: 2,  color: '#3BB3A6' },
  metal:        { label: 'Metal',                 bin: 'Dry - recyclable',  hazard: false, co2PerKg: 2.8,  valuePerKg: 28, color: '#7B8794' },
  organic:      { label: 'Organic / wet',         bin: 'Wet - compost',     hazard: false, co2PerKg: 0.5,  valuePerKg: 1,  color: '#5E9E3A' },
  ewaste:       { label: 'E-waste',               bin: 'E-waste centre',    hazard: true,  co2PerKg: 2.2,  valuePerKg: 45, color: '#8E5CF6' },
  construction: { label: 'Construction debris',   bin: 'C&D waste yard',    hazard: false, co2PerKg: 0.05, valuePerKg: 0.5, color: '#A0715A' },
  medical:      { label: 'Medical / biohazard',   bin: 'Biomedical facility', hazard: true, co2PerKg: 0.2, valuePerKg: 0,  color: '#F0574A' },
  mixed:        { label: 'Mixed waste',           bin: 'Needs segregation', hazard: false, co2PerKg: 0.4,  valuePerKg: 1,  color: '#5B6B66' },
};

// Labels coming from any AI model are mapped onto the categories above.
export const CATEGORY_ALIASES = {
  cardboard: 'paper', paper: 'paper', newspaper: 'paper', carton: 'paper',
  plastic: 'plastic', pet: 'plastic', polythene: 'plastic', bottle: 'plastic',
  glass: 'glass', metal: 'metal', aluminium: 'metal', aluminum: 'metal', tin: 'metal', can: 'metal',
  trash: 'mixed', mixed: 'mixed', general: 'mixed', garbage: 'mixed', litter: 'mixed',
  organic: 'organic', food: 'organic', biodegradable: 'organic', wet: 'organic', garden: 'organic',
  ewaste: 'ewaste', 'e-waste': 'ewaste', electronics: 'ewaste', battery: 'ewaste', batteries: 'ewaste',
  construction: 'construction', debris: 'construction', rubble: 'construction', 'c&d': 'construction',
  medical: 'medical', biomedical: 'medical', biohazard: 'medical', syringe: 'medical', hazardous: 'medical',
};

export function normalizeCategory(label) {
  if (!label) return 'mixed';
  const k = String(label).toLowerCase().trim();
  if (CATEGORIES[k]) return k;
  if (CATEGORY_ALIASES[k]) return CATEGORY_ALIASES[k];
  for (const [alias, cat] of Object.entries(CATEGORY_ALIASES)) if (k.includes(alias)) return cat;
  return 'mixed';
}

export const VOLUMES = {
  bag:   { label: 'Small bag',  kg: 5,   pay: 60,   needsVehicle: false },
  pile:  { label: 'Pile',       kg: 25,  pay: 150,  needsVehicle: false },
  cart:  { label: 'Cart load',  kg: 80,  pay: 350,  needsVehicle: false },
  truck: { label: 'Truck load', kg: 450, pay: 1200, needsVehicle: true },
};

export const SEVERITY = {
  low:      { label: 'Low',      slaHours: 72, points: 20 },
  medium:   { label: 'Medium',   slaHours: 48, points: 30 },
  high:     { label: 'High',     slaHours: 24, points: 45 },
  critical: { label: 'Critical', slaHours: 12, points: 60 },
};

export function severityFromScore(score) {
  if (score >= 80) return 'critical';
  if (score >= 58) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

export function payoutFor(category, volume, severity) {
  const v = VOLUMES[volume] || VOLUMES.pile;
  const c = CATEGORIES[category] || CATEGORIES.mixed;
  let pay = v.pay;
  if (c.hazard) pay *= 1.5;
  if (severity === 'critical') pay *= 1.2;
  return Math.round(pay / 5) * 5;
}

export const POINTS = {
  rupeesPerPoint: 0.1, // 10 points = Rs 1
  confirmation: 5,
  pickupPerKg: 10,
  driveJoin: 50,
  confirmCleanup: 5,
  violationReporter: 100,
};

export const REPORTER_FINE_SHARE = 0.2; // 20% of a paid fine goes to the reporter
export const DAILY_REWARDED_REPORTS = 15;
export const DUPLICATE_RADIUS_M = 35;
export const GEOFENCE_M = 60;

export const CITIZEN_LEVELS = [
  { name: 'Seedling', min: 0 },
  { name: 'Sprout', min: 200 },
  { name: 'Sapling', min: 600 },
  { name: 'Guardian', min: 1500 },
  { name: 'Eco champion', min: 3500 },
  { name: 'City hero', min: 7000 },
];

export function levelFor(lifetimePoints) {
  let idx = 0;
  CITIZEN_LEVELS.forEach((l, i) => { if (lifetimePoints >= l.min) idx = i; });
  const next = CITIZEN_LEVELS[idx + 1];
  return {
    index: idx, name: CITIZEN_LEVELS[idx].name, min: CITIZEN_LEVELS[idx].min,
    next: next ? next.name : null, nextMin: next ? next.min : null,
    progress: next ? (lifetimePoints - CITIZEN_LEVELS[idx].min) / (next.min - CITIZEN_LEVELS[idx].min) : 1,
  };
}

export function workerTier(w) {
  const jobs = w.jobsDone || 0;
  const r = w.rating || 0;
  if (jobs >= 150 && r >= 4.7) return 'Platinum';
  if (jobs >= 60 && r >= 4.5) return 'Gold';
  if (jobs >= 20) return 'Silver';
  return 'Bronze';
}

export const BADGES = {
  // citizen
  first_report:   { name: 'First step',      desc: 'Filed your first verified report', role: 'citizen', icon: 'Footprints' },
  hawk_eye:       { name: 'Hawk eye',        desc: '10 verified reports', role: 'citizen', icon: 'Eye' },
  plastic_buster: { name: 'Plastic buster',  desc: '5 plastic reports cleaned', role: 'citizen', icon: 'Recycle' },
  whistleblower:  { name: 'Whistleblower',   desc: 'A dumping report led to a fine', role: 'citizen', icon: 'Megaphone' },
  community_star: { name: 'Community star',  desc: 'Joined 3 cleanup drives', role: 'citizen', icon: 'Users' },
  recycler:       { name: 'Home recycler',   desc: '25 kg handed over at doorstep pickups', role: 'citizen', icon: 'Package' },
  hazard_spotter: { name: 'Hazard spotter',  desc: 'Reported hazardous waste safely', role: 'citizen', icon: 'ShieldAlert' },
  confirmer:      { name: 'Second pair of eyes', desc: 'Confirmed 5 cleanups', role: 'citizen', icon: 'CheckCheck' },
  // worker
  first_job:      { name: 'On the job',      desc: 'Completed a first cleanup', role: 'worker', icon: 'BadgeCheck' },
  fifty_club:     { name: 'Fifty club',      desc: '50 verified cleanups', role: 'worker', icon: 'Trophy' },
  hazard_hero:    { name: 'Hazard hero',     desc: 'Cleared 5 hazardous sites', role: 'worker', icon: 'HardHat' },
  five_star:      { name: 'Five star',       desc: 'Rating of 4.8 or above', role: 'worker', icon: 'Star' },
  spotlight:      { name: 'Worker of the month', desc: 'Picked for the monthly spotlight', role: 'worker', icon: 'Sparkles' },
};

// Chennai wards / areas used for the demo. Replace with your city's wards.
export const WARDS = [
  { id: 'adyar',          name: 'Adyar',          zone: 'Zone 13', lat: 13.0012, lng: 80.2565 },
  { id: 'velachery',      name: 'Velachery',      zone: 'Zone 13', lat: 12.9791, lng: 80.2209 },
  { id: 'tnagar',         name: 'T. Nagar',       zone: 'Zone 10', lat: 13.0418, lng: 80.2341 },
  { id: 'mylapore',       name: 'Mylapore',       zone: 'Zone 9',  lat: 13.0339, lng: 80.2619 },
  { id: 'annanagar',      name: 'Anna Nagar',     zone: 'Zone 8',  lat: 13.0850, lng: 80.2101 },
  { id: 'guindy',         name: 'Guindy',         zone: 'Zone 11', lat: 13.0067, lng: 80.2206 },
  { id: 'perungudi',      name: 'Perungudi',      zone: 'Zone 14', lat: 12.9654, lng: 80.2461 },
  { id: 'sholinganallur', name: 'Sholinganallur', zone: 'Zone 15', lat: 12.9010, lng: 80.2279 },
  { id: 'tambaram',       name: 'Tambaram',       zone: 'Tambaram', lat: 12.9249, lng: 80.1000 },
  { id: 'egmore',         name: 'Egmore',         zone: 'Zone 5',  lat: 13.0732, lng: 80.2609 },
  { id: 'royapuram',      name: 'Royapuram',      zone: 'Zone 5',  lat: 13.1137, lng: 80.2954 },
  { id: 'kelambakkam',    name: 'Kelambakkam',    zone: 'OMR',     lat: 12.7880, lng: 80.2210 },
];

export function distanceM(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function wardFor(lat, lng) {
  let best = WARDS[0];
  let bestD = Infinity;
  for (const w of WARDS) {
    const d = distanceM({ lat, lng }, w);
    if (d < bestD) { bestD = d; best = w; }
  }
  return best;
}

export function hamming(a, b) {
  if (!a || !b || a.length !== b.length) return 64;
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) { d += x & 1; x >>= 1; }
  }
  return d;
}

export const REWARD_CATALOG = [
  { id: 'bus50',    title: 'City bus pass credit',     cost: 500,  value: 50,  partner: 'City transport', icon: 'Bus' },
  { id: 'metro100', title: 'Metro card top-up',        cost: 1000, value: 100, partner: 'Metro rail', icon: 'TrainFront' },
  { id: 'tax200',   title: 'Property tax rebate',      cost: 2000, value: 200, partner: 'Municipal corporation', icon: 'Landmark' },
  { id: 'compost',  title: 'Home compost kit',         cost: 1200, value: 450, partner: 'Ward office', icon: 'Sprout' },
  { id: 'cafe',     title: 'Partner cafe voucher',     cost: 400,  value: 40,  partner: 'Local partners', icon: 'Coffee' },
  { id: 'tree',     title: 'A tree planted in your name', cost: 800, value: 80, partner: 'Urban forest drive', icon: 'TreePine' },
];

export const GOV_SERVICES = [
  { id: 'plastic-drive', title: 'Plastic collection drive', desc: 'Drop single-use plastic at ward collection points every second Saturday.', kind: 'event', icon: 'Recycle' },
  { id: 'ewaste-camp',   title: 'E-waste collection camp', desc: 'Hand over old phones, chargers, batteries and appliances safely.', kind: 'event', icon: 'Cpu' },
  { id: 'bulk-pickup',   title: 'Bulk waste pickup',       desc: 'Old furniture, mattresses, garden waste - request a scheduled pickup.', kind: 'request', icon: 'Truck' },
  { id: 'debris',        title: 'Construction debris removal', desc: 'Book removal of C&D debris from home repairs (charges apply).', kind: 'request', icon: 'Hammer' },
  { id: 'compost-sub',   title: 'Home composting subsidy', desc: 'Apply for a subsidised compost bin and a training session.', kind: 'request', icon: 'Sprout' },
  { id: 'bin-request',   title: 'Request a public bin',    desc: 'Ask the ward to place a twin bin at a spot that needs one.', kind: 'request', icon: 'Trash2' },
];

export const SEGREGATION_GUIDE = [
  { item: 'PET water bottle', category: 'plastic', tip: 'Empty, crush and cap it. Goes to dry waste.' },
  { item: 'Milk packet', category: 'plastic', tip: 'Rinse, dry and keep flat. Highly recyclable.' },
  { item: 'Chips / snack wrapper', category: 'plastic', tip: 'Multi-layer plastic - keep clean and dry, hand to collection drives.' },
  { item: 'Tetra Pak carton', category: 'paper', tip: 'Rinse, flatten. Recycled into boards and paper.' },
  { item: 'Newspaper', category: 'paper', tip: 'Keep dry and bundled. Sells well to recyclers.' },
  { item: 'Pizza box', category: 'paper', tip: 'Clean parts are dry waste; oily parts go to wet waste.' },
  { item: 'Glass bottle', category: 'glass', tip: 'Do not break. Wrap broken glass in paper and label it.' },
  { item: 'Aluminium can', category: 'metal', tip: 'Rinse and crush. One of the most valuable recyclables.' },
  { item: 'Vegetable peels', category: 'organic', tip: 'Wet waste. Perfect for home composting.' },
  { item: 'Leftover food', category: 'organic', tip: 'Wet waste. Drain liquids first.' },
  { item: 'Flowers / pooja waste', category: 'organic', tip: 'Wet waste. Remove plastic and thread first.' },
  { item: 'Old phone / charger', category: 'ewaste', tip: 'Never in household bins. Use e-waste camps.' },
  { item: 'AA / AAA batteries', category: 'ewaste', tip: 'Tape the ends and store in a box for e-waste drop-off.' },
  { item: 'CFL / tube light', category: 'ewaste', tip: 'Contains mercury. Keep unbroken for e-waste collection.' },
  { item: 'Used syringe', category: 'medical', tip: 'Biohazard. Put in a hard container and hand to a pharmacy or clinic.' },
  { item: 'Expired medicines', category: 'medical', tip: 'Domestic hazardous waste. Return at pharmacy take-back points.' },
  { item: 'Sanitary pad / diaper', category: 'medical', tip: 'Wrap in paper, mark with a red dot, keep separate.' },
  { item: 'Broken tiles / cement', category: 'construction', tip: 'C&D waste. Book a debris pickup - never dump on roadsides.' },
  { item: 'Thermocol', category: 'plastic', tip: 'Keep clean and dry. Collected separately at plastic drives.' },
  { item: 'Coconut shell', category: 'organic', tip: 'Wet / garden waste. Takes longer to compost - break it up.' },
];
