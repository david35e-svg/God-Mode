import React from "react";
import { UserProfile } from "../types";
import { Shield, Award, Sparkles, Coins, Zap, Trophy } from "lucide-react";
import { sound } from "../lib/sound";

interface ProfileViewProps {
  profile: UserProfile;
  onOpenClassPicker: () => void;
  onOpenInventory: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onOpenClassPicker,
  onOpenInventory,
}) => {
  return (
    <div className="space-y-8 text-right max-w-3xl mx-auto">
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 inline-flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          <span>פרופיל שחקן & נתוני Gamification</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
          סטטוס מסע & כרטיס שחקן
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          התקדמות ברמות, הישגים שנפתחו בחקר ערים ומלאי פריטי אספנות (Inventory).
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-purple-900/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-900/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl text-cyan-400 font-heading">
                LV.{profile.level}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-heading">{profile.name}</h2>
              <span className="text-xs text-amber-300 font-bold font-mono">
                Class: {profile.characterClass}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onOpenClassPicker();
              }}
              className="py-2 px-3.5 rounded-xl bg-purple-900/50 hover:bg-purple-900 text-white text-xs font-bold border border-purple-500/30"
            >
              החלף מקצוע (Class)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenInventory();
              }}
              className="py-2 px-3.5 rounded-xl bg-cyan-900/50 hover:bg-cyan-900 text-cyan-200 text-xs font-bold border border-cyan-500/30"
            >
              תיק חפצים ({profile.inventory.length})
            </button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">התקדמות לרמה הבאה:</span>
            <span className="text-cyan-400 font-bold">
              {profile.xp} / {profile.nextLevelXp} XP
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-purple-900/40">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-white font-heading">הישגים ותגים שנפתחו:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profile.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-2xl border text-center space-y-1.5 ${
                  ach.unlocked
                    ? "bg-slate-950 border-amber-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800 text-slate-600 opacity-50"
                }`}
              >
                <span className="text-2xl block">{ach.icon}</span>
                <span className="text-[11px] font-bold block">{ach.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
