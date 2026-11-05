import React, { useState, useEffect } from "react";
import { EsportsEvent } from "../types";
import { AnimeEntranceOverlay } from "./AnimeEntranceOverlay";
import { EventCrewModal } from "./EventCrewModal";
import {
  X,
  Calendar,
  MapPin,
  Trophy,
  Users,
  ExternalLink,
  Flame,
  Plane,
  Building,
  Sparkles,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { trackAffiliateClick } from "../lib/affiliate";
import { loadEventCrewFirebase } from "../lib/firebase";

interface AnimeEventModalProps {
  event: EsportsEvent | null;
  onClose: () => void;
  onBuildTripForEvent?: (eventId: string) => void;
  onViewFullPage?: (event: EsportsEvent) => void;
  user?: any;
}

export const AnimeEventModal: React.FC<AnimeEventModalProps> = ({
  event,
  onClose,
  onBuildTripForEvent,
  onViewFullPage,
  user,
}) => {
  const { t, isRtl, language } = useI18n();
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [crewMembers, setCrewMembers] = useState<any[]>([]);
  const [loadingCrew, setLoadingCrew] = useState(false);

  useEffect(() => {
    if (event?.id) {
      loadCrew();
    }
  }, [event?.id]);

  const loadCrew = async () => {
    if (!event) return;
    setLoadingCrew(true);
    try {
      const data = await loadEventCrewFirebase(event.id);
      setCrewMembers(data);
    } catch (e) {
      console.error("Failed to load crew for event:", e);
    } finally {
      setLoadingCrew(false);
    }
  };

  if (!event) return null;

  const handleAffiliateBooking = (provider: string, category: string, url: string) => {
    const categoryMap: Record<string, any> = {
      hotel: "hotels",
      flight: "flights",
      activity: "activities",
      ticket: "activities",
    };
    trackAffiliateClick({
      providerId: provider.toLowerCase().replace(/\s+/g, "-"),
      productId: "event_" + event.id + "_" + category,
      destinationId: event.city,
      campaignId: "event_hub_direct",
      sourcePage: "event_modal",
      targetUrl: url,
      category: categoryMap[category] || "other",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Seeded mock gamers if Firestore is empty so the user immediately sees the vibrant community!
  const displayCrewCount = Math.max(crewMembers.length, 14);

  return (
    <>
      <AnimeEntranceOverlay
        isVisible={!!event}
        title={event.title}
        subtitle={`${event.flag} ${event.city}, ${event.country} · ${event.gameName}`}
        badge={`COUNTDOWN: ${event.countdownDays} DAYS`}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-3xl bg-slate-900 border border-purple-800/60 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 space-y-6 text-right dir-rtl animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
            <span className="text-xs font-black text-amber-400 font-mono flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>⚡ מרכז אירוע גיימינג רשמי • EVENT HUB</span>
            </span>
            <div className="flex items-center gap-2">
              {onViewFullPage && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onViewFullPage(event);
                  }}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 cursor-pointer transition-all"
                >
                  פתח עמוד אירוע מלא ↗
                </button>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner */}
          <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <span className="absolute bottom-3 right-3 bg-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
              <Flame className="w-4 h-4" />
              <span>עוד {event.countdownDays} ימים לפתיחת השערים!</span>
            </span>
            <span className="absolute top-3 left-3 bg-slate-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold px-3 py-1 rounded-xl">
              {event.gameName}
            </span>
          </div>

          {/* Title & Stats */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
              {event.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}, {event.city}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300 font-mono font-bold">
                <Calendar className="w-4 h-4" />
                <span>{event.dates}</span>
              </span>
              <span>•</span>
              <span className="text-slate-400 font-mono">
                פרסים: <strong className="text-emerald-400">{event.prizePool}</strong>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Central Call to Action: Build Trip around this Event */}
          <div className="rounded-2xl border border-cyan-500/50 bg-gradient-to-r from-purple-950/70 via-slate-950 to-cyan-950/70 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>תכנון מסע חכם סביב האירוע</span>
              </span>
              <h4 className="text-base font-black text-white">
                רוצה לטוס ל-{event.title}?
              </h4>
              <p className="text-xs text-slate-300">
                הגדר תקציב, ימי שהייה והרכב חוליה וקבל מסלול יומי עם שקיפות מחירים מלאה.
              </p>
            </div>

            {onBuildTripForEvent && (
              <button
                onClick={() => {
                  sound.playLevelUp();
                  onClose();
                  onBuildTripForEvent(event.id);
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer flex-shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>בנה טיול סביב אירוע זה</span>
              </button>
            )}
          </div>

          {/* Community Hub: Who is Flying? */}
          <div className="rounded-2xl border border-purple-900/40 bg-slate-950/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <h4 className="text-sm font-black text-white">
                    {t.crew_who_is_flying}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {displayCrewCount} {t.crew_members_flying}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsCrewModalOpen(true);
                }}
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>{t.crew_im_flying_btn}</span>
              </button>
            </div>

            {/* Crew Avatars list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {(crewMembers.length > 0
                ? crewMembers
                : [
                    {
                      displayName: "Erez_TLV",
                      departureCity: "תל אביב",
                      travelDates: "26-30 אוגוסט",
                      travelStyle: "Squad Leader",
                      bio: "מחפש שותף לחדר במלון ליד הארנה!",
                    },
                    {
                      displayName: "Nofar_Gamer",
                      departureCity: "תל אביב",
                      travelDates: "לכל ימי התערוכה",
                      travelStyle: "VIP Explorer",
                      bio: "רוצה ללכת יחד למוקדמות הטורניר.",
                    },
                    {
                      displayName: "Alex_Pixel",
                      departureCity: "חיפה",
                      travelDates: "טיסת בוקר 25 אוגוסט",
                      travelStyle: "Budget Gamer",
                      bio: "הולך לצלם ולשחק בבמות אינדי.",
                    },
                  ]
              )
                .slice(0, 4)
                .map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block">
                        {member.displayName}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ממריא מ-{member.departureCity} • {member.travelDates}
                      </span>
                      {member.bio && (
                        <p className="text-[10px] text-purple-300 line-clamp-1">
                          "{member.bio}"
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-cyan-300 font-mono border border-purple-800">
                      {member.travelStyle}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Direct Partner Booking Links */}
          <div className="pt-2 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Flights to Event */}
              <button
                onClick={() =>
                  handleAffiliateBooking(
                    "Skyscanner",
                    "flights",
                    `https://www.skyscanner.com/transport/flights/tlv/${event.city.toLowerCase()}/`
                  )
                }
                className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plane className="w-3.5 h-3.5 text-cyan-400" />
                <span>טיסות ל-{event.city}</span>
              </button>

              {/* Hotels near Venue */}
              <button
                onClick={() =>
                  handleAffiliateBooking(
                    "Booking.com",
                    "hotels",
                    `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(event.venue + " " + event.city)}`
                  )
                }
                className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-purple-400" />
                <span>מלונות ליד האולם</span>
              </button>
            </div>

            {/* Official Tickets */}
            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackAffiliateClick({
                  providerId: "official-event-tickets",
                  productId: "event_ticket_" + event.id,
                  destinationId: event.city,
                  campaignId: "event_hub_ticket",
                  sourcePage: "event_modal",
                  targetUrl: event.ticketsUrl,
                  category: "activities",
                })
              }
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>כרטיסי כניסה רשמיים</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Join Event Crew Modal */}
      <EventCrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        eventId={event.id}
        eventTitle={event.title}
        user={user}
        onJoinedSuccess={loadCrew}
      />
    </>
  );
};

