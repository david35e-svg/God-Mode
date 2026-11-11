import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/data/content";
export const metadata: Metadata = { title: "מדריכים" };
export default function Page() {
  return (
    <div className="wrap section">
      <h1 className="title-l">מדריכים</h1>
      <p className="lead">מה שכדאי לדעת לפני שמגיעים.</p>
      <ul className="rows">
        {GUIDES.map((g) => <li key={g.id}><Link href={`/guides/${g.id}`}><h2>{g.title}</h2><p>{g.lead}</p></Link></li>)}
      </ul>
    </div>
  );
}
