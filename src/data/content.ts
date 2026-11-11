export const CHECKED_AT = "11 בנובמבר 2026";

export type Interest = "cards" | "arcade" | "esports" | "parks" | "retro";
export const INTEREST_LABEL: Record<Interest, string> = {
  cards: "קלפים",
  arcade: "ארקיידים",
  esports: "ספורט אלקטרוני",
  parks: "פארקים",
  retro: "רטרו",
};

export type Destination = {
  id: string; name: string; nameEn: string; iata: string; country: string; flag: string;
  lat: number; lon: number;
  pitch: string; about: string; interests: Interest[];
  bestMonths: number[]; bestText: string; minDays: number; tip: string;
};

export const ORIGIN = { name: "תל אביב", iata: "TLV", lat: 32.01, lon: 34.88 };

export const DESTINATIONS: Destination[] = [
  {
    id: "tokyo", name: "טוקיו", nameEn: "Tokyo", iata: "tyo", country: "יפן", flag: "🇯🇵",
    lat: 35.68, lon: 139.77,
    pitch: "ארקיידים רבי קומות, חנויות רטרו ורובע שלם של משחקים.",
    about: "אקיהברה היא נקודת ההתחלה: חנויות משחקים ישנים, ארקיידים ומכונות קלפים ברדיוס הליכה. כשנמאס מהעומס שם, נוסעים לנקאנו, שבה אותו עולם בשקט ולעיתים בזול יותר.",
    interests: ["arcade", "retro", "cards", "parks"],
    bestMonths: [3, 4, 5, 10, 11], bestText: "אביב וסתיו", minDays: 6,
    tip: "הרבה ארקיידים עובדים במזומן ובמטבעות של 100 ין. כדאי להחזיק מטבעות בכיס.",
  },
  {
    id: "osaka", name: "אוסקה", nameEn: "Osaka", iata: "osa", country: "יפן", flag: "🇯🇵",
    lat: 34.69, lon: 135.5,
    pitch: "Super Nintendo World הראשון בעולם, ורובע רטרו שפחות תיירים מכירים.",
    about: "אוסקה משתלבת טוב עם נסיעה לטוקיו. יום אחד לפארק, ועוד יום ב-Den Den Town שבנמבה, רובע האלקטרוניקה והרטרו של העיר.",
    interests: ["parks", "retro", "arcade"],
    bestMonths: [3, 4, 5, 10, 11], bestText: "אביב וסתיו", minDays: 3,
    tip: "בעונה עמוסה הכניסה לאזור נינטנדו מוגבלת. בודקים באתר הפארק מראש איך מבטיחים כניסה.",
  },
  {
    id: "seoul", name: "סיאול", nameEn: "Seoul", iata: "sel", country: "דרום קוריאה", flag: "🇰🇷",
    lat: 37.57, lon: 126.98,
    pitch: "הבית של הליגה הקוריאנית, ו-PC Bang בכל פינה.",
    about: "כאן ספורט אלקטרוני הוא חלק מהחיים בעיר. משחק של LCK באולם, וערב ב-PC Bang שבו מזמינים אוכל ישירות לעמדה.",
    interests: ["esports", "arcade"],
    bestMonths: [4, 5, 9, 10, 11], bestText: "אביב וסתיו", minDays: 5,
    tip: "בחלק מה-PC Bang הרישום מיועד לתושבים. אומרים בדלפק שאתם תיירים, ולרוב יפתחו לכם עמדת אורח.",
  },
  {
    id: "cologne", name: "קלן", nameEn: "Cologne", iata: "cgn", country: "גרמניה", flag: "🇩🇪",
    lat: 50.94, lon: 6.96,
    pitch: "אוגוסט אחד, שני אירועים גדולים: gamescom ו-IEM Cologne.",
    about: "ב-2027 שני האירועים נופלים באותו חודש, בהפרש של כשבוע. אפשר נסיעה אחת ארוכה, או לבחור אחד מהם ולהזמין לינה מוקדם.",
    interests: ["esports", "arcade"],
    bestMonths: [8], bestText: "אוגוסט, סביב האירועים", minDays: 4,
    tip: "לינה בקלן מתמלאת מוקדם בשבוע של gamescom. גם ערים סמוכות עם רכבת ישירה הן אפשרות.",
  },
  {
    id: "berlin", name: "ברלין", nameEn: "Berlin", iata: "ber", country: "גרמניה", flag: "🇩🇪",
    lat: 52.52, lon: 13.4,
    pitch: "מוזיאון משחקי המחשב, ברי גיימינג ומרחב ניסיוני.",
    about: "ברלין היא התחנה של מי שרוצה להבין מאיפה הכול הגיע. מוזיאון גדול להיסטוריה של המשחקים, ולצידו ברים ששמים ספורט אלקטרוני על המסך. משתלבת טוב עם קלן באותה נסיעה.",
    interests: ["retro", "arcade", "esports"],
    bestMonths: [5, 6, 7, 8, 9], bestText: "אביב עד סתיו", minDays: 3,
    tip: "המרחקים בברלין גדולים. כרטיס יומי לתחבורה הציבורית חוסך זמן וכסף.",
  },
  {
    id: "amsterdam", name: "אמסטרדם", nameEn: "Amsterdam", iata: "ams", country: "הולנד", flag: "🇳🇱",
    lat: 52.37, lon: 4.9,
    pitch: "ארקייד שמשלמים בו כניסה אחת, ובר משחקים למבוגרים.",
    about: "הטיסה הקצרה מכל היעדים כאן, ולכן מתאימה גם לסוף שבוע. ארקייד גדול שבו משלמים פעם אחת ומשחקים בלי מטבעות, וברים שהמשחקים בהם הם הסיבה להגיע.",
    interests: ["arcade", "retro"],
    bestMonths: [4, 5, 6, 9, 10], bestText: "אביב וסתיו", minDays: 3,
    tip: "חלק ממקומות המשחק הם לגיל 18 ומעלה ופתוחים בעיקר בערב. בודקים שעות לפני שיוצאים.",
  },
  {
    id: "los-angeles", name: "לוס אנג'לס", nameEn: "Los Angeles", iata: "lax", country: "ארצות הברית", flag: "🇺🇸",
    lat: 34.05, lon: -118.24,
    pitch: "Super Nintendo World בהוליווד, וברי ארקייד בערב.",
    about: "הנסיעה הארוכה מכולן, ומתאימה למי שמשלב כמה דברים: הפארק, העיר, וברים שבהם המכונות הן האטרקציה.",
    interests: ["parks", "arcade"],
    bestMonths: [3, 4, 5, 9, 10, 11, 12], bestText: "אביב וסתיו, או דצמבר לטקס", minDays: 7,
    tip: "בלי רכב לוקח זמן לעבור בין האזורים בעיר. כדאי לתכנן יום לכל אזור.",
  },
];

