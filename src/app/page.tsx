import Link from "next/link";
import { PackOpener } from "@/components/PackOpener";
import { Countdown } from "@/components/Countdown";
import { Status } from "@/components/Status";
import { DESTINATIONS, EVENTS } from "@/data/content";
import { SHELVES } from "@/data/partners";

export default function Home() {
  const events = [...EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
  return (
    <>
      <section className="arena">
        <div className="arena-copy">
          <h1 className="title-xl">פותחים<br />חבילה.</h1>
          <p className="arena-sub">קלפי פוקימון, טורנירים ונסיעות גיימינג. הכול בעברית, ובלי מחירים מומצאים.</p>
          <div className="actions">
            <Link className="btn" href="/shop">לחנות הקלפים</Link>
            <Link className="btn ghost" href="/events">מה בלוח</Link>
          </div>
        </div>
        <PackOpener />
      </section>

      <section className="wrap section" aria-labelledby="sh">
        <div className="sec-head">
          <h2 id="sh" className="title-l">המדפים</h2>
          <Link href="/shop">לכל החנות</Link>
        </div>
        <ul className="binder">
          {SHELVES.map((s) => (
            <li key={s.id}><Link href={`/shop#${s.id}`} className="pocket"><b>{s.title}</b><span>{s.text}</span></Link></li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="ev">
        <div className="sec-head">
          <h2 id="ev" className="title-l">הלוח של 2027</h2>
          <Link href="/events">לכל האירועים</Link>
        </div>
        <ol className="bosses">
          {events.map((e) => (
            <li key={e.id}>
              <Link href={`/events/${e.id}`} className="boss">
                <span className="boss-name" dir="auto">{e.name}</span>
                <span className="boss-date">{e.dateText}</span>
                <span className="boss-meta">{e.status === "confirmed" ? <Countdown date={e.sortDate} /> : <Status status={e.status} />}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="wo">
        <div className="sec-head">
          <h2 id="wo" className="title-l">בחירת עולם</h2>
          <Link href="/destinations">למפה</Link>
        </div>
        <ul className="worlds">
          {DESTINATIONS.map((d, i) => (
            <li key={d.id}><Link href={`/destinations/${d.id}`} className="world"><span className="world-n">{i + 1}-1</span><b>{d.name}</b><span>{d.pitch}</span></Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
