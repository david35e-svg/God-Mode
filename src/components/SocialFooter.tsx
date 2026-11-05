import React, { useState } from "react";
import {
  Tv,
  Video,
  Camera,
  Sparkles,
  ExternalLink,
  Check,
} from "lucide-react";
import { sound } from "../lib/sound";

export const SocialFooter: React.FC = () => {
  const [subscribedChan, setSubscribedChan] = useState<Record<string, boolean>>({});

  const toggleSubscribe = (platform: string) => {
    sound.playLevelUp();
    setSubscribedChan((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const socialChannels = [
    {
      id: "youtube",
      platform: "YouTube",
      handle: "@GodModeTraveler",
      name: "God Mode Traveler",
      url: "https://www.youtube.com/@godmodetraveler",
      icon: Tv,
      color: "from-red-600 to-rose-700 text-white",
      borderColor: "border-red-500/40",
      subscribers: "125K רשומים",
      description: "סרטוני תיירות גיימינג, וולוגים מיפן ותערוכות Gamescom",
    },
    {
      id: "tiktok",
      platform: "TikTok",
      handle: "@GodModeTraveler",
      name: "God Mode Traveler",
      url: "https://www.tiktok.com/@godmodetraveler",
      icon: Video,
      color: "from-slate-800 via-cyan-900 to-slate-900 text-white",
      borderColor: "border-cyan-400/40",
      subscribers: "240K עוקבים",
      description: "טיפים קצרים לגיימרים בחו\"ל, סודות Akihabara & Reels",
    },
    {
      id: "instagram",
      platform: "Instagram",
      handle: "@GodModeTraveler",
      name: "God Mode Traveler",
      url: "https://www.instagram.com/godmodetraveler",
      icon: Camera,
      color: "from-pink-600 via-purple-600 to-amber-500 text-white",
      borderColor: "border-pink-400/40",
      subscribers: "98K עוקבים",
      description: "תמונות סייברפאנק מרהיבות, סטוריז בלייב מטורנירים",
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-900/40 shadow-2xl space-y-5 dir-rtl text-right">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-900/30 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-base font-heading">
              הרשתות החברתיות הרשמיות של God Mode Traveler
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              הצטרפו לקהילת תיירות הגיימינג הגדולה בישראל בערוצים הרשמיים שלנו
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30 shrink-0">
          #GodModeTraveler
        </span>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {socialChannels.map((channel) => {
          const Icon = channel.icon;
          const isSubbed = subscribedChan[channel.id];

          return (
            <div
              key={channel.id}
              className={`p-4 rounded-2xl bg-slate-950 border ${channel.borderColor} hover:border-purple-400/60 transition-all flex flex-col justify-between space-y-3 group shadow-md`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-tr ${channel.color} shadow-md`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block font-heading">
                        {channel.name}
                      </span>
                      <span className="text-[11px] text-cyan-400 font-mono font-bold">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-amber-400 font-mono bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {channel.subscribers}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-snug">
                  {channel.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 border-t border-slate-900">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-purple-500/30"
                >
                  <span>מעבר לערוץ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => toggleSubscribe(channel.id)}
                  className={`py-2 px-3 rounded-xl font-black text-xs flex items-center gap-1 transition-all cursor-pointer ${
                    isSubbed
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {isSubbed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>רשום!</span>
                    </>
                  ) : (
                    <span>עקוב</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
