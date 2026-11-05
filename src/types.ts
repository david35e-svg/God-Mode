export type ActiveTab =
  | "home"
  | "trip-builder"
  | "destinations"
  | "events"
  | "themeparks"
  | "games"
  | "history"
  | "packages"
  | "secret-spots"
  | "map"
  | "booking"
  | "guides"
  | "ai"
  | "community"
  | "profile"
  | "admin"
  | "legal";

export interface Destination {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  heroImage: string;
  tagline: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  category: "esports" | "arcade" | "parks" | "vr" | "retro";
  highlights: string[];
  hotspotsCount: number;
  estPrice: string;
  description: string;
  recommendedDuration: string;
  bestTimeToVisit: string;
  coordinates: [number, number];
}

export interface EsportsEvent {
  id: string;
  title: string;
  gameName: string;
  category: "CS2" | "LoL" | "Dota 2" | "Valorant" | "Fighting" | "Expo";
  city: string;
  country: string;
  flag: string;
  venue: string;
  dates: string;
  countdownDays: number;
  prizePool: string;
  ticketsStatus: "Available" | "Selling Fast" | "Sold Out" | "Early Bird";
  ticketsUrl: string;
  bannerImage: string;
  description: string;
  attendance: string;
  participatingTeams: string[];
}

export interface ThemePark {
  id: string;
  name: string;
  japaneseName?: string;
  country: string;
  city: string;
  flag: string;
  imageUrl: string;
  rating: number;
  tags: string[];
  description: string;
  openingHours: string;
  admissionPrice: string;
  mustVisitAttractions: string[];
  officialUrl: string;
}

export interface UpcomingGame {
  id: string;
  title: string;
  developer: string;
  releaseWindow: string;
  exactDate?: string;
  platforms: ("PC" | "PS5" | "Xbox Series X/S" | "Nintendo Switch" | "Nintendo Switch 2" | string)[];
  genre: string;
  imageUrl: string;
  youtubeTrailerId: string;
  synopsis: string;
  expoRevealedAt: string;
  keyFeatures: string[];
  preorderUrl: string;
  hypeRating: number;
}

export interface GamingArticle {
  id: string;
  title: string;
  country: string;
  flag: string;
  city: string;
  era: string;
  readingTime: string;
  category: "history" | "expos" | "culture";
  summary: string;
  bannerImage: string;
  youtubeVideoId: string;
  videoTitle: string;
  contentParagraphs: string[];
  historicalMilestones: { year: string; event: string }[];
  legacyLocations: string[];
}

export interface SecretSpot {
  id: string;
  title: string;
  city: string;
  country: string;
  category: "retro-bar" | "speakeasy" | "vintage-store" | "rare-arcade" | "esports-hub";
  secretLevel: "High" | "Legendary" | "Mythic";
  imageUrl: string;
  insiderTip: string;
  unlockCondition: string;
  coordinates: [number, number];
}

export interface SpecialPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: string;
  originalPrice: string;
  tag: string;
  imageUrl: string;
  includes: string[];
  highlights: string[];
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  characterClass: "Cyber Samurai" | "Arcade Wizard" | "Speedrunner" | "Stealth Ranger";
  achievements: { id: string; name: string; icon: string; unlocked: boolean }[];
  coins: number;
  inventory: { id: string; name: string; icon: string; count: number }[];
}

export interface Quest {
  id: string;
  title: string;
  location: string;
  category: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  description: string;
}

// ==========================================
// AFFILIATE MARKETING ARCHITECTURE MODELS
// ==========================================

export type AffiliateCategory =
  | "hotels"
  | "flights"
  | "activities"
  | "carRental"
  | "travelInsurance"
  | "tours"
  | "attractions"
  | "other";

export type AffiliateProviderStatus = "active" | "inactive" | "pending";

