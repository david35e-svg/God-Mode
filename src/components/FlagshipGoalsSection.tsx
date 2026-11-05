import React from "react";
import { ShieldCheck, MapPin, Sparkles, Trophy, Users, HeartHandshake } from "lucide-react";

export const FlagshipGoalsSection: React.FC = () => {
  const goals = [
    {
      icon: Trophy,
      title: "גישה בלעדית לטורנירים עולמיים",
      desc: "כרטיסים מובטחים לאליפויות עולם ב-CS2, LoL, Valorant ומתחמי VIP ב-Gamescom.",
      color: "from-amber-500 to-red-500 text-amber-300",
    },
    {
      icon: MapPin,
      title: "ספוטים סודיים של מקומיים",
      desc: "סיורים מודרכים לקומות נסתרות של Super Potato, ברי גיימינג מחתרתיים ומסעדות אנימה.",
      color: "from-cyan-500 to-blue-500 text-cyan-300",
    },
    {
      icon: HeartHandshake,
      title: "הדרכה וליווי בעברית 24/7",
      desc: "מדריכי שטח ישראלים דוברי יפנית ואנגלית שדואגים לכל פרט מהטיסה ועד המתקנים.",
      color: "from-purple-500 to-pink-500 text-purple-300",
    },
  ];

  return (
    <div className="space-y-6 text-right">
      <div className="text-center sm:text-right space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
          למה לטוס עם God Mode Traveler?
        </h2>
        <p className="text-xs text-slate-400">
          חוויית תיירות גיימינג ייחודית שנבנתה מאפס במיוחד עבור שחקנים
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((g, i) => {
          const Icon = g.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-3xl bg-slate-900 border border-purple-900/30 shadow-xl space-y-3"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${g.color} p-2 shadow-lg`}>
                <Icon className="w-full h-full text-slate-950" />
              </div>
              <h3 className="text-base font-black text-white font-heading">{g.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{g.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
