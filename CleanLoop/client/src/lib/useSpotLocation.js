import { useEffect, useState } from 'react';
import { getLocation, nearCity } from './geo.js';

// GPS location with demo-mode fallback to the user's ward.
export function useSpotLocation(meta, user) {
  const [loc, setLoc] = useState(null);
  const [info, setInfo] = useState({ state: 'finding' });
  useEffect(() => {
    if (!meta) return;
    let alive = true;
    (async () => {
      const ward = meta.wards.find((w) => w.id === user?.ward) || meta.wards[0];
      const center = { lat: ward.lat, lng: ward.lng };
      const g = await getLocation();
      if (!alive) return;
      if (g.ok && (nearCity(g, center) || !meta.demoMode)) {
        setLoc({ lat: g.lat, lng: g.lng, accuracy: g.accuracy });
        setInfo({ state: 'gps', accuracy: g.accuracy });
      } else if (meta.demoMode) {
        setLoc({ lat: center.lat + (Math.random() - 0.5) * 0.01, lng: center.lng + (Math.random() - 0.5) * 0.01 });
        setInfo({ state: 'demo', reason: g.ok ? 'You are outside the demo city, so the pin was placed in your ward.' : g.reason });
      } else {
        setLoc(center);
        setInfo({ state: 'manual', reason: g.reason });
      }
    })();
    return () => { alive = false; };
  }, [meta, user?.ward]);
  return { loc, setLoc, info };
}
