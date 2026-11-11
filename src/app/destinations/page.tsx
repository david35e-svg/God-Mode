import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS, INTEREST_LABEL } from "@/data/content";
export const metadata: Metadata = { title: "יעדים" };
export default function Page() {
  return (
    <div className="wrap section">
      <h1 className="big">יעדים</h1>
      <p className="lead">חמש ערים שבנויות לנסיעה סביב משחקים.</p>
      <ul className="rows">
        {DESTINATIONS.map((d) => (
          <li key={d.id}>
            <Link href={`/destinations/${d.id}`}>
              <h2>{d.name}</h2>
              <p>{d.pitch}</p>
              <span className="tags">{d.interests.map((i) => INTEREST_LABEL[i]).join(", ")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
