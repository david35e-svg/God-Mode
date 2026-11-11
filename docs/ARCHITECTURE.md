# ארכיטקטורה
Next.js 15 (App Router). עמודי תוכן נבנים סטטית מ-`src/data/content.ts`. חשבון, קהילה, בונה טיול, יצירת קשר וניהול הם רכיבי לקוח שמדברים ישירות עם Firebase, ולכן אין מפתח סודי בפרויקט.

אוספים ב-Firestore: `posts`, `reports`, `plans`, `inquiries`. הכול אחר חסום ב-`firestore.rules`.
מפת העולם נוצרת מ-`scripts/build-map.mjs` אל `src/data/world.ts`, מנתוני Natural Earth.
