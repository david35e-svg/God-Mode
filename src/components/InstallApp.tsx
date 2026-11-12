"use client";
import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type Prompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const DISMISSED = "gmt.install.dismissed";

export function InstallApp() {
  const [deferred, setDeferred] = useState<Prompt | null>(null);
  const [ios, setIos] = useState(false);
  const [howTo, setHowTo] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // רושם את ה-service worker, שבלעדיו הדפדפן לא יציע התקנה
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});

    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || (navigator as { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try { dismissed = localStorage.getItem(DISMISSED) === "1"; } catch { /* גלישה פרטית */ }
    if (standalone || dismissed) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIos(isIos);
    setHidden(!isIos);

    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as Prompt); setHidden(false); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const onInstalled = () => setHidden(true);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const close = () => {
    setHidden(true); setHowTo(false);
    try { localStorage.setItem(DISMISSED, "1"); } catch { /* גלישה פרטית */ }
  };

  const install = async () => {
    if (ios) { setHowTo(true); return; }
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") setHidden(true);
  };

  if (hidden) return null;
  return (
    <div className="install">
      <div className="install-in">
        <div>
          <h2>להתקין כאפליקציה?</h2>
          {howTo
            ? <p>בסרגל התחתון של Safari לוחצים על כפתור השיתוף <Share aria-hidden size={15} />, גוללים ובוחרים <b>הוספה למסך הבית</b>.</p>
            : <p>האתר ייפתח במסך מלא מהמסך הראשי, ועמודים שכבר ביקרתם בהם יעבדו גם בלי אינטרנט.</p>}
        </div>
        <div className="install-actions">
          {!howTo && <button className="btn small" onClick={install}><Download aria-hidden size={16} />התקנה</button>}
          <button className="a11y-x" onClick={close} aria-label="סגירה, בלי להתקין"><X aria-hidden size={20} /></button>
        </div>
      </div>
    </div>
  );
}
