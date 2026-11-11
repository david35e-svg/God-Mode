"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";

const NAV = [
  ["/shop", "חנות קלפים"], ["/events", "אירועים"], ["/destinations", "עולמות"], ["/parks", "פארקים"],
  ["/guides", "מדריכים"], ["/planner", "בונה טיול"], ["/community", "קהילה"],
] as const;

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  useEffect(() => setOpen(false), [path]);
  const items = [...NAV, ...(isAdmin ? ([["/admin", "ניהול"]] as const) : [])];
  return (
    <header className="site-header">
      <Link href="/" className="logo" dir="ltr" aria-label="God Mode Traveler, לדף הבית"><span className="logo-mark" aria-hidden />GOD MODE<span> TRAVELER</span></Link>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav" aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"} onClick={() => setOpen(!open)}>
        {open ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>
      <nav id="nav" aria-label="ראשי" data-open={open}>
        {items.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}>{label}</Link>
        ))}
        <Link href="/account" className="nav-account" aria-current={path.startsWith("/account") ? "page" : undefined}>
          {user ? "החשבון שלי" : "התחברות"}
        </Link>
      </nav>
    </header>
  );
}