/* ---------- מקומות נסתרים ---------- */

export type SpotKind = "arcade" | "bar" | "retro" | "museum" | "pcbang" | "park";
export const KIND_LABEL: Record<SpotKind, string> = {
  arcade: "ארקייד", bar: "בר משחקים", retro: "חנות רטרו",
  museum: "מוזיאון", pcbang: "PC Bang", park: "פארק",
};
/** 1 רגיל · 2 נדיר · 3 אפי · 4 אגדי */
export type Rarity = 1 | 2 | 3 | 4;
export const RARITY_LABEL: Record<Rarity, string> = { 1: "רגיל", 2: "נדיר", 3: "אפי", 4: "אגדי" };

export type Spot = {
  id: string; name: string; destinationId: string; kind: SpotKind; rarity: Rarity;
  area: string; what: string; tip: string; find: string;
  url?: string; source?: { name: string; url: string }; checked: boolean;
};

export const SPOTS: Spot[] = [
  {
    id: "super-potato", name: "Super Potato", destinationId: "tokyo", kind: "retro", rarity: 4,
    area: "אקיהברה",
    what: "חנות רטרו על כמה קומות: קונסולות ומשחקים משומשים מהפמיקום והלאה, ובקומה העליונה ארקייד עם מכונות ישנות.",
    tip: "מתחילים מלמעלה. רוב המבקרים נתקעים בקומה הראשונה, והארקייד שבקומה העליונה ריק יותר.",
    find: "בניין צר ברחוב צדדי באקיהברה. השלט בכניסה קטן, והחנות נפרשת על הקומות שמעליו.",
    source: { name: "Visit Chiyoda", url: "https://visit-chiyoda.tokyo/app/en/spot/detail/819" }, checked: true,
  },
  {
    id: "nakano-broadway", name: "Nakano Broadway", destinationId: "tokyo", kind: "retro", rarity: 3,
    area: "נקאנו",
    what: "קניון ישן שבקומותיו העליונות עשרות חנויות קטנות, בהן כמה סניפי Mandarake לקלפים, משחקים ישנים ואספנות.",
    tip: "הקומות 2 עד 4 הן העיקר. כל חנות מתמחה במשהו אחר, והמחירים שם לרוב שפויים יותר מאקיהברה.",
    find: "חמש דקות הליכה בשדרה המקורה מתחנת נקאנו. למעלה זה מתחיל להיראות כמו מבוך.",
    checked: false,
  },
  {
    id: "gigo-akiba", name: "ארקיידי GiGO", destinationId: "tokyo", kind: "arcade", rarity: 2,
    area: "אקיהברה",
    what: "רשת הארקיידים שהחליפה את מותג SEGA בחלק מהסניפים. כמה בניינים באקיהברה, כל קומה סוג משחק אחר.",
    tip: "קומות מכונות הצעצוע הן הכי עמוסות. מכונות המקצב והלחימה נמצאות בדרך כלל גבוה יותר.",
    find: "קשה לפספס: בניינים גבוהים עם שילוט ענק בצומת הראשי של אקיהברה.",
    checked: false,
  },
  {
    id: "den-den-town", name: "Den Den Town", destinationId: "osaka", kind: "retro", rarity: 3,
    area: "נמבה",
    what: "רובע האלקטרוניקה של אוסקה: חנויות משחקים ישנים, דגמים וחלקים, בלי ההמון של אקיהברה.",
    tip: "זה רובע ולא חנות אחת. כדאי להקצות אחר צהריים שלם וללכת לאיבוד בין הרחובות.",
    find: "דרומית לנמבה. מתחילים מהרחוב הראשי ונכנסים לסמטאות הצדדיות.",
    checked: false,
  },
  {
    id: "lol-park", name: "LoL Park", destinationId: "seoul", kind: "pcbang", rarity: 4,
    area: "מרכז סיאול",
    what: "האולם הביתי של הליגה הקוריאנית LCK. משחקי ליגה מתקיימים כאן מול קהל, ולא רק אירועי שיא.",
    tip: "הכרטיסים נמכרים לפי מחזור משחקים, וחלקם נחטפים מהר. בודקים את לוח הליגה לפני שקובעים תאריכי טיסה.",
    find: "בתוך קומפלקס מסחרי במרכז העיר, ולא במתחם ספורט נפרד.",
    url: "https://lolesports.com", checked: false,
  },
  {
    id: "pc-bang", name: "PC Bang שכונתי", destinationId: "seoul", kind: "pcbang", rarity: 1,
    area: "בכל שכונה",
    what: "אולם מחשבים שפתוח לרוב מסביב לשעון: עמדות חזקות, תשלום לפי זמן, ואוכל שמגיע עד למושב.",
    tip: "המקומות הטובים נמצאים בקומות עליונות של בנייני משרדים, לא ברחוב הראשי. מחפשים שלט עם האותיות PC ועולים.",
    find: "כמעט בכל רחוב ראשי. ליד אוניברסיטאות יש ריכוז גבוה במיוחד.",
    checked: false,
  },
  {
    id: "lost-level", name: "Lost Level", destinationId: "cologne", kind: "bar", rarity: 3,
    area: "Kwartier Latäng",
    what: "בר גיימרים שנפתח ב-2016 בשם Meltdown. עמדות קונסולה, משחקי קופסה וקלפים, ואירועים קבועים כמו ערב חידון וערב Pen & Paper.",
    tip: "סגור בימי ראשון ושני. אם מגיעים בשבוע של gamescom, זה המקום לראות את הקהל המקומי ולא רק תיירים.",
    find: "Kyffhäuserstraße 39, ברובע הסטודנטים. בר רגיל מבחוץ, המסכים והעמדות בפנים.",
    source: { name: "Cologne Tourism", url: "https://www.cologne-tourism.com/food-drink/gastronomy/lost-level" }, checked: true,
  },
  {
    id: "computerspielemuseum", name: "Computerspielemuseum", destinationId: "berlin", kind: "museum", rarity: 4,
    area: "Karl-Marx-Allee",
    what: "מוזיאון שמוקדש כולו להיסטוריה של משחקי המחשב: יותר מ-300 פריטים לאורך שישה עשורים, וחלק מהם משחקים שאפשר לשחק בהם.",
    tip: "זה לא מוזיאון שעוברים בו בחצי שעה. המכונות שאפשר לשחק בהן מתפזרות לאורך התצוגה, ולא מרוכזות בסוף.",
    find: "Karl-Marx-Allee 93A, על השדרה הרחבה במזרח העיר.",
    source: { name: "deutschland.de", url: "https://www.deutschland.de/en/topic/life/gaming-guide-berlin-hot-spots-for-gamers" }, checked: true,
  },
  {
    id: "interface-berlin", name: "Interface", destinationId: "berlin", kind: "bar", rarity: 3,
    area: "מואביט",
    what: "בר קוקטיילים שמשדר ספורט אלקטרוני על המסכים, ומארח ערבי משחקים וערבי חידון עם פרסים.",
    tip: "בר שכונתי ולא מועדון גדול. בערב של טורניר חשוב הוא מתמלא, אז מגיעים מוקדם.",
    find: "Perleberger Str. 17, ברובע מואביט.",
    source: { name: "deutschland.de", url: "https://www.deutschland.de/en/topic/life/gaming-guide-berlin-hot-spots-for-gamers" }, checked: true,
  },
  {
    id: "game-science-center", name: "Game Science Center", destinationId: "berlin", kind: "museum", rarity: 2,
    area: "קרויצברג",
    what: "מרחב שבו משחקים בפרוטוטייפים ניסיוניים: משחקים שמגיבים לתנועות עיניים, לקול ולמחוות.",
    tip: "הכול כאן אינטראקטיבי, אז מגיעים עם מישהו. חלק מהעמדות בנויות לשניים ומעלה.",
    find: "Besselstraße 14.",
    source: { name: "deutschland.de", url: "https://www.deutschland.de/en/topic/life/gaming-guide-berlin-hot-spots-for-gamers" }, checked: true,
  },
  {
    id: "blast-galaxy", name: "Blast Galaxy", destinationId: "amsterdam", kind: "arcade", rarity: 4,
    area: "סלוטרדייק",
    what: "אולם ארקייד רטרו עם קלאסיקות כמו Pac-Man ו-Donkey Kong. משלמים כניסה אחת של 15 אירו, ומשחקים בלי מטבעות.",
    tip: "מודל הכניסה האחת משנה את החוויה: אפשר להיכשל במכונה קשה עשרים פעם בלי לחשב כמה זה עולה.",
    find: "מחוץ למרכז, באזור סלוטרדייק. מגיעים ברכבת או במטרו, לא בהליכה מהמרכז.",
    source: { name: "I amsterdam", url: "https://www.iamsterdam.com/en/see-and-do/arcade-and-game-halls-in-amsterdam" }, checked: true,
  },
  {
    id: "tonton-club", name: "TonTon Club", destinationId: "amsterdam", kind: "bar", rarity: 3,
    area: "Westerpark",
    what: "בר ארקייד למבוגרים: מכונות ישנות וחדשות לצד הבר עצמו. לרשת יש גם סניף אחות בשם PUCK עם הוקי אוויר.",
    tip: "מקום לערב ולא ליום. אם באים בחבורה, PUCK שב-De Baarsjes מתאים יותר למשחק קבוצתי.",
    find: "במתחם Westerpark. PUCK נמצא ברובע De Baarsjes.",
    source: { name: "I amsterdam", url: "https://www.iamsterdam.com/en/see-and-do/arcade-and-game-halls-in-amsterdam" }, checked: true,
  },
  {
    id: "button-mash", name: "Button Mash", destinationId: "los-angeles", kind: "bar", rarity: 2,
    area: "Echo Park",
    what: "בר ארקייד באקו פארק, עם מכונות ישנות ואוכל שמוגש במקום.",
    tip: "ברי ארקייד בלוס אנג'לס נפתחים ונסגרים לעיתים קרובות. בודקים שהמקום פעיל לפני שנוסעים.",
    find: "Echo Park, מזרחית למרכז העיר.",
    source: { name: "RePlay Magazine", url: "https://www.replaymag.com/las-button-mash-finally-reopens-with-a-little-help/" }, checked: false,
  },
  {
    id: "snw-osaka", name: "Super Nintendo World", destinationId: "osaka", kind: "park", rarity: 4,
    area: "Universal Studios Japan",
    what: "האזור הראשון מסוגו בעולם: מתקן Mario Kart, מתקן Donkey Kong, ומשחק שמתנהל בכל האזור עם צמיד Power-Up.",
    tip: "הצמיד הוא מה שהופך את האזור ממתקנים למשחק. בלעדיו מפספסים את רוב מה שמסתתר בקירות.",
    find: "אזור בתוך Universal Studios Japan, בכרטיס של הפארק.",
    url: "https://www.usj.co.jp/web/en/us/areas/super-nintendo-world", checked: false,
  },
  {
    id: "snw-hollywood", name: "Super Nintendo World", destinationId: "los-angeles", kind: "park", rarity: 3,
    area: "Universal Studios Hollywood",
    what: "הגרסה האמריקאית של האזור, קטנה מזו של אוסקה.",
    tip: "אם כבר תכננתם יפן, אפשר לדלג. אם לא, זו ההזדמנות הקרובה ביותר.",
    find: "אזור בתוך Universal Studios Hollywood.",
    url: "https://www.universalstudioshollywood.com/web/en/us/things-to-do/lands/super-nintendo-world", checked: false,
  },
  {
    id: "joypolis", name: "Tokyo Joypolis", destinationId: "tokyo", kind: "park", rarity: 2,
    area: "אודאיבה",
    what: "פארק שעשועים מקורה של SEGA, עם מתקנים ומשחקים על כמה קומות.",
    tip: "אפשרות טובה ליום גשום, והקומות העליונות שקטות יותר בשעות הבוקר.",
    find: "בתוך קניון באודאיבה, מעבר למפרץ.",
    url: "https://tokyo-joypolis.com/language/english/", checked: false,
  },
];

