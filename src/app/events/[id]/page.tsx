import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { CHECKED_AT, EVENTS, destination } from "@/data/content";
import { Status } from "@/components/Status";
import { PartnerLinks } from "@/components/PartnerLinks";

type P = { params: Promise<{ id: string }> };
export const generateStaticParams = () => EVENTS.map((e) => ({ id: e.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { id } = await params;
  return { title: EVENTS.find((e) => e.id === id)?.name ?? "אירוע" };
}
export default async function Page({ params }: P) {
  const { id } = await params;
  const e = EVENTS.find((x) => x.id === id);
  if (!e) notFound();
  const d = destination(e.destinationId);
  return (
    <article className="wrap section guide">
      <div>
        <h1 className="big" dir="auto">{e.name}</h1>
        <p className="lead">{e.about}</p>
        <p className="event-date">{e.dateText}</p>
        <p><Status status={e.status} /></p>
        <p>{e.statusNote}</p>
        <div className="actions">
          <a className="btn" href={e.officialUrl} target="_blank" rel="noopener noreferrer">לאתר המארגן <ExternalLink aria-hidden size={16} /></a>
          {d && <Link className="btn ghost" href={`/destinations/${d.id}`}>המדריך של {d.name}</Link>}
        </div>
      </div>
      <aside className="callouts">
        {d && <PartnerLinks title="טיסה ולינה לאירוע" ctx={{ city: d.nameEn, iata: d.iata }} categories={["flights", "hotels"]} />}
        <div className="facts">
          <h2>בקצרה</h2>
          <dl><dt>איפה</dt><dd>{e.city}</dd><dt>מקום</dt><dd>{e.venue}</dd><dt>נבדק</dt><dd>{CHECKED_AT}</dd>
            {e.sourceUrl && <><dt>מקור</dt><dd><a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">{e.sourceName}</a></dd></>}
          </dl>
        </div>
      </aside>
    </article>
  );
}
