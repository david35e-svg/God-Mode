import type { MetadataRoute } from "next";
import { SITE_DESC, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "God Mode",
    description: SITE_DESC,
    lang: "he",
    dir: "rtl",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#060911",
    theme_color: "#060911",
    orientation: "portrait",
    categories: ["travel", "games"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "מקומות נסתרים", url: "/spots" },
      { name: "חנות קלפים", url: "/shop" },
      { name: "אירועים", url: "/events" },
    ],
  };
}
