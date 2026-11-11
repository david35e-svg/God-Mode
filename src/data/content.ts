export const CHECKED_AT = "6 בנובמבר 2026";

export type Interest = "expo" | "esports" | "parks" | "arcade" | "retro";
export const INTEREST_LABEL: Record<Interest, string> = {
  expo: "תערוכות",
  esports: "ספורט אלקטרוני",
  parks: "פארקים",
  arcade: "ארקיידים",
  retro: "רטרו",
};

export type Destination = {
  id: string; name: string; nameEn: string; iata: string; country: string; lat: number; lon: number;
  pitch: string; about: string; interests: Interest[];
  stops: { name: string; note: string; url?: string }[];
  bestMonths: number[]; bestText: string; minDays: number; tip: string;
};

export const ORIGIN = { name: "תל אביב", lat: 32.01, lon: 34.88 };

export const DESTINATIONS: Destination[] = [
  {
    id: "tokyo", nameEn: "Tokyo", iata: "tyo", name: "טוקיו", country: "יפן", lat: 35.68, lon: 139.77,
    pitch: "ארקיידים רבי קומות, חנויות רטרו ורובע שלם של משחקים.",
    about: "אקיהברה היא נקודת ההתחלה הטבעית: חנויות משחקים ישנים, ארקיידים ומכונות קלפים ברדיוס הליכה. משם ממשיכים לשיבויה ולאודאיבה.",
    interests: ["arcade", "retro", "parks"],
    stops: [
      { name: "Super Potato, אקיהברה", note: "חנות רטרו ותיקה עם קונסולות ומשחקים מהשנים של הפמיקום והלאה." },
      { name: "ארקיידי GiGO", note: "רשת הארקיידים שהחליפה את מותג SEGA ברבים מהסניפים." },
      { name: "Nintendo Tokyo, שיבויה", note: "החנות הרשמית של נינטנדו בקניון Shibuya Parco." },
      { name: "Tokyo Joypolis, אודאיבה", note: "פארק מקורה של SEGA.", url: "https://tokyo-joypolis.com/language/english/" },
    ],
    bestMonths: [3, 4, 5, 10, 11], bestText: "אביב וסתיו", minDays: 6,
    tip: "הרבה ארקיידים עובדים במזומן ובמטבעות של 100 ין. כדאי להחזיק מטבעות בכיס.",
  },
  {
    id: "osaka", nameEn: "Osaka", iata: "osa", name: "אוסקה", country: "יפן", lat: 34.69, lon: 135.5,
    pitch: "Super Nintendo World הראשון בעולם, ורובע רטרו שפחות תיירים מכירים.",
    about: "אוסקה משתלבת טוב עם נסיעה לטוקיו. יום אחד לפארק, ועוד יום להסתובב ב-Den Den Town שבנמבה, רובע האלקטרוניקה והרטרו של העיר.",
    interests: ["parks", "retro", "arcade"],
    stops: [
      { name: "Super Nintendo World", note: "אזור בתוך Universal Studios Japan, בכרטיס של הפארק.", url: "https://www.usj.co.jp/web/en/us/areas/super-nintendo-world" },
      { name: "Den Den Town", note: "חנויות משחקים, דגמים ואלקטרוניקה בנמבה." },
    ],
    bestMonths: [3, 4, 5, 10, 11], bestText: "אביב וסתיו", minDays: 3,
    tip: "בעונה עמוסה הכניסה לאזור נינטנדו יכולה להיות מוגבלת. בדקו באתר הפארק מראש איך מבטיחים כניסה.",
  },
  {
    id: "seoul", nameEn: "Seoul", iata: "sel", name: "סיאול", country: "דרום קוריאה", lat: 37.57, lon: 126.98,
    pitch: "הבית של הליגה הקוריאנית, ו-PC Bang בכל פינה.",
    about: "כאן רואים ספורט אלקטרוני כחלק מהחיים בעיר. משלבים משחק של LCK באולפן עם ערב ב-PC Bang, ואם מתאים, גם את גמר Worlds 2027 בקוריאה.",
    interests: ["esports", "arcade"],
    stops: [
      { name: "LoL Park", note: "האולם של הליגה הקוריאנית LCK, במרכז סיאול." },
      { name: "T1 Base Camp, הונגדה", note: "PC Bang ממותג של קבוצת T1." },
      { name: "PC Bang שכונתי", note: "עמדות חזקות, ואוכל שמוזמן ישירות למושב." },
    ],
    bestMonths: [4, 5, 9, 10, 11], bestText: "אביב וסתיו", minDays: 5,
    tip: "בחלק מה-PC Bang הרישום מיועד לתושבים. אם המסך נתקע, בקשו עזרה בדלפק, ולרוב יפתחו לכם עמדה.",
  },
  {
    id: "cologne", nameEn: "Cologne", iata: "cgn", name: "קלן", country: "גרמניה", lat: 50.94, lon: 6.96,
    pitch: "אוגוסט אחד, שני אירועים גדולים: gamescom ו-IEM Cologne.",
    about: "ב-2027 שני האירועים נופלים באותו חודש, בהפרש של כשבוע. אפשר לתכנן נסיעה אחת ארוכה, או לבחור אחד מהם ולהזמין לינה מוקדם.",
    interests: ["expo", "esports"],
    stops: [
      { name: "Koelnmesse", note: "מתחם התערוכות של gamescom.", url: "https://www.gamescom.global" },
      { name: "LANXESS arena", note: "האולם של שלבי הסיום של IEM Cologne." },
    ],
    bestMonths: [8], bestText: "אוגוסט, סביב האירועים", minDays: 4,
    tip: "לינה בקלן מתמלאת מוקדם בשבוע של gamescom. גם ערים סמוכות עם רכבת ישירה הן אפשרות.",
  },
  {
    id: "los-angeles", nameEn: "Los Angeles", iata: "lax", name: "לוס אנג'לס", country: "ארצות הברית", lat: 34.05, lon: -118.24,
    pitch: "Super Nintendo World בהוליווד, וטקס The Game Awards בסוף השנה.",
    about: "נסיעה ארוכה שמתאימה למי שמשלב כמה דברים: הפארק, העיר, ולמי שמתכנן לדצמבר, גם את עונת הטקס.",
    interests: ["parks", "expo"],
    stops: [
      { name: "Super Nintendo World", note: "אזור ב-Universal Studios Hollywood.", url: "https://www.universalstudioshollywood.com/web/en/us/things-to-do/lands/super-nintendo-world" },
      { name: "The Game Awards", note: "טקס שמתקיים בדרך כלל בדצמבר. התאריך והמקום נקבעים מדי שנה.", url: "https://thegameawards.com" },
    ],
    bestMonths: [3, 4, 5, 9, 10, 11, 12], bestText: "אביב וסתיו, או דצמבר לטקס", minDays: 7,
    tip: "בלי רכב לוקח זמן לעבור בין האזורים בעיר. כדאי לתכנן יום לכל אזור.",
  },
];

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
    status: "confirmed", statusNote: "ימי האולם הם 12–15 באוגוסט, עם שמונה הקבוצות האחרונות.",
    about: "טורניר Counter-Strike 2. ארבעת ימי הסיום נערכים באולם, מול קהל.",
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
    interests: ["expo"],
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

