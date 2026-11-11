import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PARKS, destination } from "@/data/content";
export const metadata: Metadata = { title: "פארקים" };
export default function Page() {
  return (
    <div className="wrap section">
      <h1 className="big">פארקים</h1>
      <p className="lead">שעות ומחירים משתנים לפי עונה, אז אנחנו שולחים אתכם לאתר הרשמי לבדוק.</p>
      <ul className="stops wide">
        {PARKS.map((p) => (
          <li key={p.id}>
            <h2 className="mid" dir="auto">{p.name}</h2>
            <p className="tags">{p.place}</p>
            <p>{p.text}</p>
            <p className="link-row">
              <a href={p.url} target="_blank" rel="noopener noreferrer">לאתר הרשמי <ExternalLink aria-hidden size={15} /></a>
              <Link href={`/destinations/${p.destinationId}`}>המדריך של {destination(p.destinationId)?.name}</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
