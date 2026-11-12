"use client";
import { useEffect, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";
import { A11Y_DEFAULT, applyA11y, readA11y, writeA11y, type A11y } from "@/lib/prefs";

export function A11yMenu() {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState<A11y>(A11Y_DEFAULT);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  useEffect(() => { const saved = readA11y(); setV(saved); applyA11y(saved); }, []);

  const set = (patch: Partial<A11y>) => {
    const next = { ...v, ...patch };
    setV(next); applyA11y(next); writeA11y(next);
  };

  // מלכודת מיקוד בזמן שהתפריט פתוח
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); opener.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const f = panel.current?.querySelectorAll<HTMLElement>("button, [href]");
      if (!f?.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const scaleLabel = ["רגיל", "גדול", "גדול יותר", "הכי גדול"][v.scale];
  return (
    <>
      <button ref={opener} className="a11y-btn" aria-expanded={open} aria-controls="a11y-panel"
        onClick={() => setOpen(!open)} title="תפריט נגישות">
        <Accessibility aria-hidden size={24} />
        <span className="sr-only">תפריט נגישות</span>
      </button>
      {open && (
        <div className="a11y-panel" id="a11y-panel" ref={panel} role="dialog" aria-label="הגדרות נגישות">
          <div className="a11y-top">
            <h2>נגישות</h2>
            <button className="a11y-x" onClick={() => { setOpen(false); opener.current?.focus(); }} aria-label="סגירת תפריט הנגישות"><X aria-hidden size={20} /></button>
          </div>

          <div className="a11y-row">
            <span id="a11y-size">גודל הטקסט: {scaleLabel}</span>
            <span className="a11y-pair">
              <button onClick={() => set({ scale: Math.max(0, v.scale - 1) as A11y["scale"] })} disabled={v.scale === 0} aria-describedby="a11y-size" aria-label="הקטנת הטקסט"><Minus aria-hidden size={18} /></button>
              <button onClick={() => set({ scale: Math.min(3, v.scale + 1) as A11y["scale"] })} disabled={v.scale === 3} aria-describedby="a11y-size" aria-label="הגדלת הטקסט"><Plus aria-hidden size={18} /></button>
            </span>
          </div>

          {([
            ["contrast", "ניגודיות גבוהה"],
            ["motion", "עצירת אנימציות"],
            ["links", "הדגשת קישורים"],
          ] as const).map(([k, label]) => (
            <button key={k} className="a11y-toggle" role="switch" aria-checked={v[k]} onClick={() => set({ [k]: !v[k] } as Partial<A11y>)}>
              <span>{label}</span>
              <span className="a11y-sw" aria-hidden />
            </button>
          ))}

          <button className="a11y-reset" onClick={() => set(A11Y_DEFAULT)}>
            <RotateCcw aria-hidden size={16} />איפוס ההגדרות
          </button>
          <p className="a11y-note">ההגדרות נשמרות בדפדפן הזה בלבד. <a href="/legal/accessibility">הצהרת הנגישות</a></p>
        </div>
      )}
    </>
  );
}
