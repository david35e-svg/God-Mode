import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { A11yMenu } from "@/components/A11yMenu";
import { CookieNotice } from "@/components/CookieNotice";
import { InstallApp } from "@/components/InstallApp";
import { Hud } from "@/components/Hud";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/site";

const body = localFont({
  variable: "--font-body", display: "swap",
  src: [
    { path: "./fonts/ibm-plex-sans-hebrew-hebrew-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-hebrew-hebrew-600-normal.woff2", weight: "600" },
    { path: "./fonts/ibm-plex-sans-hebrew-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-hebrew-latin-600-normal.woff2", weight: "600" },
  ],
});
const display = localFont({
  variable: "--font-display", display: "swap",
  src: [
    { path: "./fonts/heebo-hebrew-900-normal.woff2", weight: "900" },
    { path: "./fonts/heebo-latin-900-normal.woff2", weight: "900" },
    { path: "./fonts/heebo-hebrew-700-normal.woff2", weight: "700" },
    { path: "./fonts/heebo-latin-700-normal.woff2", weight: "700" },
  ],
});
const mono = localFont({
  variable: "--font-mono", display: "swap", preload: false,
  src: "./fonts/ibm-plex-mono-latin-500-normal.woff2",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website", locale: "he_IL", siteName: SITE_NAME,
    title: SITE_NAME, description: SITE_DESC, url: SITE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "God Mode Traveler: מקומות גיימינג נסתרים בעולם" }],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESC, images: ["/og.png"] },
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
  appleWebApp: { capable: true, title: "God Mode", statusBarStyle: "black-translucent" },
};
export const viewport: Viewport = { themeColor: "#060911" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">דילוג לתוכן</a>
        <Hud />
        <AuthProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <A11yMenu />
          <CookieNotice />
          <InstallApp />
        </AuthProvider>
      </body>
    </html>
  );
}
