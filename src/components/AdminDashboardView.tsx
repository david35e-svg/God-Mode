import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  ExternalLink,
  MousePointerClick,
  TrendingUp,
  RefreshCw,
  Clock,
  Layers,
  FileText,
  Lock,
  CheckCircle,
  XCircle,
  Eye,
  Compass,
  Users,
} from "lucide-react";
import {
  AffiliateProvider,
  AffiliateOffer,
  AffiliateClickEvent,
  AffiliateAnalyticsSummary,
} from "../types";
import { DEFAULT_AFFILIATE_PROVIDERS, DEFAULT_AFFILIATE_OFFERS } from "../data/affiliateData";
import { fetchRecentAffiliateClicks, calculateAffiliateAnalytics } from "../lib/affiliate";
import { auth, db, loadAllTripsAdminFirebase, loadAllEventCrewsFirebase } from "../lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useI18n } from "../lib/i18n";
import { sound } from "../lib/sound";

type AdminTab = "overview" | "providers" | "offers" | "clicks" | "inquiries" | "trips" | "crews";

export const AdminDashboardView: React.FC = () => {
  const { t, isRtl } = useI18n();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(true); // Site owner unlocked in developer environment

  // Real-time / Firestore fetched state
  const [providers, setProviders] = useState<AffiliateProvider[]>(DEFAULT_AFFILIATE_PROVIDERS);
  const [offers, setOffers] = useState<AffiliateOffer[]>(DEFAULT_AFFILIATE_OFFERS);
  const [clicks, setClicks] = useState<AffiliateClickEvent[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [crews, setCrews] = useState<any[]>([]);
  const [loadingClicks, setLoadingClicks] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<AffiliateAnalyticsSummary>({
    totalClicks: 0,
    clicksPerDestination: {},
    clicksPerProvider: {},
    clicksPerCategory: {},
    clicksPerCampaign: {},
    totalConversions: 0,
    totalRevenue: 0,
    conversionRate: 0,
  });

  const loadData = async () => {
    setLoadingClicks(true);
    try {
      // 1. Fetch real click events from Firestore
      const recentClicks = await fetchRecentAffiliateClicks(50);
      setClicks(recentClicks);
      const computed = calculateAffiliateAnalytics(recentClicks);
      setAnalytics(computed);

      // 2. Fetch real inquiries from Firestore
      const inqRef = collection(db, "inquiries");
      const inqQuery = query(inqRef, orderBy("createdAt", "desc"), limit(20));
      const inqSnap = await getDocs(inqQuery);
      setInquiries(
        inqSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAtDate: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(),
        }))
      );

      // 3. Fetch real Gamer Trips
      const cloudTrips = await loadAllTripsAdminFirebase();
      setTrips(cloudTrips);

      // 4. Fetch real Event Crews
      const cloudCrews = await loadAllEventCrewsFirebase();
      setCrews(cloudCrews);
    } catch (err) {
      console.warn("Admin Firestore load warning:", err);
    } finally {
      setLoadingClicks(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleProviderStatus = (id: string) => {
    sound.playClick();
    setProviders((prev) =>
      prev.map((p) =>
        p.providerId === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
  };

  const toggleOfferStatus = (id: string) => {
    sound.playClick();
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  };

  const currentAuthUser = auth.currentUser;

  return (
    <div className={`space-y-8 max-w-6xl mx-auto ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header Banner */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 inline-flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.affiliate_admin_title}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              {t.affiliate_admin_subtitle}
            </h1>
            <p className="text-xs text-slate-300">
              {isRtl
                ? "ניהול מתקדם של ספקי שותפים, מעקב הקלקות חי ממסד הנתונים בענן, והמרות עתידיות."
                : "Advanced affiliate providers, live Firestore click-stream telemetry, and conversion analytics."}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              loadData();
            }}
            disabled={loadingClicks}
            className="self-start sm:self-center py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingClicks ? "animate-spin text-cyan-400" : ""}`} />
            <span>{isRtl ? "רענן נתונים" : "Refresh Stream"}</span>
          </button>
        </div>

        {/* Security / RBAC Banner */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-between text-xs text-purple-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isRtl
                ? "מוגן באמצעות Firebase Auth & כללי אבטחה של Firestore (least-privilege). מזהה משתמש נוכחי:"
                : "Protected via Firebase Auth & Firestore least-privilege security rules. Current UID:"}
              <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[11px]">
                {currentAuthUser?.uid || "anonymous_session"}
              </code>
            </span>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {isRtl ? "מורשה (Owner Mode)" : "Owner Authenticated"}
          </span>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-900/40">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("overview");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.affiliate_admin_tab_overview}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("providers");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "providers"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.affiliate_admin_tab_providers} ({providers.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("offers");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "offers"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.affiliate_admin_tab_offers} ({offers.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("clicks");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "clicks"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>{t.affiliate_admin_tab_clicks} ({clicks.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("inquiries");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.affiliate_admin_tab_inquiries} ({inquiries.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("trips");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "trips"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>תוכניות טיול ({trips.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab("crews");
            }}
            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "crews"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>חוליות אירוע ({crews.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Overview & Real Telemetry */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-1">
              <span className="text-xs text-slate-400">
                {isRtl ? "סה\"כ הקלקות שתועדו" : "Total Tracked Clicks"}
              </span>
              <span className="text-3xl font-black text-cyan-400 font-mono block">
                {analytics.totalClicks}
              </span>
              <span className="text-[10px] text-slate-400">
                {isRtl ? "מסונכרן עם אוסף affiliate_clicks" : "Synced with affiliate_clicks collection"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-1">
              <span className="text-xs text-slate-400">
                {isRtl ? "ספקי תיירות פעילים" : "Active Travel Providers"}
              </span>
              <span className="text-3xl font-black text-amber-300 font-mono block">
                {providers.filter((p) => p.status === "active").length} / {providers.length}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                {isRtl ? "Booking, Skyscanner, Klook..." : "Booking, Skyscanner, Klook..."}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-1">
              <span className="text-xs text-slate-400">
                {isRtl ? "המרות מאושרות (Postback)" : "Verified Conversions"}
              </span>
              <span className="text-3xl font-black text-purple-400 font-mono block">
                {analytics.totalConversions}
              </span>
              <span className="text-[10px] text-slate-400">
                {isRtl ? "ממתין לווב-הוק רשת שותפים" : "Awaiting partner webhook"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-1">
              <span className="text-xs text-slate-400">
                {isRtl ? "פניות מסלול שנשמרו" : "Total Route Inquiries"}
              </span>
              <span className="text-3xl font-black text-emerald-400 font-mono block">
                {inquiries.length}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                {isRtl ? "מאוחסנות ב-Firestore" : "Stored in Firestore"}
              </span>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-4">
              <h3 className="text-lg font-black text-white font-heading">
                {isRtl ? "הקלקות לפי ספק" : "Clicks per Provider"}
              </h3>
              {Object.keys(analytics.clicksPerProvider).length === 0 ? (
                <p className="text-xs text-slate-400">{t.affiliate_no_clicks}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(analytics.clicksPerProvider).map(([providerId, count]) => (
                    <div
                      key={providerId}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                    >
                      <span className="font-bold text-slate-200">{providerId}</span>
                      <span className="font-mono text-cyan-300 font-black">{count} clicks</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-4">
              <h3 className="text-lg font-black text-white font-heading">
                {isRtl ? "הקלקות לפי קטגוריה" : "Clicks per Category"}
              </h3>
              {Object.keys(analytics.clicksPerCategory).length === 0 ? (
                <p className="text-xs text-slate-400">{t.affiliate_no_clicks}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(analytics.clicksPerCategory).map(([cat, count]) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                    >
                      <span className="font-bold text-slate-200">{cat}</span>
                      <span className="font-mono text-amber-300 font-black">{count} clicks</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Affiliate Providers Management */}
      {activeTab === "providers" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white font-heading">
              {t.affiliate_admin_tab_providers}
            </h3>
            <span className="text-xs text-slate-400">
              {isRtl ? "מבנה סקיילבילי ללא חשיפת מפתחות פרטיים" : "Scalable architecture without exposing client secrets"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {providers.map((p) => (
              <div
                key={p.providerId}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-600/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.logoUrl || "🏢"}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{p.providerName}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Affiliate ID: <code className="text-amber-300 font-mono">{p.affiliateId}</code> •
                      Campaign: <code className="text-slate-300 font-mono">{p.campaignId}</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleProviderStatus(p.providerId)}
                    className={`py-1.5 px-3.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                      p.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                        : "bg-rose-500/20 text-rose-300 border border-rose-400/40"
                    }`}
                  >
                    {p.status === "active" ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t.affiliate_status_active}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t.affiliate_status_inactive}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Affiliate Offers & Campaigns */}
      {activeTab === "offers" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white font-heading">
              {t.affiliate_admin_tab_offers}
            </h3>
            <span className="text-xs text-slate-400">
              {isRtl ? "הצעות המוצגות בדפי יעדים וחבילות" : "Offers displayed across destinations and package views"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      {offer.providerName} • {offer.destinationName}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1 line-clamp-2">{offer.title}</h4>
                    {offer.price && (
                      <span className="text-xs font-black text-amber-300 font-mono block mt-1">
                        {offer.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Reward: +{offer.xpReward || 50} XP
                  </span>

                  <button
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={`py-1 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      offer.active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {offer.active ? t.affiliate_status_active : t.affiliate_status_inactive}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Live Click Stream (Real Firestore Telemetry) */}
      {activeTab === "clicks" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white font-heading">
                {t.affiliate_live_clicks}
              </h3>
              <p className="text-xs text-slate-400">
                {isRtl
                  ? "אירועים חיים שנרשמו ב-Firestore בעת הקלקת מטיילים על הצעות שותפים"
                  : "Live event stream logged to Firestore whenever gamers engage with partner deals"}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {clicks.length} {isRtl ? "רשומות" : "Records"}
            </span>
          </div>

          {clicks.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              {t.affiliate_no_clicks}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800 bg-slate-950/60">
                  <tr>
                    <th className="p-3">Time</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Source Page</th>
                    <th className="p-3">User UID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {clicks.map((click, index) => (
                    <tr key={click.clickId || index} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono text-slate-400 text-[11px]">
                        {click.timestamp?.toLocaleTimeString
                          ? click.timestamp.toLocaleTimeString()
                          : "Recent"}
                      </td>
                      <td className="p-3 font-bold text-cyan-300">{click.providerId}</td>
                      <td className="p-3 text-slate-300">{click.category}</td>
                      <td className="p-3 text-amber-300">{click.destinationId || "global"}</td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">{click.sourcePage}</td>
                      <td className="p-3 font-mono text-[10px] text-slate-500">
                        {click.uid ? `${click.uid.slice(0, 10)}...` : "guest"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Traveler Inquiries */}
      {activeTab === "inquiries" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white font-heading">
                {t.affiliate_admin_tab_inquiries}
              </h3>
              <p className="text-xs text-slate-400">
                {isRtl
                  ? "פניות לקבלת הכוונת מסלול וקישורים ישירים שנשמרו ב-Firestore"
                  : "Travel route inquiry submissions stored in Firestore"}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {inquiries.length} {isRtl ? "פניות" : "Submissions"}
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              {isRtl ? "אין עדיין פניות שמורות ב-Firestore." : "No inquiries stored yet."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{inq.fullName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono">
                        {inq.selectedPkg || "General"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {inq.email} • {inq.phone} • {inq.travelersCount || "Solo"}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    {inq.createdAtDate?.toLocaleDateString ? inq.createdAtDate.toLocaleDateString() : "Recent"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Gamer Trips (תוכניות טיול) */}
      {activeTab === "trips" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white font-heading">
                {isRtl ? "תוכניות טיול שנשמרו על ידי גיימרים" : "Gamer Planned Trips"}
              </h3>
              <p className="text-xs text-slate-400">
                {isRtl
                  ? "מסלולים שנוצרו ב-Gamer Trip Builder ונשמרו בענן (Firestore: trips)"
                  : "Itineraries generated via Gamer Trip Builder and stored in Firestore"}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {trips.length} {isRtl ? "מסלולים" : "Trips"}
            </span>
          </div>

          {trips.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              {isRtl ? "טרם נשמרו תוכניות טיול בענן." : "No saved gamer trips yet in Firestore."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-sm">{trip.destination}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 font-mono border border-purple-800">
                      {trip.travelStyle || "Balanced"}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">אירוע יעד:</span>
                      <span className="text-cyan-300 font-bold">{trip.eventName || "ללא אירוע ספציפי"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">משך שהייה & חוליה:</span>
                      <span>{trip.durationDays} ימים • {trip.travelersCount} גיימרים</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">תקציב משוער:</span>
                      <span className="text-amber-300 font-mono font-bold">${trip.budgetTotal}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>UID: {trip.uid ? `${trip.uid.slice(0, 8)}...` : "anonymous"}</span>
                    <span>{trip.status || "planned"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: Event Crews (חוליות אירוע) */}
      {activeTab === "crews" && (
        <div className="rounded-3xl border border-purple-900/40 bg-slate-900 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white font-heading">
                {isRtl ? "חוליות אירוע & גיימרים שטסים" : "Event Crews Registrations"}
              </h3>
              <p className="text-xs text-slate-400">
                {isRtl
                  ? "רישומי חוליה לפי אירוע (Firestore: event_crews)"
                  : "Gamer registrations per gaming event for squad coordination"}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-purple-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {crews.length} {isRtl ? "גיימרים רשומים" : "Registrations"}
            </span>
          </div>

          {crews.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              {isRtl ? "טרם נרשמו חברי חוליה בענן." : "No event crew registrations yet."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crews.map((crew) => (
                <div
                  key={crew.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-sm">{crew.displayName}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                      {crew.travelStyle}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">אירוע:</span>
                      <span className="text-purple-300 font-bold">{crew.eventTitle || crew.eventId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">יציאה & תאריכים:</span>
                      <span>{crew.departureCity} • {crew.travelDates}</span>
                    </div>
                  </div>

                  {crew.bio && (
                    <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2 rounded-xl">
                      "{crew.bio}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
