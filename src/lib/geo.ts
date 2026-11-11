import { MAP } from "@/data/world";

export const project = (lat: number, lon: number) => ({
  x: (lon - MAP.west) / MAP.step,
  y: (MAP.north - lat) / MAP.step,
});
export type Pt = { x: number; y: number };

export function arc(a: Pt, b: Pt) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = (a.x + b.x) / 2;
  const cy = Math.max(2, Math.min(a.y, b.y) - dist * 0.26);
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

/** מסגרת שמכילה את שתי הנקודות ואת קשת הטיסה שביניהן */
export function frame(a: Pt, b: Pt, aspect: number, pad = 12) {
  const minW = 70;
  let w = Math.max(Math.abs(a.x - b.x) + pad * 2, minW);
  let h = w / aspect;
  const needH = Math.abs(a.y - b.y) + pad * 2 + Math.abs(a.x - b.x) * 0.2;
  if (h < needH) { h = needH; w = h * aspect; }
  const x = (a.x + b.x) / 2 - w / 2;
  const y = (a.y + b.y) / 2 - h / 2 - Math.abs(a.x - b.x) * 0.07;
  return `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}

const rad = (d: number) => (d * Math.PI) / 180;
/** מרחק במעגל גדול, בקילומטרים */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)));
}
