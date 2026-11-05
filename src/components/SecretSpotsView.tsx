import React, { useState } from "react";
import { Lock, Eye, MapPin, Sparkles, Compass, Clock, Tag } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";

interface SecretSpotItem {
  id: string;
  title: string;
  city: string;
  country: string;
  flag: string;
  category: "arcade" | "pc-bang" | "retro-store" | "gaming-bar" | "hardware";
  categoryLabel: string;
  secretLevel: "Rare" | "Epic" | "Legendary" | "Mythic";
  imageUrl: string;
  hours: string;
  insiderTip: string;
  mustDo: string;
}

const ALL_SECRET_SPOTS: SecretSpotItem[] = [
  {
    id: "super-potato-akiba",
    title: "Super Potato 5th Floor Secret Arcade",
    city: "טוקיו",
    country: "יפן",
    flag: "🇯🇵",
    category: "arcade",
    categoryLabel: "ארקייד רטרו וממתקים",
    secretLevel: "Mythic",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    hours: "11:00 - 20:00",
    insiderTip: "עלו לקומה החמישית המוחבאת באקיהברה כדי למצוא ארקייד רטרו שמוכר חטיפי Dagashi יפניים משנות ה-80 ומכונות סוכריות נדירות.",
    mustDo: "לשחק בגרסה המקורית של Street Fighter II על מכונת קבינט מ-1991 ולשתות Ramune.",
  },
  {
    id: "t1-base-camp-seoul",
    title: "T1 Base Camp Esports PC Bang",
    city: "סיאול",
    country: "דרום קוריאה",
    flag: "🇰🇷",
    category: "pc-bang",
    categoryLabel: "PC Bang אליפות עולם",
    secretLevel: "Legendary",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    hours: "פתוח 24/7",
    insiderTip: "ה-PC Bang הרשמי של קבוצת T1 ו-Faker בהונגדה. עמדות מטורפות של 240Hz, מקלדות מכניות מותאמות אישית ותפריט אוכל שמביאים לך עד למסך.",
    mustDo: "להזמין T1 Curry Rice ולשחק LoL עם פינג 2ms.",
  },
  {
    id: "meltdown-bar-cologne",
    title: "Meltdown Esports & Gaming Bar",
    city: "קלן",
    country: "גרמניה",
    flag: "🇩🇪",
    category: "gaming-bar",
    categoryLabel: "בר קהילת גיימרים",
    secretLevel: "Legendary",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    hours: "18:00 - 03:00",
    insiderTip: "הבר האולטימטיבי לאוהדי CS2 ו-Super Smash Bros בקלן. קוקטיילים בנושאי HP Potion ותחרויות שבועיות.",
    mustDo: "להשתתף בטורניר ה-Smash הפתוח בימי חמישי בערב עם גיימרים מקומיים.",
  },
  {
    id: "nakano-broadway-retro",
    title: "Nakano Broadway Hidden Mandarake Caves",
    city: "טוקיו",
    country: "יפן",
    flag: "🇯🇵",
    category: "retro-store",
    categoryLabel: "חנות רטרו ואספנות",
    secretLevel: "Epic",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    hours: "12:00 - 20:00",
    insiderTip: "אלטרנטיבה זולה ושקטה בהרבה מאקיהברה. קומה 2 עד 4 מלאות בחנויות נישה של קלטות Game Boy, Famicom ודמויות וינטג'.",
    mustDo: "לחפש משחקי Game Boy Color יפניים באריזות מקוריות החל מ-¥500 בלבד.",
  },
  {
    id: "yongsan-electronics-market",
    title: "Yongsan Electronic Alleyways",
    city: "סיאול",
    country: "דרום קוריאה",
    flag: "🇰🇷",
    category: "hardware",
    categoryLabel: "מבוך חומרת גיימינג",
    secretLevel: "Rare",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    hours: "10:00 - 19:30",
    insiderTip: "קומפלקס ענק של סמטאות חומרה: מקשים מותאמים אישית (Custom Keycaps), כבלים סרוגים ומתאמי קונסולות נדירים.",
    mustDo: "להרכיב מקלדת מכנית Custom-made במקום בחצי ממחיר השוק המערבי.",
  },
];

interface SecretSpotsViewProps {
  onBuildTripForSpot?: (city: string) => void;
}

export const SecretSpotsView: React.FC<SecretSpotsViewProps> = ({
  onBuildTripForSpot,
}) => {
  const { isRtl } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "כל הספוטים" },
    { id: "pc-bang", label: "PC Bangs" },
    { id: "arcade", label: "ארקייד סודי" },
    { id: "retro-store", label: "חנויות רטרו" },
    { id: "gaming-bar", label: "ברי גיימינג" },
    { id: "hardware", label: "חומרה וקסטום" },
  ];

  const filteredSpots =
    selectedCategory === "all"
      ? ALL_SECRET_SPOTS
      : ALL_SECRET_SPOTS.filter((s) => s.category === selectedCategory);

  return (
    <div className={`space-y-8 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/40 inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-red-400" />
          <span>ספוטים סודיים & מקומות מחתרתיים לגיימרים</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          הסודות השמורים של קהילת הגיימרים
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          מתחמי PC Bang שפתוחים 24/7, ברי קוקטיילים עם מסכי טורניר, חנויות רטרו במרתפים נסתרים ושווקי חומרה שאף סוכן נסיעות רגיל לא שמע עליהם.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(c.id);
              }}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden h-48">
                <img
                  src={spot.imageUrl}
                  alt={spot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono font-bold text-cyan-300">
                  {spot.categoryLabel}
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-purple-950/90 backdrop-blur-md border border-purple-800 text-[10px] font-mono font-bold text-purple-300">
                  דרגת סודיות: {spot.secretLevel}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{spot.city}, {spot.country} {spot.flag}</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{spot.hours}</span>
                </span>
              </div>

              <h2 className="text-lg font-black text-white font-heading">
                {spot.title}
              </h2>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-bold block">💡 טיפ מקומי מחתרתי:</span>
                  <p className="text-slate-300 leading-relaxed">{spot.insiderTip}</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 space-y-1">
                  <span className="text-purple-300 font-bold block">🎯 חוויית חובה בספוט:</span>
                  <p className="text-slate-300 leading-relaxed">{spot.mustDo}</p>
                </div>
              </div>
            </div>

            {onBuildTripForSpot && (
              <button
                onClick={() => {
                  sound.playLevelUp();
                  onBuildTripForSpot(spot.city);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>בנה טיול סביב ספוט זה ב-{spot.city}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
