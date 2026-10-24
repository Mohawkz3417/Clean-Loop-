import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const TILES = {
  light: { url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', attribution: '&copy; OpenStreetMap contributors &copy; CARTO' },
  dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; OpenStreetMap contributors &copy; CARTO' },
};

export const CHENNAI = [13.0, 80.235];

export function BaseMap({ center = CHENNAI, zoom = 12, dark = false, children, className = '', scrollWheelZoom = true, zoomControl = true }) {
  const t = TILES[dark ? 'dark' : 'light'];
  return (
    <MapContainer center={center} zoom={zoom} className={`h-full w-full ${className}`} scrollWheelZoom={scrollWheelZoom} zoomControl={zoomControl} attributionControl>
      <TileLayer url={t.url} attribution={t.attribution} subdomains="abcd" maxZoom={19} />
      {children}
    </MapContainer>
  );
}

const iconCache = new Map();
export function dotIcon(color = '#0E5E4A', { size = 16, pulse = false, ring = '#fff', label = '' } = {}) {
  const key = `${color}${size}${pulse}${ring}${label}`;
  if (iconCache.has(key)) return iconCache.get(key);
  const html = `<span class="${pulse ? 'pin-pulse' : ''}" style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};color:${color};box-shadow:0 0 0 3px ${ring},0 4px 10px rgba(0,0,0,.3)"></span>${label ? `<span style="position:absolute;left:${size + 6}px;top:-2px;white-space:nowrap;font:600 11px Figtree Variable,system-ui;background:#fff;color:#0C2620;padding:1px 6px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,.2)">${label}</span>` : ''}`;
  const ic = L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2], popupAnchor: [0, -size / 2] });
  iconCache.set(key, ic);
  return ic;
}

export function pinIcon(color = '#0E5E4A', glyph = '') {
  const key = `pin${color}${glyph}`;
  if (iconCache.has(key)) return iconCache.get(key);
  const html = `<svg width="34" height="44" viewBox="0 0 34 44"><path d="M17 43s15-14.6 15-26A15 15 0 1 0 2 17c0 11.4 15 26 15 26z" fill="${color}" stroke="#fff" stroke-width="2.5"/><circle cx="17" cy="17" r="6.5" fill="#fff"/>${glyph ? `<text x="17" y="21" text-anchor="middle" font-size="10" font-weight="700" fill="${color}" font-family="system-ui">${glyph}</text>` : ''}</svg>`;
  const ic = L.divIcon({ html, className: '', iconSize: [34, 44], iconAnchor: [17, 43], popupAnchor: [0, -38] });
  iconCache.set(key, ic);
  return ic;
}

export function meIcon() {
  return dotIcon('#2F80ED', { size: 16, pulse: true });
}

export function FitBounds({ points, padding = 40, maxZoom = 15 }) {
  const map = useMap();
  const key = JSON.stringify(points?.map((p) => [p[0].toFixed?.(4), p[1].toFixed?.(4)]));
  useEffect(() => {
    if (!points || !points.length) return;
    if (points.length === 1) { map.setView(points[0], Math.min(maxZoom, 16)); return; }
    map.fitBounds(L.latLngBounds(points), { padding: [padding, padding], maxZoom });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export function Recenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => { if (center) map.setView(center, zoom ?? map.getZoom()); }, [center?.[0], center?.[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export function HeatLayer({ points, radius = 26, blur = 22, gradient }) {
  const map = useMap();
  const layer = useRef(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      window.L = L;
      await import('leaflet.heat');
      if (cancelled) return;
      if (layer.current) map.removeLayer(layer.current);
      layer.current = L.heatLayer(points, { radius, blur, maxZoom: 15, minOpacity: 0.35, gradient: gradient || { 0.2: '#14A06B', 0.45: '#B6F04A', 0.65: '#F5A524', 0.85: '#F27B1F', 1: '#F0574A' } }).addTo(map);
    })();
    return () => { cancelled = true; if (layer.current) { map.removeLayer(layer.current); layer.current = null; } };
  }, [map, points, radius, blur, gradient]);
  return null;
}

// Draggable pin used to set or correct a location.
export function PickLocation({ value, onChange, color = '#F0574A' }) {
  const icon = useMemo(() => pinIcon(color), [color]);
  useMapEvents({ click: (e) => onChange({ lat: e.latlng.lat, lng: e.latlng.lng }) });
  if (!value) return null;
  return (
    <Marker position={[value.lat, value.lng]} draggable icon={icon}
      eventHandlers={{ dragend: (e) => { const p = e.target.getLatLng(); onChange({ lat: p.lat, lng: p.lng }); } }} />
  );
}

export function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 250);
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [map]);
  return null;
}
