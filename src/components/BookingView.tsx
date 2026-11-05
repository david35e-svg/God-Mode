import React, { useState } from "react";
import { Check, ShieldCheck, CreditCard, Send, Cloud, Loader2 } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { submitInquiryToFirebase, auth } from "../lib/firebase";

interface BookingViewProps {
  initialPackage?: string;
}

export const BookingView: React.FC<BookingViewProps> = ({ initialPackage = "" }) => {
  const { t, isRtl, language } = useI18n();
  const [selectedPkg, setSelectedPkg] = useState(initialPackage);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelersCount, setTravelersCount] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firebaseDocId, setFirebaseDocId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docId = await submitInquiryToFirebase({
        fullName,
        email,
        phone,
        selectedPkg: selectedPkg || "General Inquiry",
        travelersCount,
        language,
        userId: auth.currentUser?.uid || "guest",
      });
      setFirebaseDocId(docId);
      sound.playLevelUp();
      setSubmitted(true);
    } catch (error) {
      console.error("Firestore submission error:", error);
      // Even if offline, show confirmation to the user and play sound
      sound.playLevelUp();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-8 max-w-3xl mx-auto ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 inline-flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.booking_badge}</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          {t.booking_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.booking_subtitle}
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-emerald-950/60 border border-emerald-500/50 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="text-2xl font-black text-white font-heading">{t.booking_success_title}</h2>
          <p className="text-xs sm:text-sm text-emerald-200">
            {t.booking_success_desc}
          </p>

          {firebaseDocId && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Firebase Ref: {firebaseDocId}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              {t.booking_another_btn}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-900/40 shadow-2xl space-y-5"
        >
          {/* Legal Notice in form */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] sm:text-xs text-amber-300 space-y-1">
            <strong className="block font-black text-amber-200">{t.booking_legal_alert_title}</strong>
            <p>{t.booking_legal_alert_desc}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">{t.booking_package_label}</label>
            <input
              type="text"
              placeholder="e.g. Tokyo Cyberpunk VIP / Gamescom Cologne"
              value={selectedPkg}
              onChange={(e) => setSelectedPkg(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.booking_name_label}</label>
              <input
                type="text"
                placeholder="John Doe / ישראל ישראלי"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.booking_phone_label}</label>
              <input
                type="tel"
                placeholder="+1 555-0199 / 050-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.booking_email_label}</label>
              <input
                type="email"
                placeholder="gamer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.booking_travelers_label}</label>
              <select
                value={travelersCount}
                onChange={(e) => setTravelersCount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="1">{t.booking_travelers_1}</option>
                <option value="2">{t.booking_travelers_2}</option>
                <option value="4">{t.booking_travelers_4}</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.booking_footer_note}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto py-3 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.booking_submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.booking_submit_btn}</span>
                  <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
