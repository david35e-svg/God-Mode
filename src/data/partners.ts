// שותפים. המזהה האמיתי נכנס כמשתנה סביבה ב-Vercel, ולא בקוד.
// הערך יכול להיות אחד משניים, לפי מה שהשותף נותן:
//   1. פרמטר שמתווסף לקישור, למשל: aid=1234567
//   2. קישור מעקב של רשת שותפים עם {url}, למשל: https://www.awin1.com/cread.php?awinmid=1&awinaffid=2&ued={url}
// בלי ערך, הקישור מוביל לאתר רגיל, בלי עמלה ובלי תווית שותף.

export type PartnerCategory = "hotels" | "flights" | "tours" | "cards";
export type Ctx = { city: string; iata: string; q?: string };
export type Partner = {
  id: string; name: string; category: PartnerCategory; action: (c: Ctx) => string;
  target: (c: Ctx) => string; tracking?: string;
};

const enc = encodeURIComponent;
export const PARTNERS: Partner[] = [
  {
    id: "booking", name: "Booking.com", category: "hotels", tracking: process.env.NEXT_PUBLIC_AFF_BOOKING,
    action: () => "חיפוש מלון", target: (c) => `https://www.booking.com/searchresults.html?ss=${enc(c.city)}`,
  },
  {
    id: "skyscanner", name: "Skyscanner", category: "flights", tracking: process.env.NEXT_PUBLIC_AFF_SKYSCANNER,
    action: () => "טיסות מתל אביב", target: (c) => `https://www.skyscanner.co.il/transport/flights/tlv/${c.iata}/`,
  },
  {
    id: "getyourguide", name: "GetYourGuide", category: "tours", tracking: process.env.NEXT_PUBLIC_AFF_GETYOURGUIDE,
    action: () => "סיורים וכרטיסים", target: (c) => `https://www.getyourguide.com/s/?q=${enc(c.city)}`,
  },
  {
    id: "tcgplayer", name: "TCGplayer", category: "cards", tracking: process.env.NEXT_PUBLIC_AFF_TCGPLAYER,
    action: () => "קלפי מסחר", target: (c) => c.q ? `https://www.tcgplayer.com/search/pokemon/product?q=${enc(c.q)}` : "https://www.tcgplayer.com/search/pokemon/product",
  },
  {
    id: "cardnexus", name: "CardNexus", category: "cards", tracking: process.env.NEXT_PUBLIC_AFF_CARDNEXUS,
    action: () => "קלפי מסחר", target: () => "https://cardnexus.com",
  },
];

export function partnerUrl(p: Partner, c: Ctx) {
  const target = p.target(c);
  const t = p.tracking?.trim();
  if (!t) return { url: target, isAffiliate: false };
  if (t.includes("{url}")) return { url: t.replace("{url}", enc(target)), isAffiliate: true };
  return { url: target + (target.includes("?") ? "&" : "?") + t.replace(/^[?&]/, ""), isAffiliate: true };
}
export const partnersIn = (cats: PartnerCategory[]) => PARTNERS.filter((p) => cats.includes(p.category));

// מדפים בחנות: כל מדף הוא חיפוש אצל השותף
export const SHELVES = [
  { id: "boosters", title: "חבילות בוסטר", text: "חבילה סגורה, הפתעה בפנים. הדרך הקלאסית להתחיל.", q: "booster pack" },
  { id: "boxes", title: "קופסאות ומארזים", text: "מארזים עם כמה חבילות ואביזרים, טובים גם כמתנה.", q: "elite trainer box" },
  { id: "singles", title: "קלפים בודדים", text: "יודעים מה חסר לכם באוסף? קונים בדיוק את הקלף.", q: "" },
  { id: "accessories", title: "שרוולים ותיקיות", text: "שומרים על הקלפים: שרוולים, טופ-לודרים ותיקיות.", q: "sleeves" },
];
