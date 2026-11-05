import React, { useState } from "react";
import { ExternalLink, Sparkles, ShieldCheck, Tag, Info, CheckCircle2 } from "lucide-react";
import { AffiliateOffer, AffiliateCategory } from "../types";
import { handleAffiliateOfferClick } from "../lib/affiliate";
import { useI18n } from "../lib/i18n";
import { sound } from "../lib/sound";

interface AffiliateOfferCardProps {
  offer: AffiliateOffer;
  sourcePage?: string;
  compact?: boolean;
  onAwardXp?: (xp: number) => void;
}

export const AffiliateOfferCard: React.FC<AffiliateOfferCardProps> = ({
  offer,
  sourcePage = "destinations",
  compact = false,
  onAwardXp,
}) => {
  const { t, isRtl } = useI18n();
  const [isHovered, setIsHovered] = useState(false);
  const [scouted, setScouted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const getCategoryLabel = (category: AffiliateCategory): string => {
    switch (category) {
      case "hotels":
        return t.affiliate_category_hotels;
      case "flights":
        return t.affiliate_category_flights;
      case "activities":
        return t.affiliate_category_activities;
      case "tours":
        return t.affiliate_category_tours;
      case "travelInsurance":
        return t.affiliate_category_travelInsurance;
      case "carRental":
        return t.affiliate_category_carRental;
      default:
        return category;
    }
  };

  const handleClick = async () => {
    sound.playClick();
    setScouted(true);

    const awardXpHandler = (xp: number) => {
      sound.playLevelUp();
      if (onAwardXp) {
        onAwardXp(xp);
      }
    };

    await handleAffiliateOfferClick(offer, sourcePage, awardXpHandler);
  };

  if (compact) {
    return (
      <div
        id={`affiliate-compact-${offer.id}`}
        className="rounded-2xl border border-purple-800/40 bg-slate-900/90 p-3.5 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-3 shadow-lg"
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={offer.imageUrl}
            alt={offer.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {offer.providerName}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {getCategoryLabel(offer.category)}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white truncate mt-1">{offer.title}</h4>
            {offer.price && (
              <span className="text-xs font-black text-amber-300 font-mono block mt-0.5">
                {offer.price}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleClick}
          className="shrink-0 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
        >
          <span>{offer.ctaText || t.affiliate_view_deal}</span>
          <ExternalLink className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
        </button>
      </div>
    );
  }

  return (
    <div
      id={`affiliate-card-${offer.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl border border-purple-900/50 bg-slate-900 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-purple-500/60 transition-all duration-300"
    >
      {/* Top Media & Provider Tag */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Provider Badge & Verified Partner */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-slate-950/85 text-cyan-300 border border-cyan-400/40 backdrop-blur-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{offer.providerName}</span>
          </span>

          {offer.badge && (
            <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-purple-600/90 text-white border border-purple-400/40 backdrop-blur-md">
              {offer.badge}
            </span>
          )}
        </div>

        {/* Gamification Deal Reward Indicator */}
        {offer.xpReward && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-amber-500/25 text-amber-300 border border-amber-400/40 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>+{offer.xpReward} XP Scout</span>
            </span>
          </div>
        )}

        {/* Category & Location */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-300 border border-slate-700">
            {getCategoryLabel(offer.category)} • {offer.destinationName}
          </span>

          {offer.rating && (
            <span className="text-xs font-black px-2 py-1 rounded-lg bg-slate-950/85 text-amber-300 font-mono border border-amber-500/30">
              ⭐ {offer.rating} {offer.reviewsCount ? `(${offer.reviewsCount})` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-lg font-black text-white font-heading leading-tight group-hover:text-cyan-300 transition-colors">
            {offer.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {offer.description}
          </p>

          {/* Perks list */}
          {offer.perks && offer.perks.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {offer.perks.map((perk, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{perk}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing, CTA & Clear Affiliate Disclosure */}
        <div className="pt-4 border-t border-purple-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">
                {t.affiliate_partner_official} {offer.providerName}
              </span>
              <div className="flex items-baseline gap-2">
                {offer.price && (
                  <span className="text-xl font-black text-amber-300 font-mono">
                    {offer.price}
                  </span>
                )}
                {offer.originalPrice && (
                  <span className="text-xs line-through text-slate-500 font-mono">
                    {offer.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Reusable CTA Button with Central Tracking */}
            <button
              id={`affiliate-cta-${offer.id}`}
              onClick={handleClick}
              className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95"
            >
              <span>{offer.ctaText || t.affiliate_view_deal}</span>
              <ExternalLink className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Transparent Affiliate Disclosure Indicator */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 relative">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-cyan-400" />
              <span className="font-semibold text-slate-300">
                {t.affiliate_disclosure_tag}
              </span>
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-white cursor-pointer"
                title={t.affiliate_disclosure_tooltip}
              >
                <Info className="w-3 h-3" />
              </button>
            </div>

            {scouted && offer.xpReward && (
              <span className="text-emerald-400 font-bold animate-pulse">
                {t.affiliate_scout_reward} +{offer.xpReward} XP!
              </span>
            )}

            {/* Accessible Disclosure Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-6 right-0 left-0 bg-slate-950 p-2.5 rounded-xl border border-purple-600/50 text-[11px] text-slate-200 shadow-2xl z-20">
                {t.affiliate_disclosure_tooltip}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
