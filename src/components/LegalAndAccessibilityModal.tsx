import React from "react";
import { X, ShieldCheck, FileText, Lock, Eye, Scale } from "lucide-react";
import { sound } from "../lib/sound";
import { useI18n } from "../lib/i18n";

interface LegalAndAccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy" | "accessibility" | "about" | "disclaimer";
}

export const LegalAndAccessibilityModal: React.FC<LegalAndAccessibilityModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { isRtl, language } = useI18n();
  if (!isOpen) return null;

  const isEnglishOrOther = language !== "he";

  const contentMapHe = {
    disclaimer: {
      title: "הבהרה משפטית, פטור מאחריות וגילוי נאות (Affiliate Disclosure)",
      icon: Scale,
      body: [
        "1. מהות האתר: האתר 'God Mode Traveler' הינו פלטפורמת תוכן עצמאית בלבד להנגשת מידע, סיקורים, לוחות זמנים והמלצות אודות כנסי גיימינג, תערוכות בינלאומיות (כדוגמת Gamescom, Tokyo Game Show), טורנירי eSports ופארקי שעשועים ברחבי העולם.",
        "2. העדר מעמד כסוכנות נסיעות: האתר אינו אתר שמוכר חבילות תיירות, אינו סוכנות נסיעות, אינו מארגן תיירות, ואינו משמש כספק שירותי תעופה, לינה או נופש. אין לראות בפרסומים באתר משום הצעה למכירת חבילות תיירות מטעם האתר.",
        "3. פטור מוחלט מאחריות לטיסות ואירועים: מן האתר ניתן לעבור ולהתחבר לרכישת טיסות, מלונות או כרטיסים הנעשים ישירות מול צדדים שלישיים, חברות תעופה ופלטפורמות כרטוס רשמיות. כל רכישה של טיסות, כרטיסי כניסה או שירותים נלווים נעשית על דעתו ואחריותו הבלעדית של המשתמש וללא שום אחריות של בעלי האתר, מנהליו או מפעיליו.",
        "4. הסרת אחריות מביטולי עסקה וביטולי טיסות: בעלי האתר ומפעיליו אינם נושאים בכל אחריות ישירה, עקיפה, תוצאתית או נזיקית בגין ביטולי טיסות, עיכובי טיסות, ביטולי עסקאות, שינויים בלוחות זמנים, שביתות, כוח עליון, או ביטול/דחיית כנסים. כל פנייה לביטול עסקה, החזר כספי או שינוי תנאים תתבצע ישירות ומול ספק השירות או חברת התעופה הרלוונטית בהתאם למדיניותה.",
        "5. בדיקה עצמאית: באחריות המשתמש לבדוק באופן עצמאי טרם הרכישה את כלל התנאים, מועדי הכנסים, ביטוח הנסיעות ודרישות הכניסה ליעדים השונים.",
        "6. גילוי נאות אודות קישורי שותפים ועמלות (Affiliate Disclosure): בהתאם לחוק הגנת הצרכן והנחיות הרשות להגנת הצרכן ולסחר הוגן, מובהר בזאת כי חלק מהקישורים באתר הינם קישורי שותפים (Affiliate links). ברכישת שירות, כרטיס טיסה או כניסה לכנס דרך קישורים אלו, עשויה להשתלם למפעילי האתר עמלת הפניה מהספק. עמלה זו אינה כרוכה בכל תוספת תשלום מצידכם ואינה משפיעה על מחיר השירות לצרכן. אין בקבלת העמלה כדי להטיל על בעלי האתר אחריות כלשהי בגין השירות הנרכש.",
      ],
    },
    terms: {
      title: "תנאי שימוש ותקנון האתר (כולל הבהרת אי-אחריות וגילוי נאות)",
      icon: FileText,
      body: [
        "ברוכים הבאים ל-God Mode Traveler. השימוש באתר ובשירותי הנגשת המידע כפוף לתנאים המפורטים להלן.",
        "האתר מנגיש כנסים ואירועי גיימינג ומאפשר הפניה לרכישת טיסות וכרטיסים ישירות מול ספקים חיצוניים – ללא שום אחריות של בעלי האתר ומפעיליו.",
        "גילוי נאות אודות קישורי שותפים: חלק מהקישורים באתר הינם קישורי שותפים מסחריים (Affiliate Links). בעת ביצוע רכישה דרך קישור כזה עשויה להשתלם למפעילי האתר עמלת הפניה מספק השירות, ללא כל עלות נוספת עבורכם. המחיר לצרכן אינו מושפע מכך.",
        "כל המחירים, ההערכות והמסלולים המוצגים הם להמחשה ולמידע כללי בלבד. התנאים המחייבים לעסקאות רכש הינם אך ורק אלו הנקבעים על ידי ספק הטיסה, הכנס או המלון הנבחר.",
      ],
    },
    privacy: {
      title: "מדיניות פרטיות ואבטחת מידע",
      icon: Lock,
      body: [
        "אנו מכבדים את פרטיותך ומחויבים להגנה קפדנית על המידע האישי שלך.",
        "המידע המוזן בטפסי ההתעניינות מסונכרן לענן Firebase המאובטח ומשמש אך ורק לצורך התאמת מסלול והמלצות תוכן, ואינו מועבר לצדדים שלישיים ללא אישורך.",
        "האתר מאובטח בפרוטוקול SSL/TLS מוצפן בתקן המחמיר ביותר.",
      ],
    },
    accessibility: {
      title: "הצהרת נגישות (תקן ישראלי 5568 / WCAG 2.1 AA)",
      icon: Eye,
      body: [
        "אנו ב-God Mode Traveler רואים חשיבות עליונה במתן שירות שוויוני לכלל המשתמשים, לרבות אנשים עם מוגבלויות.",
        "האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013, ברמת AA.",
        "האתר כולל סרגל נגישות ייעודי המאפשר שינוי גודל גופן, ניגודיות גבוהה, הדגשת קישורים, עצירת אנימציות וניווט מלא באמצעות מקלדת.",
        "רכז הנגישות: accessibility@godmodetraveler.com",
      ],
    },
    about: {
      title: "אודות God Mode Traveler",
      icon: ShieldCheck,
      body: [
        "God Mode Traveler היא פלטפורמת תוכן והנגשת מידע קהילתית לקהל חובבי הגיימינג וה-eSports בישראל ובעולם.",
        "הפלטפורמה נוצרה כדי לחבר בין שחקנים לבין כנסי גיימינג בינלאומיים, תערוכות ופארקי שעשועים, תוך הנגשת מידע מקיף וטיפים למטיילים.",
      ],
    },
  };

  const contentMapEn = {
    disclaimer: {
      title: "Legal Disclaimer, Limitation of Liability & Affiliate Disclosure",
      icon: Scale,
      body: [
        "1. Nature of the Platform: 'God Mode Traveler' is an independent content and discovery platform strictly dedicated to providing event summaries, expo schedules, and travel recommendations regarding international gaming expos (such as Gamescom, Tokyo Game Show), eSports tournaments, and gaming theme parks worldwide.",
        "2. No Travel Agency Status: The website does not sell package tours, is not a licensed travel agency, does not organize tourist packages, and does not act as an airline carrier or accommodation provider. Nothing published on this site constitutes an offer to sell tour packages on behalf of the website.",
        "3. Independent Booking & Full Exemption: Users may navigate from this site to book flights, hotels, or tickets directly with official ticketing platforms and airlines. Any purchase of travel or event tickets is conducted entirely at the user's sole risk and discretion, with zero liability on the website owners or operators.",
        "4. Full Waiver of Liability for Flight & Transaction Cancellations: The owners, developers, and operators bear no direct, indirect, or consequential liability for flight cancellations, delays, rescheduling, transaction cancellations, strikes, or event postponements. Any refund or cancellation request must be submitted directly to the airline or provider from which the service was purchased.",
        "5. Independent Verification: It is the user's responsibility to verify passport validity, visa prerequisites, travel insurance coverage, and cancellation rules prior to booking.",
        "6. Affiliate Disclosure & Referral Commissions: Certain links on this website are affiliate links. When purchasing services or tickets through these links, site operators may receive a referral commission at no additional cost to you. This does not increase the price you pay and creates no provider liability for the website owners.",
      ],
    },
    terms: {
      title: "Terms of Service & Rules of Use",
      icon: FileText,
      body: [
        "Welcome to God Mode Traveler. By using this website, you agree to comply with all terms and conditions set forth herein.",
        "The site aggregates gaming expo data and provides referrals for flights and tickets directly with external suppliers — without any liability on the website operators.",
        "Commercial Affiliate Disclosure: Certain links are commercial affiliate links from which a referral fee may be earned without increasing the user's purchase price.",
        "All itineraries and price estimates are for informational preview purposes only. Legally binding agreements exist solely between the user and the chosen travel/event vendor.",
      ],
    },
    privacy: {
      title: "Privacy Policy & Firebase Security",
      icon: Lock,
      body: [
        "We prioritize user privacy and secure data processing.",
        "Inquiries submitted through our forms are securely synced to cloud Firestore and utilized exclusively for routing and advisory purposes.",
        "All communications are encrypted using standard SSL/TLS protocol.",
      ],
    },
    accessibility: {
      title: "Accessibility Statement (WCAG 2.1 AA)",
      icon: Eye,
      body: [
        "God Mode Traveler is dedicated to ensuring an accessible, equitable digital experience for all users, including individuals with disabilities.",
        "The site conforms to WCAG 2.1 AA standards, featuring high contrast options, keyboard navigation, readable typography, and an interactive accessibility toolbar.",
        "Accessibility Contact: accessibility@godmodetraveler.com",
      ],
    },
    about: {
      title: "About God Mode Traveler",
      icon: ShieldCheck,
      body: [
        "God Mode Traveler is an independent global gaming tourism platform built by passionate gamers for the gaming and eSports community.",
        "We help gamers explore international conventions, competitive stadiums, and anime hotspots with curated guides and itineraries.",
      ],
    },
  };

  const contentMap = isEnglishOrOther ? contentMapEn : contentMapHe;
  const current = contentMap[type] || contentMap.disclaimer;
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div
        className={`relative w-full max-w-2xl bg-slate-900 border border-purple-800/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${
          isRtl ? "text-right dir-rtl" : "text-left dir-ltr"
        }`}
      >
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-900/40 text-cyan-400 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-xl font-black text-white font-heading">{current.title}</h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          {current.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="pt-4 border-t border-purple-900/30 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="py-2 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
          >
            {isRtl ? "סגור" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
