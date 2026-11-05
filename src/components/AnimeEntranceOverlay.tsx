import React, { useEffect, useState } from "react";
import { Sparkles, Zap, Flame, ShieldAlert } from "lucide-react";
import { sound } from "../lib/sound";

interface AnimeEntranceOverlayProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const AnimeEntranceOverlay: React.FC<AnimeEntranceOverlayProps> = ({
  isVisible,
  title,
  subtitle,
  badge = "GOD MODE ENGAGED",
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      sound.playLevelUp();
      const timer = setTimeout(() => {
        setShow(false);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Background Energy Flash */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-pulse" />

      {/* Cyber Diagonal Energy Slash */}
      <div className="absolute w-[200%] h-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent -rotate-12 blur-md opacity-80 animate-ping" />
      <div className="absolute w-[200%] h-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-12 blur-sm opacity-90" />

      {/* Center Cinematic Card */}
      <div className="relative z-10 text-center space-y-3 transform scale-110 animate-bounce duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 font-black text-xs tracking-widest uppercase shadow-2xl border border-amber-300">
          <Flame className="w-4 h-4 fill-slate-950" />
          <span>{badge}</span>
          <Zap className="w-4 h-4 fill-slate-950" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base font-bold text-cyan-300 font-mono tracking-wider drop-shadow-md">
            {subtitle}
          </p>
        )}

        <div className="text-[10px] font-mono text-purple-300 opacity-80 tracking-widest">
          /// イベント発生 · BATTLE ARENA READY ///
        </div>
      </div>
    </div>
  );
};
