export interface TripStepItem {
  id: string;
  name: string;
  price: number;
  description: string;
  tag: string;
}

export const TRIP_STEPS = {
  destinations: [
    { id: "dest-tokyo", name: "טוקיו & אוסקה (יפן)", price: 1200, tag: "גיימינג רטרו ופארקים" },
    { id: "dest-cologne", name: "קלן (גרמניה)", price: 700, tag: "Gamescom & eSports" },
    { id: "dest-seoul", name: "סיאול (דרום קוריאה)", price: 950, tag: "PC Bangs & LCK" },
    { id: "dest-la", name: "לוס אנג'לס (ארה\"ב)", price: 1300, tag: "Nintendo World & Esports" }
  ],
  durations: [
    { id: "dur-5", name: "5 ימים (אקספרס)", multiplier: 1 },
    { id: "dur-8", name: "8 ימים (המומלץ ביותר)", multiplier: 1.5 },
    { id: "dur-12", name: "12 ימים (VIP Ultimate)", multiplier: 2.1 }
  ],
  styles: [
    { id: "style-esports", name: "🏆 ממוקד טורנירים ו-eSports", bonusPrice: 250 },
    { id: "style-theme-parks", name: "🍄 ממוקד פארקי שעשועים ונינטנדו", bonusPrice: 350 },
    { id: "style-retro-hunt", name: "👾 ממוקד מסע ציד רטרו וארקיידים", bonusPrice: 150 }
  ]
};
