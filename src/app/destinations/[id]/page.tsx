import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { DESTINATIONS, destination, eventsFor } from "@/data/content";
import { RouteMap } from "@/components/RouteMap";
import { Status } from "@/components/Status";
import { PartnerLinks } from "@/components/PartnerLinks";

type P = { params: Promise<{ id: string }> };
export const generateStaticParams = () => DESTINATIONS.map((d) => ({ id: d.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const d = destination((await params).id);
  return { title: d?.name ?? "יעד", description: d?.pitch };
}
export default async function Page({ params }: P) {
  const d = destination((await params).id);
  if (!d) notFound();
  const events = eventsFor(d.id);
  return (
    <article>
      <RouteMap lat={d.lat} lon={d.lon} label={d.name} />
      <div className="wrap section guide">
        <div>
          <h1 className="big">{d.name}</h1>
          <p className="lead">{d.about}</p>
          <h2 className="mid">מה רואים</h2>
          <ul className="stops">
            {d.stops.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
                {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer">לאתר הרשמי <ExternalLink aria-hidden size={15} /></a>}
              </li>
            ))}
          </ul>
          {events.length > 0 && (
            <>
              <h2 className="mid">אירועים בלוח</h2>
              <ul className="plain">
                {events.map((e) => <li key={e.id}><Link href={`/events/${e.id}`}>{e.name}</Link>: {e.dateText} <Status status={e.status} /></li>)}
              </ul>
            </>
          )}
        </div>
        <aside className="callouts">
          <PartnerLinks title={`מתכננים את ${d.name}`} ctx={{ city: d.nameEn, iata: d.iata }} categories={["flights", "hotels", "tours"]} />
          <div className="tip"><h2>טיפ</h2><p>{d.tip}</p></div>
          <div className="facts">
            <h2>בקצרה</h2>
            <dl>
              <dt>מתי</dt><dd>{d.bestText}</dd>
              <dt>כמה זמן</dt><dd>לפחות {d.minDays} ימים, הערכה שלנו</dd>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
