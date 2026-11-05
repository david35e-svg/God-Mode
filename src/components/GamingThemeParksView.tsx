import React, { useState } from "react";
import { ThemePark } from "../types";
import { MOCK_THEME_PARKS } from "../data/mockData";
import { Sparkles, Star, MapPin, ExternalLink, Clock, Ticket } from "lucide-react";
import { sound } from "../lib/sound";

export const GamingThemeParksView: React.FC = () => {
  const [selectedPark, setSelectedPark] = useState<ThemePark | null>(null);

  return (
    <div className="space-y-8 text-right">
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>פארקי שעשועים, אטרקציות נינטנדו & מתחמי AR/VR</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          פארקי השעשועים של עולם הגיימינג
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          סופר נינטנדו וורלד, ג'ויפוליס של סגה ומגדל הרד טוקיו - כל האטרקציות החיות בעולם!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_THEME_PARKS.map((park) => (
          <div
            key={park.id}
            className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-purple-500/50 transition-all p-5 space-y-4"
          >
            <div className="space-y-3">
              <img src={park.imageUrl} alt={park.name} className="w-full h-44 object-cover rounded-2xl" />
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{park.flag} {park.city}, {park.country}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-mono font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{park.rating}</span>
                </span>
              </div>
              <h3 className="text-lg font-black text-white font-heading">{park.name}</h3>
              <p className="text-xs text-slate-300">{park.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {park.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-950 text-purple-300 text-[10px] font-bold border border-purple-800/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-mono font-bold">{park.admissionPrice}</span>
              <a
                href={park.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <span>אתר רשמי</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
