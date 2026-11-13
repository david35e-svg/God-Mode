"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { DESTINATIONS, EVENTS, INTEREST_LABEL, type Interest } from "@/data/content";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { errorText } from "@/lib/errors";
import { withTimeout } from "@/lib/withTimeout";

const MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

export function Planner() {
  const { user } = useAuth();
  const [interest, setInterest] = useState<Interest>("esports");
  const [month, setMonth] = useState(8);
  const [days, setDays] = useState(7);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const results = useMemo(() => DESTINATIONS
    .filter((d) => d.interests.includes(interest))
    .map((d) => {
      const events = EVENTS.filter((e) => e.destinationId === d.id && e.month === month && e.interests.includes(interest));
      return { d, events, fitsMonth: d.bestMonths.includes(month), fitsDays: days >= d.minDays };
    })
    .sort((a, b) => (b.events.length * 4 + +b.fitsMonth * 2 + +b.fitsDays) - (a.events.length * 4 + +a.fitsMonth * 2 + +a.fitsDays)),
    [interest, month, days]);

  async function save() {
    if (!user) return;
    setSaving(true); setNote(null);
    try {
      await withTimeout(addDoc(collection(db(), "plans"), { uid: user.uid, interest, month, days, destinationIds: results.map((r) => r.d.id), createdAt: serverTimestamp() }));
      setNote({ ok: true, text: "התוכנית נשמרה בחשבון שלך." });
    } catch (e) { setNote({ ok: false, text: errorText(e) }); }
    setSaving(false);
  }

  return (
    <div className="planner">
      <form className="panel" onSubmit={(e) => e.preventDefault()}>
        <label>מה הכי מעניין אותך?
          <select value={interest} onChange={(e) => setInterest(e.target.value as Interest)}>
            {Object.entries(INTEREST_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label>באיזה חודש?
          <select value={month} onChange={(e) => setMonth(+e.target.value)}>
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </label>
        <label>כמה ימים?
          <input type="number" min={2} max={30} value={days} onChange={(e) => setDays(Math.max(2, Math.min(30, +e.target.value || 2)))} />
        </label>
      </form>
      <div aria-live="polite">
        <h2 className="title-m">{results.length ? "ההתאמות שלך" : "אין התאמה"}</h2>
        <ul className="stops">
          {results.map(({ d, events, fitsMonth, fitsDays }) => (
            <li key={d.id}>
              <h3><Link href={`/destinations/${d.id}`}>{d.name}</Link></h3>
              <p>{d.pitch}</p>
              <ul className="reasons">
                {events.map((e) => <li key={e.id}>בחודש הזה: <Link href={`/events/${e.id}`}>{e.name}</Link></li>)}
                <li>{fitsMonth ? `${MONTHS[month - 1]} נמצא בעונה המתאימה.` : `מומלץ יותר ב: ${d.bestText}.`}</li>
                <li>{fitsDays ? "יש מספיק ימים לדברים העיקריים." : `כדאי לפחות ${d.minDays} ימים.`}</li>
              </ul>
            </li>
          ))}
        </ul>
        {user
          ? <button className="btn" onClick={save} disabled={saving}>{saving ? "שומר…" : "שמירת התוכנית"}</button>
          : <p><Link href="/account">התחברו</Link> כדי לשמור את התוכנית.</p>}
        {note && <p className={note.ok ? "msg ok" : "msg err"} role="status">{note.text}</p>}
      </div>
    </div>
  );
}
