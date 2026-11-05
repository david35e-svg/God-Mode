import React, { useState } from "react";
import { X, Camera, Check, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onPhotoUploaded,
}) => {
  const [captured, setCaptured] = useState(false);

  if (!isOpen) return null;

  const handleCapture = () => {
    sound.playLevelUp();
    setCaptured(true);
    setTimeout(() => {
      onPhotoUploaded();
      onClose();
      setCaptured(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-800/60 rounded-3xl p-6 space-y-5 text-center dir-rtl shadow-2xl">
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <h2 className="text-lg font-black text-white font-heading">מצלמת משימה (Quest Scanner)</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-800 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-64 rounded-2xl bg-black border border-purple-900/50 flex items-center justify-center overflow-hidden">
          {captured ? (
            <div className="space-y-2 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-emerald-400">התמונה אומתה בהצלחה! +350 XP</span>
            </div>
          ) : (
            <div className="space-y-2 text-slate-400">
              <Camera className="w-12 h-12 mx-auto text-cyan-400 animate-pulse" />
              <span className="text-xs block">כוון את המצלמה לפריט האספנות או המבנה</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCapture}
          disabled={captured}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          {captured ? "מעבד..." : "צלם ואמת משימה 📸"}
        </button>
      </div>
    </div>
  );
};
