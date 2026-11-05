import React from "react";
import { X, Trophy, Medal, Crown } from "lucide-react";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const leaders = [
    { rank: 1, name: "NeoAkira", level: 42, xp: "18,400", city: "Tokyo Explorer" },
    { rank: 2, name: "CyberValkyrie", level: 38, xp: "15,200", city: "Cologne Master" },
    { rank: 3, name: "FakerFan99", level: 35, xp: "13,900", city: "Seoul Champion" },
    { rank: 4, name: "PixelKnight", level: 31, xp: "11,500", city: "Retro Hunter" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-5 text-right dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-black text-white font-heading">טבלת מובילים עולמית (Leaderboard)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm w-6 text-amber-400">
                  #{leader.rank}
                </span>
                <div>
                  <span className="font-bold text-xs text-white block">{leader.name}</span>
                  <span className="text-[10px] text-slate-400">{leader.city}</span>
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-cyan-400 font-bold text-xs block">LV.{leader.level}</span>
                <span className="text-[10px] text-slate-400">{leader.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
