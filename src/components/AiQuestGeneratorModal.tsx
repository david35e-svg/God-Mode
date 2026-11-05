import React, { useState } from "react";
import { X, Sparkles, Wand2, Send } from "lucide-react";
import { sound } from "../lib/sound";

interface AiQuestGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestGenerated: (title: string, xp: number) => void;
}

export const AiQuestGeneratorModal: React.FC<AiQuestGeneratorModalProps> = ({
  isOpen,
  onClose,
  onQuestGenerated,
}) => {
  const [city, setCity] = useState("טוקיו");
  const [pref, setPref] = useState("רטרו וארקיידים");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    sound.playClick();

    setTimeout(() => {
      sound.playLevelUp();
      setIsGenerating(false);
      onQuestGenerated(`מסע ציד סודי: מצא 2 מכונות סגה נדירות ב-${city}`, 450);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-5 text-right dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white font-heading">מחולל משימות AI (AI Quest Gen)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-bold">בחר עיר יעד:</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs"
            >
              <option value="טוקיו">טוקיו, יפן</option>
              <option value="קלן">קלן, גרמניה</option>
              <option value="סיאול">סיאול, דרום קוריאה</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-bold">סגנון משימה מועדף:</label>
            <input
              type="text"
              value={pref}
              onChange={(e) => setPref(e.target.value)}
              placeholder="למשל: ספורט אלקטרוני, שופינג אוכל רחוב"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs"
            >
            </input>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          {isGenerating ? "מחולל משימה חכמה..." : "צור משימה אישית ✨"}
        </button>
      </div>
    </div>
  );
};
