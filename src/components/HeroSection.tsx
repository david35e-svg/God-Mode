import React from "react";
import { Sparkles, Plane, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";

interface HeroSectionProps {
  onBuildTrip: () => void;
  onExploreEvents: () => void;
  onJoinCommunity: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildTrip,
  onExploreEvents,
  onJoinCommunity,
}) => {
  const { isRtl, language, t } = useI18n();

  const isEn = language === "en";
  const isJa = language === "ja";
  const isEs = language === "es";

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-purple-800/50 bg-slate-950 p-6 sm:p-12 shadow-2xl space-y-8 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Background Neon Grid */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {isEn && "The Premier Platform for Gaming Tourism, eSports & Community"}
            {isJa && "eスポーツ・ゲームイベント旅行＆コミュニティ公式ポータル"}
            {isEs && "La Plataforma Premier para Turismo Gamer y Comunidad de eSports"}
            {isRtl && "פלטפורמת תיירות לגיימרים סביב אירועי גיימינג עולמיים"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
          {isEn ? (
            <>Your Next Gaming Journey <br /><span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Begins Here</span></>
          ) : isJa ? (
            <>あなたの次のゲーム旅が <br /><span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">ここから始まる</span></>
          ) : isEs ? (
            <>Tu Próximo Viaje Gamer <br /><span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Comienza Aquí</span></>
          ) : (
            <>הטיול הבא שלך <br /><span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">מתחיל כאן</span></>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium max-w-2xl">
          {t.hero_subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Button 1: בנה את הטיול שלי */}
          <button
            onClick={() => {
              sound.playLevelUp();
              onBuildTrip();
            }}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-purple-600/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Plane className="w-4 h-4" />
            <span>{t.hero_btn_build_trip}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          {/* Button 2: גלה אירועי גיימינג */}
          <button
            onClick={() => {
              sound.playClick();
              onExploreEvents();
            }}
            className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-purple-700/50 font-bold text-xs sm:text-sm flex items-center gap-2 hover:border-purple-500 transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{t.hero_btn_explore_events}</span>
          </button>

          {/* Button 3: הצטרף לקהילה */}
          <button
            onClick={() => {
              sound.playClick();
              onJoinCommunity();
            }}
            className="py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.hero_btn_join_community}</span>
          </button>
        </div>
      </div>

      {/* Quick Stat Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-purple-900/40 text-center">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-lg sm:text-xl font-black text-cyan-400 font-mono block">48+</span>
          <span className="text-[11px] text-slate-400 font-bold">
            {isEn ? "Secret Spots" : isJa ? "隠れ名所" : isEs ? "Puntos Secretos" : "ספוטים נסתרים"}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-lg sm:text-xl font-black text-purple-400 font-mono block">100%</span>
          <span className="text-[11px] text-slate-400 font-bold">
            {isEn ? "Direct Access" : isJa ? "直接予約案内" : isEs ? "Acceso Directo" : "מידע מונגש"}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-lg sm:text-xl font-black text-amber-400 font-mono block">350K+</span>
          <span className="text-[11px] text-slate-400 font-bold">
            {isEn ? "Gamescom Attendees" : isJa ? "Gamescom来場者" : isEs ? "Visitantes Gamescom" : "מבקרים ב-Gamescom"}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-lg sm:text-xl font-black text-pink-400 font-mono block">4.98 ⭐</span>
          <span className="text-[11px] text-slate-400 font-bold">
            {isEn ? "Gamer Satisfaction" : isJa ? "満足度スコア" : isEs ? "Satisfacción Gamer" : "שביעות רצון גיימרים"}
          </span>
        </div>
      </div>
    </div>
  );
};
