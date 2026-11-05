import React, { useState, useEffect } from "react";
import { ActiveTab, Destination, EsportsEvent, UserProfile, Quest } from "./types";
import { INITIAL_QUESTS } from "./data/initialQuests";

// Components
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FlagshipGoalsSection } from "./components/FlagshipGoalsSection";
import { FlapBoard } from "./components/FlapBoard";
import { DestinationsView } from "./components/DestinationsView";
import { EventsView } from "./components/EventsView";
import { GamingThemeParksView } from "./components/GamingThemeParksView";
import { UpcomingGamesView } from "./components/UpcomingGamesView";
import { GamingHistoryView } from "./components/GamingHistoryView";
import { SpecialPackagesView } from "./components/SpecialPackagesView";
import { SecretSpotsView } from "./components/SecretSpotsView";
import { InteractiveMapView } from "./components/InteractiveMapView";
import { BookingView } from "./components/BookingView";
import { GuidesView } from "./components/GuidesView";
import { AiAssistantView } from "./components/AiAssistantView";
import { CommunityView } from "./components/CommunityView";
import { ProfileView } from "./components/ProfileView";
import { AdminDashboardView } from "./components/AdminDashboardView";
import { GamerTripBuilder } from "./components/GamerTripBuilder";
import { EventPageView } from "./components/EventPageView";
import { QuestMap } from "./components/QuestMap";
import { Footer } from "./components/Footer";
import { AccessibilityWidget } from "./components/AccessibilityWidget";

// Modals
import { AnimeEventModal } from "./components/AnimeEventModal";
import { LegalAndAccessibilityModal } from "./components/LegalAndAccessibilityModal";
import { MandatoryDisclaimerGate } from "./components/MandatoryDisclaimerGate";
import { ClassPickerModal } from "./components/ClassPickerModal";
import { InventoryModal } from "./components/InventoryModal";
import { LeaderboardModal } from "./components/LeaderboardModal";
import { CameraModal } from "./components/CameraModal";
import { QuizModal } from "./components/QuizModal";
import { AiQuestGeneratorModal } from "./components/AiQuestGeneratorModal";

import { sound } from "./lib/sound";
import { I18nProvider, useI18n } from "./lib/i18n";
import {
  initAuth,
  syncUserProfileToFirebase,
  loadUserProfileFromFirebase,
  auth,
} from "./lib/firebase";

