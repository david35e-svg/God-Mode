import Link from "next/link";
import { Beer, ExternalLink, FerrisWheel, Gamepad2, Joystick, Landmark, Monitor } from "lucide-react";
import { KIND_LABEL, destination, type Spot } from "@/data/content";
import { Rarity } from "./Rarity";

const ICON = { arcade: Joystick, bar: Beer, retro: Gamepad2, museum: Landmark, pcbang: Monitor, park: FerrisWheel };
// צבע לכל סוג מקום, כדי שאפשר יהיה לזהות אותו במבט
const KIND_COLOR: Record<string, string> = {
  arcade: "#FF3D7A", bar: "#FFD233", retro: "#00E0A4",
  museum: "#B07CFF", pcbang: "#5B8CFF", park: "#FF8A1F",
};

export function SpotEntry({ spot, showCity = true }: { spot: Spot; showCity?: boolean }) {
  const Icon = ICON[spot.kind];
  const d = destination(spot.destinationId);
  return (
    <details className="spot" name="spot" style={{ ["--k" as string]: KIND_COLOR[spot.kind] }}>
      <summary>
        <span className="spot-icon" aria-hidden><Icon size={20} /></span>
        <span className="spot-head">
          <span className="spot-name"><bdi>{spot.name}</bdi></span>
          <span className="spot-where">
            {showCity && d ? `${d.name} · ` : ""}{spot.area} · {KIND_LABEL[spot.kind]}
          </span>
        </span>
        <Rarity level={spot.rarity} />
      </summary>
      <div className="spot-body">
        <p>{spot.what}</p>
        <p className="spot-tip"><b>מה שלא כתוב בשלט:</b> {spot.tip}</p>
        <p className="spot-find"><b>איך מוצאים:</b> {spot.find}</p>
        <p className="spot-links">
          {spot.url && <a href={spot.url} target="_blank" rel="noopener noreferrer">האתר שלהם <ExternalLink aria-hidden size={14} /></a>}
          {spot.source && <a href={spot.source.url} target="_blank" rel="noopener noreferrer">המקור שבדקנו: {spot.source.name} <ExternalLink aria-hidden size={14} /></a>}
          {d && showCity && <Link href={`/destinations/${d.id}`}>המדריך של {d.name}</Link>}
          {!spot.checked && <span className="unchecked">לא אומת מול מקור רשמי</span>}
        </p>
      </div>
    </details>
  );
}
