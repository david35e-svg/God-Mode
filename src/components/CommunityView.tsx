import React, { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Send,
  Plane,
  Calendar,
  MapPin,
  Compass,
  Trophy,
  Filter,
  PlusCircle,
} from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import {
  loadCommunityPostsFirebase,
  createCommunityPostFirebase,
  loadAllEventCrewsFirebase,
} from "../lib/firebase";
import { EventCrewModal } from "./EventCrewModal";

interface CommunityViewProps {
  initialEventFilter?: string | null;
  onOpenTripBuilderWithEvent?: (eventId: string) => void;
  user?: any;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  initialEventFilter,
  onOpenTripBuilderWithEvent,
  user,
}) => {
  const { t, isRtl, language } = useI18n();

  const [activeSubTab, setActiveSubTab] = useState<"crews" | "feed">(
    initialEventFilter ? "crews" : "crews"
  );
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>(
    initialEventFilter || "all"
  );

  // Event Crews State
  const [crews, setCrews] = useState<any[]>([]);
  const [loadingCrews, setLoadingCrews] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [crewModalEvent, setCrewModalEvent] = useState({ id: "gamescom-2026", title: "Gamescom Cologne 2026" });

  // Community Feed State
  const [posts, setPosts] = useState<any[]>([
    {
      id: "p1",
      author: "NeoAkira",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      destination: "טוקיו, יפן",
      content: "הרגע חזרתי מ-Akihabara Super Potato! מצאתי עותק מקורי סגור של Chrono Trigger לסופר נינטנדו במחיר מדהים. ממליץ בחום לעלות לקומה 5!",
      likes: 42,
      time: "לפני שעתיים",
      category: "shopping",
    },
    {
      id: "p2",
      author: "CyberValkyrie",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      destination: "קלן, גרמניה",
      content: "מישהו פה מגיע ל-Gamescom באוגוסט? אנחנו מארגנים מפגש ישראלים בבר ה-Meltdown בערב של יום חמישי!",
      likes: 28,
      time: "לפני 5 שעות",
      category: "meetup",
    },
    {
      id: "p3",
      author: "Dan_SeoulGamer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      destination: "סיאול, דרום קוריאה",
      content: "טיפ למי שטס לגמר LoL Worlds בסיאול: מועדון T1 Base Camp בהונגדה מאפשר כניסה עם כרטיס אשראי בינלאומי. מפרט המחשבים שם פסיכי (RTX 4090 בכל עמדה)!",
      likes: 35,
      time: "אתמול",
      category: "tips",
    },
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("meetup");

  useEffect(() => {
    if (initialEventFilter) {
      setSelectedEventFilter(initialEventFilter);
    }
  }, [initialEventFilter]);

  // Load Crews & Posts from Firebase
  useEffect(() => {
    fetchCrews();
    fetchPosts();
  }, []);

  const fetchCrews = async () => {
    setLoadingCrews(true);
    try {
      const data = await loadAllEventCrewsFirebase();
      if (data.length > 0) {
        setCrews(data);
      } else {
        // Fallback default mock crews so it's lively out of the box
        setCrews([
          {
            id: "c1",
            eventId: "gamescom-2026",
            eventTitle: "Gamescom Cologne 2026",
            displayName: "Alon_TLV",
            departureCity: "תל אביב (TLV)",
            travelDates: "26-30 אוגוסט 2026",
            travelStyle: "Squad Leader",
            bio: "מארגן חוליה של 4 חברים, נשארו 2 מקומות בדירה צמודה למרכז הירידים!",
          },
          {
            id: "c2",
            eventId: "gamescom-2026",
            eventTitle: "Gamescom Cologne 2026",
            displayName: "Rotem_FPS",
            departureCity: "תל אביב (TLV)",
            travelDates: "25-30 אוגוסט",
            travelStyle: "Balanced Solo",
            bio: "מחפש שותף לטיסה ולבר הגיימינג בערב.",
          },
          {
            id: "c3",
            eventId: "tgs-2026",
            eventTitle: "Tokyo Game Show 2026",
            displayName: "Kobi_Retro",
            departureCity: "נתב״ג (TLV)",
            travelDates: "23-30 ספטמבר",
            travelStyle: "VIP Explorer",
            bio: "טס לשבוע שלם בטוקיו כולל TGS וסיור ארקייד באקיהברה ושינג'וקו.",
          },
          {
            id: "c4",
            eventId: "lol-worlds-2026",
            eventTitle: "League of Legends Worlds Finals",
            displayName: "Guy_MidLane",
            departureCity: "תל אביב",
            travelDates: "04-10 נובמבר",
            travelStyle: "Squad Leader",
            bio: "רכשתי כרטיס לגמר! מחפש חבר'ה שרוצים לחרוש PC Bangs בלילות.",
          },
          {
            id: "c5",
            eventId: "iem-cologne-2026",
            eventTitle: "IEM Cologne CS2 Cathedral",
            displayName: "Yuval_Aero",
            departureCity: "תל אביב",
            travelDates: "17-21 יולי",
            travelStyle: "Budget Gamer",
            bio: "טס עם חבר, מחפשים המלצות להוסטל טוב ליד לנקסס ארנה.",
          },
        ]);
      }
    } catch (e) {
      console.error("Failed to load crews:", e);
    } finally {
      setLoadingCrews(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await loadCommunityPostsFirebase();
      if (data.length > 0) {
        setPosts(data);
      }
    } catch (e) {
      console.error("Failed to load posts:", e);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    sound.playLevelUp();

    const postObj = {
      author: user?.displayName || "Gamer_" + Math.floor(Math.random() * 900 + 100),
      authorUid: user?.uid || "guest_uid",
      avatar:
        user?.photoURL ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      destination: "אירוע גיימינג עולמי",
      content: newPostText.trim(),
      category: newPostCategory,
      likes: 1,
      time: "עכשיו",
    };

    setPosts([postObj, ...posts]);
    setNewPostText("");

    try {
      await createCommunityPostFirebase(postObj);
    } catch (e) {
      console.error("Failed to save post to Firebase:", e);
    }
  };

  const filteredCrews =
    selectedEventFilter === "all"
      ? crews
      : crews.filter((c) => c.eventId === selectedEventFilter);

  return (
    <div className={`space-y-8 max-w-5xl mx-auto ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}>
      {/* Header Banner */}
      <div className="rounded-3xl border border-purple-800/40 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>קהילת הגיימרים המטיילים • SQUAD CO-OP HUB</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-heading">
          מצא חוליה שטסה לאותו אירוע
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          מתכננים לטוס ל-Gamescom, Worlds או Tokyo Game Show? הצטרף לחוליית האירוע (Event Crew), מצא שותפים לטיסה ולמלון, וקבל טיפים חיים מגיימרים שהיו שם.
        </p>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveSubTab("crews");
            }}
            className={`py-2.5 px-5 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === "crews"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>מי טס איתי? (חוליות אירוע)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveSubTab("feed");
            }}
            className={`py-2.5 px-5 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === "feed"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>פורום טיפים & שופינג בלייב</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Event Crews (מי טס איתי?) */}
      {activeSubTab === "crews" && (
        <div className="space-y-6">
          {/* Event Filter & Join Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>סנן לפי אירוע:</span>
              </span>
              {[
                { id: "all", label: "כל האירועים" },
                { id: "gamescom-2026", label: "Gamescom" },
                { id: "tgs-2026", label: "Tokyo Game Show" },
                { id: "lol-worlds-2026", label: "LoL Worlds" },
                { id: "iem-cologne-2026", label: "IEM Cologne" },
              ].map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedEventFilter(ev.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedEventFilter === ev.id
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {ev.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setCrewModalEvent({
                  id: selectedEventFilter === "all" ? "gamescom-2026" : selectedEventFilter,
                  title:
                    selectedEventFilter === "tgs-2026"
                      ? "Tokyo Game Show 2026"
                      : selectedEventFilter === "lol-worlds-2026"
                      ? "League of Legends Worlds"
                      : selectedEventFilter === "iem-cologne-2026"
                      ? "IEM Cologne"
                      : "Gamescom Cologne 2026",
                });
                setIsCrewModalOpen(true);
              }}
              className="w-full sm:w-auto py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer flex-shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>הוסף אותי לחוליית הטסים</span>
            </button>
          </div>

          {/* Crews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCrews.map((crew, idx) => (
              <div
                key={crew.id || idx}
                className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-600/40 transition-all shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center font-mono">
                      {crew.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm block">
                        {crew.displayName}
                      </span>
                      <span className="text-[11px] text-cyan-400 font-mono">
                        {crew.eventTitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 font-mono border border-purple-800">
                    {crew.travelStyle}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ממריא מ-{crew.departureCity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>תאריכים: {crew.travelDates}</span>
                  </div>
                </div>

                {crew.bio && (
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 leading-relaxed italic">
                    "{crew.bio}"
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">חבר בקהילת GOD MODE</span>
                  {onOpenTripBuilderWithEvent && (
                    <button
                      onClick={() => {
                        sound.playLevelUp();
                        onOpenTripBuilderWithEvent(crew.eventId);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>בנה טיול לאירוע זה</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Live Forum & Community Feed */}
      {activeSubTab === "feed" && (
        <div className="space-y-6">
          {/* New Post Form */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-purple-900/40 shadow-xl space-y-3">
            <textarea
              rows={3}
              placeholder="שתף טיפ על אירוע, מקום גיימינג שווה שגילית, או שאלה לקהילה..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-purple-900/40 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">קטגוריה:</span>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="meetup">מפגשים & חיפוש חוליה (Meetup)</option>
                  <option value="tips">טיפים לנסיעה (Tips)</option>
                  <option value="shopping">שופינג & רטרו (Shopping)</option>
                  <option value="general">כללי (General)</option>
                </select>
              </div>

              <button
                onClick={handleCreatePost}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>פרסם פוסט לקהילה</span>
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post, pIdx) => (
              <div
                key={post.id || pIdx}
                className="p-5 rounded-3xl bg-slate-900 border border-purple-900/30 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                    />
                    <div>
                      <span className="font-bold text-white text-xs block font-heading">
                        {post.author}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {post.destination}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{post.time}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {post.content}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800">
                  <button
                    onClick={() => sound.playCoin()}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes} לייקים</span>
                  </button>
                  <button
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>הגב לפוסט</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Join Event Crew Modal */}
      <EventCrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        eventId={crewModalEvent.id}
        eventTitle={crewModalEvent.title}
        user={user}
        onJoinedSuccess={fetchCrews}
      />
    </div>
  );
};