const AppContent: React.FC = () => {
  const { language, isRtl } = useI18n();
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [selectedEvent, setSelectedEvent] = useState<EsportsEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EsportsEvent | null>(null);
  const [tripBuilderInitialEvent, setTripBuilderInitialEvent] = useState<string | undefined>(undefined);
  const [bookingPrefill, setBookingPrefill] = useState<string>("");

  // Firebase state
  const [isFirebaseSynced, setIsFirebaseSynced] = useState<boolean>(false);
  const [firebaseUserId, setFirebaseUserId] = useState<string | null>(null);

  // Modals state
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | "accessibility" | "about" | "disclaimer" | null>(null);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem("gmt_disclaimer_accepted_v1") === "true";
    } catch {
      return false;
    }
  });
  const [isClassPickerOpen, setIsClassPickerOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAiQuestOpen, setIsAiQuestOpen] = useState(false);

  // Quests & Profile state
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Gamer Traveler",
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    characterClass: "Cyber Samurai",
    coins: 680,
    achievements: [
      { id: "ach-1", name: "Akihabara Explorer", icon: "🗼", unlocked: true },
      { id: "ach-2", name: "Gamescom Veteran", icon: "🎮", unlocked: true },
      { id: "ach-3", name: "Mario Kart Legend", icon: "🍄", unlocked: true },
      { id: "ach-4", name: "CS2 Major Finalist", icon: "🏆", unlocked: false },
    ],
    inventory: [
      { id: "inv-1", name: "כרטיס Shinkansen VIP Pass", icon: "🚄", count: 1 },
      { id: "inv-2", name: "צמיד Super Nintendo Power-Up", icon: "🍄", count: 1 },
      { id: "inv-3", name: "תג כניסה VIP Gamescom", icon: "🎟️", count: 2 },
      { id: "inv-4", name: "משקה שיקוי HP Potion", icon: "🧪", count: 5 },
    ],
  });

  // Initialize Firebase Auth & sync user profile
  useEffect(() => {
    initAuth().then(async (user) => {
      if (user) {
        setFirebaseUserId(user.uid);
        setIsFirebaseSynced(true);

        const cloudProfile = await loadUserProfileFromFirebase(user.uid);
        if (cloudProfile) {
          setProfile((prev) => ({
            ...prev,
            name: cloudProfile.name || prev.name,
            level: cloudProfile.level ?? prev.level,
            xp: cloudProfile.xp ?? prev.xp,
            nextLevelXp: cloudProfile.nextLevelXp ?? prev.nextLevelXp,
            characterClass: cloudProfile.characterClass || prev.characterClass,
            coins: cloudProfile.coins ?? prev.coins,
          }));
        } else {
          // Initialize first cloud document
          await syncUserProfileToFirebase(user.uid, {
            name: profile.name,
            level: profile.level,
            xp: profile.xp,
            nextLevelXp: profile.nextLevelXp,
            characterClass: profile.characterClass,
            coins: profile.coins,
            language,
          });
        }
      }
    });
  }, []);

  // Sync profile & language changes to Firebase
  useEffect(() => {
    if (firebaseUserId) {
      syncUserProfileToFirebase(firebaseUserId, {
        name: profile.name,
        level: profile.level,
        xp: profile.xp,
        nextLevelXp: profile.nextLevelXp,
        characterClass: profile.characterClass,
        coins: profile.coins,
        language,
      }).then((success) => {
        if (success) setIsFirebaseSynced(true);
      });
    }
  }, [profile.level, profile.xp, profile.coins, profile.characterClass, language, firebaseUserId]);

  const handleCompleteQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );
    const targetQuest = quests.find((q) => q.id === questId);
    const rewardXp = targetQuest ? targetQuest.xpReward : 300;
    const rewardCoins = targetQuest ? targetQuest.coinReward : 100;

    setProfile((p) => {
      const newXp = p.xp + rewardXp;
      const leveledUp = newXp >= p.nextLevelXp;
      return {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        xp: leveledUp ? newXp - p.nextLevelXp : newXp,
        coins: p.coins + rewardCoins,
      };
    });
  };

  const handleAwardXp = (amount: number) => {
    setProfile((p) => {
      const newXp = p.xp + amount;
      const leveledUp = newXp >= p.nextLevelXp;
      return {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        xp: leveledUp ? newXp - p.nextLevelXp : newXp,
      };
    });
  };

  const handleBookNow = (packageTitle: string) => {
    setBookingPrefill(packageTitle);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectDestination = (dest: Destination) => {
    setActiveTab("destinations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAcceptDisclaimer = () => {
    try {
      localStorage.setItem("gmt_disclaimer_accepted_v1", "true");
    } catch {}
    setIsDisclaimerAccepted(true);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white ${isRtl ? "font-sans" : "font-sans"}`}>
      {/* Mandatory Legal Gate Modal before accessing the site */}
      <MandatoryDisclaimerGate
        isOpen={!isDisclaimerAccepted}
        onAccept={handleAcceptDisclaimer}
      />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => {
          setActiveTab(t);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        profile={profile}
        onOpenDisclaimer={() => setLegalModalType("disclaimer")}
        isFirebaseSynced={isFirebaseSynced}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-12 w-full">
        {viewingEvent ? (
          <EventPageView
            event={viewingEvent}
            onBack={() => setViewingEvent(null)}
            onBuildTrip={(eventId) => {
              setViewingEvent(null);
              setTripBuilderInitialEvent(eventId);
              setActiveTab("trip-builder");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <div className="space-y-12">
                <HeroSection
                  onBuildTrip={() => {
                    setTripBuilderInitialEvent(undefined);
                    setActiveTab("trip-builder");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onExploreEvents={() => {
                    setActiveTab("events");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onJoinCommunity={() => {
                    setActiveTab("community");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />

                <FlapBoard />

                <FlagshipGoalsSection />

                <div className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                      {isRtl ? "יעדי הדגל המובילים" : "Top Gaming Destinations"}
                    </h2>
                    <button
                      onClick={() => setActiveTab("destinations")}
                      className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
                    >
                      {isRtl ? "לכל היעדים ←" : "View All Destinations →"}
                    </button>
                  </div>
                  <DestinationsView onSelectDestination={handleSelectDestination} />
                </div>

                <QuestMap
                  quests={quests}
                  onCompleteQuest={handleCompleteQuest}
                  onOpenScanner={() => setIsCameraOpen(true)}
                  onOpenQuiz={() => setIsQuizOpen(true)}
                />
              </div>
            )}

            {activeTab === "trip-builder" && (
              <GamerTripBuilder
                user={auth.currentUser}
                initialEventId={tripBuilderInitialEvent}
              />
            )}

            {activeTab === "destinations" && (
              <DestinationsView
                onSelectDestination={handleSelectDestination}
                onAwardXp={handleAwardXp}
              />
            )}

            {activeTab === "events" && (
              <EventsView
                onOpenEventModal={(ev) => setSelectedEvent(ev)}
                onBuildTripForEvent={(eventId) => {
                  setTripBuilderInitialEvent(eventId);
                  setActiveTab("trip-builder");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onViewEventPage={(ev) => {
                  setViewingEvent(ev);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {activeTab === "themeparks" && <GamingThemeParksView />}

            {activeTab === "games" && <UpcomingGamesView />}

            {activeTab === "history" && <GamingHistoryView />}

            {activeTab === "packages" && (
              <SpecialPackagesView
                onBookNow={handleBookNow}
                onAwardXp={handleAwardXp}
              />
            )}

            {activeTab === "secret-spots" && (
              <SecretSpotsView
                onBuildTripForSpot={(_city) => {
                  setTripBuilderInitialEvent(undefined);
                  setActiveTab("trip-builder");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {activeTab === "map" && <InteractiveMapView />}

            {activeTab === "booking" && (
              <BookingView initialPackage={bookingPrefill} />
            )}

            {activeTab === "guides" && (
              <GuidesView
                onBuildTripForDestination={(_city) => {
                  setTripBuilderInitialEvent(undefined);
                  setActiveTab("trip-builder");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {activeTab === "ai" && (
              <AiAssistantView
                user={auth.currentUser}
                onOpenTripBuilderWithEvent={(eventId) => {
                  setTripBuilderInitialEvent(eventId);
                  setActiveTab("trip-builder");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {activeTab === "community" && <CommunityView />}

            {activeTab === "profile" && (
              <ProfileView
                profile={profile}
                onOpenClassPicker={() => setIsClassPickerOpen(true)}
                onOpenInventory={() => setIsInventoryOpen(true)}
              />
            )}

            {activeTab === "admin" && <AdminDashboardView />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(type) => setLegalModalType(type)} />

      {/* Floating Accessibility Widget */}
      <AccessibilityWidget />

      {/* Modals */}
      <AnimeEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onBuildTripForEvent={(eventId) => {
          setSelectedEvent(null);
          setTripBuilderInitialEvent(eventId);
          setActiveTab("trip-builder");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewFullPage={(ev) => {
          setSelectedEvent(null);
          setViewingEvent(ev);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        user={auth.currentUser}
      />

      <LegalAndAccessibilityModal
        isOpen={!!legalModalType}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || "terms"}
      />

      <ClassPickerModal
        isOpen={isClassPickerOpen}
        onClose={() => setIsClassPickerOpen(false)}
        currentClass={profile.characterClass}
        onSelectClass={(newCls) =>
          setProfile((p) => ({ ...p, characterClass: newCls }))
        }
      />

      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        inventory={profile.inventory}
        coins={profile.coins}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoUploaded={() => {
          handleCompleteQuest("quest-1");
        }}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onQuizComplete={() => {
          handleCompleteQuest("quest-2");
        }}
      />

      <AiQuestGeneratorModal
        isOpen={isAiQuestOpen}
        onClose={() => setIsAiQuestOpen(false)}
        onQuestGenerated={(title, xp) => {
          const newQ: Quest = {
            id: `q-${Date.now()}`,
            title,
            location: isRtl ? "יעד נבחר" : "Featured Destination",
            category: "AI Generated",
            xpReward: xp,
            coinReward: 200,
            completed: false,
            description: isRtl
              ? "משימה שנוצרה על ידי מנוע ה-AI עבור המסלול שלך."
              : "Quest generated by AI engine for your route.",
          };
          setQuests((prev) => [newQ, ...prev]);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};
