// Location helpers. Falls back gracefully when GPS is blocked or unavailable.
export function getLocation({ timeout = 9000 } = {}) {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) return resolve({ ok: false, reason: 'This device has no location service.' });
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    // The browser's own timeout only starts after permission is granted, so also
    // stop waiting if the permission prompt is left unanswered.
    setTimeout(() => finish({ ok: false, reason: 'Location is taking too long - allow location access and try again.' }), timeout + 3000);
    navigator.geolocation.getCurrentPosition(
      (p) => finish({ ok: true, lat: p.coords.latitude, lng: p.coords.longitude, accuracy: Math.round(p.coords.accuracy) }),
      (e) => finish({ ok: false, reason: e.code === 1 ? 'Location permission was denied.' : 'Could not get a GPS fix.' }),
      { enableHighAccuracy: true, timeout, maximumAge: 15000 },
    );
  });
}

export function distanceM(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Is the GPS location plausibly in the demo city? If not (e.g. testing from another
// city), demo mode places the pin in the user's ward so the demo data stays nearby.
export function nearCity(loc, center, km = 60) {
  return loc && center && distanceM(loc, center) < km * 1000;
}
