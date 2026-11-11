import type { Metadata } from "next";
import { DESTINATIONS, SPOTS, spotsFor } from "@/data/content";
import { SpotEntry } from "@/components/SpotEntry";

export const metadata: Metadata = {
  title: "מקומות נסתרים",
  description: "ארקיידים, ברי משחקים, חנויות רטרו ומוזיאונים בטוקיו, אוסקה, סיאול, קלן, ברלין, אמסטרדם ולוס אנג'לס.",
};

export default function Page() {
  const checked = SPOTS.filter((s) => s.checked).length;
  return (
    <div className="wrap section">
      <h1 className="title-xl">מקומות<br />נסתרים.</h1>
      <p className="lead">
        {SPOTS.length} מקומות בשבע ערים. {checked} מהם אומתו מול אתר רשמי או מול תיירות העיר,
        והשאר מסומנים. שעות ומחירים משתנים, אז בודקים לפני שיוצאים.
      </p>
      {DESTINATIONS.map((d) => {
        const list = spotsFor(d.id);
        if (!list.length) return null;
        return (
          <section key={d.id} className="spot-group" aria-labelledby={`g-${d.id}`}>
            <h2 id={`g-${d.id}`} className="title-m">{d.name}<span className="g-country">{d.country}</span></h2>
            <div className="spots">{list.map((s) => <SpotEntry key={s.id} spot={s} showCity={false} />)}</div>
          </section>
        );
      })}
    </div>
  );
}
