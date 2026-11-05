import React from "react";
import { SocialFooter } from "./SocialFooter";
import { Gamepad2, ShieldCheck, Heart, Mail, Phone } from "lucide-react";
import { useI18n } from "../lib/i18n";

interface FooterProps {
  onOpenLegal: (type: "terms" | "privacy" | "accessibility" | "about" | "disclaimer") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t, isRtl } = useI18n();

  return (
    <footer className={`mt-16 border-t border-purple-900/40 bg-slate-950/90 pt-12 pb-16 space-y-12 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Official Social Channels Block */}
        <SocialFooter />

        {/* Legal Disclaimer Strip */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300">⚖️ {t.footer_disclaimer_title}:</span>
            </div>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              {t.footer_disclaimer_desc}
            </p>
          </div>
          <button
            onClick={() => onOpenLegal("disclaimer")}
            className="text-amber-400 underline font-bold whitespace-nowrap hover:text-amber-300 cursor-pointer text-xs shrink-0 self-end sm:self-center"
          >
            {t.footer_read_full}
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-600 text-white">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-white font-heading">
                GOD MODE <span className="text-cyan-400">TRAVELER</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer_about}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-black text-white font-heading">{t.legal_btn}</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegal("disclaimer")}
                  className="hover:text-amber-300 text-amber-400 font-bold transition-colors cursor-pointer"
                >
                  {t.legal_btn} ⚖️
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("terms")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {t.footer_terms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {t.footer_privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("accessibility")}
                  className="hover:text-cyan-400 transition-colors text-cyan-400 font-bold cursor-pointer"
                >
                  {t.footer_accessibility}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("about")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {t.footer_company}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-black text-white font-heading">{t.footer_top_destinations}</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>🇯🇵 Tokyo & Akihabara (秋葉原)</li>
              <li>🇩🇪 Cologne (Gamescom Koelnmesse)</li>
              <li>🇰🇷 Seoul (LoL Park & PC Bangs)</li>
              <li>🇺🇸 Los Angeles (Universal & The Game Awards)</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-black text-white font-heading">{t.footer_customer_service}</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>support@godmodetraveler.com</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>WhatsApp 24/7 Global</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SSL 256-bit Encrypted</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© 2026-2027 God Mode Traveler Ltd. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <span>Built for gamers & wanderers</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
