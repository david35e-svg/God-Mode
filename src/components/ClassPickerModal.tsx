import React from "react";
import { UserProfile } from "../types";
import { X, Check, Sparkles, Sword, Wand2, Zap, Eye } from "lucide-react";
import { sound } from "../lib/sound";

interface ClassPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClass: UserProfile["characterClass"];
  onSelectClass: (c: UserProfile["characterClass"]) => void;
}

export const ClassPickerModal: React.FC<ClassPickerModalProps> = ({
  isOpen,
  onClose,
  currentClass,
  onSelectClass,
}) => {
  if (!isOpen) return null;

  const classes: {
    id: UserProfile["characterClass"];
    title: string;
    icon: React.FC<{ className?: string }>;
    bonus: string;
    desc: string;
  }[] = [
    {
      id: "Cyber Samurai",
      title: "Cyber Samurai",
      icon: Sword,
      bonus: "+20% XP במשימות שופינג ואקיהברה",
      desc: "מומחה באיתור חנויות רטרו נדירות, ניווט ברחובות טוקיו ומציאת עסקאות חמות.",
    },
    {
      id: "Arcade Wizard",
      title: "Arcade Wizard",
      icon: Wand2,
      bonus: "+25% מטבעות במכונות ארקייד ו-SEGA",
      desc: "שולט במקצבי Taiko, מכונות טפרים (UFO Catchers) ומשחקי ריקוד.",
    },
    {
      id: "Speedrunner",
      title: "Speedrunner",
      icon: Zap,
      bonus: "קיצור זמני תורים ב-Gamescom ב-30%",
      desc: "יודע לנווט בין אולמות Koelnmesse במהירות שיא בלי לפספס אף חשיפה.",
    },
    {
      id: "Stealth Ranger",
      title: "Stealth Ranger",
      icon: Eye,
      bonus: "גילוי ספוטים סודיים וברי גיימינג מחתרתיים",
      desc: "מוצא מקומות נסתרים שאף תייר רגיל לא נחשף אליהם.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-6 text-right dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <h2 className="text-xl font-black text-white font-heading">בחר מקצוע דמות (Character Class)</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {classes.map((cls) => {
            const Icon = cls.icon;
            const isSelected = currentClass === cls.id;
            return (
              <div
                key={cls.id}
                onClick={() => {
                  sound.playLevelUp();
                  onSelectClass(cls.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? "bg-purple-900/40 border-cyan-400 text-white shadow-lg"
                    : "bg-slate-950 border-purple-900/30 text-slate-300 hover:border-purple-500/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-purple-600/30 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm font-heading">{cls.title}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <span className="text-[11px] text-amber-300 font-bold block">{cls.bonus}</span>
                <p className="text-xs text-slate-400 leading-snug">{cls.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
