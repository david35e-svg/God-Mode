import type { Metadata } from "next";
import { PartnerLinks } from "@/components/PartnerLinks";
export const metadata: Metadata = { title: "חנות" };
export default function Page() {
  return (
    <div className="wrap section narrow">
      <h1 className="big">חנות</h1>
      <p className="lead">אנחנו לא מוכרים בעצמנו. כאן מרוכזים מוכרים שאפשר לקנות אצלם, והקנייה, המשלוח וההחזרות מתבצעים אצלם.</p>
      <PartnerLinks title="קלפי מסחר" ctx={{ city: "", iata: "" }} categories={["cards"]} />
      <h2 className="mid">לפני שקונים מחו&quot;ל</h2>
      <ul className="stops">
        <li><h3>משלוח לישראל</h3><p>בודקים אצל המוכר שהוא שולח לישראל, וכמה עולה המשלוח.</p></li>
        <li><h3>מכס ומע&quot;מ</h3><p>על הזמנה מעל סכום מסוים ייתכנו מסים בכניסה לארץ. בודקים באתר רשות המסים לפני קנייה.</p></li>
        <li><h3>מצב הקלף</h3><p>קונים ממוכר עם דירוג גבוה והגדרת מצב ברורה, ונזהרים ממחירים נמוכים מדי.</p></li>
      </ul>
    </div>
  );
}