/* ---------- אירועים ---------- */

export type GameEvent = {
  id: string; name: string; destinationId: string; city: string; venue: string;
  sortDate: string; month: number; dateText: string;
  status: "confirmed" | "partial" | "unverified"; statusNote: string;
  about: string; officialUrl: string; sourceUrl?: string; sourceName?: string;
  interests: Interest[];
};

export const EVENTS: GameEvent[] = [
  {
    id: "evo-japan-2027", name: "EVO Japan 2027", destinationId: "tokyo", city: "יפן", venue: "טרם אימתנו",
    sortDate: "2027-05-01", month: 5, dateText: "תאריך לא מאומת",
    status: "unverified", statusNote: "לא מצאנו מקור רשמי לתאריכי 2027. המהדורות הקודמות נערכו באביב.",
    about: "טורניר משחקי הלחימה של EVO ביפן.", officialUrl: "https://www.evo.gg", interests: ["esports"],
  },
  {
    id: "iem-cologne-2027", name: "IEM Cologne 2027", destinationId: "cologne", city: "קלן", venue: "LANXESS arena",
    sortDate: "2027-08-04", month: 8, dateText: "4–15 באוגוסט 2027",
    status: "confirmed", statusNote: "ארבעת ימי הסיום, 12 עד 15 באוגוסט, נערכים באולם מול קהל, עם שמונה הקבוצות האחרונות.",
    about: "טורניר Counter-Strike 2. הכרטיסים לקהל הם לימי האולם.",
    officialUrl: "https://pro.eslgaming.com/tour/cs/cologne/",
    sourceUrl: "https://pley.gg/cs2/esl-confirms-extended-arena-format-and-new-360-degree-stage-for-iem-cologne-2027/", sourceName: "pley.gg",
    interests: ["esports"],
  },
  {
    id: "gamescom-2027", name: "gamescom 2027", destinationId: "cologne", city: "קלן", venue: "Koelnmesse",
    sortDate: "2027-08-23", month: 8, dateText: "23–29 באוגוסט 2027",
    status: "partial", statusNote: "התאריכים פורסמו. חלוקת הימים לקהל הרחב טרם אומתה, ובשנים קודמות הימים האחרונים היו הפתוחים לקהל.",
    about: "תערוכת המשחקים הגדולה של אירופה. בודקים באתר הרשמי איזה יום פתוח לאיזה כרטיס.",
    officialUrl: "https://www.gamescom.global",
    sourceUrl: "https://www.gameswelt.de/gamescom-koeln/news/termin-fuer-das-kommende-jahr-steht-bereits-fest-334660", sourceName: "Gameswelt",
    interests: ["esports", "cards"],
  },
  {
    id: "lol-worlds-2027", name: "League of Legends Worlds 2027", destinationId: "seoul", city: "דרום קוריאה", venue: "הערים טרם אומתו",
    sortDate: "2027-11-02", month: 11, dateText: "שלבי הנוקאאוט: 2–7 בנובמבר. גמר: 14 בנובמבר 2027",
    status: "partial", statusNote: "הטורניר בקוריאה. לא אימתנו עדיין את הערים המארחות ואת מועד הפתיחה.",
    about: "אליפות העולם של League of Legends.",
    officialUrl: "https://lolesports.com",
    sourceUrl: "https://www.sheepesports.com/articles/kespa-opens-bidding-process-for-host-cities-of-the-2027-league-of-legends-worlds-playoffs/en", sourceName: "Sheep Esports",
    interests: ["esports"],
  },
];

