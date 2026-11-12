import type { NextConfig } from "next";
// תצורה לתצוגה מקדימה סטטית בלבד. הפריסה האמיתית משתמשת ב-next.config.ts.
const config: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true } };
export default config;
