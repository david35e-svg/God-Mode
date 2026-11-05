import React, { useState } from "react";
import {
  Eye,
  Type,
  Sun,
  MousePointer,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  X,
  Sliders,
} from "lucide-react";
import { sound } from "../lib/sound";

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const applyTextSize = (size: "normal" | "large" | "xlarge") => {
    setTextSize(size);
    document.documentElement.classList.remove("text-size-large", "text-size-xlarge");
    if (size === "large") document.documentElement.classList.add("text-size-large");
    if (size === "xlarge") document.documentElement.classList.add("text-size-xlarge");
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.classList.toggle("high-contrast-mode", next);
  };

  const toggleHighlightLinks = () => {
    const next = !highlightLinks;
    setHighlightLinks(next);
    document.documentElement.classList.toggle("highlight-links-mode", next);
  };

  const toggleReadableFont = () => {
    const next = !readableFont;
    setReadableFont(next);
    document.documentElement.classList.toggle("readable-font-mode", next);
  };

  const toggleAnimations = () => {
    const next = !stopAnimations;
    setStopAnimations(next);
    document.documentElement.classList.toggle("stop-animations-mode", next);
  };

  const toggleSoundMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const resetAll = () => {
    applyTextSize("normal");
    setHighContrast(false);
    document.documentElement.classList.remove("high-contrast-mode");
    setHighlightLinks(false);
    document.documentElement.classList.remove("highlight-links-mode");
    setReadableFont(false);
    document.documentElement.classList.remove("readable-font-mode");
    setStopAnimations(false);
    document.documentElement.classList.remove("stop-animations-mode");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(true);
          }}
          className="p-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-2xl flex items-center gap-2 transition-transform hover:scale-110 cursor-pointer border-2 border-cyan-200"
          aria-label="פתח תפריט נגישות"
        >
          <Eye className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">נגישות</span>
        </button>
      ) : (
        <div className="w-80 rounded-3xl bg-slate-900 border border-cyan-500/40 p-5 shadow-2xl space-y-4 text-right dir-rtl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <h4 className="font-black text-sm text-white font-heading">
                תפריט נגישות והתאמה
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Text Size */}
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">גודל טקסט:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["normal", "large", "xlarge"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => applyTextSize(s)}
                    className={`py-1.5 rounded-xl font-bold transition-all ${
                      textSize === s
                        ? "bg-cyan-500 text-slate-950 font-black"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {s === "normal" ? "רגיל" : s === "large" ? "גדול" : "ענק"}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <button
              onClick={toggleHighContrast}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold ${
                highContrast ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span>ניגודיות גבוהה</span>
              </span>
              <span>{highContrast ? "פעיל" : "כבוי"}</span>
            </button>

            {/* Highlight Links */}
            <button
              onClick={toggleHighlightLinks}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold ${
                highlightLinks ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                <span>הדגשת קישורים</span>
              </span>
              <span>{highlightLinks ? "פעיל" : "כבוי"}</span>
            </button>

            {/* Readable Font */}
            <button
              onClick={toggleReadableFont}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold ${
                readableFont ? "bg-purple-600 text-white font-black" : "bg-slate-800 text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                <span>גופן קריא במיוחד</span>
              </span>
              <span>{readableFont ? "פעיל" : "כבוי"}</span>
            </button>

            {/* Stop Animations */}
            <button
              onClick={toggleAnimations}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold ${
                stopAnimations ? "bg-red-500 text-white font-black" : "bg-slate-800 text-slate-300"
              }`}
            >
              <span>עצירת הבהובים ואנימציות</span>
              <span>{stopAnimations ? "פעיל" : "כבוי"}</span>
            </button>

            {/* Mute Audio FX */}
            <button
              onClick={toggleSoundMute}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold ${
                isMuted ? "bg-red-500/30 text-red-300 border border-red-500/40" : "bg-slate-800 text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>צלילי מערכת (Audio FX)</span>
              </span>
              <span>{isMuted ? "מושתק" : "פעיל"}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={resetAll}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>איפוס הגדרות</span>
            </button>

            <span className="text-[10px] text-cyan-400 font-mono">תקן נגישות AA</span>
          </div>
        </div>
      )}
    </div>
  );
};
