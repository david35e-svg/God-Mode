import React from "react";
import { PlaneTakeoff } from "lucide-react";
import { useI18n } from "../lib/i18n";

export const FlapBoard: React.FC = () => {
  const { isRtl } = useI18n();

  const flights = [
    { code: "GMT-777", dest: "TOKYO (NRT)", city: isRtl ? "טוקיו & אקיהברה" : "Tokyo & Akihabara", time: "11:45", gate: "B12", status: "BOARDING" },
    { code: "GMT-202", dest: "COLOGNE (CGN)", city: isRtl ? "קלן (Gamescom)" : "Cologne (Gamescom)", time: "14:20", gate: "A04", status: "ON TIME" },
    { code: "GMT-505", dest: "SEOUL (ICN)", city: isRtl ? "סיאול (LoL Park)" : "Seoul (LoL Park)", time: "18:00", gate: "C08", status: "EXPEDITION" },
    { code: "GMT-909", dest: "LOS ANGELES (LAX)", city: isRtl ? "לוס אנג'לס (Universal)" : "Los Angeles (Universal)", time: "22:15", gate: "D02", status: "SCHEDULED" },
  ];

  return (
    <div className={`rounded-3xl bg-slate-950 border border-purple-900/50 p-6 shadow-2xl space-y-4 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="w-5 h-5 text-cyan-400" />
          <h3 className="font-black text-sm text-white font-heading tracking-wide">
            {isRtl ? "לוח טיסות ומשלחות גיימינג בלייב (FLIGHT BOARD)" : "LIVE GAMING FLIGHT & EXPEDITION BOARD"}
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
          ● LIVE GATE
        </span>
      </div>

      <div className="divide-y divide-slate-800 font-mono text-xs overflow-x-auto">
        {flights.map((f, i) => (
          <div key={i} className="py-3 flex items-center justify-between gap-4 min-w-[500px]">
            <span className="text-cyan-400 font-bold w-20">{f.code}</span>
            <span className="text-white font-bold flex-1">{f.dest} - <span className="text-slate-300 font-sans">{f.city}</span></span>
            <span className="text-amber-300 w-16">{f.time}</span>
            <span className="text-purple-300 w-16">GATE {f.gate}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              f.status === "BOARDING" ? "bg-emerald-500 text-slate-950 font-black animate-pulse" : "bg-slate-900 text-cyan-300 border border-slate-700"
            }`}>
              {f.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-purple-900/30 text-[10px] text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <span>
          {isRtl
            ? "* לוח טיסות להמחשת מועדי כנסים ויעדים. האתר אינו מוכר טיסות ואינו אחראי על שינויים או ביטולים."
            : "* Informational flight board for gaming expos. Site does not sell flights and bears no cancellation liability."}
        </span>
        <span className="text-amber-400/80">
          Affiliate Disclosure: {isRtl ? "קישורי הפניה עשויים לכלול עמלת שותפים ללא עלות נוספת" : "Referral links may yield affiliate commissions at no extra cost"}
        </span>
      </div>
    </div>
  );
};
