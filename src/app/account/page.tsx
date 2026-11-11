"use client";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, query, Timestamp, where, writeBatch } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { errorText } from "@/lib/errors";
import { DESTINATIONS, INTEREST_LABEL, type Interest } from "@/data/content";

type Plan = { id: string; interest: Interest; month: number; days: number; destinationIds: string[]; createdAt?: Timestamp };

export default function Page() {
  const { user, loading } = useAuth();
  if (loading) return <div className="wrap section narrow"><p>טוען…</p></div>;
  return <div className="wrap section narrow">{user ? <Signed /> : <SignIn />}</div>;
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  async function google() {
    setError("");
    try { await signInWithPopup(auth(), new GoogleAuthProvider()); } catch (e) { setError(errorText(e)); }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    setBusy(true); setError(""); setNote("");
    try {
      if (mode === "up") {
        if (password.length < 8) throw { code: "auth/weak-password" };
        const c = await createUserWithEmailAndPassword(auth(), email, password);
        await updateProfile(c.user, { displayName: String(f.get("name")).trim().slice(0, 60) });
        await sendEmailVerification(c.user);
      } else await signInWithEmailAndPassword(auth(), email, password);
    } catch (err) { setError(errorText(err)); }
    setBusy(false);
  }
  async function reset() {
    setError(""); setNote("");
    if (!email) { setError("כתבו את האימייל ואז לחצו שוב על איפוס הסיסמה."); return; }
    try { await sendPasswordResetEmail(auth(), email); setNote("אם יש חשבון עם האימייל הזה, נשלח אליו קישור לאיפוס."); }
    catch (err) { setError(errorText(err)); }
  }
  return (
    <>
      <h1 className="big">{mode === "in" ? "התחברות" : "פתיחת חשבון"}</h1>
      <p className="lead">חשבון נדרש רק לשמירת תוכניות ולפרסום בקהילה. כל השאר פתוח.</p>
      <button className="btn" onClick={google}>המשך עם Google</button>
      <form className="panel" onSubmit={submit}>
        {mode === "up" && <label>שם שיוצג בקהילה<input name="name" required maxLength={60} autoComplete="nickname" /></label>}
        <label>אימייל<input type="email" required dir="ltr" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>סיסמה<input type="password" name="password" required minLength={mode === "up" ? 8 : 1} dir="ltr" autoComplete={mode === "up" ? "new-password" : "current-password"} /></label>
        {mode === "up" && <p className="tags">פתיחת חשבון מהווה הסכמה ל<Link href="/legal/terms">תנאי השימוש</Link> ול<Link href="/legal/privacy">מדיניות הפרטיות</Link>.</p>}
        {error && <p className="msg err" role="alert">{error}</p>}
        {note && <p className="msg ok" role="status">{note}</p>}
        <button className="btn" disabled={busy}>{busy ? "רגע…" : mode === "in" ? "התחברות" : "פתיחת חשבון"}</button>
      </form>
      <p className="link-row">
        <button className="link" onClick={() => { setMode(mode === "in" ? "up" : "in"); setError(""); }}>{mode === "in" ? "אין לך חשבון? פתיחת חשבון" : "יש לך חשבון? התחברות"}</button>
        {mode === "in" && <button className="link" onClick={reset}>איפוס סיסמה</button>}
      </p>
    </>
  );
}

function Signed() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [confirming, setConfirming] = useState(false);
  const load = useCallback(async () => {
    if (!user) return;
    try {
      const s = await getDocs(query(collection(db(), "plans"), where("uid", "==", user.uid)));
      const rows = s.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Plan, "id">) }));
      setPlans(rows.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)));
    } catch (e) { setError(errorText(e)); setPlans([]); }
  }, [user]);
  useEffect(() => { void load(); }, [load]);
  if (!user) return null;

  async function resend() {
    setError(""); setNote("");
    try { await sendEmailVerification(user!); setNote("שלחנו שוב מייל אימות."); } catch (e) { setError(errorText(e)); }
  }
  async function removeAccount() {
    setError(""); setNote("");
    try {
      const database = db();
      const batch = writeBatch(database);
      const [mine, posts] = await Promise.all([
        getDocs(query(collection(database, "plans"), where("uid", "==", user!.uid))),
        getDocs(query(collection(database, "posts"), where("uid", "==", user!.uid))),
      ]);
      mine.docs.concat(posts.docs).forEach((d) => batch.delete(d.ref));
      await batch.commit();
      await deleteUser(user!);
    } catch (e) { setError(errorText(e)); setConfirming(false); }
  }
  return (
    <>
      <h1 className="big">החשבון שלי</h1>
      <p className="lead">{user.displayName ? `${user.displayName}, ` : ""}<span dir="ltr">{user.email}</span></p>
      {!user.emailVerified && (
        <p className="panel">האימייל עדיין לא מאומת, ולכן אי אפשר לפרסם בקהילה. אחרי האישור טענו את העמוד מחדש. <button className="link" onClick={resend}>שליחה חוזרת של המייל</button></p>
      )}
      <div aria-live="polite">
        {error && <p className="msg err" role="alert">{error}</p>}
        {note && <p className="msg ok" role="status">{note}</p>}
      </div>
      <h2 className="mid">התוכניות שלי</h2>
      {plans === null && <p>טוען…</p>}
      {plans?.length === 0 && !error && <p className="empty">עוד אין תוכניות שמורות. <Link href="/planner">לבונה הטיול</Link></p>}
      <ul className="posts">
        {plans?.map((p) => (
          <li key={p.id}>
            <h3>{INTEREST_LABEL[p.interest]}, חודש {p.month}, {p.days} ימים</h3>
            <p>{p.destinationIds.map((id) => DESTINATIONS.find((d) => d.id === id)?.name).filter(Boolean).join(", ")}</p>
            <button className="link danger" onClick={async () => { await deleteDoc(doc(db(), "plans", p.id)); await load(); }}>מחיקה</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="btn ghost" onClick={() => signOut(auth())}>התנתקות</button>
        {confirming
          ? <><button className="btn danger" onClick={removeAccount}>כן, למחוק הכול</button><button className="link" onClick={() => setConfirming(false)}>ביטול</button></>
          : <button className="link danger" onClick={() => setConfirming(true)}>מחיקת החשבון, הפוסטים והתוכניות</button>}
      </div>
    </>
  );
}
