import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "he" | "en" | "ja" | "es";

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  dir: "rtl" | "ltr";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "he", label: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "en", label: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ja", label: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
];

export const translations = {
  he: {
    // App Brand
    appName: "GOD MODE TRAVELER",
    appSub: "תיירות גיימינג & ספורט אלקטרוני",
    
    // Nav
    nav_home: "ראשי",
    nav_trip_builder: "בונה טיול",
    nav_destinations: "יעדים",
    nav_events: "טורנירים & אקספו",
    nav_themeparks: "פארקי נינטנדו",
    nav_games: "משחקי 2025-27",
    nav_history: "היסטוריית גיימינג",
    nav_packages: "חבילות VIP",
    nav_secretSpots: "ספוטים סודיים",
    nav_map: "מפת עולם",
    nav_booking: "הזמנת מסע",
    nav_ai: "AI Guide",
    nav_community: "קהילה",
    nav_profile: "פרופיל",
    
    // Controls & Status
    legal_btn: "הבהרה משפטית",
    sound_mute: "השתק סאונד",
    sound_unmute: "הפעל סאונד",
    firebase_connected: "ענן Firebase מחובר",
    firebase_syncing: "מסנכרן לענן...",
    firebase_guest: "שחקן אורח מסונכרן",
    level: "רמה",
    coins: "מטבעות",
    xp: "XP",

    // Disclaimer Gate Modal
    gate_badge: "הודעה משפטית מחייבת",
    gate_title: "הבהרה משפטית, הגבלת אחריות ותנאי כניסה לאתר",
    gate_required: "אישור תנאים נדרש לצפייה",
    gate_intro: "שים לב: השימוש באתר זה, עיון בתכניו, וכל פעולה או הפניה מתוכו כפופים באופן מוחלט להסכמתך להבהרה המשפטית המנוסחת להלן.",
    gate_p1_title: "1. מהות האתר – פלטפורמת מידע והנגשת כנסים בלבד",
    gate_p1_desc: "האתר God Mode Traveler הינו פלטפורמת תוכן עצמאית שמטרתה הבלעדית היא הנגשת מידע, סקירות, לוחות זמנים והמלצות בנושאי כנסי גיימינג, תערוכות בינלאומיות (דוגמת Gamescom, Tokyo Game Show), טורנירי ספורט אלקטרוני (eSports) ואטרקציות גיימינג ברחבי העולם.",
    gate_p2_title: "2. אי-מכירת חבילות תיירות והעדר מעמד כסוכנות נסיעות",
    gate_p2_desc: "האתר אינו אתר שמוכר חבילות תיירות, אינו סוכנות נסיעות, אינו מארגן תיירות, ואינו משמש כספק שירותי תעופה, לינה או נופש. האתר אינו צד בעסקה ואינו גובה תשלומים עבור טיסות, בתי מלון או כרטיסי כניסה רשמיים לתערוכות.",
    gate_p3_title: "3. רכישת טיסות וכרטיסים – אחריות בלעדית של המשתמש וללא אחריות בעלי האתר",
    gate_p3_desc: "כל הפניה, קישור, הצעת מחיר או נתון המופיע באתר ביחס לטיסות, אירועים ומלונות נועדו לספק מידע והנגשה בלבד. מובהר באופן חד-משמעי כי מאתר זה ודרכו ניתן לעבור לרכישת טיסות ואירועים ישירות מול ספקים חיצוניים ו/או חברות תעופה – ללא שום אחריות, ערבות או חבות של בעלי האתר, מנהליו או מפעיליו.",
    gate_p4_title: "4. פטור מוחלט מאחריות בגין ביטולי עסקה, ביטולי טיסות ושינויים",
    gate_p4_desc: "בעלי האתר, מפעיליו וכל גורם מטעמם אינם אחראים ולא יישאו בשום אחריות ישירה, עקיפה, תוצאתית או נזיקית בגין ביטולי עסקה, ביטולי טיסות, דחיות או עיכובים של טיסות, ביטול או דחייה של כנסים ואירועים, שביתות, סירוב כניסה למדינות, אירועי כוח עליון, או כל נזק כספי שעלול להיגרם למשתמש. כל פנייה לביטול או שינוי תופנה ישירות לספק השירות.",
    gate_p5_title: "5. חובת בדיקה עצמאית והצהרת המשתמש",
    gate_p5_desc: "באחריות המשתמש לבדוק באופן עצמאי ומעמיק את תקפות מועדי האירועים, תנאי הכרטיסים, דרכונים, אשרות כניסה (ויזה), פוליסות ביטוח נסיעות מתאימות, ואת מדיניות הביטולים והשינויים מול הגורמים המורשים טרם כל רכישה או התחייבות.",
    gate_p6_title: "6. גילוי נאות אודות קישורי שותפים ועמלות (Affiliate Disclosure)",
    gate_p6_desc: "בהתאם לחוק הגנת הצרכן והנחיות הרשות להגנת הצרכן ולסחר הוגן: חלק מהקישורים וההפניות באתר זה הינם קישורי שותפים (Affiliate links). משמעות הדבר היא שבמידה ותבחרו להקליק על קישור ולרכוש כרטיס טיסה, לינה או כניסה לאירוע דרך אתר חיצוני של צד שלישי, מפעילי האתר עשויים לקבל עמלת הפניה מהספק החיצוני – ללא כל עלות נוספת מצידכם. עמלה זו אינה מייקרת את מחיר השירות לצרכן ואינה יוצרת אחריות על בעלי האתר.",
    gate_checkbox: "קראתי, הבנתי ואני מסכים/ה להבהרה המשפטית: ידוע לי כי האתר אינו מוכר חבילות תיירות ואינו אחראי על ביטולי עסקה או ביטולי טיסות, כי האתר מנגיש כנסים ואירועי גיימינג בלבד, כי חלק מהקישורים הינם קישורי שותפים מהם עשויה להתקבל עמלה ללא עלות נוספת מצידי, וכי כל רכישת טיסה או כרטיס הינה ללא שום אחריות של בעלי האתר.",
    gate_logged_info: "ההסכמה מתועדת ונשמרת בענן Firebase",
    gate_accept_btn: "אישור ההבהרה המשפטית וכניסה לאתר",

    // Footer & Strip
    footer_disclaimer_title: "הבהרה משפטית & גילוי נאות (Affiliate Disclosure)",
    footer_disclaimer_desc: "האתר אינו מוכר חבילות תיירות ואינו אחראי על ביטולי עסקה או טיסות. האתר מנגיש כנסים ואירועי גיימינג בלבד. חלק מהקישורים הינם קישורי שותפים מהם עשויה להתקבל עמלה ללא כל עלות נוספת עבורכם. רכישת טיסות ואירועים נעשית ישירות מול צדדים שלישיים וללא אחריות בעלי האתר.",
    footer_read_full: "קרא את ההבהרה המלאה ←",
    footer_about: "פלטפורמת תוכן ומידע עצמאית להנגשת כנסי גיימינג, תערוכות בינלאומיות וטורנירי eSports. המידע באתר למטרות סקירה והכוונה.",
    footer_terms: "תנאי שימוש ותקנון",
    footer_privacy: "מדיניות פרטיות",
    footer_accessibility: "הצהרת נגישות (AA)",
    footer_company: "אודות הפלטפורמה",
    footer_top_destinations: "יעדי גיימינג מובילים",
    footer_customer_service: "שירות ופניות",

    // Booking
    booking_badge: "פלטפורמת מידע והכוונה (אינה מוכרת חבילות תיירות)",
    booking_title: "התעניינות והכוונה למסעות וכנסי גיימינג",
    booking_subtitle: "מלא את הפרטים לקבלת הכוונה אישית למסלול הכנס. לתשומת לבך: האתר אינו מוכר חבילות תיירות, וכל רכישת טיסות מתבצעת ישירות מול הספקים וללא שום אחריות של בעלי האתר.",
    booking_legal_alert_title: "הבהרה משפטית וגילוי נאות טרם שליחה:",
    booking_legal_alert_desc: "האתר מנגיש כנסים ואירועי גיימינג בלבד ואינו מוכר חבילות תיירות או כרטיסי טיסה. חלק מהקישורים הינם קישורי שותפים (Affiliate) מהם עשויה להתקבל עמלת הפניה ללא כל תוספת עלות עבורך. רכישת טיסות ואירועים נעשית באופן עצמאי ישירות מול צדדים שלישיים וללא כל אחריות של בעלי האתר על ביטולי עסקה או ביטולי טיסות.",
    booking_package_label: "בחר חבילה / יעד:",
    booking_name_label: "שם מלא:",
    booking_phone_label: "מספר טלפון / WhatsApp:",
    booking_email_label: "אימייל לקבלת מסלול:",
    booking_travelers_label: "מספר נוסעים:",
    booking_travelers_1: "נוסע יחיד (Solo Gamer)",
    booking_travelers_2: "זוג (Co-Op Duo)",
    booking_travelers_4: "חוליית גיימרים (Squad - 4+)",
    booking_submit_btn: "שלח בקשת התעניינות ומסלול",
    booking_submitting: "שומר ב-Firebase...",
    booking_success_title: "הפנייה נשמרה בהצלחה בענן Firebase!",
    booking_success_desc: "תודה, קיבלנו את פרטי ההתעניינות. נציג תוכן יחזור אליך בהקדם להכוונת מסלול וקישורים לרכישה עצמאית.",
    booking_another_btn: "שליחת פנייה נוספת",
    booking_footer_note: "הנגשת מידע בלבד | רכישת טיסות וכרטיסים מתבצעת ישירות מול הספקים ללא אחריות האתר",

    // Packages View
    pkg_badge: "הצעות מסלול והנגשת כנסי גיימינג 2026-2027",
    pkg_title: "הצעות מסלול מומלצות לכנסי גיימינג",
    pkg_desc: "המלצות מסלול מותאמות לגיימרים: כרטיסים לתערוכות, מלונות מומלצים ליד המתחמים וטיפים להזמנה עצמאית ישירות מול הספקים.",
    pkg_affiliate_box_title: "⚖️ גילוי נאות ואי-אחריות (Affiliate Disclosure):",
    pkg_affiliate_box_desc: "האתר אינו מוכר חבילות תיירות ואינו אחראי על ביטולי טיסות או עסקאות. חלק מקישורי ההפניה הינם קישורי שותפים (Affiliate links) מהם מפעילי האתר עשויים לקבל עמלה – ללא כל עלות נוספת עבורכם. רכישת טיסות וכרטיסים נעשית באופן עצמאי ישירות מול ספקים חיצוניים.",
    pkg_inquire_btn: "התעניינות במסלול זה",

    // Flight Board
    board_title: "לוח טיסות & כנסי גיימינג חי",
    board_destination: "יעד",
    board_event: "כנס / אירוע",
    board_status: "סטטוס",
    board_flight: "טיסה",
    board_time: "זמן",

    // Affiliate Marketing Layer
    affiliate_badge: "הצעה רשמית • שותף מורשה",
    affiliate_disclosure_tag: "קישור שותפים (Affiliate)",
    affiliate_disclosure_tooltip: "רכישה דרך קישור זה עשויה להעניק עמלת הפניה לאתר ללא כל עלות נוספת עבורכם.",
    affiliate_scout_reward: "סרקת דיל נסיעות! קיבלת",
    affiliate_view_deal: "הזמנה ישירה ובדיקת מחירים",
    affiliate_partner_official: "באתר הרשמי של",
    affiliate_curated_offers_title: "הצעות לינה וכרטיסים מספקים רשמיים",
    affiliate_curated_offers_desc: "מלונות מומלצים ליד זירות הגיימינג וכרטיסי נסיעה בהזמנה ישירה מול הספקים המורשים.",
    affiliate_category_hotels: "מלונות ושהות",
    affiliate_category_flights: "טיסות לכנסים",
    affiliate_category_activities: "אטרקציות וכרטיסים",
    affiliate_category_tours: "סיורי גיימינג מודרכים",
    affiliate_category_travelInsurance: "ביטוח נסיעות וציוד",
    affiliate_category_carRental: "השכרת רכב",
    affiliate_admin_title: "מרכז שותפים ואנליטיקס (Affiliate Center)",
    affiliate_admin_subtitle: "מעקב הקלקות, ביצועי קמפיינים וספקי תיירות בזמן אמת",
    affiliate_admin_tab_overview: "סקירה ואנליטיקס",
    affiliate_admin_tab_providers: "ספקים רשמיים",
    affiliate_admin_tab_clicks: "זרם הקלקות לייב",
    affiliate_admin_tab_offers: "הצעות וקמפיינים",
    affiliate_admin_tab_inquiries: "פניות גולשים",
    affiliate_status_active: "פעיל",
    affiliate_status_inactive: "מושבת",
    affiliate_live_clicks: "הקלקות אחרונות שנרשמו ב-Firestore",
    affiliate_no_clicks: "טרם נרשמו הקלקות במערכת.",
    affiliate_provider_label: "ספק:",
    affiliate_category_label: "קטגוריה:",
    affiliate_page_label: "דף מקור:",
    affiliate_user_label: "מזהה משתמש:",

    // Pivot: Gaming Travel Hero & Trip Builder
    hero_title: "הטיול הבא שלך מתחיל כאן",
    hero_subtitle: "בנה את הטיול המושלם לאירועי הגיימינג הגדולים בעולם — טיסות, מלונות, אירועים, מקומות גיימינג ואנשים מהקהילה שטסים איתך.",
    hero_btn_build_trip: "בנה את הטיול שלי",
    hero_btn_explore_events: "גלה אירועי גיימינג",
    hero_btn_join_community: "הצטרף לקהילה",

    // Gamer Trip Builder
    tb_badge: "GAMER TRIP BUILDER • תכנון חכם",
    tb_title: "בונה מסע הגיימינג — Trip Builder",
    tb_subtitle: "בנה תוכנית טיול מקיפה לאירועי הגיימינג, עם שקיפות עלויות מלאה וחיבור ישיר לספקי טיסות, מלונות וכרטיסים.",
    tb_step1_title: "1. לאיזה אירוע גיימינג אתה רוצה לטוס?",
    tb_step2_title: "2. מאיפה אתה ממריא?",
    tb_step3_title: "3. מתי וכמה ימים?",
    tb_step4_title: "4. כמה אנשים (הרכב חוליה)?",
    tb_step5_title: "5. מה התקציב שלך?",
    tb_step6_title: "6. מה מעניין אותך בטיול?",
    tb_generate_btn: "בנה את תוכנית הטיול שלי",
    tb_saving_trip: "שומר מסלול בענן Firebase...",
    tb_saved_success: "המסלול נשמר בהצלחה בפרופיל שלך!",
    tb_save_trip_btn: "שמור מסלול לפרופיל שלי",
    tb_find_crew_btn: "מצא גיימרים שטסים לאירוע",
    tb_price_disclaimer: "הערכות העלות הינן אומדן ממוצע שוק ואינן מהוות התחייבות למחיר סופי. הזמנת טיסות ומלונות מתבצעת עצמאית מול הספקים.",
    tb_day: "יום",
    tb_itinerary_title: "מסלול המסע המוצע שלך",
    tb_cost_breakdown_title: "תחשיב עלויות משוער (שקוף)",
    tb_flights_est: "טיסות הלוך-חזור:",
    tb_hotels_est: "מלון / לינה:",
    tb_tickets_est: "כרטיסי כניסה רשמיים:",
    tb_transit_est: "תחבורה מקומית ורכבות:",
    tb_activities_est: "אטרקציות גיימינג וארקייד:",
    tb_food_est: "אוכל וחיי לילה:",
    tb_total_est: "סך הכל משוער:",

    // Who is flying (Event Crews)
    crew_who_is_flying: "מי טס לשם מהקהילה?",
    crew_members_flying: "גיימרים מהקהילה מתכננים להגיע",
    crew_im_flying_btn: "אני טס לאירוע הזה!",
    crew_modal_title: "הצטרף לחוליית האירוע (Event Crew)",
    crew_departure_city: "עיר יציאה (למשל תל אביב):",
    crew_travel_dates: "תאריכי טיסה מתוכננים:",
    crew_travel_style: "סגנון טיול:",
    crew_bio: "כמה מילים עליך או חיפוש שותפים לחדר / טיסה:",
    crew_submit_btn: "הוסף אותי לצוות הטסים",

    // Gaming Guides
    guide_tab_all: "הכל",
    guide_tab_stores: "חנויות רטרו & אספנות",
    guide_tab_arcades: "אולמות ארקייד & VR",
    guide_tab_cafes: "קפה גיימינג & PC Bangs",
    guide_tab_bars: "ברים & מועדוני גיימרים",
    guide_tab_secret: "ספוטים סודיים",

    // AI Trip Planner
    ai_planner_title: "GOD MODE AI — בונה לך את הטיול",
    ai_planner_subtitle: "מתכנן טיולים חכם לגיימרים: הזן בקשה חופשית וקבל מסלול יומי מפורט, ספוטים מומלצים ותחשיב עלויות.",
    ai_planner_placeholder: "למשל: אני רוצה לטוס ל-Gamescom, להיות שם 4 ימים, תקציב של 6,000 ₪ וכמה שיותר גיימינג...",
    ai_planner_prompt1: "טיול 4 ימים ל-Gamescom בקלן עם תקציב בינוני",
    ai_planner_prompt2: "שבוע בטוקיו לחובב ארקיידים, רטרו ואקיהברה",
    ai_planner_prompt3: "גמר אליפות העולם ב-LoL בסיאול עם PC Bangs",
  },
  en: {
    // App Brand
    appName: "GOD MODE TRAVELER",
    appSub: "ESPORTS & GAMING TOURISM",

    // Nav
    nav_home: "Home",
    nav_trip_builder: "Trip Builder",
    nav_destinations: "Destinations",
    nav_events: "Tournaments & Expo",
    nav_themeparks: "Nintendo Parks",
    nav_games: "2025-27 Games",
    nav_history: "Gaming History",
    nav_packages: "VIP Packages",
    nav_secretSpots: "Secret Spots",
    nav_map: "World Map",
    nav_booking: "Book Trip",
    nav_ai: "AI Guide",
    nav_community: "Community",
    nav_profile: "Profile",

    // Controls & Status
    legal_btn: "Legal Disclaimer",
    sound_mute: "Mute Sound",
    sound_unmute: "Unmute Sound",
    firebase_connected: "Firebase Cloud Synced",
    firebase_syncing: "Syncing to Cloud...",
    firebase_guest: "Guest Gamer Synced",
    level: "LVL",
    coins: "Coins",
    xp: "XP",

    // Disclaimer Gate Modal
    gate_badge: "MANDATORY LEGAL NOTICE",
    gate_title: "Legal Disclaimer, Limitation of Liability & Access Terms",
    gate_required: "Acceptance required to enter",
    gate_intro: "Notice: The use of this website, reviewing its contents, and any action or referral originating from it are strictly contingent upon your agreement to the legal disclaimer set forth below.",
    gate_p1_title: "1. Nature of the Platform – Information & Gaming Event Aggregator Only",
    gate_p1_desc: "God Mode Traveler is an independent editorial and content platform created solely to aggregate information, event reviews, schedules, and travel recommendations regarding international gaming expos (e.g., Gamescom, Tokyo Game Show), eSports tournaments, and gaming attractions worldwide.",
    gate_p2_title: "2. Non-Travel Agency Status & No Package Sales",
    gate_p2_desc: "This website does not sell tourism or vacation packages, is not a travel agency, does not organize package tours, and does not operate as an airline, accommodation, or transportation vendor. The platform is not a party to any transaction and does not charge or collect payments for airline tickets, hotels, or official expo admission tickets.",
    gate_p3_title: "3. Direct Flight & Ticket Purchases – Sole Responsibility of User",
    gate_p3_desc: "All links, price references, and schedules displayed on this site are for informational and convenience purposes only. You may navigate from this site to book flights or purchase event tickets directly with third-party vendors and airlines, entirely at your own discretion and without any liability, warranty, or endorsement by the website owners.",
    gate_p4_title: "4. Full Waiver of Liability for Flight Cancellations & Transaction Disputes",
    gate_p4_desc: "The owners, operators, and affiliates of this site bear no responsibility or liability for flight cancellations, delays, schedule adjustments, ticket cancellations, event postponements, strikes, denial of entry, force majeure, or any monetary or non-monetary damages. All refund, cancellation, or change requests must be directed solely to the third-party merchant or airline from which the purchase was made.",
    gate_p5_title: "5. Independent Verification Obligation",
    gate_p5_desc: "It is the sole responsibility of the user to independently verify event dates, passport validity, entry visa requirements, travel insurance coverage, and airline refund/cancellation policies prior to making any financial commitments.",
    gate_p6_title: "6. Affiliate Disclosure & Referral Commissions",
    gate_p6_desc: "In accordance with consumer protection standards and fair marketing practices: Certain links on this website are affiliate links. If you click on an external link and complete a purchase for flights, hotels, or event passes, the site operators may earn a referral commission at no additional cost to you. This commission does not increase the price you pay and does not impose any vendor liability on the website owners.",
    gate_checkbox: "I have read, understood, and agreed to the Legal Disclaimer: I acknowledge that this website does not sell tourism packages, is not liable for flight cancellations or transaction disputes, provides gaming event information only, that some links are affiliate links generating commissions at no extra cost to me, and that any flight or ticket purchase is made solely at my own responsibility without liability of the site owners.",
    gate_logged_info: "Consent recorded & synced to Firebase Cloud",
    gate_accept_btn: "Accept Legal Disclaimer & Enter Site",

    // Footer & Strip
    footer_disclaimer_title: "Legal Disclaimer & Affiliate Disclosure",
    footer_disclaimer_desc: "This site does not sell travel packages and is not responsible for cancellations of transactions or flights. It is an independent gaming event directory only. Some links are affiliate links from which commissions may be earned at no extra cost to you. Bookings are conducted directly with third-party providers without site owner liability.",
    footer_read_full: "Read Full Legal Notice →",
    footer_about: "Independent content & discovery platform connecting gamers to worldwide gaming expos, anime conventions, and eSports arenas.",
    footer_terms: "Terms of Use",
    footer_privacy: "Privacy Policy",
    footer_accessibility: "Accessibility (AA)",
    footer_company: "About Platform",
    footer_top_destinations: "Top Gamer Destinations",
    footer_customer_service: "Support & Contact",

    // Booking
    booking_badge: "Information & Route Guidance (Not a Travel Agency)",
    booking_title: "Gaming Journey Inquiry & Route Advisory",
    booking_subtitle: "Fill in your details to receive personalized itinerary guidance for gaming expos. Note: This website does not sell travel packages, and flight purchases are completed directly with providers at no liability to site owners.",
    booking_legal_alert_title: "Legal Notice & Affiliate Disclosure Before Submission:",
    booking_legal_alert_desc: "This site provides gaming event information only and does not sell flights or vacation packages. Some links are affiliate links where a referral fee may be received at no extra cost to you. All travel purchases are made directly with third-party providers with zero liability on site owners for cancellations or flight disruptions.",
    booking_package_label: "Select Package / Destination:",
    booking_name_label: "Full Name:",
    booking_phone_label: "Phone / WhatsApp:",
    booking_email_label: "Email for Itinerary:",
    booking_travelers_label: "Number of Travelers:",
    booking_travelers_1: "Solo Gamer",
    booking_travelers_2: "Co-Op Duo",
    booking_travelers_4: "Gamer Squad (4+)",
    booking_submit_btn: "Submit Route & Inquiry Request",
    booking_submitting: "Saving to Firebase Cloud...",
    booking_success_title: "Inquiry Saved to Firebase Cloud!",
    booking_success_desc: "Thank you, we have received your request. A gaming travel curator will contact you with route recommendations and direct booking links.",
    booking_another_btn: "Submit Another Inquiry",
    booking_footer_note: "Information Only | Direct Booking with Airlines & Providers | Zero Site Owner Liability",

    // Packages View
    pkg_badge: "2026-2027 Gaming Expo Itineraries",
    pkg_title: "Curated Gamer Expo Itineraries",
    pkg_desc: "Tailored recommendations for gamers: convention tickets, recommended hotels near venue centers, and direct booking tips.",
    pkg_affiliate_box_title: "⚖️ Affiliate Disclosure & Non-Liability Notice:",
    pkg_affiliate_box_desc: "This site does not sell travel packages and is not responsible for flight or booking cancellations. Some referral links are affiliate links providing a commission at no additional cost to you. Travel and event purchases are made independently with external merchants.",
    pkg_inquire_btn: "Inquire About This Itinerary",

    // Flight Board
    board_title: "Live Gaming Flights & Expo Schedule",
    board_destination: "Destination",
    board_event: "Expo / Tournament",
    board_status: "Status",
    board_flight: "Flight",
    board_time: "Time",

    // Affiliate Marketing Layer
    affiliate_badge: "Official Partner Deal",
    affiliate_disclosure_tag: "Affiliate Partner Link",
    affiliate_disclosure_tooltip: "Booking through this link may earn God Mode Traveler a commission at no additional cost to you.",
    affiliate_scout_reward: "Travel deal scouted! You earned",
    affiliate_view_deal: "Check Rates & Availability",
    affiliate_partner_official: "on official site of",
    affiliate_curated_offers_title: "Curated Partner Stays & Passes",
    affiliate_curated_offers_desc: "Accommodations adjacent to esports arenas, rail passes, and expo attractions booked directly with verified partners.",
    affiliate_category_hotels: "Hotels & Stays",
    affiliate_category_flights: "Flights",
    affiliate_category_activities: "Passes & Tickets",
    affiliate_category_tours: "Guided Gamer Tours",
    affiliate_category_travelInsurance: "Travel & Gear Insurance",
    affiliate_category_carRental: "Car Rental",
    affiliate_admin_title: "Affiliate Marketing & Analytics Hub",
    affiliate_admin_subtitle: "Real-time click streams, campaign metrics, and certified travel providers",
    affiliate_admin_tab_overview: "Overview & Analytics",
    affiliate_admin_tab_providers: "Official Providers",
    affiliate_admin_tab_clicks: "Live Click Stream",
    affiliate_admin_tab_offers: "Offers & Campaigns",
    affiliate_admin_tab_inquiries: "Inquiries",
    affiliate_status_active: "Active",
    affiliate_status_inactive: "Inactive",
    affiliate_live_clicks: "Latest Clicks Synced to Firestore",
    affiliate_no_clicks: "No click events recorded yet.",
    affiliate_provider_label: "Provider:",
    affiliate_category_label: "Category:",
    affiliate_page_label: "Source Page:",
    affiliate_user_label: "User UID:",

    // Pivot: Gaming Travel Hero & Trip Builder
    hero_title: "Your Next Gaming Journey Begins Here",
    hero_subtitle: "Build the ultimate trip to the world's biggest gaming events — flights, hotels, tournaments, gaming spots, and travelers flying with you.",
    hero_btn_build_trip: "Build My Trip",
    hero_btn_explore_events: "Explore Gaming Events",
    hero_btn_join_community: "Join the Community",

    // Gamer Trip Builder
    tb_badge: "GAMER TRIP BUILDER • SMART PLANNING",
    tb_title: "Gamer Trip Builder",
    tb_subtitle: "Craft an all-inclusive gaming trip around top expos, with transparent price estimations and direct booking links.",
    tb_step1_title: "1. Which gaming event do you want to attend?",
    tb_step2_title: "2. Where are you flying from?",
    tb_step3_title: "3. When and how many days?",
    tb_step4_title: "4. How many travelers (Squad size)?",
    tb_step5_title: "5. What is your budget range?",
    tb_step6_title: "6. What interests you most on this journey?",
    tb_generate_btn: "Generate My Gamer Trip Plan",
    tb_saving_trip: "Saving itinerary to Firebase...",
    tb_saved_success: "Trip itinerary saved to your profile!",
    tb_save_trip_btn: "Save Trip to My Profile",
    tb_find_crew_btn: "Find Gamers Flying to This Event",
    tb_price_disclaimer: "Cost calculations are based on market averages and are not final price commitments. Flights and hotels are booked directly with official providers.",
    tb_day: "Day",
    tb_itinerary_title: "Your Tailored Itinerary",
    tb_cost_breakdown_title: "Transparent Cost Breakdown",
    tb_flights_est: "Round-trip Flights:",
    tb_hotels_est: "Hotel / Lodging:",
    tb_tickets_est: "Official Expo Tickets:",
    tb_transit_est: "Local Transit & Rail:",
    tb_activities_est: "Arcades & Gaming Hotspots:",
    tb_food_est: "Food & Nightlife:",
    tb_total_est: "Estimated Total:",

    // Who is flying (Event Crews)
    crew_who_is_flying: "Who's flying there from the community?",
    crew_members_flying: "Gamers from GOD MODE are planning to attend",
    crew_im_flying_btn: "I'm Flying to this Event!",
    crew_modal_title: "Join Event Crew",
    crew_departure_city: "Departure City (e.g., Tel Aviv, London):",
    crew_travel_dates: "Planned Travel Dates:",
    crew_travel_style: "Travel Style:",
    crew_bio: "Short bio or looking for squad mates / room-share:",
    crew_submit_btn: "Add Me to the Event Crew",

    // Gaming Guides
    guide_tab_all: "All",
    guide_tab_stores: "Retro & Collectibles Stores",
    guide_tab_arcades: "Arcades & VR Parks",
    guide_tab_cafes: "Gaming Cafés & PC Bangs",
    guide_tab_bars: "Esports Bars & Nightclubs",
    guide_tab_secret: "Secret Spots",

    // AI Trip Planner
    ai_planner_title: "GOD MODE AI — Trip Planner",
    ai_planner_subtitle: "Smart travel planner for gamers: Describe your dream expo journey and receive a custom day-by-day plan and cost breakdown.",
    ai_planner_placeholder: "e.g., I want to fly to Gamescom, spend 4 days, have a $1,800 budget and explore maximum esports bars...",
    ai_planner_prompt1: "4-day trip to Gamescom Cologne with balanced budget",
    ai_planner_prompt2: "One week in Tokyo for retro arcades, anime, and Akihabara",
    ai_planner_prompt3: "LoL World Championship Finals in Seoul with PC Bangs",
  },
  ja: {
    // App Brand
    appName: "GOD MODE TRAVELER",
    appSub: "eスポーツ＆ゲーミングツーリズム",

    // Nav
    nav_home: "ホーム",
    nav_trip_builder: "旅程ビルダー",
    nav_destinations: "目的地",
    nav_events: "トーナメント＆展示会",
    nav_themeparks: "任天堂パーク",
    nav_games: "2025-27 ゲーム",
    nav_history: "ゲームの歴史",
    nav_packages: "VIPパッケージ",
    nav_secretSpots: "隠れスポット",
    nav_map: "ワールドマップ",
    nav_booking: "旅程相談",
    nav_ai: "AIガイド",
    nav_community: "コミュニティ",
    nav_profile: "プロフィール",

    // Controls & Status
    legal_btn: "免責事項・法的通知",
    sound_mute: "ミュート",
    sound_unmute: "サウンドON",
    firebase_connected: "Firebase クラウド同期済",
    firebase_syncing: "クラウド同期中...",
    firebase_guest: "ゲスト同期中",
    level: "Lv.",
    coins: "コイン",
    xp: "XP",

    // Disclaimer Gate Modal
    gate_badge: "重要な法的免責事項",
    gate_title: "法的免責事項・責任の制限および利用規約",
    gate_required: "利用には同意が必要です",
    gate_intro: "本サイトのご利用、コンテンツの閲覧、および外部へのリンク移動は、下記の法的免責事項に完全に同意することを条件とします。",
    gate_p1_title: "1. サイトの性質 – ゲームイベントの情報提供のみ",
    gate_p1_desc: "God Mode Travelerは、東京ゲームショウ、Gamescomなどの世界規模のゲーム展示会、eスポーツ大会、ゲーミング観光地の情報や旅程アドバイスを提供する独立系情報プラットフォームです。",
    gate_p2_title: "2. 旅行代理店業務およびパッケージツアー販売の不実施",
    gate_p2_desc: "当サイトは旅行代理店ではなく、ツアーパッケージの販売や航空券・宿泊の手配を行うものではありません。チケット料金や宿泊費の徴収は一切行いません。",
    gate_p3_title: "3. 航空券およびチケット購入の自己責任原則",
    gate_p3_desc: "本サイトから遷移して行われる航空券やイベントチケットの購入は、第三者プロバイダーおよび航空会社と直接行われるものであり、サイト運営者は一切の責任や保証を負いません。",
    gate_p4_title: "4. 航空便の中止・遅延および取引キャンセルに関する完全な免責",
    gate_p4_desc: "航空便の欠航、遅延、日程変更、イベントの中止や延期に関して、当サイト運営者は一切の損害賠償や返金責任を負いません。キャンセルや変更は各航空会社にお問い合わせください。",
    gate_p5_title: "5. 利用者自身による確認義務",
    gate_p5_desc: "パスポートの有効期限、ビザ要件、渡航保険、およびイベントの日程は、予約前に必ずご自身でご確認ください。",
    gate_p6_title: "6. アフィリエイトリンクおよび手数料に関する開示 (Affiliate Disclosure)",
    gate_p6_desc: "本サイトの一部のリンクはアフィリエイトリンクです。外部サイトで航空券やチケットを購入された場合、運営者に紹介手数料が支払われることがありますが、お客様に追加の費用が発生することはありません。",
    gate_checkbox: "上記の法的免責事項を読み、理解し同意します：当サイトがツアー販売を行わず、航空券キャンセル等の責任を負わないこと、一部のアフィリエイトリンクに追加費用がないこと、および自己責任で購入することを承諾します。",
    gate_logged_info: "同意記録はFirebaseクラウドに保存されます",
    gate_accept_btn: "免責事項に同意してサイトを開く",

    // Footer & Strip
    footer_disclaimer_title: "法的免責事項＆アフィリエイト開示",
    footer_disclaimer_desc: "当サイトは旅行商品の販売は行いません。ゲームイベントの情報案内のみを提供します。一部リンクにはアフィリエイトリンクが含まれますが追加費用はありません。",
    footer_read_full: "全文を読む →",
    footer_about: "世界のゲームイベント、eスポーツ、アニメの聖地をつなぐ独立系ゲーミング旅行情報サイト。",
    footer_terms: "利用規約",
    footer_privacy: "プライバシーポリシー",
    footer_accessibility: "アクセシビリティ",
    footer_company: "サイトについて",
    footer_top_destinations: "人気の目的地",
    footer_customer_service: "お問い合わせ",

    // Booking
    booking_badge: "情報案内・ルート相談（旅行代理店ではありません）",
    booking_title: "ゲーミング旅行・イベント旅程相談",
    booking_subtitle: "ゲーム展示会やイベントへの参加ルートについて相談を受け付けています。※当サイトは航空券を直接販売しません。",
    booking_legal_alert_title: "送信前の法的注意事項および開示：",
    booking_legal_alert_desc: "当サイトは情報案内のみを行い、航空券やツアーの販売は行いません。購入手続きは外部サイトでご自身で行っていただき、キャンセル等にサイト運営者の責任は及びません。",
    booking_package_label: "希望のパッケージ / 目的地：",
    booking_name_label: "お名前：",
    booking_phone_label: "電話番号 / WhatsApp：",
    booking_email_label: "メールアドレス：",
    booking_travelers_label: "参加人数：",
    booking_travelers_1: "ソロゲーマー（1名）",
    booking_travelers_2: "Co-Opペア（2名）",
    booking_travelers_4: "スクワッド（4名以上）",
    booking_submit_btn: "旅程相談を送信する",
    booking_submitting: "Firebaseに保存中...",
    booking_success_title: "Firebaseクラウドに保存されました！",
    booking_success_desc: "お問い合わせありがとうございます。担当者よりルート案内および直接予約リンクをご案内いたします。",
    booking_another_btn: "別の相談を送信",
    booking_footer_note: "情報提供のみ | 航空会社およびプロバイダーと直接契約 | 運営者の責任免除",

    // Packages View
    pkg_badge: "2026-2027 ゲームエキスポおすすめ旅程",
    pkg_title: "ゲーマー向けおすすめルート提案",
    pkg_desc: "展示会チケット、会場周辺のおすすめホテル、直接予約のヒントをまとめたゲーマー向けモデルコース。",
    pkg_affiliate_box_title: "⚖️ アフィリエイト開示および免責事項：",
    pkg_affiliate_box_desc: "当サイトは旅行商品を販売しません。一部の紹介リンクはアフィリエイトリンクであり、追加費用なしで手数料が発生する場合があります。",
    pkg_inquire_btn: "この旅程について相談する",

    // Flight Board
    board_title: "リアルタイムフライト＆エキスポ発着案内",
    board_destination: "目的地",
    board_event: "イベント",
    board_status: "運航状況",
    board_flight: "便名",
    board_time: "時刻",

    // Affiliate Marketing Layer
    affiliate_badge: "公式提携プラン",
    affiliate_disclosure_tag: "提携アフィリエイトリンク",
    affiliate_disclosure_tooltip: "このリンクから予約を行うと、追加費用なしで当サイトへ紹介手数料が発生する場合があります。",
    affiliate_scout_reward: "旅程ディールを発見！獲得：",
    affiliate_view_deal: "料金・空き状況を確認",
    affiliate_partner_official: "提携先：",
    affiliate_curated_offers_title: "公式提携ホテル＆体験パス",
    affiliate_curated_offers_desc: "会場至近ホテル、新幹線周遊パス、ゲーマーツアーを公認プロバイダーから直接予約。",
    affiliate_category_hotels: "ホテル・宿泊",
    affiliate_category_flights: "航空券",
    affiliate_category_activities: "チケット・体験",
    affiliate_category_tours: "ゲーマーツアー",
    affiliate_category_travelInsurance: "旅行・機材保険",
    affiliate_category_carRental: "レンタカー",
    affiliate_admin_title: "アフィリエイト管理＆分析ハブ",
    affiliate_admin_subtitle: "リアルタイムクリック、キャンペーン分析、提携パートナー管理",
    affiliate_admin_tab_overview: "概要と分析",
    affiliate_admin_tab_providers: "提携プロバイダー",
    affiliate_admin_tab_clicks: "リアルタイム履歴",
    affiliate_admin_tab_offers: "オファー＆企画",
    affiliate_admin_tab_inquiries: "お問い合わせ",
    affiliate_status_active: "有効",
    affiliate_status_inactive: "無効",
    affiliate_live_clicks: "Firestoreに記録された最新クリック",
    affiliate_no_clicks: "まだクリック履歴がありません。",
    affiliate_provider_label: "提供元:",
    affiliate_category_label: "カテゴリー:",
    affiliate_page_label: "表示元:",
    affiliate_user_label: "ユーザーID:",

    // Pivot: Gaming Travel Hero & Trip Builder
    hero_title: "あなたの次のゲーム旅がここから始まる",
    hero_subtitle: "世界最大のゲームイベントへの旅を構築 — 航空券、ホテル、大会、聖地、そして同行するゲーマー仲間。",
    hero_btn_build_trip: "旅程を作成する",
    hero_btn_explore_events: "ゲームイベントを見る",
    hero_btn_join_community: "コミュニティに参加",

    // Gamer Trip Builder
    tb_badge: "GAMER TRIP BUILDER • スマート旅行計画",
    tb_title: "ゲーマートリップビルダー",
    tb_subtitle: "人気イベントに合わせた旅行計画を作成。透明性のある費用見積もりと公式サイトへの直接予約リンクを提供。",
    tb_step1_title: "1. どのゲームイベントに行きたいですか？",
    tb_step2_title: "2. 出発地はどこですか？",
    tb_step3_title: "3. 日程と滞在日数は？",
    tb_step4_title: "4. 旅行者の人数（スクワッド規模）は？",
    tb_step5_title: "5. ご予算の目安は？",
    tb_step6_title: "6. この旅で最も興味があることは？",
    tb_generate_btn: "ゲーム旅程を生成",
    tb_saving_trip: "Firebaseに保存中...",
    tb_saved_success: "旅程がマイプロフィールに保存されました！",
    tb_save_trip_btn: "プロフィールに保存",
    tb_find_crew_btn: "このイベントに行く仲間を探す",
    tb_price_disclaimer: "表示される価格は市場平均値に基づく概算であり、確定価格ではありません。航空券や宿泊は提携先にて直接予約となります。",
    tb_day: "日目",
    tb_itinerary_title: "おすすめ旅程プラン",
    tb_cost_breakdown_title: "概算費用内訳（透明性重視）",
    tb_flights_est: "往復航空券:",
    tb_hotels_est: "宿泊・ホテル:",
    tb_tickets_est: "公式チケット:",
    tb_transit_est: "現地交通・鉄道パス:",
    tb_activities_est: "ゲーム名所＆アーケード:",
    tb_food_est: "飲食＆ナイトライフ:",
    tb_total_est: "概算合計:",

    // Who is flying (Event Crews)
    crew_who_is_flying: "このイベントに参加するコミュニティ仲間は？",
    crew_members_flying: "人のGOD MODEゲーマーが参加予定",
    crew_im_flying_btn: "私もこのイベントに参加します！",
    crew_modal_title: "イベントクルーに参加",
    crew_departure_city: "出発都市（例: 東京、ソウル、テルアビブ）:",
    crew_travel_dates: "予定旅行日程:",
    crew_travel_style: "旅行スタイル:",
    crew_bio: "自己紹介やルームシェア・同行者募集:",
    crew_submit_btn: "参加クルーに登録",

    // Gaming Guides
    guide_tab_all: "すべて",
    guide_tab_stores: "レトロゲーム＆グッズ店",
    guide_tab_arcades: "アーケード＆VRパーク",
    guide_tab_cafes: "ゲームカフェ＆PCバン",
    guide_tab_bars: "eスポーツバー",
    guide_tab_secret: "秘密スポット",

    // AI Trip Planner
    ai_planner_title: "GOD MODE AI — 旅程プランナー",
    ai_planner_subtitle: "ゲーマーのための旅行AIプランナー。希望を自由に入力するだけで、日別旅程と費用試算を自動構築。",
    ai_planner_placeholder: "例：Gamescomに4日間行きたい、予算25万円で現地のeスポーツバーも巡りたい...",
    ai_planner_prompt1: "ケルンのGamescom 4日間モデルコース",
    ai_planner_prompt2: "秋葉原のレトロアーケードとアニメ聖地1週間",
    ai_planner_prompt3: "ソウルのLoL世界選手権決勝＆PCバン満喫旅",
  },
  es: {
    // App Brand
    appName: "GOD MODE TRAVELER",
    appSub: "TURISMO ESPORTS & GAMING",

    // Nav
    nav_home: "Inicio",
    nav_trip_builder: "Creador de Viaje",
    nav_destinations: "Destinos",
    nav_events: "Torneos & Expo",
    nav_themeparks: "Parques Nintendo",
    nav_games: "Juegos 2025-27",
    nav_history: "Historia Gamer",
    nav_packages: "Paquetes VIP",
    nav_secretSpots: "Lugares Secretos",
    nav_map: "Mapa Mundial",
    nav_booking: "Reservar Viaje",
    nav_ai: "Guía IA",
    nav_community: "Comunidad",
    nav_profile: "Perfil",

    // Controls & Status
    legal_btn: "Aviso Legal",
    sound_mute: "Silenciar",
    sound_unmute: "Activar Sonido",
    firebase_connected: "Firebase Conectado",
    firebase_syncing: "Sincronizando...",
    firebase_guest: "Jugador Sincronizado",
    level: "Nivel",
    coins: "Monedas",
    xp: "XP",

    // Disclaimer Gate Modal
    gate_badge: "AVISO LEGAL OBLIGATORIO",
    gate_title: "Descargo de Responsabilidad Legal y Condiciones de Acceso",
    gate_required: "Aceptación obligatoria para ingresar",
    gate_intro: "Atención: El uso de este sitio web y el acceso a su contenido están estrictamente sujetos a su aceptación del descargo de responsabilidad legal redactado a continuación.",
    gate_p1_title: "1. Naturaleza de la Plataforma – Únicamente Contenido e Información",
    gate_p1_desc: "God Mode Traveler es una plataforma de contenido independiente con el único propósito de proporcionar información, calendarios y recomendaciones sobre convenciones de gaming (como Gamescom, Tokyo Game Show), torneos de eSports y parques temáticos.",
    gate_p2_title: "2. No es Agencia de Viajes ni Vende Paquetes Turísticos",
    gate_p2_desc: "Este sitio no es una agencia de viajes, no vende paquetes turísticos y no actúa como proveedor de aerolíneas o alojamiento. No procesamos pagos por vuelos, hoteles o boletos.",
    gate_p3_title: "3. Compra de Vuelos y Boletos – Responsabilidad Exclusiva del Usuario",
    gate_p3_desc: "Cualquier enlace o referencia de precios tiene fines informativos. Las compras de vuelos y entradas se realizan directamente con proveedores externos y aerolíneas, bajo su exclusiva responsabilidad y sin garantía de los propietarios del sitio.",
    gate_p4_title: "4. Exención Total de Responsabilidad por Cancelaciones de Vuelos",
    gate_p4_desc: "Los propietarios y administradores del sitio no asumen ninguna responsabilidad por cancelaciones de vuelos, retrasos, reprogramaciones o cancelaciones de eventos. Todo reclamo debe dirigirse a la aerolínea correspondiente.",
    gate_p5_title: "5. Obligación de Verificación Independiente",
    gate_p5_desc: "Es responsabilidad exclusiva del usuario verificar pasaportes, visados, seguros de viaje y políticas de cancelación antes de cualquier compra.",
    gate_p6_title: "6. Declaración de Enlaces de Afiliados (Affiliate Disclosure)",
    gate_p6_desc: "Algunos enlaces en este sitio son enlaces de afiliados. Si realiza una compra a través de ellos, podemos recibir una comisión sin ningún costo adicional para usted. Esto no incrementa el precio final del servicio.",
    gate_checkbox: "He leído, comprendido y acepto el Descargo Legal: Reconozco que este sitio no vende paquetes turísticos, no es responsable por cancelaciones de vuelos, contiene enlaces de afiliados sin costo extra para mí, y cualquier compra se realiza bajo mi propia responsabilidad.",
    gate_logged_info: "Consentimiento guardado en la nube Firebase",
    gate_accept_btn: "Aceptar Términos y Acceder al Sitio",

    // Footer & Strip
    footer_disclaimer_title: "Aviso Legal y Enlaces de Afiliados",
    footer_disclaimer_desc: "Este sitio no vende paquetes turísticos ni es responsable de cancelaciones de vuelos. Proporciona información sobre eventos de videojuegos. Algunos enlaces son de afiliados sin costo extra.",
    footer_read_full: "Leer Aviso Completo →",
    footer_about: "Plataforma de contenido independiente que conecta a gamers con ferias internacionales, eventos de anime y estadios de eSports.",
    footer_terms: "Términos de Uso",
    footer_privacy: "Política de Privacidad",
    footer_accessibility: "Accesibilidad (AA)",
    footer_company: "Sobre Nosotros",
    footer_top_destinations: "Destinos Gamer",
    footer_customer_service: "Atención y Contacto",

    // Booking
    booking_badge: "Orientación de Rutas (No somos agencia de viajes)",
    booking_title: "Consulta de Rutas para Convenciones de Gaming",
    booking_subtitle: "Complete sus datos para recibir asesoría sobre el itinerario. Aviso: Este sitio no vende vuelos directamente.",
    booking_legal_alert_title: "Aviso Legal antes de Enviar:",
    booking_legal_alert_desc: "Este sitio brinda información sobre eventos y no comercializa vuelos. Algunos enlaces son de afiliados sin costo extra. La compra de boletos se efectúa directamente con proveedores externos.",
    booking_package_label: "Seleccionar Paquete / Destino:",
    booking_name_label: "Nombre Completo:",
    booking_phone_label: "Teléfono / WhatsApp:",
    booking_email_label: "Correo Electrónico:",
    booking_travelers_label: "Número de Viajeros:",
    booking_travelers_1: "Gamer Solitario (1)",
    booking_travelers_2: "Dúo Co-Op (2)",
    booking_travelers_4: "Escuadrón Gamer (4+)",
    booking_submit_btn: "Enviar Solicitud de Ruta",
    booking_submitting: "Guardando en Firebase...",
    booking_success_title: "¡Consulta guardada en Firebase!",
    booking_success_desc: "Gracias, hemos recibido su solicitud. Un asesor le enviará recomendaciones de ruta y enlaces directos de compra.",
    booking_another_btn: "Enviar Otra Consulta",
    booking_footer_note: "Solo Información | Contratación Directa con Proveedores | Cero Responsabilidad del Sitio",

    // Packages View
    pkg_badge: "Itinerarios de Gaming 2026-2027",
    pkg_title: "Itinerarios Recomendados para Gamers",
    pkg_desc: "Recomendaciones personalizadas: entradas para convenciones, hoteles cerca de los centros de eventos y consejos de compra directa.",
    pkg_affiliate_box_title: "⚖️ Aviso de Afiliados y Exención de Responsabilidad:",
    pkg_affiliate_box_desc: "Este sitio no vende paquetes de viaje ni responde por cancelaciones de vuelos. Algunos enlaces son de afiliados sin costo adicional para usted.",
    pkg_inquire_btn: "Consultar sobre esta Ruta",

    // Flight Board
    board_title: "Tablero de Vuelos y Eventos en Vivo",
    board_destination: "Destino",
    board_event: "Evento / Torneo",
    board_status: "Estado",
    board_flight: "Vuelo",
    board_time: "Hora",

    // Affiliate Marketing Layer
    affiliate_badge: "Oferta de Socio Oficial",
    affiliate_disclosure_tag: "Enlace de Afiliado Oficial",
    affiliate_disclosure_tooltip: "Reservar a través de este enlace puede generar una comisión para el sitio sin ningún costo extra para usted.",
    affiliate_scout_reward: "¡Oferta explorada! Has ganado",
    affiliate_view_deal: "Consultar Tarifas y Disponibilidad",
    affiliate_partner_official: "en el sitio oficial de",
    affiliate_curated_offers_title: "Hoteles y Pases Recomendados de Socios",
    affiliate_curated_offers_desc: "Alojamiento cerca de eventos gamer, pases de tren de alta velocidad y tours contratados directamente con socios autorizados.",
    affiliate_category_hotels: "Hoteles y Hospedaje",
    affiliate_category_flights: "Vuelos",
    affiliate_category_activities: "Pases y Actividades",
    affiliate_category_tours: "Tours Guiados",
    affiliate_category_travelInsurance: "Seguro de Viaje y Equipos",
    affiliate_category_carRental: "Alquiler de Autos",
    affiliate_admin_title: "Panel de Afiliados y Analítica",
    affiliate_admin_subtitle: "Flujo de clics en tiempo real, métricas de campaña y proveedores verificados",
    affiliate_admin_tab_overview: "Resumen y Analítica",
    affiliate_admin_tab_providers: "Proveedores Oficiales",
    affiliate_admin_tab_clicks: "Flujo de Clics en Vivo",
    affiliate_admin_tab_offers: "Ofertas y Campañas",
    affiliate_admin_tab_inquiries: "Consultas",
    affiliate_status_active: "Activo",
    affiliate_status_inactive: "Inactivo",
    affiliate_live_clicks: "Últimos clics registrados en Firestore",
    affiliate_no_clicks: "Aún no hay clics registrados.",
    affiliate_provider_label: "Proveedor:",
    affiliate_category_label: "Categoría:",
    affiliate_page_label: "Página Origen:",
    affiliate_user_label: "UID de Usuario:",

    // Pivot: Gaming Travel Hero & Trip Builder
    hero_title: "Tu Próximo Viaje Gamer Comienza Aquí",
    hero_subtitle: "Diseña el viaje definitivo a los mayores eventos de videojuegos del mundo — vuelos, hoteles, torneos, lugares gamer y compañeros de comunidad que vuelan contigo.",
    hero_btn_build_trip: "Crear Mi Viaje",
    hero_btn_explore_events: "Explorar Eventos Gamer",
    hero_btn_join_community: "Unirse a la Comunidad",

    // Gamer Trip Builder
    tb_badge: "GAMER TRIP BUILDER • PLANIFICACIÓN INTELIGENTE",
    tb_title: "Creador de Viajes Gamer",
    tb_subtitle: "Construye un itinerario a tu medida para los mayores eventos, con estimación transparente de costes y enlaces de reserva oficial.",
    tb_step1_title: "1. ¿A qué evento de gaming deseas viajar?",
    tb_step2_title: "2. ¿Desde qué ciudad despegas?",
    tb_step3_title: "3. ¿Fechas y cuántos días?",
    tb_step4_title: "4. ¿Cuántos viajeros (tamaño del Squad)?",
    tb_step5_title: "5. ¿Cuál es tu rango de presupuesto?",
    tb_step6_title: "6. ¿Qué te interesa más en este viaje?",
    tb_generate_btn: "Generar Plan de Viaje Gamer",
    tb_saving_trip: "Guardando itinerario en Firebase...",
    tb_saved_success: "¡Itinerario guardado en tu perfil con éxito!",
    tb_save_trip_btn: "Guardar Itinerario en Mi Perfil",
    tb_find_crew_btn: "Buscar Gamers que van a este Evento",
    tb_price_disclaimer: "Los cálculos mostrados son estimaciones basadas en promedios de mercado y no constituyen compromisos de precio final. Vuelos y hoteles se reservan directamente con proveedores.",
    tb_day: "Día",
    tb_itinerary_title: "Tu Itinerario Recomendado",
    tb_cost_breakdown_title: "Desglose Transparente de Costes",
    tb_flights_est: "Vuelos Ida y Vuelta:",
    tb_hotels_est: "Alojamiento / Hotel:",
    tb_tickets_est: "Entradas Oficiales al Evento:",
    tb_transit_est: "Transporte Local y Trenes:",
    tb_activities_est: "Atracciones Gamer y Arcades:",
    tb_food_est: "Comida y Vida Nocturna:",
    tb_total_est: "Total Estimado:",

    // Who is flying (Event Crews)
    crew_who_is_flying: "¿Quién viaja desde la comunidad?",
    crew_members_flying: "gamers de GOD MODE planean asistir",
    crew_im_flying_btn: "¡Yo viajo a este evento!",
    crew_modal_title: "Unirse a la Tripulación del Evento",
    crew_departure_city: "Ciudad de Salida (ej. Madrid, Ciudad de México, Tel Aviv):",
    crew_travel_dates: "Fechas Previstas de Viaje:",
    crew_travel_style: "Estilo de Viaje:",
    crew_bio: "Breve presentación o búsqueda de compañeros de vuelo/habitación:",
    crew_submit_btn: "Añadirme al Equipo del Evento",

    // Gaming Guides
    guide_tab_all: "Todos",
    guide_tab_stores: "Tiendas Retro y Coleccionables",
    guide_tab_arcades: "Arcades y Parques VR",
    guide_tab_cafes: "Cafés Gamer y PC Bangs",
    guide_tab_bars: "Bares de eSports",
    guide_tab_secret: "Lugares Secretos",

    // AI Trip Planner
    ai_planner_title: "GOD MODE AI — Planificador de Viajes",
    ai_planner_subtitle: "Planificador inteligente para gamers: escribe tus deseos y recibe un itinerario diario detallado con costes y paradas recomendadas.",
    ai_planner_placeholder: "ej.: Quiero volar a Gamescom por 4 días, presupuesto de 1.500€ y recorrer los mejores bares retro...",
    ai_planner_prompt1: "Viaje de 4 días a Gamescom Colonia con presupuesto medio",
    ai_planner_prompt2: "Una semana en Tokio para arcades retro, anime y Akihabara",
    ai_planner_prompt3: "Finales del Mundial de LoL en Seúl con PC Bangs",
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)["he"];
  isRtl: boolean;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("gmt_lang") as Language;
      if (saved && (saved === "he" || saved === "en" || saved === "ja" || saved === "es")) {
        return saved;
      }
    } catch {}
    return "he";
  });

  const isRtl = language === "he";
  const dir = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    try {
      localStorage.setItem("gmt_lang", language);
    } catch {}

    // Update HTML attributes for accessibility and layout direction
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (isRtl) {
      document.documentElement.classList.add("dir-rtl");
      document.documentElement.classList.remove("dir-ltr");
    } else {
      document.documentElement.classList.add("dir-ltr");
      document.documentElement.classList.remove("dir-rtl");
    }
  }, [language, dir, isRtl]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language] || translations.he;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRtl, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