export const PARKS = [
  { id: "usj", name: "Super Nintendo World, אוסקה", place: "Universal Studios Japan", destinationId: "osaka", text: "האזור הראשון מסוגו. מתקן Mario Kart ומתקן Donkey Kong, ובגדול, משחק שמתנהל בכל האזור עם צמיד Power-Up.", url: "https://www.usj.co.jp/web/en/us/areas/super-nintendo-world" },
  { id: "ush", name: "Super Nintendo World, הוליווד", place: "Universal Studios Hollywood", destinationId: "los-angeles", text: "הגרסה האמריקאית, קטנה יותר מזו של אוסקה. מתאימה כחלק מיום בפארק.", url: "https://www.universalstudioshollywood.com/web/en/us/things-to-do/lands/super-nintendo-world" },
  { id: "joypolis", name: "Tokyo Joypolis", place: "אודאיבה, טוקיו", destinationId: "tokyo", text: "פארק מקורה של SEGA. אפשרות טובה ליום גשום.", url: "https://tokyo-joypolis.com/language/english/" },
];

export const GUIDES = [
  {
    id: "akihabara", title: "יום באקיהברה, בלי ללכת לאיבוד", destinationId: "tokyo",
    lead: "איך מחלקים יום אחד בין חנויות רטרו, ארקיידים ומנוחה.",
    sections: [
      { h: "מתחילים מאוחר", p: "הרבה חנויות נפתחות רק בסביבות 10:00 עד 11:00. מגיעים עם פתיחה, לפני העומס של אחר הצהריים." },
      { h: "עולים למעלה", p: "באקיהברה הרבה מהעניין נמצא בקומות העליונות של בניינים צרים. שלט ברחוב יכול להוביל לחנות שלמה בקומה חמישית." },
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
    ],
  },
  {
    id: "pc-bang", title: "ערב ראשון ב-PC Bang בסיאול", destinationId: "seoul",
    lead: "איך זה עובד כשאין לכם מספר זהות קוריאני.",
    sections: [
      { h: "ניגשים לדלפק", p: "בחלק מהמקומות הכניסה דורשת חשבון מקומי. אומרים שאתם תיירים, ולרוב יפתחו לכם עמדת אורח." },
      { h: "משלמים לפי זמן", p: "בדרך כלל קונים זמן מראש, ומאריכים דרך המסך או בדלפק." },
      { h: "מזמינים מהמושב", p: "ברוב המקומות מזמינים אוכל מהתפריט שבמסך ומביאים אותו עד לעמדה." },
    ],
  },
];

export const destination = (id: string) => DESTINATIONS.find((d) => d.id === id);
export const eventsFor = (id: string) => EVENTS.filter((e) => e.destinationId === id);
