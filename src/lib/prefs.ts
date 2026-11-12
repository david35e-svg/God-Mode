"use client";
// העדפות נגישות והסכמת קוקיז. נשמרות בדפדפן של המבקר בלבד.
export type A11y = { scale: 0 | 1 | 2 | 3; contrast: boolean; motion: boolean; links: boolean };
export const A11Y_DEFAULT: A11y = { scale: 0, contrast: false, motion: false, links: false };
export type Consent = "all" | "essential";

const A11Y_KEY = "gmt.a11y.v1";
const CONSENT_KEY = "gmt.consent.v1";

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch { return fallback; }
}
export function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* מצב גלישה פרטית */ }
}

export const readA11y = () => read<A11y>(A11Y_KEY, A11Y_DEFAULT);
export const writeA11y = (v: A11y) => write(A11Y_KEY, v);
export function applyA11y(v: A11y) {
  const el = document.documentElement;
  el.dataset.scale = String(v.scale);
  el.dataset.contrast = v.contrast ? "high" : "normal";
  el.dataset.motion = v.motion ? "off" : "on";
  el.dataset.links = v.links ? "underline" : "normal";
}

export function readConsent(): Consent | null {
  try { return localStorage.getItem(CONSENT_KEY) as Consent | null; } catch { return null; }
}
export function writeConsent(v: Consent) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* מצב גלישה פרטית */ }
}
