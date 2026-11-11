import Link from "next/link";
import type { Metadata } from "next";
import { CHECKED_AT, EVENTS } from "@/data/content";
import { Countdown } from "@/components/Countdown";
import { Status } from "@/components/Status";
export const metadata: Metadata = { title: "אירועים" };

export default function Page() {
  const events = [...EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
  return (
    <div className="wrap section">
      <h1 className="title-xl">אירועים.</h1>
      <p className="lead">נבדק ב-{CHECKED_AT}. ליד כל אירוע כתוב כמה התאריך מאומת, וספירה לאחור מופיעה רק למאומת.</p>
      <ol className="missions">
        {events.map((e) => (
          <li key={e.id}>
            <Link href={`/events/${e.id}`}>
              <span className="m-clock">{e.status === "confirmed" ? <Countdown date={e.sortDate} /> : <Status status={e.status} />}</span>
              <span className="m-main">
                <span className="m-name"><bdi>{e.name}</bdi></span>
                <span className="m-meta">{e.dateText} · {e.city} · {e.venue}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
