"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, writeConsent, type Consent } from "@/lib/prefs";

export function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!readConsent()) setShow(true); }, []);
  if (!show) return null;
  const choose = (c: Consent) => { writeConsent(c); setShow(false); };
  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-h">
      <div className="cookie-in">
        <div>
          <h2 id="cookie-h">מה נשמר בדפדפן שלכם</h2>
          <p>
            כרגע האתר שומר רק מה שנדרש כדי לעבוד: ההתחברות לחשבון, הגדרות הנגישות והבחירה הזו.
            אין באתר כלי מדידה, פרסום או מעקב אחרי גולשים. אם נוסיף מדידה בעתיד, היא תופעל רק אם תאשרו כאן.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn" onClick={() => choose("all")}>מאשר גם מדידה עתידית</button>
          <button className="btn ghost" onClick={() => choose("essential")}>רק ההכרחי</button>
          <Link href="/legal/cookies">מדיניות הקוקיז</Link>
        </div>
      </div>
    </div>
  );
}
