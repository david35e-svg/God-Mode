import React, { useState } from "react";
import {
  BookOpen,
  MapPin,
  Clock,
  Compass,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "../lib/i18n";
import { sound } from "../lib/sound";

interface GuidesViewProps {
  onBuildTripForDestination?: (city: string) => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({
  onBuildTripForDestination,
}) => {
  const { isRtl, language } = useI18n();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>("guide-akiba");

  const guides = [
    {
      id: "guide-akiba",
      title: "המדריך המלא לשופינג גיימינג ורטרו באקיהברה",
      city: "טוקיו",
      country: "יפן",
      flag: "🇯🇵",
      readTime: "8 דקות קריאה",
      tipsCount: 15,
      summary: "איך למצוא קונסולות Game Boy ו-Famicom נדירות, מאיזה קומות כדאי להיזהר, ואיך לקבל פטור ממס (Tax-Free) במעמד הקנייה.",
      sections: [
        {
          title: "חנויות רטרו חובה",
          content: "Super Potato (סופר פוטטו) כוללת 5 קומות של קונסולות ומשחקים מכל הדורות. בקומה החמישית יש ארקייד רטרו ומכונות ממתקים משנות ה-80. ביקור חובה גם ב-Mandarake Complex וב-Surugaya.",
        },
        {
          title: "פטור ממס (Tax-Free)",
          content: "הביאו תמיד את הדרכון המקורי עליכם! קנייה מעל 5,500 ין מזכה בפטור מיידי מ-10% מס צריכה בחנויות מורשות.",
        },
        {
          title: "שעות פעילות מומלצות",
          content: "רוב חנויות אקיהברה נפתחות רק ב-11:00 בבוקר ונסגרות ב-20:00. בימי ראשון הרחוב הראשי (Chuo-dori) סגור לתנועת כלי רכב והופך למדרחוב קהילתי ענק.",
        },
      ],
    },
    {
      id: "guide-gamescom",
      title: "הישרדות ב-Gamescom: טיפים להמתנה בתורים ואוכל",
      city: "קלן",
      country: "גרמניה",
      flag: "🇩🇪",
      readTime: "6 דקות קריאה",
      tipsCount: 12,
      summary: "איך לעקוף תורים של 4 שעות למשחקים מובילים, היכן נמצאים השקעים להטענת ה-Steam Deck והסנדוויצ'ים הכי שווים בקלן.",
      sections: [
        {
          title: "ניהול תורים וכרטיסי FastPass",
          content: "הורידו מראש את אפליקציית Gamescom הרשמית. חברות רבות פותחות תורים וירטואליים (Queue Slots) ב-09:00 בבוקר בדיוק — זה חוסך עמידה של שעות.",
        },
        {
          title: "ציוד חובה בתיק הגב",
          content: "סוללה ניידת 20,000mAh לפחות, בקבוק מים רב-פעמי (יש עמדות מילוי חינם), נעלי הליכה נוחות במיוחד ומטריות קומפקטיות.",
        },
        {
          title: "אוכל ומנוחה",
          content: "האוכל במרכז הירידים Koelnmesse יקר מאוד. במרחק 5 דקות הליכה ליד תחנת Köln Messe/Deutz יש מאפיות גרמניות מצוינות וזולות בהרבה.",
        },
      ],
    },
    {
      id: "guide-seoul-pcbang",
      title: "מדריך כניסה והזמנת אוכל ב-PC Bang בסיאול",
      city: "סיאול",
      country: "דרום קוריאה",
      flag: "🇰🇷",
      readTime: "5 דקות קריאה",
      tipsCount: 10,
      summary: "כיצד להטעין כרטיס שעות במכונות האוטומטיות, להזמין ראמן חריף ישירות למקלדת ולשחק עם פינג 2ms.",
      sections: [
        {
          title: "כניסה כתייר ללא מספר זהות קוריאני",
          content: "במכונת התשלום (Kiosk) בחרו באפשרות 'Non-Member' או פנו לקופאי בדלפק. עלות ממוצעת היא כ-¥2,000-3,000 וון לשעה (כ-$2 בלבד).",
        },
        {
          title: "הזמנת אוכל דרך המסך",
          content: "התפריט במסך כולל ראמן קוריאני מבושל במקום, נקניקיות, אורז מטוגן ומשקאות אנרגיה. המלצר מגיש את המגש ישירות לשולחן הגיימינג שלך תוך 4 דקות.",
        },
        {
          title: "T1 Base Camp בהונגדה",
          content: "מתחם הגיימינג המתקדם בעולם ששייך לקבוצת T1. עמדות מסכי 240Hz, כיסאות Secretlab ומרצ'נדייז רשמי של Faker.",
        },
      ],
    },
    {
      id: "guide-riyadh-esports",
      title: "מדריך לאליפות העולם Esports World Cup בריאד",
      city: "ריאד",
      country: "ערב הסעודית",
      flag: "🇸🇦",
      readTime: "7 דקות קריאה",
      tipsCount: 14,
      summary: "מה מותר ומה אסור ב-Boulevard City, כרטיסים לארנות הענק, ותחבורה באזור האירוע הגדול בעולם.",
      sections: [
        {
          title: "מתחם Boulevard City",
          content: "כל הארנות ממוקמות במתחם בולווארד סיטי הממוזג והחדשני. הכניסה לארנות מצריכה כרטיס נפרד לכל מושב או כרטיס פסטיבל שבועי.",
        },
        {
          title: "תחבורה והתניידות",
          content: "השימוש ב-Uber ו-Careem בריאד נוח, זמין וזול מאוד. מומלץ להזמין רכב כ-20 דקות מראש בסיום משחקי הגמר עקב עומסי תנועה.",
        },
      ],
    },
  ];

  const cities = ["all", "טוקיו", "קלן", "סיאול", "ריאד"];

  const filteredGuides =
    selectedCity === "all"
      ? guides
      : guides.filter((g) => g.city === selectedCity);

  return (
    <div className={`space-y-8 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>מדריכי שטח & תובנות מקומיות לגיימרים</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          מדריכי הישרדות ונסיעות לגיימרים
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          איפה מוצאים את הדילים הכי שווים לחומרת רטרו, איך מזמינים אוכל ב-PC Bangs בסיאול ללא מילים, ואיך להפיק את המקסימום מכנסי ענק כמו Gamescom ו-Tokyo Game Show.
        </p>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => {
                sound.playClick();
                setSelectedCity(c);
              }}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCity === c
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {c === "all" ? "כל היעדים" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((g) => {
          const isExpanded = expandedGuideId === g.id;

          return (
            <div
              key={g.id}
              className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 shadow-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="text-base">{g.flag}</span>
                    <span>{g.city}, {g.country}</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{g.readTime}</span>
                  </span>
                </div>

                <h2 className="text-lg font-black text-white font-heading leading-snug">
                  {g.title}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {g.summary}
                </p>

                {/* Expanded Sections */}
                {isExpanded && (
                  <div className="pt-3 border-t border-purple-900/40 space-y-3">
                    {g.sections.map((sec, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span>{sec.title}</span>
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setExpandedGuideId(isExpanded ? null : g.id);
                  }}
                  className="w-full sm:w-auto text-xs text-cyan-400 font-bold hover:underline flex items-center justify-center gap-1 cursor-pointer py-1.5"
                >
                  <span>{isExpanded ? "סגור פירוט" : "קרא את כל הטיפים"}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {onBuildTripForDestination && (
                  <button
                    onClick={() => {
                      sound.playLevelUp();
                      onBuildTripForDestination(g.city);
                    }}
                    className="w-full sm:w-auto py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>בנה טיול ל{g.city}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
