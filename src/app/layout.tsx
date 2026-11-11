import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  title: { default: "God Mode Traveler", template: "%s | God Mode Traveler" },
  description: "מקומות גיימינג נסתרים בעולם, חנות קלפים וטורנירים. בעברית.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#060911" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">דילוג לתוכן</a>
        <AuthProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
