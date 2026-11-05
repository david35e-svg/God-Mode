import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plane,
  Calendar,
  Users,
  DollarSign,
  Compass,
  CheckCircle2,
  ExternalLink,
  Save,
  Share2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Gamepad2,
  Building,
  Ticket,
  Train,
  Coffee,
} from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { trackAffiliateClick } from "../lib/affiliate";
import { saveTripToFirebase } from "../lib/firebase";
import { Trip, TripItineraryDay, TripCostBreakdown, TripAffiliateLink, AffiliateCategory } from "../types";
import { MOCK_EVENTS as EVENTS } from "../data/mockData";

interface GamerTripBuilderProps {
  user?: any;
  initialEventId?: string | null;
  onTripSaved?: (trip: Trip) => void;
  onFindCrew?: (eventId: string, eventName: string) => void;
}

interface EventOption {
  id: string;
  name: string;
  city: string;
  country: string;
  dates: string;
  image: string;
  typicalDays: number;
  highlight: string;
}

const FEATURED_EVENTS: EventOption[] = [
  {
    id: "gamescom-2026",
    name: "Gamescom Cologne 2026",
    city: "Cologne",
    country: "Germany",
    dates: "Aug 26 - 30, 2026",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    typicalDays: 5,
    highlight: "The world's largest gaming expo, Koelnmesse halls & gamer rave",
  },
  {
    id: "tgs-2026",
    name: "Tokyo Game Show 2026",
    city: "Tokyo",
    country: "Japan",
    dates: "Sep 24 - 27, 2026",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    typicalDays: 7,
    highlight: "Makuhari Messe, Akihabara retro pilgrimage & VR lounges",
  },
  {
    id: "lol-worlds-2026",
    name: "League of Legends Worlds Finals",
    city: "Seoul",
    country: "South Korea",
    dates: "Nov 05 - 09, 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    typicalDays: 6,
    highlight: "Gocheok Sky Dome arena, LoL Park & high-end PC Bang marathons",
  },
  {
    id: "iem-cologne-2026",
    name: "IEM Cologne CS2 Cathedral",
    city: "Cologne",
    country: "Germany",
    dates: "Jul 18 - 21, 2026",
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=800",
    typicalDays: 4,
    highlight: "LANXESS Arena 'Cathedral of Counter-Strike' electrifying atmosphere",
  },
  {
    id: "evo-japan-2027",
    name: "EVO Japan Fighting Championship",
    city: "Tokyo",
    country: "Japan",
    dates: "Apr 25 - 28, 2027",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    typicalDays: 5,
    highlight: "Tekken 8 & Street Fighter 6 world stage, legendary Mikado arcades",
  },
];

const DEPARTURE_CITIES = [
  { id: "TLV", name: "Tel Aviv (TLV)", country: "Israel" },
  { id: "LHR", name: "London (LHR)", country: "UK" },
  { id: "JFK", name: "New York (JFK)", country: "USA" },
  { id: "CDG", name: "Paris (CDG)", country: "France" },
  { id: "FRA", name: "Frankfurt (FRA)", country: "Germany" },
  { id: "MAD", name: "Madrid (MAD)", country: "Spain" },
];

