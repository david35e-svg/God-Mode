# God Mode Traveler

אתר מידע בעברית לגיימרים שיוצאים מישראל. קראו את `PRODUCT.md` ואת `DESIGN.md` לפני כל עבודה על ממשק.

## תשתית
- קוד: github.com/david35e-svg/God-Mode, ענף `main`. Vercel פורס מ-`main` לכתובת god-mode-zeta.vercel.app.
- Firebase: `godmodetraveler-6071c`, Firestore במסד `(default)` ב-eur3, ו-Authentication עם Email/Password ו-Google.
- לא לגעת ב-`stable-notch-1t8c4` (הפרויקט הישן של AI Studio) ולא בפרויקטים של אתרים אחרים.

## כללים
- הכול בעברית ו-RTL. ב-PowerShell משתמשים ב-`npm.cmd` וב-`npx.cmd`.
- המודל העסקי הוא שותפים בלבד. שותפים ב-`src/data/partners.ts`, והמזהים במשתני `NEXT_PUBLIC_AFF_*` ב-Vercel ולא בקוד.
- תאריך, מחיר או נתון נכנסים ל-`src/data/content.ts` רק עם מקור שנבדק.
- כל הגישה לנתונים היא מהדפדפן, ולכן האבטחה יושבת ב-`firestore.rules`. כל שינוי בכללים דורש טסט ב-`tests/rules.test.mjs`.
- האתר חסום למנועי חיפוש עד אישור התוכן המשפטי (`next.config.ts` ו-`src/app/layout.tsx`).

## פקודות
`npm.cmd run dev`, `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd run test:rules` (צריך Java).

## תהליך
בקשה חדשה עוברת דרך `foreman`, הביצוע דרך `contractor`, והבדיקה דרך `inspector`. סקילי העיצוב הגלובליים (Impeccable, Emil, GSAP, frontend-design, accessibility) זמינים מהתיקייה הכללית.
