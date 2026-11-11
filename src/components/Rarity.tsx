import { RARITY_LABEL, type Rarity as R } from "@/data/content";

/** מד נדירות בן ארבעה מקטעים, עם טקסט לקורא מסך */
export function Rarity({ level }: { level: R }) {
  return (
    <span className={`rarity r${level}`}>
      <span className="rarity-bars" aria-hidden>
        {[1, 2, 3, 4].map((i) => <i key={i} data-on={i <= level} />)}
      </span>
      {RARITY_LABEL[level]}
    </span>
  );
}