export const GamerTripBuilder: React.FC<GamerTripBuilderProps> = ({
  user,
  initialEventId,
  onTripSaved,
  onFindCrew,
}) => {
  const { t, isRtl, language } = useI18n();

  // Wizard state
  const [selectedEventId, setSelectedEventId] = useState<string>(
    initialEventId || FEATURED_EVENTS[0].id
  );
  const [originCity, setOriginCity] = useState<string>("TLV");
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelersTier, setTravelersTier] = useState<"Solo" | "Duo" | "Squad" | "Guild">("Solo");
  const [budgetTier, setBudgetTier] = useState<"Economy" | "Balanced" | "VIP God Mode">("Balanced");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Tournaments",
    "Retro Arcades",
    "Gaming Bars",
  ]);

  // Output Trip State
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync initialEventId if passed from outside
  useEffect(() => {
    if (initialEventId) {
      setSelectedEventId(initialEventId);
    }
  }, [initialEventId]);

  const toggleInterest = (interest: string) => {
    sound.playClick();
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const activeEvent =
    FEATURED_EVENTS.find((e) => e.id === selectedEventId) || FEATURED_EVENTS[0];

  // Generator engine
  const handleGenerateTrip = () => {
    sound.playLevelUp();
    setSaveSuccess(false);

    // Dynamic cost multiplier based on budget tier and travelers count
    const travelerCount =
      travelersTier === "Solo"
        ? 1
        : travelersTier === "Duo"
        ? 2
        : travelersTier === "Squad"
        ? 4
        : 6;

    const baseCostFactor =
      budgetTier === "Economy" ? 0.75 : budgetTier === "Balanced" ? 1.0 : 1.85;

    // Realistic market estimates per person
    const isEurope = activeEvent.country === "Germany" || activeEvent.country === "Sweden";
    const isAsia = activeEvent.country === "Japan" || activeEvent.country === "South Korea";

    const baseFlight = isAsia ? 850 : isEurope ? 420 : 950;
    const baseHotelPerNight = budgetTier === "Economy" ? 65 : budgetTier === "Balanced" ? 130 : 260;
    const baseTicket = budgetTier === "VIP God Mode" ? 220 : 95;
    const baseTransit = durationDays * (isAsia ? 16 : 12);
    const baseActivities = durationDays * (budgetTier === "VIP God Mode" ? 55 : 30);
    const baseFood = durationDays * (budgetTier === "Economy" ? 35 : budgetTier === "Balanced" ? 60 : 120);

    const costPerPerson = {
      flights: Math.round(baseFlight * baseCostFactor),
      hotels: Math.round(baseHotelPerNight * durationDays),
      eventTickets: Math.round(baseTicket),
      transit: Math.round(baseTransit),
      gamingAndActivities: Math.round(baseActivities),
      food: Math.round(baseFood),
    };

    const totalEstimated =
      (costPerPerson.flights +
        costPerPerson.hotels +
        costPerPerson.eventTickets +
        costPerPerson.transit +
        costPerPerson.gamingAndActivities +
        costPerPerson.food) *
      travelerCount;

    // Build itinerary days
    const itineraryDays: TripItineraryDay[] = [];
    for (let day = 1; day <= durationDays; day++) {
      if (day === 1) {
        itineraryDays.push({
          day,
          title: language === "he" ? "הגעה, התמקמות וערב גיימינג מקומי" : "Arrival & Gamer Welcome Night",
          theme: "Check-in & Warmup",
          morning: language === "he" ? `נחיתה ב-${activeEvent.city}, נסיעה ברכבת מהירה למלון וקבלת חדרים.` : `Touch down in ${activeEvent.city}, express rail to hotel and check-in.`,
          afternoon: language === "he" ? "סיור התמצאות באזור המלון והצטיידות בסים מקומי וכרטיס רכבת." : "Orientation walk around district, collect local transit pass and grab lunch.",
          evening: language === "he" ? "מפגש ראשון בבר גיימינג מקומי עם קהילת GOD MODE המקומית." : `Evening meetup at ${activeEvent.city}'s premier esports & arcade lounge.`,
          gamingHighlight: language === "he" ? "קוקטיילים בנושא משחקים ומסכי ענק לטורנירים חיים." : "Themed gamer drinks and free-play console stations.",
          recommendedSpots: ["Meltdown Esports Bar", "Central Station Hub"],
        });
      } else if (day === 2) {
        itineraryDays.push({
          day,
          title: language === "he" ? `יום שלם במתחם ${activeEvent.name}` : `Full Day at ${activeEvent.name}`,
          theme: "Main Expo & Keynotes",
          morning: language === "he" ? "כניסה מוקדמת לשטחי האקספו, התנסות ראשונה בכותרים שטרם שוחררו." : "Early hall entry, hands-on previews with unreleased AAA game builds.",
          afternoon: language === "he" ? "במת משחקי האינדי, מתחם החומרה החדשה וצפייה במוקדמות טורניר." : "Indie arena exploration, new hardware showcase and tournament group stage.",
          evening: language === "he" ? "ארוחת ערב משותפת עם שחקני הקהילה באזור האולם המרכזי." : "Group dinner with community gamers near the convention venue.",
          gamingHighlight: language === "he" ? "משחק ראשון בעולם ב-Demos בלעדיים ופגישה עם יוצרי תוכן." : "Exclusive playable developer betas and official merch drops.",
          recommendedSpots: [activeEvent.name + " Hall 8", "Gamer Food Street"],
        });
      } else if (day === 3) {
        itineraryDays.push({
          day,
          title: language === "he" ? "סיור רטרו, שופינג חומרה וספוטים סודיים" : "Retro Pilgrimage & Secret Spots",
          theme: "Discovery & Nostalgia",
          morning: language === "he" ? "ביקור בחנויות רטרו נדירות, קונסולות יפניות ואספנות בלעדית." : "Rare retro gaming shops and hardware collectors district.",
          afternoon: language === "he" ? "מרתון ארקייד רב-קומתי עם מכונות קצב, מרוצים ומציאות מדומה." : "Multi-floor arcade run: rhythm games, Taiko no Tatsujin and VR rigs.",
          evening: language === "he" ? "ארוחת ערב במסעדה תמתית גיימינג / בר רטרו." : "Themed gamer restaurant followed by retro cocktail lounge.",
          gamingHighlight: language === "he" ? "מציאת כותרים נדירים לקולקציה האישית וצבירת ניקוד שיא בארקייד." : "Hunting vintage cartridges and achieving high scores in classic cabinets.",
          recommendedSpots: ["Retro Haven Tokyo/Cologne", "VR Arena"],
        });
      } else if (day === durationDays) {
        itineraryDays.push({
          day,
          title: language === "he" ? "גמר הטורניר הגדול ומסיבת סיום" : "Grand Finals & Championship Party",
          theme: "Climax & Wrap-up",
          morning: language === "he" ? "התארגנות במלון ושופינג אחרון למזכרות וציוד גיימינג." : "Souvenir run, packing up loot and checkout logistics.",
          afternoon: language === "he" ? "מושבי פרימיום בגמר הגדול של הטורניר עם אלפי אוהדים באולם." : "Championship arena seats, cheering with thousands of live fans.",
          evening: language === "he" ? "טקס הענקת הגביע ומסיבת אפטר-פארטי רשמית של האירוע." : "Trophy ceremony, MVP celebration and afterparty gamer mixer.",
          gamingHighlight: language === "he" ? "צפייה בגמר אליפות העולם בשידור חי באווירה מחשמלת." : "Witnessing the world champions crowned live in the stadium.",
          recommendedSpots: ["Championship Stadium", "Official Afterparty Venue"],
        });
      } else {
        itineraryDays.push({
          day,
          title: language === "he" ? `יום ${day}: חוויות גיימינג וטכנולוגיה ב-${activeEvent.city}` : `Day ${day}: Deep Dive Gaming & Culture in ${activeEvent.city}`,
          theme: "Culture & Tech",
          morning: language === "he" ? "ביקור במוזיאון משחקי וידאו או מרכז חווייתי אינטראקטיבי." : "Interactive video game history museum or cutting-edge tech center.",
          afternoon: language === "he" ? "טורניר LAN פנימי עם גיימרים מהקהילה במועדון PC Bang." : "LAN tournament shootout with GOD MODE community at high-end PC lounge.",
          evening: language === "he" ? "חיי לילה ומוזיקת משחקים חיה במועדון מקומי." : "Nightlife, live game chiptune soundscape, and craft drinks.",
          gamingHighlight: language === "he" ? "חיבור לחומרה עתירת ביצועים ומשחק רשת משותף עם חברי הקהילה." : "High-refresh RTX 5090 stations and squad multiplayer scrims.",
          recommendedSpots: ["LAN PC Club", "Gamer Bistro"],
        });
      }
    }

    // Build Affiliate Links based on chosen event & destination
    const affiliateLinks: TripAffiliateLink[] = [
      {
        category: "flights",
        providerName: "Skyscanner",
        label: `${originCity} → ${activeEvent.city} (${costPerPerson.flights}$ est.)`,
        url: `https://www.skyscanner.com/transport/flights/${originCity.toLowerCase()}/${activeEvent.city.toLowerCase()}/`,
        priceHint: `~$${costPerPerson.flights} pp`,
      },
      {
        category: "hotels",
        providerName: "Booking.com",
        label: `${activeEvent.city} Hotels near Venue (${costPerPerson.hotels}$ est.)`,
        url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(activeEvent.city + " " + activeEvent.name)}`,
        priceHint: `~$${costPerPerson.hotels} total`,
      },
      {
        category: "tickets",
        providerName: "Official Expo / Event",
        label: `Official ${activeEvent.name} Badges`,
        url: `https://google.com/search?q=${encodeURIComponent(activeEvent.name + " official tickets")}`,
        priceHint: `~$${costPerPerson.eventTickets} pp`,
      },
      {
        category: "transit",
        providerName: "Rail Europe / Japan Rail Pass",
        label: `${activeEvent.city} Regional Transport Pass`,
        url: `https://www.omio.com/travel/${encodeURIComponent(activeEvent.city)}`,
        priceHint: `~$${costPerPerson.transit} pp`,
      },
      {
        category: "activities",
        providerName: "Klook Gaming Experiences",
        label: `${activeEvent.city} Arcades & Museum Fast-Pass`,
        url: `https://www.klook.com/search?query=${encodeURIComponent(activeEvent.city + " arcade")}`,
        priceHint: `~$${costPerPerson.gamingAndActivities} pp`,
      },
    ];

    const costBreakdown: TripCostBreakdown = {
      flights: costPerPerson.flights * travelerCount,
      hotels: costPerPerson.hotels,
      eventTickets: costPerPerson.eventTickets * travelerCount,
      transit: costPerPerson.transit * travelerCount,
      gamingAndActivities: costPerPerson.gamingAndActivities * travelerCount,
      food: costPerPerson.food * travelerCount,
      totalEstimated,
      currency: "USD",
    };

    const newTrip: Trip = {
      tripId: "trip_" + Date.now(),
      uid: user?.uid || "guest_gamer",
      title: `${activeEvent.name} — ${durationDays} Days Gamer Journey`,
      eventId: activeEvent.id,
      eventName: activeEvent.name,
      destinationId: activeEvent.city.toLowerCase(),
      destinationName: `${activeEvent.city}, ${activeEvent.country}`,
      originCity,
      startDate: activeEvent.dates.split(" - ")[0] || "2026-08-25",
      endDate: activeEvent.dates.split(" - ")[1] || "2026-08-30",
      durationDays,
      travelersCount: travelerCount,
      travelersTier,
      budgetTier,
      interests: selectedInterests,
      itinerary: itineraryDays,
      costBreakdown,
      affiliateLinks,
      createdAt: new Date().toISOString(),
    };

    setGeneratedTrip(newTrip);
  };

  const handleSaveToProfile = async () => {
    if (!generatedTrip) return;
    sound.playClick();
    setIsSaving(true);
    try {
      await saveTripToFirebase(generatedTrip);
      setSaveSuccess(true);
      sound.playLevelUp();
      if (onTripSaved) {
        onTripSaved(generatedTrip);
      }
    } catch (err) {
      console.error("Failed to save trip to Firebase:", err);
      // Still set success in UI for guest UX
      setSaveSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAffiliateClick = (link: TripAffiliateLink) => {
    const categoryMap: Record<string, AffiliateCategory> = {
      hotel: "hotels",
      flight: "flights",
      activity: "activities",
      ticket: "activities",
      tour: "tours",
    };
    trackAffiliateClick({
      providerId: link.providerName.toLowerCase().replace(/\s+/g, "-"),
      productId: "trip_builder_" + link.category,
      destinationId: activeEvent.city,
      campaignId: "trip_builder_direct",
      sourcePage: "trip_builder",
      targetUrl: link.url,
      category: categoryMap[link.category] || "other",
    });
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`space-y-8 ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.tb_badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            {t.tb_title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.tb_subtitle}
          </p>
        </div>
      </div>

      {/* Wizard Form */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950/80 p-6 sm:p-8 shadow-xl space-y-8">
        {/* Step 1: Select Event */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Ticket className="w-4 h-4 text-cyan-400" />
            {t.tb_step1_title}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_EVENTS.map((event) => {
              const isSelected = selectedEventId === event.id;
              return (
                <div
                  key={event.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedEventId(event.id);
                  }}
                  className={`relative rounded-2xl overflow-hidden border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400 scale-[1.02]"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden mb-3 relative">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30">
                      {event.dates}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm leading-snug">
                    {event.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    {event.city}, {event.country}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                    {event.highlight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Origin & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-purple-900/30">
          {/* Origin */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
              <Plane className="w-4 h-4 text-purple-400" />
              {t.tb_step2_title}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DEPARTURE_CITIES.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setOriginCity(city.id);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    originCity === city.id
                      ? "border-purple-400 bg-purple-950/60 text-white ring-1 ring-purple-400"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="block font-mono text-cyan-300">{city.id}</span>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {city.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              {t.tb_step3_title}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[4, 5, 7, 10].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setDurationDays(days);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    durationDays === days
                      ? "border-purple-400 bg-purple-950/60 text-white ring-1 ring-purple-400"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="text-base font-black block text-cyan-400 font-mono">
                    {days}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {language === "he" ? "ימים" : "Days"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 & 5: Travelers & Budget Tier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-purple-900/30">
          {/* Travelers */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-pink-300 font-mono flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              {t.tb_step4_title}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "Solo", label: "Solo Gamer", desc: "שחקן בודד (1)" },
                  { id: "Duo", label: "Duo Co-op", desc: "צמד גיימרים (2)" },
                  { id: "Squad", label: "Squad (3-4)", desc: "חוליה (3-4)" },
                  { id: "Guild", label: "Guild (5+)", desc: "גילדה / צוות (5+)" },
                ] as const
              ).map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTravelersTier(tier.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isRtl ? "text-right" : "text-left"
                  } ${
                    travelersTier === tier.id
                      ? "border-pink-400 bg-pink-950/40 text-white ring-1 ring-pink-400"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="block text-xs font-bold text-white">
                    {tier.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {language === "he" ? tier.desc : tier.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-pink-300 font-mono flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-pink-400" />
              {t.tb_step5_title}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "Economy", label: "Economy", hint: "Backpack / Budget" },
                  { id: "Balanced", label: "Balanced", hint: "Standard Gamer" },
                  { id: "VIP God Mode", label: "VIP God Mode", hint: "Top Hotels & Badges" },
                ] as const
              ).map((budget) => (
                <button
                  key={budget.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setBudgetTier(budget.id);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    budgetTier === budget.id
                      ? "border-amber-400 bg-amber-950/40 text-white ring-1 ring-amber-400"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="block text-xs font-bold text-amber-300">
                    {budget.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {budget.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 6: Interests */}
        <div className="space-y-3 pt-4 border-t border-purple-900/30">
          <label className="block text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            {t.tb_step6_title}
          </label>

          <div className="flex flex-wrap gap-2">
            {[
              "Tournaments",
              "Retro Arcades",
              "Merch & Collectibles",
              "Nintendo Theme Parks",
              "Gaming Bars & Cafes",
              "VR & Simulators",
              "Local Culture & Food",
              "Cosplay & Anime",
            ].map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/30"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-900/30">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{t.tb_price_disclaimer}</span>
          </div>

          <button
            onClick={handleGenerateTrip}
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.tb_generate_btn}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Generated Trip Result Section */}
      {generatedTrip && (
        <div className="rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{generatedTrip.durationDays} Days Plan • {generatedTrip.destinationName}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {generatedTrip.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeEvent.dates} • Origin: {generatedTrip.originCity} • {generatedTrip.travelersTier} ({generatedTrip.travelersCount} Gamers) • {generatedTrip.budgetTier} Tier
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSaveToProfile}
                disabled={isSaving || saveSuccess}
                className={`py-3 px-5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  saveSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
                }`}
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.tb_saved_success}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? t.tb_saving_trip : t.tb_save_trip_btn}</span>
                  </>
                )}
              </button>

              {onFindCrew && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onFindCrew(activeEvent.id, activeEvent.name);
                  }}
                  className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-700/50 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.tb_find_crew_btn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Transparent Cost Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>{t.tb_cost_breakdown_title}</span>
              <span className="text-[11px] font-mono text-slate-400 font-normal">
                ({generatedTrip.costBreakdown.currency})
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_flights_est}</span>
                <span className="text-lg font-black text-cyan-400 font-mono">
                  ${generatedTrip.costBreakdown.flights}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_hotels_est}</span>
                <span className="text-lg font-black text-purple-400 font-mono">
                  ${generatedTrip.costBreakdown.hotels}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_tickets_est}</span>
                <span className="text-lg font-black text-pink-400 font-mono">
                  ${generatedTrip.costBreakdown.eventTickets}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_transit_est}</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  ${generatedTrip.costBreakdown.transit}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_activities_est}</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  ${generatedTrip.costBreakdown.gamingAndActivities}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{t.tb_food_est}</span>
                <span className="text-lg font-black text-rose-400 font-mono">
                  ${generatedTrip.costBreakdown.food}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{t.tb_price_disclaimer}</span>
              </div>
              <div className="text-base font-black text-white font-mono bg-purple-950/60 px-4 py-1.5 rounded-xl border border-purple-600/40">
                <span>{t.tb_total_est} </span>
                <span className="text-cyan-400 text-lg">
                  ${generatedTrip.costBreakdown.totalEstimated} USD
                </span>
              </div>
            </div>
          </div>

          {/* Direct Affiliate Booking Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-purple-300 font-mono uppercase tracking-wider flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>הזמנה ישירה מספקים רשמיים (שותפים) • Direct Booking Links</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {generatedTrip.affiliateLinks.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAffiliateClick(link)}
                  className="group p-4 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/60 hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {link.providerName}
                      </span>
                      {link.priceHint && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {link.priceHint}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {link.label}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/50 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{t.tb_itinerary_title}</span>
            </h4>

            <div className="space-y-4">
              {generatedTrip.itinerary.map((dayPlan) => (
                <div
                  key={dayPlan.day}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-black font-mono text-sm flex items-center justify-center">
                        {dayPlan.day}
                      </span>
                      <div>
                        <h5 className="font-bold text-white text-sm">
                          {dayPlan.title}
                        </h5>
                        <span className="text-[11px] text-cyan-400 font-mono">
                          {dayPlan.theme}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1">
                      {dayPlan.recommendedSpots.map((spot, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
                      <span className="font-mono text-purple-400 font-bold block">
                        {language === "he" ? "בוקר:" : "Morning:"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{dayPlan.morning}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
                      <span className="font-mono text-cyan-400 font-bold block">
                        {language === "he" ? "צהריים:" : "Afternoon:"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{dayPlan.afternoon}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
                      <span className="font-mono text-pink-400 font-bold block">
                        {language === "he" ? "ערב ולילה:" : "Evening & Night:"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{dayPlan.evening}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">
                      <strong className="text-white">
                        {language === "he" ? "היילייט גיימינג יומי:" : "Gamer Highlight:"}
                      </strong>{" "}
                      {dayPlan.gamingHighlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
