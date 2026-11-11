"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { errorText } from "@/lib/errors";

type Inq = { id: string; name: string; email: string; message: string; handled: boolean; createdAt?: Timestamp };
type Rep = { id: string; postId: string; title?: string; body?: string };

export default function Page() {
  const { isAdmin, loading } = useAuth();
  const [inq, setInq] = useState<Inq[] | null>(null);
  const [rep, setRep] = useState<Rep[] | null>(null);
  const [clicks, setClicks] = useState<[string, number][] | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      const d = db();
      const i = await getDocs(query(collection(d, "inquiries"), orderBy("createdAt", "desc"), limit(100)));
      setInq(i.docs.map((x) => ({ id: x.id, ...(x.data() as Omit<Inq, "id">) })));
      const c = await getDocs(query(collection(d, "clicks"), orderBy("createdAt", "desc"), limit(1000)));
      const count: Record<string, number> = {};
      c.docs.forEach((x) => { const p = x.data().partner as string; count[p] = (count[p] ?? 0) + 1; });
      setClicks(Object.entries(count).sort((a, b) => b[1] - a[1]));
      const r = await getDocs(query(collection(d, "reports"), limit(100)));
      setRep(await Promise.all(r.docs.map(async (x) => {
        const postId = x.data().postId as string;
        const post = await getDoc(doc(d, "posts", postId));
        return { id: x.id, postId, title: post.data()?.title, body: post.data()?.body };
      })));
    } catch (e) { setError(errorText(e)); }
  }, []);
  useEffect(() => { if (isAdmin) void load(); }, [isAdmin, load]);

  if (loading) return <div className="wrap section"><p>טוען…</p></div>;
  if (!isAdmin) return <div className="wrap section"><h1 className="title-l">אין גישה</h1><p className="lead">העמוד הזה מיועד למנהל האתר. <Link href="/account">להתחברות</Link></p></div>;

  const act = async (fn: () => Promise<unknown>) => { setError(""); try { await fn(); await load(); } catch (e) { setError(errorText(e)); } };
  return (
    <div className="wrap section narrow">
      <h1 className="title-l">ניהול</h1>
      {error && <p className="msg err" role="alert">{error}</p>}
      <h2 className="title-m">לחיצות על שותפים</h2>
      <p className="tags">1,000 הלחיצות האחרונות. העמלות עצמן מופיעות בלוח הבקרה של כל שותף.</p>
      {clicks?.length === 0 && <p className="empty">עוד אין לחיצות.</p>}
      {!!clicks?.length && <table className="clicks"><thead><tr><th>שותף</th><th>לחיצות</th></tr></thead><tbody>{clicks.map(([p, n]) => <tr key={p}><td>{p}</td><td>{n}</td></tr>)}</tbody></table>}
      <h2 className="title-m">פניות</h2>
      {inq?.length === 0 && <p className="empty">אין פניות.</p>}
      <ul className="posts">
        {inq?.map((q) => (
          <li key={q.id} data-handled={q.handled}>
            <h3>{q.name} <a dir="ltr" href={`mailto:${q.email}`}>{q.email}</a></h3>
            <p className="tags">{q.createdAt?.toDate().toLocaleString("he-IL")}{q.handled ? ", טופל" : ""}</p>
            <p className="post-body">{q.message}</p>
            <div className="post-actions">
              <button className="link" onClick={() => act(() => updateDoc(doc(db(), "inquiries", q.id), { handled: !q.handled }))}>{q.handled ? "החזרה לטיפול" : "סימון כטופל"}</button>
              <button className="link danger" onClick={() => act(() => deleteDoc(doc(db(), "inquiries", q.id)))}>מחיקה</button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="title-m">דיווחים על פוסטים</h2>
      {rep?.length === 0 && <p className="empty">אין דיווחים.</p>}
      <ul className="posts">
        {rep?.map((r) => (
          <li key={r.id}>
            <h3>{r.title ?? "הפוסט כבר נמחק"}</h3>
            {r.body && <p className="post-body">{r.body}</p>}
            <div className="post-actions">
              {r.title && <button className="link danger" onClick={() => act(async () => { await deleteDoc(doc(db(), "posts", r.postId)); await deleteDoc(doc(db(), "reports", r.id)); })}>מחיקת הפוסט</button>}
              <button className="link" onClick={() => act(() => deleteDoc(doc(db(), "reports", r.id)))}>סגירת הדיווח</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
