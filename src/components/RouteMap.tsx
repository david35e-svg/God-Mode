import { LAND_PATH } from "@/data/world";
import { ORIGIN } from "@/data/content";
import { arc, frame, project } from "@/lib/geo";

export function RouteMap({ lat, lon, label }: { lat: number; lon: number; label: string }) {
  const a = project(ORIGIN.lat, ORIGIN.lon);
  const b = project(lat, lon);
  const view = frame(a, b, 3.4, 14);
  const u = Number(view.split(" ")[2]) / 150;
  return (
    <div className="route-map">
      <svg viewBox={view} preserveAspectRatio="xMidYMid slice" role="img"
        aria-label={`מפה: מסלול מ${ORIGIN.name} אל ${label}`}>
        <defs>
          <radialGradient id="glow-r"><stop offset="0" stopColor="currentColor" stopOpacity=".55" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
        </defs>
        <path className="atlas-land" d={LAND_PATH} shapeRendering="crispEdges" />
        <path className="atlas-route" d={arc(a, b)} style={{ strokeWidth: 0.34 * u }} />
        <g className="city home">
          <circle cx={a.x} cy={a.y} r={3.4 * u} className="halo" fill="url(#glow-r)" />
          <rect x={a.x - 0.75 * u} y={a.y - 0.75 * u} width={1.5 * u} height={1.5 * u} />
        </g>
        <g className="city on">
          <circle cx={b.x} cy={b.y} r={3.8 * u} className="halo" fill="url(#glow-r)" />
          <rect x={b.x - 0.85 * u} y={b.y - 0.85 * u} width={1.7 * u} height={1.7 * u} />
        </g>
      </svg>
    </div>
  );
}
