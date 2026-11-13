"use client";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { errorText } from "@/lib/errors";
import { withTimeout } from "@/lib/withTimeout";

type Post = { id: string; uid: string; authorName: string; title: string; body: string; createdAt?: Timestamp };

export default function Page() {
  const { user, isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const s = await getDocs(query(collection(db(), "posts"), orderBy("createdAt", "desc"), limit(50)));
      setPosts(s.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Post, "id">) })));
    } catch (e) { setError(errorText(e)); setPosts([]); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true); setError(""); setNote("");
    try {
      await withTimeout(addDoc(collection(db(), "posts"), {
        uid: user.uid, authorName: (user.displayName || "גיימר/ית").slice(0, 60),
        title: String(f.get("title")).trim(), body: String(f.get("body")).trim(), createdAt: serverTimestamp(),
      }));
      form.reset(); setNote("הפוסט פורסם."); await load();
    } catch (err) { setError(errorText(err)); }
    setBusy(false);
  }
  async function remove(id: string) {
    setError(""); setNote("");
    try { await deleteDoc(doc(db(), "posts", id)); setNote("הפוסט נמחק."); await load(); }
    catch (err) { setError(errorText(err)); }
  }
  async function report(id: string) {
    if (!user) return;
    setError(""); setNote("");
    try { await addDoc(collection(db(), "reports"), { postId: id, uid: user.uid, createdAt: serverTimestamp() }); setNote("הדיווח נשלח למנהל האתר."); }
    catch (err) { setError(errorText(err)); }
  }

  return (
    <div className="wrap section narrow">
      <h1 className="title-l">קהילה</h1>
      <p className="lead">שואלים, מספרים ומחפשים שותפים לנסיעה. בלי לפרסם טלפון או כתובת.</p>
      {user?.emailVerified ? (
        <form className="panel" onSubmit={submit}>
          <label>כותרת<input name="title" required maxLength={120} /></label>
          <label>מה רצית לכתוב?<textarea name="body" required maxLength={4000} rows={4} /></label>
          <button className="btn" disabled={busy}>{busy ? "מפרסם…" : "פרסום הפוסט"}</button>
        </form>
      ) : (
        <p className="panel">{user ? <>כדי לפרסם צריך לאמת את האימייל. <Link href="/account">לחשבון שלי</Link></> : <><Link href="/account">התחברו</Link> כדי לפרסם.</>}</p>
      )}
      <div aria-live="polite">
        {error && <p className="msg err" role="alert">{error}</p>}
        {note && <p className="msg ok" role="status">{note}</p>}
      </div>
      {posts === null && <p>טוען פוסטים…</p>}
      {posts?.length === 0 && !error && <p className="empty">עוד אין פוסטים. אפשר לפתוח עם שאלה על הנסיעה הבאה שלך.</p>}
      <ul className="posts">
        {posts?.map((p) => (
          <li key={p.id}>
            <h2>{p.title}</h2>
            <p className="tags">{p.authorName}{p.createdAt ? `, ${p.createdAt.toDate().toLocaleDateString("he-IL")}` : ""}</p>
            <p className="post-body">{p.body}</p>
            <div className="post-actions">
              {user && user.uid !== p.uid && <button className="link" onClick={() => report(p.id)}>דיווח</button>}
              {(user?.uid === p.uid || isAdmin) && <button className="link danger" onClick={() => remove(p.id)}>מחיקה</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
