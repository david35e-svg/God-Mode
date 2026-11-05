import React, { useState } from "react";
import { UpcomingGame } from "../types";
import {
  Calendar,
  Flame,
  Play,
  X,
  Filter,
  Search,
  ListFilter,
  Grid,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { sound } from "../lib/sound";

export const UPCOMING_GAMES_DATA: UpcomingGame[] = [
  {
    id: "gta-6",
    title: "Grand Theft Auto VI (GTA VI)",
    developer: "Rockstar Games",
    releaseWindow: "2025 - 2026",
    exactDate: "Fall 2025",
    platforms: ["PS5", "Xbox Series X/S", "PC"],
    genre: "Open-World Action / Crime",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    youtubeTrailerId: "QdBZY2fkU-0",
    synopsis: "המשחק המצופה ביותר בעשור: חזרה ללוס סנטוס ולמדינת ליאונידה (Vice City) עם זוג הגיבורים לוסיה וג'ייסון.",
    expoRevealedAt: "Rockstar Global Reveal & The Game Awards",
    keyFeatures: [
      "מפת Vice City בגודל כפול מ-GTA V",
      "מערכת דיאלוגים ו-AI מתקדמת לאזרחים",
      "מצב GTA Online 2 חדש לחלוטין",
    ],
    preorderUrl: "https://www.rockstargames.com/VI",
    hypeRating: 9.9,
  },
  {
    id: "monster-hunter-wilds",
    title: "Monster Hunter Wilds",
    developer: "Capcom",
    releaseWindow: "2025",
    exactDate: "Feb 28, 2025",
    platforms: ["PS5", "Xbox Series X/S", "PC"],
    genre: "Action RPG / Co-Op Hunting",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    youtubeTrailerId: "aI_Oa_aHqR8",
    synopsis: "הדור הבא של סדרת מונסטר האנטר: עולם פתוח ורציף לחלוטין עם מזג אוויר דינמי ורכיבה על חיית הסייקרט.",
    expoRevealedAt: "Gamescom Cologne & Tokyo Game Show",
    keyFeatures: [
      "Cross-Play מלא בין PS5, Xbox ו-PC",
      "שינויי מזג אוויר המשפיעים על מפלצות",
      "מצב 4 שחקנים Co-op רציף",
    ],
    preorderUrl: "https://www.monsterhunter.com/wilds",
    hypeRating: 9.7,
  },
  {
    id: "ghost-of-yotei",
    title: "Ghost of Yōtei",
    developer: "Sucker Punch Productions / Sony",
    releaseWindow: "2025",
    exactDate: "Late 2025",
    platforms: ["PS5"],
    genre: "Open World Samurai Action",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    youtubeTrailerId: "7Xylyp8K5yE",
    synopsis: "המשך לסנסציית Ghost of Tsushima! העלילה מתרחשת בשנת 1603 בסביבות הר יוטי בהוקאידו, יפן.",
    expoRevealedAt: "PlayStation State of Play",
    keyFeatures: [
      "נבנה מן היסוד בלעדית עבור PS5",
      "מערכת קרב משופרת עם שילוב כלי נשק מסורתיים",
      "נופים יפניים עוצרי נשימה והר יוטי בשלג",
    ],
    preorderUrl: "https://www.playstation.com/en-us/games/ghost-of-yotei/",
    hypeRating: 9.7,
  },
  {
    id: "witcher-4-polaris",
    title: "The Witcher 4 (Project Polaris)",
    developer: "CD Projekt RED",
    releaseWindow: "2026 - 2027",
    exactDate: "Q4 2026",
    platforms: ["PS5", "Xbox Series X/S", "PC"],
    genre: "Dark Fantasy RPG",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    youtubeTrailerId: "c2c1uXWqE2A",
    synopsis: "תחילתה של סאגה חדשה בעולם הכשפים בפיתוח במנוע Unreal Engine 5.",
    expoRevealedAt: "Gamescom Flagship",
    keyFeatures: [
      "פיתוח ב-Unreal Engine 5 עם Nanite & Lumen",
      "בית ספר חדש לכשפים (School of the Lynx)",
      "חופש בחירה עלילתי עמוק",
    ],
    preorderUrl: "https://www.thewitcher.com",
    hypeRating: 9.8,
  }
];

export const UpcomingGamesView: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "breakdown">("breakdown");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrailer, setActiveTrailer] = useState<{ id: string; title: string } | null>(null);

  const filteredGames = UPCOMING_GAMES_DATA.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedPlatform === "all") return true;
    if (selectedPlatform === "PC") return game.platforms.some((p) => p.includes("PC"));
    if (selectedPlatform === "PS5") return game.platforms.some((p) => p.includes("PS5"));
    if (selectedPlatform === "Xbox") return game.platforms.some((p) => p.includes("Xbox"));
    if (selectedPlatform === "Switch") return game.platforms.some((p) => p.includes("Switch"));
    return true;
  });

  return (
    <div className="space-y-8 text-right">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>לוח יציאות משחקים עולמי & תאימות פלטפורמות</span>
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
            המשחקים הגדולים של 2025-2027
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            פילוח מקיף ומסודר של כל תאריכי היציאה של הכותרים המצופים בתעשייה לפי קונסולות ופלטפורמות יעד.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>סינון:</span>
            </span>

            {[
              { id: "all", label: "כל הפלטפורמות", icon: "🎮" },
              { id: "PC", label: "PC & Steam", icon: "🖥️" },
              { id: "PS5", label: "PlayStation 5", icon: "🕹️" },
              { id: "Xbox", label: "Xbox Series X/S", icon: "💚" },
            ].map((plat) => (
              <button
                key={plat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPlatform(plat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedPlatform === plat.id
                    ? "bg-purple-600 text-white shadow-lg font-black"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{plat.icon} </span>
                <span>{plat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode("breakdown");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                viewMode === "breakdown" ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-400"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>רשימה מפורטת</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode("grid");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                viewMode === "grid" ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-400"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>כרטיסיות</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            placeholder="חפש משחק, מפתח או ז'אנר..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-2xl bg-slate-950 border border-purple-900/40 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Breakdown View */}
      {viewMode === "breakdown" ? (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl divide-y divide-slate-800">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="p-4 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-purple-900/40 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm text-white font-heading">{game.title}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                      ⭐ Hype {game.hypeRating}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs">
                    <span>{game.developer}</span> • <span className="text-purple-300">{game.genre}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{game.synopsis}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {game.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="px-2 py-0.5 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold"
                  >
                    {plat}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-amber-300 text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  {game.exactDate || game.releaseWindow}
                </span>
                <button
                  onClick={() => {
                    sound.playLevelUp();
                    setActiveTrailer({ id: game.youtubeTrailerId, title: game.title });
                  }}
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
                  title="צפה בטריילר"
                >
                  <Play className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl p-5 space-y-3"
            >
              <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded-2xl" />
              <h3 className="text-lg font-black text-white font-heading">{game.title}</h3>
              <p className="text-xs text-slate-300">{game.synopsis}</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-amber-300 font-mono font-bold text-xs">
                  {game.exactDate || game.releaseWindow}
                </span>
                <button
                  onClick={() => setActiveTrailer({ id: game.youtubeTrailerId, title: game.title })}
                  className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>טריילר</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trailer Modal */}
      {activeTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-purple-900/50 rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between text-white">
              <span className="text-xs font-bold text-amber-400 font-mono">
                🎬 טריילר: {activeTrailer.title}
              </span>
              <button
                onClick={() => setActiveTrailer(null)}
                className="p-1 rounded-full bg-slate-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeTrailer.id}?autoplay=1`}
                title={activeTrailer.title}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
