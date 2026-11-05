import React from "react";
import { MOCK_PACKAGES } from "../data/mockData";
import { DEFAULT_AFFILIATE_OFFERS } from "../data/affiliateData";
import { AffiliateOfferCard } from "./AffiliateOfferCard";
import { Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";

interface SpecialPackagesViewProps {
  onBookNow: (packageTitle: string) => void;
  onAwardXp?: (xp: number) => void;
}

export const SpecialPackagesView: React.FC<SpecialPackagesViewProps> = ({ onBookNow, onAwardXp }) => {
  const { t, isRtl } = useI18n();

  return (
    <div className={`space-y-12 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.pkg_badge}</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          {t.pkg_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.pkg_desc}
        </p>

        {/* Affiliate Disclosure Box */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
          <strong className="font-bold text-amber-300 block mb-1">{t.pkg_affiliate_box_title}</strong>
          {t.pkg_affiliate_box_desc}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl p-6 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl`}>
                  {pkg.tag}
                </span>
              </div>

              <div>
                <span className="text-xs text-cyan-400 font-bold block">{pkg.destination} • {pkg.duration}</span>
                <h3 className="text-xl font-black text-white font-heading">{pkg.title}</h3>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <span className="font-bold text-amber-300">
                  {isRtl ? "מה החבילה כוללת:" : "What's Included:"}
                </span>
                {pkg.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 line-through block font-mono">{pkg.originalPrice}</span>
                <span className="text-2xl font-black text-amber-300 font-mono">{pkg.price}</span>
              </div>

              <button
                onClick={() => {
                  sound.playLevelUp();
                  onBookNow(pkg.title);
                }}
                className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition-all"
              >
                <span>{t.pkg_inquire_btn}</span>
                {isRtl ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Verified Partner Accommodations, Passes & Activities */}
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
          {DEFAULT_AFFILIATE_OFFERS.slice(0, 3).map((offer) => (
            <AffiliateOfferCard
              key={offer.id}
              offer={offer}
              sourcePage="packages_view"
              onAwardXp={onAwardXp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
