"use client";
import { useEffect, useState } from "react";
import { useCountUp } from "@/lib/useCountUp";
export function daysUntil(iso: string, now = new Date()) {
  return Math.max(0, Math.ceil((new Date(iso + "T00:00:00Z").getTime() - now.getTime()) / 86400000));
}
export function Countdown({ date }: { date: string }) {
  const [d, setD] = useState(0);
  useEffect(() => setD(daysUntil(date)), [date]);
  const n = useCountUp(d, 1100);
  return <span className="countdown"><b className="num">{n}</b> ימים</span>;
}
