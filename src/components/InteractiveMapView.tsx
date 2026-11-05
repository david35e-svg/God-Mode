import React, { useState } from "react";
import { MOCK_DESTINATIONS, MOCK_SECRET_SPOTS } from "../data/mockData";
import { MapPin, Navigation, Compass, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

export const InteractiveMapView: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<string>("tokyo");

  return (
    <div className="space-y-8 text-right">
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 inline-flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>מפת עולם אינטראקטיבית לגיימרים</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          נקודות ציון וספוטים גלובליים
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          נווט בין מוקדי הגיימינג המרכזיים בעולם וגלה היכן נמצאים הארקיידים, הזירות וחנויות הרטרו.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-slate-900 border border-purple-900/40 p-4 shadow-2xl relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 text-center space-y-4 p-6 bg-slate-950/80 rounded-2xl border border-purple-900/40 backdrop-blur-md max-w-md">
            <Navigation className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white font-heading">
              מערכת ניווט עולמית בטעינה
            </h3>
            <p className="text-xs text-slate-300">
              בחר יעד מהרשימה כדי לצפות בקואורדינטות, זמן טיסה ממוצע מנתב"ג ורשימת ספוטים חמים.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-900/50 text-purple-300 text-xs font-mono">
              <span>GPS: 35.6762° N, 139.6503° E</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-black text-white font-heading">יעדים פעילים במפה:</h4>
          {MOCK_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                sound.playClick();
                setSelectedSpot(dest.id);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedSpot === dest.id
                  ? "bg-purple-900/40 border-cyan-400 text-white"
                  : "bg-slate-900 border-purple-900/30 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{dest.flag} {dest.name}</span>
                <span className="text-[10px] font-mono text-cyan-300">{dest.hotspotsCount} ספוטים</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{dest.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
