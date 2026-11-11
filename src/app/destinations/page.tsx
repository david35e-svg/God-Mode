import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS, INTEREST_LABEL } from "@/data/content";
import { WorldLevel } from "@/components/WorldLevel";
export const metadata: Metadata = { title: "יעדים" };
export default function Page() {
  return (
    <>
    <WorldLevel />
    <div className="wrap section">
      <h2 className="title-l">כל העולמות</h2>
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
    </>
  );
}
