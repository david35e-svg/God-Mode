import React from "react";
import { ActiveTab, UserProfile } from "../types";
import {
  Sparkles,
  Gamepad2,
  Trophy,
  Map,
  Compass,
  History,
  Plane,
  Bot,
  Users,
  Shield,
  Menu,
  X,
  Volume2,
  VolumeX,
  Scale,
  Cloud,
} from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: UserProfile;
  onOpenDisclaimer?: () => void;
  isFirebaseSynced?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenDisclaimer,
  isFirebaseSynced = true,
}) => {
  const { t, isRtl } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "home", label: t.nav_home, icon: Gamepad2 },
    { id: "trip-builder", label: isRtl ? "בנה טיול 🎮" : "Trip Builder 🎮", icon: Compass },
    { id: "destinations", label: t.nav_destinations, icon: Compass },
    { id: "events", label: t.nav_events, icon: Trophy },
    { id: "themeparks", label: t.nav_themeparks, icon: Sparkles },
    { id: "games", label: t.nav_games, icon: Gamepad2 },
    { id: "history", label: t.nav_history, icon: History },
    { id: "packages", label: t.nav_packages, icon: Plane },
    { id: "secret-spots", label: t.nav_secretSpots, icon: Map },
    { id: "map", label: t.nav_map, icon: Compass },
    { id: "booking", label: t.nav_booking, icon: Plane },
    { id: "ai", label: t.nav_ai, icon: Bot },
    { id: "community", label: t.nav_community, icon: Users },
    { id: "profile", label: t.nav_profile, icon: Shield },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    sound.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            onClick={() => handleTabClick("home")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400">
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <span className="font-black text-sm sm:text-lg text-white font-heading tracking-tight block leading-tight">
                GOD MODE <span className="text-cyan-400">TRAVELER</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-purple-300 font-mono tracking-widest block">
                {t.appSub}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Firebase Live Cloud Status Indicator */}
            <div
              className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono font-bold border ${
                isFirebaseSynced
                  ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
              title={isFirebaseSynced ? t.firebase_connected : t.firebase_syncing}
            >
              <Cloud className={`w-3 h-3 ${isFirebaseSynced ? "text-emerald-400 animate-pulse" : "text-slate-400"}`} />
              <span className="hidden lg:inline">Firebase</span>
            </div>

            {onOpenDisclaimer && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDisclaimer();
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:text-amber-200 hover:bg-amber-900/60 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
                title={t.legal_btn}
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.legal_btn}</span>
              </button>
            )}

            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              title={isMuted ? t.sound_unmute : t.sound_mute}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => handleTabClick("profile")}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-700/40 text-white cursor-pointer hover:bg-purple-900/60 transition-all"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-cyan-500 text-slate-950 font-black text-[11px] sm:text-xs flex items-center justify-center font-mono">
                {profile.level}
              </span>
              <span className="text-xs font-bold hidden sm:inline">{profile.name}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-purple-900/30 grid grid-cols-2 gap-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    isRtl ? "text-right" : "text-left"
                  } ${isActive ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-300"}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
            {onOpenDisclaimer && (
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onOpenDisclaimer();
                }}
                className="p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 text-amber-300 col-span-2 justify-center cursor-pointer"
              >
                <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.legal_btn}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
