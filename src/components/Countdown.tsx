"use client";
import { useEffect, useState } from "react";
export function daysUntil(iso: string, now = new Date()) {
  return Math.max(0, Math.ceil((new Date(iso + "T00:00:00Z").getTime() - now.getTime()) / 86400000));
}
export function Countdown({ date }: { date: string }) {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => setD(daysUntil(date)), [date]);
  return <span className="countdown"><b className="num">{d ?? "—"}</b> ימים</span>;
}
