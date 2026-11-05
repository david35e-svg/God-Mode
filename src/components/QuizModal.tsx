import React, { useState } from "react";
import { X, HelpCircle, Check, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizComplete: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onQuizComplete }) => {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isOpen) return null;

  const question = {
    text: "באיזו שנה הוקמה חברת נינטנדו בקיוטו, יפן?",
    options: ["1889 (כרטיסי הנופודה)", "1977 (Color TV-Game)", "1983 (Famicom)", "1989 (Game Boy)"],
    correct: 0,
  };

  const handleSelect = (idx: number) => {
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === question.correct) {
      sound.playLevelUp();
      setTimeout(() => {
        onQuizComplete();
        onClose();
      }, 1400);
    } else {
      sound.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-5 text-right dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white font-heading">חידון גיימינג (Gaming Trivia)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm font-bold text-white leading-relaxed">{question.text}</p>

        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full p-3 rounded-2xl text-xs font-bold text-right transition-all flex items-center justify-between cursor-pointer ${
                isAnswered
                  ? i === question.correct
                    ? "bg-emerald-600 text-white"
                    : i === selectedOpt
                    ? "bg-red-600 text-white"
                    : "bg-slate-950 text-slate-400"
                  : "bg-slate-950 text-slate-200 hover:bg-slate-800 border border-purple-900/30"
              }`}
            >
              <span>{opt}</span>
              {isAnswered && i === question.correct && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