export const GUIDES = [
  {
    id: "akihabara", title: "יום באקיהברה, בלי ללכת לאיבוד", destinationId: "tokyo",
    lead: "איך מחלקים יום אחד בין חנויות רטרו, ארקיידים ומנוחה.",
    sections: [
      { h: "מתחילים מאוחר", p: "הרבה חנויות נפתחות רק בסביבות 10:00 עד 11:00. מגיעים עם הפתיחה, לפני העומס של אחר הצהריים." },
      { h: "עולים למעלה", p: "באקיהברה הרבה מהעניין נמצא בקומות העליונות של בניינים צרים. שלט קטן ברחוב יכול להוביל לחנות שלמה בקומה חמישית." },
      { h: "בודקים לפני שקונים", p: "משחקים יפניים ישנים לא תמיד ירוצו על קונסולה מאזור אחר. שווה לוודא אזור, מתח ומצב לפני תשלום." },
      { h: "פטור ממס", p: "כללי הפטור ממס ביפן משתנים. בודקים בחנות ובאתר הרשמי של יפן מה תקף ביום הקנייה, ושומרים את הקבלות." },
    ],
  },
  {
    id: "gamescom", title: "gamescom בפעם הראשונה", destinationId: "cologne",
    lead: "מה לתכנן לפני שנכנסים לאולמות.",
    sections: [
      { h: "בוחרים יום לפי הכרטיס", p: "לא כל הכרטיסים תקפים בכל יום. קונים רק אחרי שבודקים באתר הרשמי את לוח הימים של אותה שנה." },
      { h: "מחליטים על שני דברים", p: "בתורים לדמואים אפשר לעמוד שעות. בוחרים שני דברים שחייבים לראות, ומתייחסים לכל השאר כבונוס." },
      { h: "תיק קטן", p: "בקבוק מים, סוללה ניידת ונעליים נוחות. בודקים באתר את מגבלות הגודל של התיקים." },
      { h: "הערב שאחרי", p: "אחרי שהאולמות נסגרים הקהל עובר לברים של העיר. זה החלק שרוב המבקרים הראשונים מפספסים." },
    ],
  },
  {
    id: "pc-bang", title: "ערב ראשון ב-PC Bang בסיאול", destinationId: "seoul",
    lead: "איך זה עובד כשאין לכם מספר זהות קוריאני.",
    sections: [
      { h: "ניגשים לדלפק", p: "בחלק מהמקומות הכניסה דורשת חשבון מקומי. אומרים שאתם תיירים, ולרוב יפתחו לכם עמדת אורח." },
      { h: "משלמים לפי זמן", p: "בדרך כלל קונים זמן מראש, ומאריכים דרך המסך או בדלפק." },
      { h: "מזמינים מהמושב", p: "ברוב המקומות מזמינים אוכל מהתפריט שבמסך, והוא מגיע עד לעמדה." },
    ],
  },
  {
    id: "cards", title: "לקנות קלפים בחו\"ל בלי ליפול על זיוף", destinationId: "tokyo",
    lead: "מה לבדוק בחנות פיזית ומה באינטרנט.",
    sections: [
      { h: "חבילה סגורה", p: "מחיר נמוך בהרבה מהשוק על חבילה סגורה הוא סימן אזהרה. בחנות ותיקה המחיר יהיה קרוב למחיר המקובל." },
      { h: "קלף בודד", p: "מבקשים תמונה של הקלף עצמו, ובודקים איך המוכר מגדיר את מצבו. ההגדרות משתנות בין מוכרים." },
      { h: "בדרך הביתה", p: "שרוולים וטופ-לודר לפני הטיסה, ולא אחריה. קלף מכופף מאבד את רוב ערכו." },
      { h: "מכס", p: "על הזמנה מעל סכום מסוים ייתכנו מסים בכניסה לארץ. בודקים באתר רשות המסים לפני הקנייה." },
    ],
  },
];

export const destination = (id: string) => DESTINATIONS.find((d) => d.id === id);
export const eventsFor = (id: string) => EVENTS.filter((e) => e.destinationId === id);
export const spotsFor = (id: string) => SPOTS.filter((s) => s.destinationId === id);
export const PARKS = SPOTS.filter((s) => s.kind === "park");
