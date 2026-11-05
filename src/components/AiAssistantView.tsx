import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Compass,
  Building,
  Plane,
  Clock,
  MapPin,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Gamepad2,
  Calendar,
} from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { trackAffiliateClick } from "../lib/affiliate";
import { AffiliateCategory } from "../types";

interface AiRecommendation {
  destination: string;
  eventName?: string;
  hotelSuggestion: {
    name: string;
    distance: string;
    approxPrice: string;
    affiliateUrl: string;
  };
  flightSuggestion: {
    route: string;
    approxPrice: string;
    affiliateUrl: string;
  };
  gamerSpots: Array<{
    name: string;
    type: string;
    hours: string;
    tip: string;
  }>;
  dailyPlan: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  estimatedTotal: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  recommendation?: AiRecommendation;
}

interface AiAssistantViewProps {
  onOpenTripBuilderWithEvent?: (eventId: string) => void;
  user?: any;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  onOpenTripBuilderWithEvent,
  user,
}) => {
  const { t, isRtl, language } = useI18n();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        isRtl
          ? "ברוך הבא למתכנן הטיולים החכם לגיימרים! 🎮\nאני לא סתם צ'אטבוט — אני כאן לתכנן לך מסלול שלם סביב אירוע גיימינג, עם מלונות ליד הארנה, מתחמי PC Bangs, חנויות רטרו, שעות פתיחה וחלוקת תקציב שקופה."
          : "Welcome to the GOD MODE AI Travel Planner! 🎮\nI am not just a generic chatbot — I craft complete gaming itineraries around major esports events, arenas, PC bangs, retro spots, and transparent budgets.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Quick planner chips for common gamer queries
  const quickPrompts = [
    {
      label: "Gamescom קלן (5 ימים, $1,400)",
      prompt: "תכנן לי טיול ל-Gamescom 2026 בקלן, 5 ימים, תקציב מאוזן סביב $1,400, כולל מלון ליד קלנמסה.",
    },
    {
      label: "טוקיו רטרו & TGS (7 ימים)",
      prompt: "בנה מסלול של 7 ימים בטוקיו סביב Tokyo Game Show 2026 עם דגש על שופינג רטרו באקיהברה ו-GiGO.",
    },
    {
      label: "סיאול LoL Worlds & PC Bangs",
      prompt: "אני רוצה לטוס לגמר LoL Worlds בסיאול, 6 ימים. אילו PC Bangs ומלונות הכי שווים לחוליה?",
    },
    {
      label: "IEM Cologne קתדרלת CS2",
      prompt: "תכנן סופ״ש אליפות עולם ב-CS2 בקלן ב-Lanxess Arena עם ברים לגיימרים בערב.",
    },
  ];

  const generatePlan = (query: string): { text: string; rec?: AiRecommendation } => {
    const q = query.toLowerCase();

    if (q.includes("gamescom") || q.includes("קלן") || q.includes("cologne") || q.includes("גרמניה")) {
      return {
        text: "הנה תוכנית טיול מקיפה וממוקדת ל-Gamescom 2026 בקלן, המתוזמנת סביב ימי התערוכה במרכז הירידים Koelnmesse:",
        rec: {
          destination: "קלן, גרמניה (CGN)",
          eventName: "Gamescom Cologne 2026",
          hotelSuggestion: {
            name: "Radisson Blu Hotel Köln (ליד Koelnmesse)",
            distance: "400 מטר ברגל מהאולם",
            approxPrice: "~€175 / לילה",
            affiliateUrl: "https://www.booking.com/searchresults.html?ss=Koelnmesse+Cologne",
          },
          flightSuggestion: {
            route: "נתב״ג (TLV) ⇄ פרנקפורט/קלן (FRA/CGN)",
            approxPrice: "~$480 הלוך ושוב",
            affiliateUrl: "https://www.skyscanner.com/transport/flights/tlv/fra/",
          },
          gamerSpots: [
            {
              name: "Meltdown Cologne Gaming Bar",
              type: "בר גיימינג & קוקטיילים",
              hours: "18:00 - 03:00",
              tip: "במהלך Gamescom מתקיימים טורנירי קהילה ספונטניים של Smash ו-Tekken על מסכי ענק.",
            },
            {
              name: "Retro Gamer Store Ehrenfeld",
              type: "חנות קונסולות רטרו",
              hours: "11:00 - 19:00",
              tip: "אוסף נדיר של משחקי SNES ו-Mega Drive אירופאיים (PAL).",
            },
          ],
          dailyPlan: [
            {
              day: 1,
              title: "נחיתה והתאקלמות בקלן",
              description: "צ'ק אין במלון, איסוף צמיד תערוכה מוקדם ב-Koelnmesse וערב פתיחה ב-Meltdown Bar.",
            },
            {
              day: 2,
              title: "Gamescom יום שלם: Hall of Entertainment",
              description: "במות היצרניות הגדולות (Xbox, PlayStation, Blizzard), התנסות בדמואים בלעדיים.",
            },
            {
              day: 3,
              title: "אינדי וזירת eSports ב-Koelnmesse",
              description: "מתחם Indie Village המרהיב, צפייה במוקדמות טורניר ומתחם קוספליי.",
            },
            {
              day: 4,
              title: "קתדרלת קלן + שופינג רטרו בעיר",
              description: "סיור במרכז העיר העתיקה, רכישת מזכרות בחנויות הגיימינג באהרנפלד.",
            },
            {
              day: 5,
              title: "יום אחרון וטיסה חזרה",
              description: "קפה אחרון לצד הריין ורכבת מהירה לנמל התעופה.",
            },
          ],
          estimatedTotal: "$1,380",
        },
      };
    }

    if (q.includes("טוקיו") || q.includes("יפן") || q.includes("tokyo") || q.includes("tgs")) {
      return {
        text: "הנה מסלול חלומי לטוקיו המשלב את Tokyo Game Show 2026 במקוהארי מסה עם תרבות הרטרו והארקייד של אקיהברה:",
        rec: {
          destination: "טוקיו, יפן (NRT/HND)",
          eventName: "Tokyo Game Show 2026",
          hotelSuggestion: {
            name: "APA Hotel & Resort Tokyo Bay Makuhari",
            distance: "5 דקות הליכה מאולם TGS",
            approxPrice: "~¥19,000 / לילה",
            affiliateUrl: "https://www.booking.com/searchresults.html?ss=Makuhari+Messe+Tokyo",
          },
          flightSuggestion: {
            route: "נתב״ג (TLV) ⇄ טוקיו נריטה/האנדה",
            approxPrice: "~$920 הלוך ושוב",
            affiliateUrl: "https://www.skyscanner.com/transport/flights/tlv/tyo/",
          },
          gamerSpots: [
            {
              name: "Super Potato Akihabara",
              type: "מקדש רטרו 5 קומות",
              hours: "11:00 - 20:00",
              tip: "בקומה 5 יש ארקייד רטרו עם מכונות ממתקים יפניות משנות ה-80.",
            },
            {
              name: "GiGO Akihabara 3号館",
              type: "מתחם ארקייד ו-VR",
              hours: "10:00 - 23:30",
              tip: "עמדות קצב מטורפות של Taiko no Tatsujin ו-Chunithm.",
            },
            {
              name: "Nintendo TOKYO (Shibuya PARCO)",
              type: "חנות הדגל של נינטנדו",
              hours: "10:00 - 21:00",
              tip: "פסלי ענק של מריו ולינק להצטלם לידם, מרצ'נדייז בלעדי.",
            },
          ],
          dailyPlan: [
            {
              day: 1,
              title: "נחיתה בטוקיו ושינג'וקו בלילה",
              description: "צ'ק אין, קערת ראמן חצות וביקור בפסל גודזילה בשינג'וקו.",
            },
            {
              day: 2,
              title: "יום שופינג וארקייד מלא באקיהברה",
              description: "Super Potato, Mandarake, רכישת משחקי Game Boy וגלידה בעיר החשמל.",
            },
            {
              day: 3,
              title: "Tokyo Game Show - יום הפתיחה לקהל",
              description: "חשיפות משחקים יפניים ב-Makuhari Messe, זירות תחרותיות ותאי הדגמה.",
            },
            {
              day: 4,
              title: "שיבויה גיימינג: שיבויה PARCO & Capcom Store",
              description: "קומת הגיימינג המפורסמת בשיבויה וקפה פוקימון.",
            },
            {
              day: 5,
              title: "אודהיבה: Gundam בגודל אמיתי ומרכז VR",
              description: "מופע האורות של רובוט ה-Unicorn Gundam ומתחמי סימולטורים.",
            },
            {
              day: 6,
              title: "אוסף רטרו בנקאנו ברודוויי",
              description: "המרכז החלופי לחובבי אספנות וינטג' נדירה.",
            },
            {
              day: 7,
              title: "פרידה מטוקיו וטיסה חזרה",
              description: "קניות אחרונות בנמל התעופה וטיסה הביתה.",
            },
          ],
          estimatedTotal: "$2,150",
        },
      };
    }

    if (q.includes("סיאול") || q.includes("קוריאה") || q.includes("seoul") || q.includes("lol") || q.includes("worlds")) {
      return {
        text: "הנה מסלול מותאם אישית לחובבי eSports בסיאול — בירת הספורט האלקטרוני של אסיה:",
        rec: {
          destination: "סיאול, דרום קוריאה (ICN)",
          eventName: "League of Legends Worlds Finals",
          hotelSuggestion: {
            name: "L7 Hongdae by LOTTE",
            distance: "לב רובע הגיימינג והצעירים של סיאול",
            approxPrice: "~$140 / לילה",
            affiliateUrl: "https://www.booking.com/searchresults.html?ss=Hongdae+Seoul",
          },
          flightSuggestion: {
            route: "נתב״ג (TLV) ⇄ סיאול אינצ'און (ICN)",
            approxPrice: "~$840 הלוך ושוב",
            affiliateUrl: "https://www.skyscanner.com/transport/flights/tlv/icn/",
          },
          gamerSpots: [
            {
              name: "T1 Base Camp (Hongdae)",
              type: "PC Bang הדגל של קבוצת T1 ופייקר",
              hours: "פתוח 24/7",
              tip: "ניתן לרכוש מרצ'נדייז רשמי של Faker, לשחק על מסכי 240Hz ולהזמין ראמן היישר למחשב.",
            },
            {
              name: "LoL PARK & LCK Arena",
              type: "הארנה הרשמית של הליגה הקוריאנית",
              hours: "12:00 - 21:00",
              tip: "בכניסה יש תערוכת מדי שחקנים מקוריים ופסלי ענק של אלופים.",
            },
          ],
          dailyPlan: [
            {
              day: 1,
              title: "נחיתה בסיאול והתמקמות בהונגדה",
              description: "סיור לילי ברחובות התוססים של הונגדה וכניסה ראשונה ל-PC Bang.",
            },
            {
              day: 2,
              title: "ביקור ב-LoL PARK ומשחקי LCK",
              description: "חוויית צפייה בארנה המעגלית וביקור בחנות ה-Riot Store.",
            },
            {
              day: 3,
              title: "מרתון גיימינג ב-T1 Base Camp",
              description: "חרישה על League of Legends / Valorant עם שחקנים מקומיים.",
            },
            {
              day: 4,
              title: "שוק האלקטרוניקה ביונגסאן (Yongsan)",
              description: "מבוך חנויות החומרה, כרטיסי מסך, מקלדות מכניות מותאמות אישית.",
            },
            {
              day: 5,
              title: "אירוע הגמר של אליפות העולם",
              description: "חוויית אצטדיון עם עשרות אלפי אוהדים ומופעי פתיחה של Riot Games.",
            },
            {
              day: 6,
              title: "אוכל רחוב וטיסה חזרה",
              description: "שוק גוואנגג'אנג וטיסה חזרה לישראל.",
            },
          ],
          estimatedTotal: "$1,720",
        },
      };
    }

    // Default intelligent gaming response
    return {
      text: "הבנתי את הבקשה שלך! כדי לתת לך תוכנית מדויקת על השקל, אני ממליץ לשלב טיסות סדירות ומלון במרחק הליכה מהארנה הראשית. הנה הצעה ראשונית:",
      rec: {
        destination: "יעד אירוע נבחר",
        eventName: "אירוע גיימינג מוביל",
        hotelSuggestion: {
          name: "Arena Pro Gamer Hotel",
          distance: "500 מטר מהיעד",
          approxPrice: "~$120 / לילה",
          affiliateUrl: "https://www.booking.com",
        },
        flightSuggestion: {
          route: "טיסות ישירות / קונקשן מהיר",
          approxPrice: "~$550",
          affiliateUrl: "https://www.skyscanner.com",
        },
        gamerSpots: [
          {
            name: "Official Esports Arena",
            type: "ארנת תחרויות",
            hours: "10:00 - 22:00",
            tip: "הזמן כרטיס יציע מוקדם להבטחת ראות מעולה למסכי הענק.",
          },
          {
            name: "Local Retro Arcade Bar",
            type: "בר גיימינג",
            hours: "17:00 - 02:00",
            tip: "מקום מפגש מעולה לגיימרים מכל העולם אחרי יום התערוכה.",
          },
        ],
        dailyPlan: [
          {
            day: 1,
            title: "הגעה והתארגנות",
            description: "קליטה במלון וביקור מקדים במתחם האירוע.",
          },
          {
            day: 2,
            title: "יום האירוע המרכזי",
            description: "תחרויות עולמיות, צפייה בשידורים חיים והיכרות עם הקהילה.",
          },
          {
            day: 3,
            title: "סיור גיימינג מקומי וטיסה",
            description: "חנויות רטרו, שופינג מרצ'נדייז וטיסה חזרה.",
          },
        ],
        estimatedTotal: "$1,250",
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;
    sound.playClick();

    setMessages((prev) => [...prev, { sender: "user", text: messageText.trim() }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      sound.playLevelUp();
      const plan = generatePlan(messageText);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: plan.text,
          recommendation: plan.rec,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleAffiliateClick = (provider: string, category: string, url: string, dest: string) => {
    const categoryMap: Record<string, AffiliateCategory> = {
      hotel: "hotels",
      flight: "flights",
      activity: "activities",
      ticket: "activities",
      tour: "tours",
    };
    trackAffiliateClick({
      providerId: provider.toLowerCase().replace(/\s+/g, "-"),
      productId: "ai_planner_" + category,
      destinationId: dest,
      campaignId: "ai_travel_planner",
      sourcePage: "ai_assistant",
      targetUrl: url,
      category: categoryMap[category] || "other",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`space-y-6 max-w-5xl mx-auto ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>מתכנן טיולי גיימינג חכם • GAMING TRAVEL PLANNER</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          GOD MODE AI Travel Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          תכנן את הטיול הבא סביב טורניר ה-eSports או תערוכת הגיימינג שלך. המערכת בונה מסלול מותאם אישית הכולל מלונות ליד האולם, מתחמי PC Bangs, חנויות רטרו נסתרות והערכת תקציב שקופה.
        </p>

        {/* Quick prompt chips */}
        <div className="pt-2">
          <span className="text-[11px] text-slate-400 font-mono block mb-2">
            הצעות לתכנון מהיר:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp.prompt)}
                className="text-xs py-1.5 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/50 text-purple-200 hover:text-white transition-all cursor-pointer font-bold"
              >
                ⚡ {qp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat & Planner Container */}
      <div className="rounded-3xl bg-slate-900 border border-purple-900/40 shadow-2xl flex flex-col h-[650px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`p-2.5 rounded-2xl text-white flex-shrink-0 ${
                  m.sender === "user"
                    ? "bg-cyan-600 shadow-md shadow-cyan-600/30"
                    : "bg-gradient-to-br from-purple-600 to-cyan-500 shadow-md shadow-purple-600/30"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 sm:p-5 rounded-3xl max-w-2xl text-xs sm:text-sm leading-relaxed space-y-4 ${
                  m.sender === "user"
                    ? "bg-cyan-950 text-cyan-100 border border-cyan-500/30"
                    : "bg-slate-950 text-slate-200 border border-purple-900/40 shadow-xl"
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Structured Travel Plan Card if generated */}
                {m.recommendation && (
                  <div className="space-y-4 pt-3 border-t border-purple-900/40 text-xs">
                    {/* Header banner */}
                    <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Gamepad2 className="w-4 h-4 text-cyan-400" />
                        <span>{m.recommendation.eventName || m.recommendation.destination}</span>
                      </span>
                      <span className="text-[11px] font-mono text-amber-300 font-bold">
                        תקציב משוער: {m.recommendation.estimatedTotal}
                      </span>
                    </div>

                    {/* Hotel & Flights Affiliate Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Hotel */}
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                          <Building className="w-3.5 h-3.5" />
                          <span>מלון מומלץ ליד הארנה</span>
                        </div>
                        <span className="text-white font-bold block">
                          {m.recommendation.hotelSuggestion.name}
                        </span>
                        <div className="text-[11px] text-slate-400">
                          {m.recommendation.hotelSuggestion.distance} • {m.recommendation.hotelSuggestion.approxPrice}
                        </div>
                        <button
                          onClick={() =>
                            handleAffiliateClick(
                              "Booking.com",
                              "hotel",
                              m.recommendation!.hotelSuggestion.affiliateUrl,
                              m.recommendation!.destination
                            )
                          }
                          className="w-full py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          <span>השווה מחירים במלון</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Flight */}
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                          <Plane className="w-3.5 h-3.5" />
                          <span>טיסות ליעד</span>
                        </div>
                        <span className="text-white font-bold block">
                          {m.recommendation.flightSuggestion.route}
                        </span>
                        <div className="text-[11px] text-slate-400">
                          הערכה: {m.recommendation.flightSuggestion.approxPrice}
                        </div>
                        <button
                          onClick={() =>
                            handleAffiliateClick(
                              "Skyscanner",
                              "flight",
                              m.recommendation!.flightSuggestion.affiliateUrl,
                              m.recommendation!.destination
                            )
                          }
                          className="w-full py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          <span>חפש טיסות עם שותפים</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Gamer Spots & PC Bangs */}
                    {m.recommendation.gamerSpots.length > 0 && (
                      <div className="space-y-2">
                        <span className="font-bold text-slate-300 block text-xs">
                          🕹️ מתחמי גיימינג, ארקייד וספוטים ביעד:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.recommendation.gamerSpots.map((spot, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-cyan-300">{spot.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {spot.hours}
                                </span>
                              </div>
                              <span className="text-[11px] text-purple-300 block">
                                {spot.type}
                              </span>
                              <p className="text-[11px] text-slate-300 italic">
                                "{spot.tip}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Day-by-Day Itinerary */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-300 block text-xs">
                        🗓️ מסלול יומי מומלץ:
                      </span>
                      <div className="space-y-1.5">
                        {m.recommendation.dailyPlan.map((day) => (
                          <div
                            key={day.day}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5"
                          >
                            <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-400 font-mono font-bold text-xs flex-shrink-0">
                              יום {day.day}
                            </span>
                            <div className="space-y-0.5">
                              <span className="font-bold text-white block text-xs">
                                {day.title}
                              </span>
                              <span className="text-[11px] text-slate-300 block">
                                {day.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transparency & Disclaimer Box */}
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>
                        המחירים המוצגים הם אומדנים משוערים בלבד. הזמנת טיסות ומלונות מתבצעת ישירות באתרי הספקים המורשים.
                      </span>
                    </div>

                    {/* Export / Connect to Trip Builder */}
                    {onOpenTripBuilderWithEvent && (
                      <button
                        onClick={() => {
                          sound.playLevelUp();
                          onOpenTripBuilderWithEvent(
                            m.recommendation?.destination.includes("קלן")
                              ? "gamescom-2026"
                              : m.recommendation?.destination.includes("טוקיו")
                              ? "tgs-2026"
                              : "lol-worlds-2026"
                          );
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Compass className="w-4 h-4" />
                        <span>פתח מסלול זה ב-Gamer Trip Builder לשמירה</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono animate-pulse">
              <Bot className="w-4 h-4" />
              <span>ה-AI מתכנן עבורך את מסלול הגיימינג האופטימלי...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-purple-900/30 flex items-center gap-2">
          <input
            type="text"
            placeholder="לאיזה אירוע תרצה לטוס? (למשל: תכנן לי טיול ל-Gamescom עם חברים ב-$1200)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white cursor-pointer shadow-md transition-all active:scale-95"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
