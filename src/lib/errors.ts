const MAP: Record<string, string> = {
  "auth/invalid-credential": "האימייל או הסיסמה לא נכונים. בדקו אותם ונסו שוב.",
  "auth/wrong-password": "האימייל או הסיסמה לא נכונים. בדקו אותם ונסו שוב.",
  "auth/user-not-found": "האימייל או הסיסמה לא נכונים. בדקו אותם ונסו שוב.",
  "auth/email-already-in-use": "כבר יש חשבון עם האימייל הזה. אפשר להתחבר אליו או לאפס סיסמה.",
  "auth/weak-password": "הסיסמה קצרה מדי. צריך לפחות 8 תווים.",
  "auth/invalid-email": "כתובת האימייל לא תקינה.",
  "auth/popup-closed-by-user": "חלון ההתחברות נסגר. לחצו שוב כדי להמשיך.",
  "auth/popup-blocked": "הדפדפן חסם את חלון ההתחברות. אפשרו חלונות קופצים ונסו שוב.",
  "auth/too-many-requests": "היו יותר מדי ניסיונות. המתינו כמה דקות ונסו שוב.",
  "auth/requires-recent-login": "מטעמי אבטחה צריך להתחבר מחדש ואז לחזור על הפעולה.",
  "permission-denied": "אין הרשאה לפעולה הזו. ודאו שאתם מחוברים ושהאימייל מאומת.",
  unavailable: "אין כרגע חיבור לשרת. בדקו את החיבור ונסו שוב.",
};
export function errorText(e: unknown) {
  const code = (e as { code?: string })?.code?.replace("firestore/", "") ?? "";
  return MAP[code] ?? "הפעולה לא הצליחה. נסו שוב בעוד רגע.";
}
