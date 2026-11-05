import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import {
  AffiliateCategory,
  AffiliateClickEvent,
  AffiliateOffer,
  AffiliateProvider,
  AffiliateAnalyticsSummary,
} from "../types";
import { DEFAULT_AFFILIATE_PROVIDERS } from "../data/affiliateData";

/**
 * Builds the centralized affiliate tracking URL dynamically.
 * Injects publisher affiliate IDs, campaign IDs, subId, and UTM parameters.
 * No private secrets or credentials are ever exposed to the client.
 */
export const buildAffiliateUrl = (params: {
  providerId: string;
  baseUrl?: string;
  destinationId?: string;
  productId?: string;
  campaignId?: string;
  subId?: string;
  queryParam?: string;
}): string => {
  const provider = DEFAULT_AFFILIATE_PROVIDERS.find(
    (p) => p.providerId === params.providerId
  );

  const affiliateId = provider?.affiliateId || "gmt_global_2027";
  const campaign = params.campaignId || provider?.campaignId || "gmt_gaming_travel";
  const sub = params.subId || "direct";
  const currentUid = auth.currentUser?.uid || "guest";

  let target = params.baseUrl;

  if (!target && provider?.baseUrlTemplate) {
    target = provider.baseUrlTemplate
      .replace("{affiliateId}", encodeURIComponent(affiliateId))
      .replace("{campaignId}", encodeURIComponent(campaign))
      .replace("{subId}", encodeURIComponent(`${sub}_${currentUid.slice(0, 8)}`))
      .replace("{query}", encodeURIComponent(params.queryParam || "gaming"))
      .replace("{productId}", encodeURIComponent(params.productId || "default"))
      .replace("{destinationCode}", encodeURIComponent(params.destinationId || "all"));
  }

  if (!target) {
    target = provider?.websiteUrl || "https://godmodetraveler.com";
  }

  // Safely append tracking parameters if standard URL
  try {
    const parsed = new URL(target);
    if (!parsed.searchParams.has("utm_source")) {
      parsed.searchParams.set("utm_source", "godmodetraveler");
    }
    if (!parsed.searchParams.has("utm_medium")) {
      parsed.searchParams.set("utm_medium", "affiliate");
    }
    if (!parsed.searchParams.has("utm_campaign")) {
      parsed.searchParams.set("utm_campaign", campaign);
    }
    if (!parsed.searchParams.has("gmt_sub")) {
      parsed.searchParams.set("gmt_sub", sub);
    }
    return parsed.toString();
  } catch {
    return target;
  }
};

/**
 * Records an affiliate click event in Firestore collection `affiliate_clicks`.
 * Anonymous users are trackable using their Firebase Auth anonymous UID.
 * Respects user privacy: records minimal, immutable event logs.
 */
export const trackAffiliateClick = async (event: {
  providerId: string;
  destinationId?: string;
  productId?: string;
  category: AffiliateCategory;
  sourcePage: string;
  campaignId?: string;
  subId?: string;
  targetUrl: string;
}): Promise<{ clickId: string; targetUrl: string }> => {
  const uid = auth.currentUser?.uid || "anonymous_gamer";
  const finalUrl = buildAffiliateUrl({
    providerId: event.providerId,
    baseUrl: event.targetUrl,
    destinationId: event.destinationId,
    productId: event.productId,
    campaignId: event.campaignId,
    subId: event.subId,
  });

  try {
    const clicksCol = collection(db, "affiliate_clicks");
    const docRef = await addDoc(clicksCol, {
      uid,
      providerId: event.providerId,
      destinationId: event.destinationId || "global",
      productId: event.productId || "general",
      category: event.category,
      sourcePage: event.sourcePage,
      campaignId: event.campaignId || "general",
      subId: event.subId || "web",
      targetUrl: finalUrl,
      timestamp: serverTimestamp(),
      createdAtIso: new Date().toISOString(),
    });

    return { clickId: docRef.id, targetUrl: finalUrl };
  } catch (error) {
    // Never block user navigation if Firestore write is delayed or offline
    console.warn("Affiliate click Firestore recording handled offline/cached:", error);
    return { clickId: `local-${Date.now()}`, targetUrl: finalUrl };
  }
};

/**
 * Central action to handle user clicking an AffiliateOffer in the UI.
 * Handles tracking, optional gamification XP reward, and window redirection.
 */
export const handleAffiliateOfferClick = async (
  offer: AffiliateOffer,
  sourcePage: string,
  onAwardXp?: (xp: number) => void
): Promise<string> => {
  const { targetUrl } = await trackAffiliateClick({
    providerId: offer.providerId,
    destinationId: offer.destinationId,
    productId: offer.id,
    category: offer.category,
    sourcePage,
    campaignId: offer.campaignId,
    subId: offer.subId,
    targetUrl: offer.deepLinkUrl,
  });

  if (offer.xpReward && onAwardXp) {
    onAwardXp(offer.xpReward);
  }

  // Safely open in a new tab with standard rel tags
  window.open(targetUrl, "_blank", "noopener,noreferrer");
  return targetUrl;
};

/**
 * Fetches recent affiliate clicks from Firestore for the Admin Dashboard or analytics.
 */
export const fetchRecentAffiliateClicks = async (
  maxCount: number = 25
): Promise<AffiliateClickEvent[]> => {
  try {
    const clicksCol = collection(db, "affiliate_clicks");
    const q = query(clicksCol, orderBy("timestamp", "desc"), limit(maxCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        clickId: doc.id,
        uid: data.uid,
        providerId: data.providerId,
        destinationId: data.destinationId,
        productId: data.productId,
        category: data.category,
        sourcePage: data.sourcePage,
        campaignId: data.campaignId,
        subId: data.subId,
        targetUrl: data.targetUrl,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
      };
    });
  } catch (error) {
    console.warn("Failed to fetch recent affiliate clicks:", error);
    return [];
  }
};

/**
 * Fetches user-specific affiliate click history for privacy audit or progression.
 */
export const fetchUserAffiliateClicks = async (
  userId: string
): Promise<AffiliateClickEvent[]> => {
  try {
    const clicksCol = collection(db, "affiliate_clicks");
    const q = query(
      clicksCol,
      where("uid", "==", userId),
      orderBy("timestamp", "desc"),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      clickId: doc.id,
      ...(doc.data() as any),
    }));
  } catch (error) {
    console.warn("Failed to fetch user clicks:", error);
    return [];
  }
};

/**
 * Prepares aggregated analytics summary from Firestore data.
 */
export const calculateAffiliateAnalytics = (
  clicks: AffiliateClickEvent[]
): AffiliateAnalyticsSummary => {
  const summary: AffiliateAnalyticsSummary = {
    totalClicks: clicks.length,
    clicksPerDestination: {},
    clicksPerProvider: {},
    clicksPerCategory: {},
    clicksPerCampaign: {},
    totalConversions: 0,
    totalRevenue: 0,
    conversionRate: 0,
  };

  for (const click of clicks) {
    const dest = click.destinationId || "global";
    summary.clicksPerDestination[dest] = (summary.clicksPerDestination[dest] || 0) + 1;

    const prov = click.providerId || "other";
    summary.clicksPerProvider[prov] = (summary.clicksPerProvider[prov] || 0) + 1;

    const cat = click.category || "other";
    summary.clicksPerCategory[cat] = (summary.clicksPerCategory[cat] || 0) + 1;

    const camp = click.campaignId || "general";
    summary.clicksPerCampaign[camp] = (summary.clicksPerCampaign[camp] || 0) + 1;
  }

  return summary;
};
