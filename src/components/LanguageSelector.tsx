import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n, LANGUAGES, Language } from "../lib/i18n";
import { sound } from "../lib/sound";

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    sound.playClick();
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-purple-800/40 text-slate-200 hover:text-white hover:border-cyan-400/50 hover:bg-slate-800 transition-all cursor-pointer text-xs font-semibold shadow-sm"
        title="Change Language / החלף שפה"
        aria-label="Language selector"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-sm leading-none">{currentOption.flag}</span>
        {!compact && <span className="hidden sm:inline text-xs font-bold">{currentOption.label}</span>}
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900/95 border border-purple-800/60 shadow-2xl backdrop-blur-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-purple-900/40 text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
            Select Language / בחר שפה
          </div>
          {LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              onClick={() => handleSelect(opt.code)}
              className={`w-full px-3 py-2 text-xs flex items-center justify-between hover:bg-purple-900/40 transition-colors cursor-pointer ${
                language === opt.code
                  ? "text-cyan-400 font-bold bg-purple-950/50"
                  : "text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{opt.flag}</span>
                <span>{opt.label}</span>
              </div>
              {language === opt.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
