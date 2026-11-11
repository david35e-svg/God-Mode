import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Atlas } from "@/components/Atlas";
import { SpotEntry } from "@/components/SpotEntry";
import { Countdown } from "@/components/Countdown";
import { Status } from "@/components/Status";
import { CHECKED_AT, EVENTS, SPOTS } from "@/data/content";
import { SHELVES } from "@/data/partners";

export default function Home() {
  const events = [...EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
  const featured = SPOTS.filter((s) => s.rarity >= 3).slice(0, 5);
  return (
    <>
      <Atlas />

      <section className="wrap section" aria-labelledby="spots-h">
        <div className="sec-head">
          <h2 id="spots-h" className="title-l">מקומות נסתרים</h2>
          <Link href="/spots">כל {SPOTS.length} המקומות <ArrowLeft aria-hidden size={16} /></Link>
        </div>
        <p className="lead">ארקייד בקומה חמישית, בר שנראה רגיל מבחוץ, קניון שהקומות העליונות שלו הן מבוך של חנויות. לוחצים על שורה כדי לפתוח אותה.</p>
        <div className="spots">{featured.map((s) => <SpotEntry key={s.id} spot={s} />)}</div>
      </section>

      <section className="wrap section" aria-labelledby="shop-h">
        <div className="sec-head">
          <h2 id="shop-h" className="title-l">חנות הקלפים</h2>
          <Link href="/shop">לכל המדפים <ArrowLeft aria-hidden size={16} /></Link>
        </div>
        <ul className="binder">
          {SHELVES.map((s) => (
            <li key={s.id}><Link href={`/shop#${s.id}`} className="pocket"><b>{s.title}</b><span>{s.text}</span></Link></li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="ev-h">
        <div className="sec-head">
          <h2 id="ev-h" className="title-l">הלוח של 2027</h2>
          <Link href="/events">כל האירועים <ArrowLeft aria-hidden size={16} /></Link>
        </div>
        <p className="lead">נבדק ב-{CHECKED_AT}. ספירה לאחור מופיעה רק לתאריך שאימתנו מול מקור.</p>
        <ol className="missions">
          {events.map((e) => (
            <li key={e.id}>
              <Link href={`/events/${e.id}`}>
                <span className="m-clock">{e.status === "confirmed" ? <Countdown date={e.sortDate} /> : <Status status={e.status} />}</span>
                <span className="m-main">
                  <span className="m-name"><bdi>{e.name}</bdi></span>
                  <span className="m-meta">{e.dateText} · {e.venue}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
