import React from "react";
import { EsportsEvent } from "../types";
import { MOCK_EVENTS } from "../data/mockData";
import { Trophy, Calendar, MapPin, Flame, ExternalLink, Compass, Users, ArrowUpRight } from "lucide-react";
import { sound } from "../lib/sound";

interface EventsViewProps {
  onOpenEventModal: (event: EsportsEvent) => void;
  onBuildTripForEvent?: (eventId: string) => void;
  onViewEventPage?: (event: EsportsEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  onOpenEventModal,
  onBuildTripForEvent,
  onViewEventPage,
}) => {
  return (
    <div className="space-y-8 text-right">
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/40 inline-flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-red-400" />
          <span>אירועי eSports & תערוכות גיימינג 2026-2027</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          לוח טורנירים, תערוכות וחוליות טסים
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          אליפויות עולם ב-CS2, LoL, Valorant ו-Gamescom בשידור חי — ראה מי מהקהילה טס, תכנן את הטיול סביב האירוע והבטח כרטיסים רשמיים.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_EVENTS.map((event) => (
          <div
            key={event.id}
            className="rounded-3xl border border-purple-900/40 bg-slate-900 overflow-hidden shadow-2xl p-5 space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="relative h-44 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => {
                  sound.playClick();
                  if (onViewEventPage) {
                    onViewEventPage(event);
                  } else {
                    onOpenEventModal(event);
                  }
                }}
              >
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1 shadow-lg">
                  <Flame className="w-3.5 h-3.5" />
                  <span>עוד {event.countdownDays} ימים!</span>
                </span>
                <span className="absolute bottom-3 left-3 bg-slate-950/90 text-cyan-300 font-mono text-[10px] px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  {event.attendance} משתתפים
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400 font-bold block">{event.gameName}</span>
                  {onViewEventPage && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onViewEventPage(event);
                      }}
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                    >
                      <span>עמוד אירוע מלא</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <h3
                  onClick={() => {
                    sound.playClick();
                    if (onViewEventPage) {
                      onViewEventPage(event);
                    } else {
                      onOpenEventModal(event);
                    }
                  }}
                  className="text-lg font-black text-white font-heading cursor-pointer hover:text-cyan-300 transition-colors"
                >
                  {event.title}
                </h3>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{event.flag} {event.venue}, {event.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{event.dates}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-amber-300 font-bold">{event.prizePool}</span>

              <div className="flex items-center gap-2">
                {onBuildTripForEvent && (
                  <button
                    onClick={() => {
                      sound.playLevelUp();
                      onBuildTripForEvent(event.id);
                    }}
                    className="py-2 px-3 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 font-bold text-xs cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>בנה טיול</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenEventModal(event);
                  }}
                  className="py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>מי טס לשם? & כרטיסים</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
