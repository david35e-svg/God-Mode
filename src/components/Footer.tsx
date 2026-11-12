import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <p className="footer-note">
          God Mode Traveler הוא אתר מידע שמפנה לשותפים. אנחנו לא מוכרים טיסות, מלונות או חבילות. על הזמנה דרך קישור שמסומן "קישור שותף" אנחנו עשויים לקבל עמלה, בלי שינוי במחיר. האתר לא קשור למותגים ולאירועים שהוא מזכיר.
        </p>
        <nav aria-label="מידע משפטי">
          <Link href="/legal/terms">תנאי שימוש</Link>
          <Link href="/legal/privacy">פרטיות</Link>
          <Link href="/legal/accessibility">נגישות</Link>
          <Link href="/legal/cookies">קוקיז</Link>
          <Link href="/legal/affiliate">גילוי שותפים</Link>
          <Link href="/contact">יצירת קשר</Link>
        </nav>
      </div>
    </footer>
  );
}
