import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface TtsAudioButtonProps {
  textToSpeak: string;
  label?: string;
}

export const TtsAudioButton: React.FC<TtsAudioButtonProps> = ({
  textToSpeak,
  label = "הקראת תוכן",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "he-IL";
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
        isPlaying
          ? "bg-amber-500 text-slate-950 font-black animate-pulse"
          : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
      }`}
      title={label}
    >
      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
      <span className="hidden sm:inline">{isPlaying ? "עצור הקראה" : label}</span>
    </button>
  );
};
