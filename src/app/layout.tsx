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
    { path: "./fonts/rubik-hebrew-900-normal.woff2", weight: "900" },
    { path: "./fonts/rubik-latin-900-normal.woff2", weight: "900" },
    { path: "./fonts/rubik-hebrew-700-normal.woff2", weight: "700" },
    { path: "./fonts/rubik-latin-700-normal.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: { default: "God Mode Traveler", template: "%s | God Mode Traveler" },
  description: "קלפי פוקימון, טורנירים ונסיעות גיימינג, בעברית.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#0E0726" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${body.variable} ${display.variable}`}>
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
