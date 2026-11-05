import React from "react";
import { Destination } from "../types";
import { sound } from "../lib/sound";

interface CitySelectorCardProps {
  dest: Destination;
  isSelected: boolean;
  onSelect: (dest: Destination) => void;
}

export const CitySelectorCard: React.FC<CitySelectorCardProps> = ({
  dest,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect(dest);
      }}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
        isSelected
          ? "bg-purple-900/40 border-cyan-400 text-white shadow-lg"
          : "bg-slate-950 border-purple-900/30 text-slate-300 hover:border-purple-500/40"
      }`}
    >
      <img src={dest.heroImage} alt={dest.name} className="w-12 h-12 rounded-xl object-cover" />
      <div>
        <div className="flex items-center gap-1.5">
          <span>{dest.flag}</span>
          <span className="font-bold text-xs">{dest.name}</span>
        </div>
        <span className="text-[10px] text-slate-400 block">{dest.hotspotsCount} נקודות עניין</span>
      </div>
    </div>
  );
};
