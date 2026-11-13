"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { errorText } from "@/lib/errors";
import { withTimeout } from "@/lib/withTimeout";

export default function Page() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return;
    setState("sending"); setError("");
    try {
      await withTimeout(addDoc(collection(db(), "inquiries"), {
        name: String(f.get("name")).trim(), email: String(f.get("email")).trim(), message: String(f.get("message")).trim(),
        consent: f.get("consent") === "on", handled: false, createdAt: serverTimestamp(),
      }));
      setState("sent");
    } catch (err) { setError(errorText(err)); setState("idle"); }
  }
  return (
    <div className="wrap section narrow">
      <h1 className="title-l">יצירת קשר</h1>
      {state === "sent"
        ? <p className="msg ok" role="status">ההודעה נשלחה. נחזור אליך לאימייל שכתבת.</p>
        : <form className="panel" onSubmit={submit}>
            <label>שם<input name="name" required maxLength={80} autoComplete="name" /></label>
            <label>אימייל<input name="email" type="email" required maxLength={200} autoComplete="email" dir="ltr" /></label>
            <label>הודעה<textarea name="message" required maxLength={3000} rows={6} /></label>
            <label className="hp" aria-hidden="true">אתר<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="check"><input type="checkbox" name="consent" required /><span>קראתי את <Link href="/legal/privacy">מדיניות הפרטיות</Link> ומסכים/ה לשמירת הפרטים לצורך מענה.</span></label>
            {error && <p className="msg err" role="alert">{error}</p>}
            <button className="btn" disabled={state === "sending"}>{state === "sending" ? "שולח…" : "שליחת ההודעה"}</button>
          </form>}
    </div>
  );
}
