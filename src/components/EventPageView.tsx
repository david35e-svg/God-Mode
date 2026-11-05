import React, { useState, useEffect } from "react";
import {
  Trophy,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Plane,
  Building,
  Gamepad2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Compass,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import { EsportsEvent, EventCrewMember } from "../types";
import { useI18n } from "../lib/i18n";
import { sound } from "../lib/sound";
import { trackAffiliateClick } from "../lib/affiliate";
import { loadEventCrewFirebase, auth } from "../lib/firebase";
import { EventCrewModal } from "./EventCrewModal";

interface EventPageViewProps {
  event: EsportsEvent;
  onBack: () => void;
  onBuildTrip: (eventId: string) => void;
}

export const EventPageView: React.FC<EventPageViewProps> = ({
  event,
  onBack,
  onBuildTrip,
}) => {
  const { isRtl } = useI18n();
  const [crewMembers, setCrewMembers] = useState<EventCrewMember[]>([]);
  const [loadingCrew, setLoadingCrew] = useState<boolean>(true);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState<boolean>(false);

  const fetchCrew = async () => {
    setLoadingCrew(true);
    try {
      const data = await loadEventCrewFirebase(event.id);
      setCrewMembers(data as EventCrewMember[]);
    } catch (err) {
      console.error("Failed to load event crew:", err);
    } finally {
      setLoadingCrew(false);
    }
  };

  useEffect(() => {
    fetchCrew();
  }, [event.id]);

  const handleAffiliate = (provider: string, category: string, url: string) => {
    sound.playClick();
    const categoryMap: Record<string, any> = {
      hotel: "hotels",
      flight: "flights",
      activity: "activities",
      ticket: "activities",
    };
    trackAffiliateClick({
      providerId: provider.toLowerCase().replace(/\s+/g, "-"),
      productId: `event_page_${category}_${event.id}`,
      destinationId: `${event.city}, ${event.country}`,
      campaignId: "event_deep_page",
      sourcePage: "event_page",
      targetUrl: url,
      category: categoryMap[category] || "other",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Curated spots per city
  const citySpots =
    event.city.includes("קלן")
      ? [
          { name: "Meltdown Cologne", type: "Esports Bar", tip: "בר גיימינג עם מסכי ענק וקוקטיילים בנושאי משחקים" },
          { name: "Retro Store Ehrenfeld", type: "Retro Shop", tip: "קונסולות נדירות ומציאות וינטג' משנות ה-90" },
        ]
      : event.city.includes("טוקיו")
      ? [
          { name: "Super Potato Akihabara", type: "Retro Temple", tip: "5 קומות של קונסולות, משחקים וארקייד סודי" },
          { name: "GiGO Arcade Center", type: "Modern Arcade", tip: "עמדות קצב, VR ומכונות בובות יפניות" },
        ]
      : [
          { name: "T1 Base Camp (Hongdae)", type: "Esports PC Bang", tip: "מתחם הגיימינג המתקדם בעולם של פייקר וקבוצת T1" },
          { name: "LoL PARK & LCK Arena", type: "Tournament Arena", tip: "ארנת הליגה הקוריאנית עם חנות Riot Games הרשמית" },
        ];

  return (
    <div className={`space-y-8 max-w-5xl mx-auto ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Back button */}
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{isRtl ? "חזרה לכל אירועי הגיימינג" : "Back to all gaming events"}</span>
      </button>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-800/50 shadow-2xl bg-slate-950">
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/50 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{event.gameName}</span>
            </span>

            <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold backdrop-blur-md">
              {event.ticketsStatus}
            </span>
          </div>

          {/* Bottom Title & Actions */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <span className="text-xs font-mono text-purple-300 flex items-center gap-2">
              <span className="text-xl">{event.flag}</span>
              <span className="font-bold">{event.city}, {event.country}</span>
              <span>•</span>
              <span className="text-slate-300">{event.venue}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playLevelUp();
                  onBuildTrip(event.id);
                }}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm flex items-center gap-2 cursor-pointer shadow-xl shadow-purple-600/30 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>{isRtl ? "בנה טיול מלא סביב אירוע זה" : "Build Trip for this Event"}</span>
              </button>

              <button
                onClick={() => setIsCrewModalOpen(true)}
                className="py-3 px-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isRtl ? "הצטרף לחוליית האירוע" : "Join Event Squad"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Details & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description & Highlights */}
          <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-xl font-black text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{isRtl ? "על האירוע ולמה שווה לטוס" : "About the Event"}</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-900/40 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">תאריכים:</span>
                <span className="font-bold text-white font-mono">{event.dates}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">קופה / פרסים:</span>
                <span className="font-bold text-amber-300 font-mono">{event.prizePool}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">קהל בארנה:</span>
                <span className="font-bold text-cyan-300">{event.attendance}</span>
              </div>
            </div>
          </div>

          {/* Teams / Studios */}
          {event.participatingTeams && event.participatingTeams.length > 0 && (
            <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 shadow-xl space-y-3">
              <span className="text-xs font-bold text-slate-400 block">
                {isRtl ? "קבוצות ומועדוני עילית משתתפים:" : "Participating Teams & Studios:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {event.participatingTeams.map((team, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-purple-800/40 text-purple-200 text-xs font-mono font-bold"
                  >
                    ⚔️ {team}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gamer Spots near the venue */}
          <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-lg font-black text-white font-heading flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-purple-400" />
              <span>{isRtl ? `ספוטים של גיימרים ב${event.city}` : `Gamer Spots in ${event.city}`}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {citySpots.map((spot, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{spot.name}</span>
                    <span className="text-[10px] text-purple-300 font-mono">{spot.type}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{spot.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 col: Affiliate Booking & Community Crew */}
        <div className="space-y-6">
          {/* Direct Affiliate Booking Box */}
          <div className="rounded-3xl border border-purple-800/40 bg-slate-900 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-black text-white font-heading">
              {isRtl ? "הזמנת נסיעות ומלונות ליעד" : "Travel & Stays"}
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() =>
                  handleAffiliate(
                    "Booking.com",
                    "hotel",
                    `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
                      event.venue + " " + event.city
                    )}`
                  )
                }
                className="w-full py-3 px-4 rounded-2xl bg-purple-950/70 hover:bg-purple-900 border border-purple-700/50 text-white font-bold text-xs flex items-center justify-between cursor-pointer transition-all active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-400" />
                  <span>מלונות ליד {event.venue}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
              </button>

              <button
                onClick={() =>
                  handleAffiliate(
                    "Skyscanner",
                    "flight",
                    `https://www.skyscanner.com/transport/flights/tlv/${encodeURIComponent(
                      event.city.toLowerCase()
                    )}/`
                  )
                }
                className="w-full py-3 px-4 rounded-2xl bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-700/50 text-white font-bold text-xs flex items-center justify-between cursor-pointer transition-all active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-cyan-400" />
                  <span>טיסות ל{event.city}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
              </button>

              <button
                onClick={() => window.open(event.ticketsUrl, "_blank", "noopener,noreferrer")}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-white font-bold text-xs flex items-center justify-between cursor-pointer transition-all active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span>כרטיסים רשמיים לארנה</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>

            <p className="text-[10px] text-slate-500 leading-tight">
              הקישורים מובילים לספקי נסיעות מורשים. כל ההזמנות מתבצעות ומאובטחות ישירות באתרי השותפים.
            </p>
          </div>

          {/* Who is flying? Event Crew Box */}
          <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white font-heading flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>{isRtl ? "חוליית האירוע (מי טס?)" : "Event Crew"}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                {crewMembers.length}
              </span>
            </div>

            {loadingCrew ? (
              <div className="text-xs text-slate-500 animate-pulse text-center py-4">
                טוען חברי חוליה...
              </div>
            ) : crewMembers.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <p className="text-xs text-slate-400">
                  היה הראשון להירשם לחוליה שטסה ל{event.title}!
                </p>
                <button
                  onClick={() => setIsCrewModalOpen(true)}
                  className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer"
                >
                  הירשם עכשיו לחוליה
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {crewMembers.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{member.displayName}</span>
                      <span className="text-[11px] text-slate-400">
                        {member.departureCity} • {member.travelStyle}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">
                      {member.travelDates}
                    </span>
                  </div>
                ))}

                <button
                  onClick={() => setIsCrewModalOpen(true)}
                  className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-cyan-400 cursor-pointer transition-colors"
                >
                  + הצטרף לחוליה זו
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal to join crew */}
      <EventCrewModal
        isOpen={isCrewModalOpen}
        onClose={() => {
          setIsCrewModalOpen(false);
          fetchCrew();
        }}
        eventId={event.id}
        eventTitle={event.title}
        user={auth.currentUser}
      />
    </div>
  );
};
