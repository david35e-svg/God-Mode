// יוצר את מפת העולם הפיקסלית מ-Natural Earth (world-atlas, נחלת הכלל)
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const B = { west: -130, east: 155, north: 72, south: -12 };
const STEP = 1.5;
const W = Math.round((B.east - B.west) / STEP);
const H = Math.round((B.north - B.south) / STEP);
let d = "";
for (let y = 0; y < H; y++) {
  let run = -1;
  for (let x = 0; x <= W; x++) {
    const inside =
      x < W && geoContains(land, [B.west + (x + 0.5) * STEP, B.north - (y + 0.5) * STEP]);
    if (inside && run < 0) run = x;
    if (!inside && run >= 0) {
      d += `M${run} ${y}h${x - run}v1h-${x - run}z`;
      run = -1;
    }
  }
}
writeFileSync(
  "src/data/world.ts",
  `// נוצר על ידי scripts/build-map.mjs. לא לערוך ידנית.\nexport const MAP = ${JSON.stringify({ ...B, step: STEP, width: W, height: H })} as const;\nexport const LAND_PATH = ${JSON.stringify(d)};\n`,
);
console.log(W, H, d.length);
