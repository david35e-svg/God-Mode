"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { partnersIn, partnerUrl, type Ctx, type PartnerCategory } from "@/data/partners";

// סופר קליק בלי לשמור מי לחץ: רק שותף, עמוד וזמן.
function track(partner: string, page: string) {
  addDoc(collection(db(), "clicks"), { partner, page: page.slice(0, 120), createdAt: serverTimestamp() }).catch(() => {});
}

export function PartnerLinks({ title, ctx, categories }: { title: string; ctx: Ctx; categories: PartnerCategory[] }) {
  const page = usePathname();
  const links = partnersIn(categories).map((p) => ({ p, ...partnerUrl(p, ctx) }));
  const anyAffiliate = links.some((l) => l.isAffiliate);
  return (
    <section className="partners" aria-labelledby="partners-h">
      <h2 id="partners-h">{title}</h2>
      <ul>
        {links.map(({ p, url, isAffiliate }) => (
          <li key={p.id}>
            <a href={url} target="_blank" rel={isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} onClick={() => track(p.id, page)}>
              <span className="p-action">{p.action(ctx)}</span>
              <span className="p-name">{p.name} <ExternalLink aria-hidden size={14} /></span>
            </a>
            {isAffiliate && <span className="p-tag">קישור שותף</span>}
          </li>
        ))}
      </ul>
      <p className="p-note">
        {anyAffiliate
          ? <>על הזמנה דרך קישור שותף אנחנו עשויים לקבל עמלה, והמחיר שלכם לא משתנה. <Link href="/legal/affiliate">איך זה עובד</Link></>
          : "המחירים והזמינות אצל האתר עצמו. בודקים שם לפני הזמנה."}
      </p>
    </section>
  );
}
