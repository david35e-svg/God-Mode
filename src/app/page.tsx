import Link from "next/link";
import { WorldLevel } from "@/components/WorldLevel";
import { Status } from "@/components/Status";
import { CHECKED_AT, EVENTS, GUIDES } from "@/data/content";

export default function Home() {
  const events = [...EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
  return (
    <>
      <WorldLevel />
      <section className="wrap section" aria-labelledby="ev">
        <h2 id="ev" className="big">מה בלוח של 2027</h2>
        <p className="lead">התאריכים נבדקו ב-{CHECKED_AT}. לפני שמזמינים, מוודאים אצל המארגן.</p>
        <ol className="timeline">
          {events.map((e) => (
            <li key={e.id}>
              <Link href={`/events/${e.id}`}>
                <span className="t-name">{e.name}</span>
                <span className="t-date">{e.dateText}</span>
                <Status status={e.status} />
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="spread">
        <div className="wrap spread-grid">
          <Link href="/planner" className="spread-main">
            <h2>אין עדיין כיוון?</h2>
            <p>ענו על שלוש שאלות, ותקבלו יעדים ואירועים שמתאימים לחודש ולאורך הנסיעה.</p>
            <span className="btn dark">לבונה הטיול</span>
          </Link>
          <div className="spread-side">
            <h2>מדריכים קצרים</h2>
            <ul className="plain">
              {GUIDES.map((g) => <li key={g.id}><Link href={`/guides/${g.id}`}>{g.title}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
