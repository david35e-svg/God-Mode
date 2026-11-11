import { LAND_PATH } from "@/data/world";
import { ORIGIN } from "@/data/content";
import { arc, frame, project } from "@/lib/geo";

export function RouteMap({ lat, lon, label }: { lat: number; lon: number; label: string }) {
  const a = project(ORIGIN.lat, ORIGIN.lon);
  const b = project(lat, lon);
  return (
    <div className="route-map">
      <svg viewBox={frame(a, b, 3)} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`מפה: מסלול מ${ORIGIN.name} אל ${label}`}>
        <path d={LAND_PATH} className="land" shapeRendering="crispEdges" />
        <path d={arc(a, b)} className="route" />
        <rect x={a.x - 1} y={a.y - 1} width="2" height="2" className="node home" />
        <rect x={b.x - 1} y={b.y - 1} width="2" height="2" className="node on" />
      </svg>
    </div>
  );
}
