import Link from "next/link";
import type { Metadata } from "next";
import { CHECKED_AT, EVENTS } from "@/data/content";
import { Status } from "@/components/Status";
export const metadata: Metadata = { title: "אירועים" };
export default function Page() {
  const events = [...EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
  return (
    <div className="wrap section">
      <h1 className="big">אירועים ב-2027</h1>
      <p className="lead">נבדק ב-{CHECKED_AT}. ליד כל אירוע כתוב כמה התאריך מאומת.</p>
      <ol className="timeline">
        {events.map((e) => (
          <li key={e.id}><Link href={`/events/${e.id}`}>
            <span className="t-name">{e.name}</span><span className="t-date">{e.dateText}</span><Status status={e.status} />
          </Link></li>
        ))}
      </ol>
    </div>
  );
}
