import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DESTINATIONS, destination, eventsFor, spotsFor } from "@/data/content";
import { RouteMap } from "@/components/RouteMap";
import { SpotEntry } from "@/components/SpotEntry";
import { Status } from "@/components/Status";
import { PartnerLinks } from "@/components/PartnerLinks";
import { distanceKm } from "@/lib/geo";
import { ORIGIN } from "@/data/content";

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
  const spots = spotsFor(d.id);
  return (
    <article>
      <RouteMap lat={d.lat} lon={d.lon} label={d.name} />
      <div className="wrap">
        <header className="dest-head">
          <h1 className="title-xl">{d.name}.</h1>
          <dl className="gauges">
            <div><dt>מדינה</dt><dd>{d.country}</dd></div>
            <div><dt>מרחק מתל אביב</dt><dd className="num">{distanceKm(ORIGIN, d).toLocaleString("en-US")} ק״מ</dd></div>
            <div><dt>כמה זמן</dt><dd className="num">{d.minDays}+ ימים</dd></div>
            <div><dt>מתי</dt><dd>{d.bestText}</dd></div>
          </dl>
          <p className="lead">{d.about}</p>
        </header>
      </div>
      <div className="wrap section guide">
        <div>
          {spots.length > 0 && (
            <>
              <h2 className="title-m">מה מחכה שם</h2>
              <div className="spots">{spots.map((s) => <SpotEntry key={s.id} spot={s} showCity={false} />)}</div>
            </>
          )}
          {events.length > 0 && (
            <>
              <h2 className="title-m">אירועים בלוח</h2>
              <ul className="plain">
                {events.map((e) => (
                  <li key={e.id}><Link href={`/events/${e.id}`}>{e.name}</Link>: {e.dateText} <Status status={e.status} /></li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="callouts">
          <PartnerLinks title={`מתכננים את ${d.name}`} ctx={{ city: d.nameEn, iata: d.iata }} categories={["flights", "hotels", "tours"]} />
          <div className="tip"><h2>טיפ</h2><p>{d.tip}</p></div>
        </aside>
      </div>
    </article>
  );
}
