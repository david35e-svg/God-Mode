import React, { useState } from "react";
import { Destination } from "../types";
import { MOCK_DESTINATIONS } from "../data/mockData";
import { DEFAULT_AFFILIATE_OFFERS } from "../data/affiliateData";
import { AffiliateOfferCard } from "./AffiliateOfferCard";
import { Star, MapPin, Sparkles, Filter, Search, ArrowRight, ShieldCheck } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";

interface DestinationsViewProps {
  onSelectDestination: (dest: Destination) => void;
  onAwardXp?: (xp: number) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onSelectDestination,
  onAwardXp,
}) => {
  const { t, isRtl } = useI18n();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = MOCK_DESTINATIONS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "all") return true;
    return d.category === filter;
  });

  return (
    <div className={`space-y-12 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>יעדי גיימינג מומלצים 2027</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          יעדי הדגל העולמיים של הגיימרים
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          ערים שהפכו למקדשי וידאו גיימס: ארקיידים ענקיים, זירות טורנירים בינלאומיות ופארקי מציאות מדומה.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-purple-500/50 transition-all p-6 space-y-4"
          >
            <div className="space-y-4">
              <div className="relative h-52 rounded-2xl overflow-hidden">
                <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                <span className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} bg-purple-600 text-white font-black text-xs px-3 py-1 rounded-xl`}>
                  {dest.badge}
                </span>
                <span className={`absolute bottom-3 ${isRtl ? "left-3" : "right-3"} bg-slate-950/80 text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-xl`}>
                  ⭐ {dest.rating} ({dest.reviewsCount})
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{dest.flag}</span>
                  <h3 className="text-xl font-black text-white font-heading">{dest.name}</h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">{dest.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {dest.highlights.map((h, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">הערכת תקציב:</span>
                <span className="text-lg font-black text-amber-300 font-mono">{dest.estPrice}</span>
              </div>

              <button
                onClick={() => {
                  sound.playLevelUp();
                  onSelectDestination(dest);
                }}
                className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>צפה בפרטים ומסלול</span>
                {isRtl ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Destination Partner Offers Section */}
      <div className="space-y-6 pt-4 border-t border-purple-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.affiliate_badge}</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {t.affiliate_curated_offers_title}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {t.affiliate_curated_offers_desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEFAULT_AFFILIATE_OFFERS.map((offer) => (
            <AffiliateOfferCard
              key={offer.id}
              offer={offer}
              sourcePage="destinations_view"
              onAwardXp={onAwardXp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
