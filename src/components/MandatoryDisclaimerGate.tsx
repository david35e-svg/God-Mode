import React, { useState } from "react";
import { Scale, ShieldAlert, CheckCircle2, AlertTriangle, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { LanguageSelector } from "./LanguageSelector";

interface MandatoryDisclaimerGateProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const MandatoryDisclaimerGate: React.FC<MandatoryDisclaimerGateProps> = ({
  isOpen,
  onAccept,
}) => {
  const { t, isRtl } = useI18n();
  const [isChecked, setIsChecked] = useState(false);
  const [shakeWarning, setShakeWarning] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isChecked) {
      sound.playClick();
      setShakeWarning(true);
      setTimeout(() => setShakeWarning(false), 600);
      return;
    }
    sound.playLevelUp();
    onAccept();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-gate-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
    >
      <div
        className={`relative w-full max-w-3xl bg-slate-900/95 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-100 my-auto transition-transform ${
          isRtl ? "text-right dir-rtl" : "text-left dir-ltr"
        } shadow-[0_0_50px_rgba(245,158,11,0.25)] ${
          shakeWarning ? "animate-bounce" : ""
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  {t.gate_badge}
                </span>
              </div>
              <h2 id="legal-gate-title" className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                {t.gate_title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.gate_required}</span>
            </div>
            {/* Language Switcher inside the legal gate */}
            <LanguageSelector />
          </div>
        </div>

        {/* Legal Body - Scrollable */}
        <div className="rounded-2xl bg-slate-950/90 border border-purple-900/40 p-4 sm:p-6 max-h-[48vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans scrollbar-thin">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>{t.gate_intro}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading">
              {t.gate_p1_title}
            </h3>
            <p className="text-slate-300">{t.gate_p1_desc}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading">
              {t.gate_p2_title}
            </h3>
            <p className="text-slate-300">{t.gate_p2_desc}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading">
              {t.gate_p3_title}
            </h3>
            <p className="text-slate-300">{t.gate_p3_desc}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading">
              {t.gate_p4_title}
            </h3>
            <p className="text-slate-300">{t.gate_p4_desc}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading">
              {t.gate_p5_title}
            </h3>
            <p className="text-slate-300">{t.gate_p5_desc}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-black text-white font-heading text-amber-300">
              {t.gate_p6_title}
            </h3>
            <p className="text-slate-300">{t.gate_p6_desc}</p>
          </div>
        </div>

        {/* Checkbox Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-purple-800/50 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              id="mandatory-disclaimer-checkbox"
              checked={isChecked}
              onChange={(e) => {
                sound.playClick();
                setIsChecked(e.target.checked);
              }}
              className="mt-1 w-5 h-5 rounded-lg text-amber-500 bg-slate-900 border-2 border-amber-500/70 focus:ring-amber-400 focus:ring-offset-slate-900 cursor-pointer accent-amber-500 shrink-0"
            />
            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white leading-relaxed">
              {t.gate_checkbox}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.gate_logged_info}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!isChecked}
            className={`w-full sm:w-auto py-3.5 px-8 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              isChecked
                ? "bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-white shadow-amber-500/20 hover:scale-105 active:scale-95"
                : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-60 border border-slate-700"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.gate_accept_btn}</span>
            {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
