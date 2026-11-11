import { MAP } from "@/data/world";
export const project = (lat: number, lon: number) => ({
  x: (lon - MAP.west) / MAP.step,
  y: (MAP.north - lat) / MAP.step,
});
export type Pt = { x: number; y: number };
export function arc(a: Pt, b: Pt) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = (a.x + b.x) / 2;
  const cy = Math.max(2, Math.min(a.y, b.y) - dist * 0.28);
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}
export function frame(a: Pt, b: Pt, aspect: number, pad = 12) {
  const minW = 56;
  let w = Math.max(Math.abs(a.x - b.x) + pad * 2, minW);
  let h = w / aspect;
  const needH = Math.abs(a.y - b.y) + pad * 2 + Math.abs(a.x - b.x) * 0.2;
  if (h < needH) { h = needH; w = h * aspect; }
  const x = (a.x + b.x) / 2 - w / 2;
  const y = (a.y + b.y) / 2 - h / 2 - Math.abs(a.x - b.x) * 0.08;
  return `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}
