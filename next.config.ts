import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // נדרש לחלון ההתחברות של Google
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // האתר לא נסרק עד שהתוכן המשפטי והעובדתי יאושרו
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};
export default config;
