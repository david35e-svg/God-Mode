import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PARTNERS, SHELVES, partnerUrl } from "@/data/partners";
import { PartnerLinks } from "@/components/PartnerLinks";
import { ShelfLink } from "@/components/ShelfLink";
export const metadata: Metadata = { title: "חנות קלפים" };

export default function Page() {
  const tcg = PARTNERS.find((p) => p.id === "tcgplayer")!;
  return (
    <>
      <section className="shop-hero">
        <div className="wrap">
          <h1 className="title-xl">חנות<br />הקלפים.</h1>
          <p className="lead">קלפי פוקימון וכל מה שצריך כדי לשמור עליהם. אנחנו לא מוכרים בעצמנו: כל מדף מוביל לחנות של שותף, והקנייה, המשלוח וההחזרות מתבצעים אצלו.</p>
        </div>
      </section>
      <div className="wrap section">
        <ul className="binder big">
          {SHELVES.map((s) => {
            const { url, isAffiliate } = partnerUrl(tcg, { city: "", iata: "", q: s.q });
            return (
              <li key={s.id} id={s.id}>
                <div className="pocket">
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                  <ShelfLink href={url} partner={tcg.id} sponsored={isAffiliate}>לחיפוש ב-{tcg.name} <ExternalLink aria-hidden size={15} /></ShelfLink>
                  {isAffiliate && <span className="p-tag">קישור שותף</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="shop-grid">
          <PartnerLinks title="עוד חנויות" ctx={{ city: "", iata: "" }} categories={["cards"]} />
          <div>
            <h2 className="title-m">לפני שקונים מחו&quot;ל</h2>
            <ul className="stops">
              <li><h3>משלוח לישראל</h3><p>בודקים אצל המוכר שהוא שולח לישראל, וכמה עולה המשלוח.</p></li>
              <li><h3>מכס ומע&quot;מ</h3><p>על הזמנה מעל סכום מסוים ייתכנו מסים בכניסה לארץ. בודקים באתר רשות המסים לפני הקנייה.</p></li>
              <li><h3>זיופים</h3><p>קונים ממוכר עם היסטוריה ודירוג גבוה, ונזהרים ממחיר נמוך מדי לחבילה סגורה.</p></li>
              <li><h3>מצב הקלף</h3><p>בקלף בודד בודקים איך המוכר מגדיר את המצב שלו, ומבקשים תמונה אם צריך.</p></li>
            </ul>
          </div>
        </div>
        <p className="fineprint">Pokémon הוא סימן מסחרי של בעליו. האתר לא קשור אליהם ולא מאושר על ידם. <Link href="/legal/affiliate">גילוי שותפים</Link></p>
      </div>
    </>
  );
}
