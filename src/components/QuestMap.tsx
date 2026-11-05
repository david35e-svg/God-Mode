import React from "react";
import { Quest } from "../types";
import { CheckCircle2, Circle, Trophy, Award, MapPin } from "lucide-react";
import { sound } from "../lib/sound";

interface QuestMapProps {
  quests: Quest[];
  onCompleteQuest: (questId: string) => void;
  onOpenScanner: () => void;
  onOpenQuiz: () => void;
}

export const QuestMap: React.FC<QuestMapProps> = ({
  quests,
  onCompleteQuest,
  onOpenScanner,
  onOpenQuiz,
}) => {
  return (
    <div className="rounded-3xl bg-slate-900 border border-purple-900/40 p-6 shadow-2xl space-y-4 text-right">
      <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-sm text-white font-heading">
            משימות חקר עולמיות (City Quests & Loot)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuiz}
            className="py-1.5 px-3 rounded-xl bg-purple-950 text-purple-300 border border-purple-800/40 text-xs font-bold hover:bg-purple-900"
          >
            חידון בונוס 🧠
          </button>
          <button
            onClick={onOpenScanner}
            className="py-1.5 px-3 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800/40 text-xs font-bold hover:bg-cyan-900"
          >
            סורק מצלמה 📸
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((q) => (
          <div
            key={q.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              q.completed
                ? "bg-slate-950/60 border-emerald-500/40 opacity-75"
                : "bg-slate-950 border-purple-900/30 hover:border-purple-500/40"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{q.location}</span>
                </span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono">
                  +{q.xpReward} XP
                </span>
              </div>
              <h4 className="font-bold text-sm text-white font-heading">{q.title}</h4>
              <p className="text-xs text-slate-400">{q.description}</p>
            </div>

            <button
              onClick={() => {
                if (!q.completed) {
                  sound.playLevelUp();
                  onCompleteQuest(q.id);
                }
              }}
              className={`p-2 rounded-xl transition-all ${
                q.completed ? "text-emerald-400" : "text-slate-500 hover:text-cyan-400"
              }`}
            >
              {q.completed ? (
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
