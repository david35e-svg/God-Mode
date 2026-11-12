import type { MetadataRoute } from "next";
import { DESTINATIONS, EVENTS, GUIDES } from "@/data/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = new Date();
  const paths = [
    "/", "/spots", "/shop", "/events", "/destinations", "/guides", "/planner", "/community", "/contact",
    ...DESTINATIONS.map((d) => `/destinations/${d.id}`),
    ...EVENTS.map((e) => `/events/${e.id}`),
    ...GUIDES.map((g) => `/guides/${g.id}`),
    ...["terms", "privacy", "cookies", "accessibility", "affiliate"].map((d) => `/legal/${d}`),
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: at }));
}
