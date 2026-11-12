import type { MetadataRoute } from "next";
// האתר חסום לסריקה עד שהתוכן המשפטי יאושר. אז מסירים את החסימה כאן,
// וגם את ה-noindex שב-next.config.ts וב-src/app/layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
