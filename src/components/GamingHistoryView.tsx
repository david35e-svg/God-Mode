import React, { useState } from "react";
import { GamingArticle } from "../types";
import { History, Play, ChevronDown, ChevronUp, RefreshCw, Search } from "lucide-react";
import { sound } from "../lib/sound";

export const GAMING_ARTICLES_DATA: GamingArticle[] = [
  {
    id: "japan-gaming-history",
    title: "יפן: מאקיהברה ועד קיוטו - הולדת אימפריית נינטנדו, סגה ורחובות הארקייד",
    country: "יפן",
    flag: "🇯🇵",
    city: "טוקיו & קיוטו",
    era: "1889 - 2027",
    readingTime: "7 דקות קריאה",
    category: "history",
    summary: "כיצד חברה קטנה לקלפי משחק בקיוטו ב-1889 הפכה למעצמת התרבות הגדולה בעולם?",
    bannerImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "M3H9-qSTh4U",
    videoTitle: "ההיסטוריה של תרבות הגיימינג ביפן",
    contentParagraphs: [
      "בשנת 1889, פוסאג'ירו ימאוצ'י פתח חנות קטנה בקיוטו שמכרה קלפי משחק מסורתיים בשם 'הנאפודה'. זו הייתה ההתחלה של נינטנדו.",
      "ב-1983 השיקה נינטנדו את ה-Famicom (NES) והצילה את שוק הגיימינג העולמי לאחר הקריסה הגדולה.",
      "אקיהברה בטוקיו הפכה לבירת הרטרו והארקייד העולמית עם מרכזי SEGA וחנויות Super Potato האגדיות."
    ],
    historicalMilestones: [
      { year: "1889", event: "הקמת נינטנדו בקיוטו" },
      { year: "1983", event: "השקת ה-Famicom" },
      { year: "1996", event: "שחרור Pokemon Red & Green" }
    ],
    legacyLocations: ["Super Potato Akihabara", "Nintendo HQ Kyoto", "SEGA GiGO Tower"]
  },
  {
    id: "germany-gamescom-legacy",
    title: "גרמניה: מ-Leipzig Games Convention ועד Gamescom קלן - בירת הגיימינג של אירופה",
    country: "גרמניה",
    flag: "🇩🇪",
    city: "קלן & לייפציג",
    era: "2002 - 2027",
    readingTime: "6 דקות קריאה",
    category: "expos",
    summary: "איך תערוכה קטנה בלייפציג הפכה לאירוע הגיימינג הגדול בתבל עם 350,000 מבקרים?",
    bannerImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "fK1A74-VInU",
    videoTitle: "Gamescom Story: How Cologne Became Gaming Capital",
    contentParagraphs: [
      "התערוכה נפתחה בלייפציג ב-2002 ועברה ב-2009 למרכז Koelnmesse הענק בקלן.",
      "כיום Gamescom היא מוקד עולמי לחשיפות ענק בהנחיית ג'ף קילי ומפגשי קוספליי."
    ],
    historicalMilestones: [
      { year: "2002", event: "פתיחת Games Convention בלייפציג" },
      { year: "2009", event: "העברת התערוכה לקלן" }
    ],
    legacyLocations: ["Koelnmesse Hall 1-11", "Meltdown Cologne"]
  }
];

export const GamingHistoryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});
  const [activeInlineVideo, setActiveInlineVideo] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleInlineVideo = (id: string) => {
    sound.playLevelUp();
    setActiveInlineVideo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 text-right">
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 inline-flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-cyan-400" />
          <span>היסטוריית גיימינג, תערוכות עבר & דוקומנטרי</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          מאמרים, היסטוריית תערוכות & מורשת גיימינג
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          גלה כיצד נוצרו בירות הגיימינג הגדולות בתבל מנינטנדו ב-1889 ועד Gamescom בקלן.
        </p>
      </div>

      <div className="space-y-6">
        {GAMING_ARTICLES_DATA.map((article) => {
          const isExpanded = expandedArticles[article.id];
          const isVideoPlaying = activeInlineVideo[article.id];

          return (
            <div key={article.id} className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl space-y-4">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
                {isVideoPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${article.youtubeVideoId}?autoplay=1`}
                    title={article.videoTitle}
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={article.bannerImage} alt={article.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleInlineVideo(article.id)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950/20 transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl">
                        <Play className="w-7 h-7 fill-white ml-0.5" />
                      </div>
                      <span className="text-xs font-black text-white bg-slate-950/80 px-3 py-1 rounded-full">
                        צפה בסרטון דוקומנטרי ({article.country})
                      </span>
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{article.flag}</span>
                  <span className="text-xs text-cyan-400 font-bold">{article.country} ({article.city})</span>
                  <span className="text-xs text-slate-500 font-mono">• {article.era}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">{article.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300">{article.summary}</p>

                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t border-purple-900/40 text-xs sm:text-sm text-slate-300">
                    {article.contentParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-amber-400 font-mono">אבני דרך:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {article.historicalMilestones.map((m, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                            <span className="text-cyan-400 font-bold font-mono">{m.year}</span>
                            <span>{m.event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(article.id)}
                    className="px-4 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isExpanded ? "סגור מאמר" : "קרא את המאמר המלא"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
