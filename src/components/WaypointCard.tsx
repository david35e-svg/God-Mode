import React from "react";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

interface WaypointCardProps {
  title: string;
  category: string;
  desc: string;
  onNavigate: () => void;
}

export const WaypointCard: React.FC<WaypointCardProps> = ({
  title,
  category,
  desc,
  onNavigate,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-purple-900/30 space-y-2 text-right">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          {category}
        </span>
        <MapPin className="w-4 h-4 text-purple-400" />
      </div>
      <h4 className="font-bold text-sm text-white font-heading">{title}</h4>
      <p className="text-xs text-slate-300 leading-snug">{desc}</p>
      <button
        onClick={() => {
          sound.playClick();
          onNavigate();
        }}
        className="w-full py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
      >
        <Navigation className="w-3.5 h-3.5" />
        <span>נווט אל נקודת הציון</span>
      </button>
    </div>
  );
};
