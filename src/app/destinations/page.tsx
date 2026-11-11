import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS, INTEREST_LABEL, ORIGIN, spotsFor } from "@/data/content";
import { distanceKm } from "@/lib/geo";
export const metadata: Metadata = { title: "יעדים" };

export default function Page() {
  return (
    <div className="wrap section">
      <h1 className="title-xl">יעדים.</h1>
      <p className="lead">שבע ערים בארבע מדינות, שכולן בנויות לנסיעה סביב משחקים.</p>
      <ul className="levels">
        {DESTINATIONS.map((d, i) => (
          <li key={d.id}>
            <Link href={`/destinations/${d.id}`}>
              <span className="lv-num num">{String(i + 1).padStart(2, "0")}</span>
              <span className="lv-main">
                <b>{d.name}<span className="lv-country">{d.country}</span></b>
                <span className="lv-pitch">{d.pitch}</span>
                <span className="lv-tags">{d.interests.map((x) => INTEREST_LABEL[x]).join(" · ")}</span>
              </span>
              <span className="lv-stats num">
                <span>{spotsFor(d.id).length} מקומות</span>
                <span>{distanceKm(ORIGIN, d).toLocaleString("en-US")} ק״מ</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