export interface AffiliateProvider {
  providerId: string;
  providerName: string;
  category: AffiliateCategory;
  affiliateId: string; // Public partner ID / tag (no secret keys in client)
  campaignId: string;
  status: AffiliateProviderStatus;
  baseUrlTemplate?: string;
  logoUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateLink {
  linkId: string;
  providerId: string;
  destinationId?: string;
  productId?: string;
  category: AffiliateCategory;
  url: string; // Centralized template or redirect target
  campaignId: string;
  subId?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AffiliateOffer {
  id: string;
  providerId: string;
  providerName: string;
  category: AffiliateCategory;
  destinationId: string;
  destinationName: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviewsCount?: number;
  perks?: string[];
  ctaText?: string;
  deepLinkUrl: string;
  campaignId: string;
  subId?: string;
  active: boolean;
  xpReward?: number;
  highlighted?: boolean;
}

export interface AffiliateClickEvent {
  clickId?: string;
  uid: string; // Firebase Auth UID (supports anonymous auth & registered)
  providerId: string;
  destinationId?: string;
  productId?: string;
  category: AffiliateCategory;
  sourcePage: string;
  campaignId: string;
  subId?: string;
  targetUrl?: string;
  timestamp: any;
}

export interface AffiliateConversion {
  conversionId: string;
  clickId: string;
  uid?: string;
  providerId: string;
  orderValue: number;
  commission: number;
  currency: string;
  status: "pending" | "approved" | "declined";
  verifiedAt: string;
  timestamp: any;
}

export interface AffiliateAnalyticsSummary {
  totalClicks: number;
  clicksPerDestination: Record<string, number>;
  clicksPerProvider: Record<string, number>;
  clicksPerCategory: Record<string, number>;
  clicksPerCampaign: Record<string, number>;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
}

// ==========================================
// GAMER TRIP BUILDER & EVENT COMMUNITY MODELS
// ==========================================

export interface TripItineraryDay {
  day: number;
  title: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  gamingHighlight: string;
  recommendedSpots: string[];
}

export interface TripCostBreakdown {
  flights: number;
  hotels: number;
  eventTickets: number;
  transit: number;
  gamingAndActivities: number;
  food: number;
  totalEstimated: number;
  currency: string;
}

export interface TripAffiliateLink {
  category: "flights" | "hotels" | "tickets" | "transit" | "activities";
  providerName: string;
  label: string;
  url: string;
  priceHint?: string;
}

export interface Trip {
  id?: string;
  tripId: string;
  uid: string;
  title: string;
  eventId?: string;
  eventName: string;
  destinationId: string;
  destinationName: string;
  originCity: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelersCount: number;
  travelersTier: "Solo" | "Duo" | "Squad" | "Guild";
  budgetTier: "Economy" | "Balanced" | "VIP God Mode";
  interests: string[];
  itinerary: TripItineraryDay[];
  costBreakdown: TripCostBreakdown;
  affiliateLinks: TripAffiliateLink[];
  createdAt: any;
  updatedAt?: any;
}

export interface EventCrewMember {
  id: string;
  eventId: string;
  eventTitle: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  departureCity: string;
  travelDates: string;
  travelStyle: "Budget Gamer" | "Balanced Solo" | "Squad Leader" | "VIP Explorer";
  favoriteGames: string[];
  bio: string;
  contactHandle?: string;
  createdAt: any;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorUid?: string;
  avatar: string;
  destination: string;
  eventId?: string;
  eventName?: string;
  content: string;
  category: "meetup" | "tips" | "shopping" | "general";
  likes: number;
  time: string;
  createdAt?: any;
}

export interface GamerSpot {
  id: string;
  destinationId: string;
  title: string;
  city: string;
  country: string;
  category: "arcade" | "store" | "cafe" | "bar" | "esports" | "museum";
  categoryLabel: string;
  isSecret: boolean;
  secretTip: string;
  address: string;
  coordinates: [number, number];
  imageUrl: string;
  rating: number;
}

