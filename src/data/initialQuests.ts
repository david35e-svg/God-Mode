import { Quest } from "../types";

export const INITIAL_QUESTS: Quest[] = [
  {
    id: "quest-1",
    title: "מגלה העולמות של אקיהברה",
    location: "טוקיו, יפן",
    category: "Exploration",
    xpReward: 350,
    coinReward: 100,
    completed: false,
    description: "בקר ב-3 חנויות רטרו נסתרות ברובע אקיהברה וצלם פריט אספנות נדיר משנות ה-90.",
  },
  {
    id: "quest-2",
    title: "אלוף הארקייד של שיבויה",
    location: "טוקיו, יפן",
    category: "Arcade Master",
    xpReward: 500,
    coinReward: 250,
    completed: false,
    description: "שחק ב-Taiko no Tatsujin או Street Fighter ב-SEGA Tower והשג דירוג A.",
  },
  {
    id: "quest-3",
    title: "עלייה לרגל לקתדרלת ה-CS2",
    location: "קלן, גרמניה",
    category: "Esports Pilgrim",
    xpReward: 400,
    coinReward: 150,
    completed: false,
    description: "הצטלם מחוץ לאולם LANXESS Arena במהלך אירוע IEM Cologne או Gamescom.",
  }
];
