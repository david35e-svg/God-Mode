"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HoloCard } from "./HoloCard";
import { daysUntil } from "./Countdown";
import { LAND_PATH, MAP } from "@/data/world";
import { DESTINATIONS, EVENTS } from "@/data/content";

gsap.registerPlugin(useGSAP);
const next = [...EVENTS].filter((e) => e.status === "confirmed").sort((a, b) => a.sortDate.localeCompare(b.sortDate))[0];

export function PackOpener() {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<string>("–");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => setDays(String(daysUntil(next.sortDate))), []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setOpen(true);
  }, []);

  const { contextSafe } = useGSAP({ scope: root });
  const rip = contextSafe(() => {
    if (open) return;
    const tl = gsap.timeline({ onComplete: () => { root.current?.querySelector<HTMLAnchorElement>(".holo")?.focus({ preventScroll: true }); } });
    tl.to(".pack", { x: -3, duration: 0.05, repeat: 5, yoyo: true, ease: "none" })
      .to(".pack-strip", { yPercent: -160, rotate: -14, opacity: 0, duration: 0.35, ease: "power2.in" })
      .to(".pack-body", { yPercent: 70, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.05")
      .add(() => setOpen(true))
      .fromTo(".deal .holo", { y: 120, rotateY: 180, opacity: 0 }, { y: 0, rotateY: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" }, "+=0.02");
  });

  return (
    <div className="stage" ref={root}>
      {!open && (
        <button className="pack" onClick={rip} aria-label="פתיחת החבילה">
          <span className="pack-strip" aria-hidden />
          <span className="pack-body" aria-hidden>
            <span className="pack-logo">GOD MODE</span>
            <span className="pack-sub">3 קלפים בפנים</span>
          </span>
          <span className="pack-cta">לחצו לקרוע</span>
        </button>
      )}
      <div className="deal" hidden={!open}>
        <HoloCard href="/shop" tone="pink" kind="חנות" title="קלפי פוקימון" stat="4" statLabel="מדפים אצל שותפים"
          art={<span className="art-sparks" />} />
        <HoloCard href="/events" tone="gold" kind="אירוע" title={next.name.replace(" 2027", "")} stat={days} statLabel="ימים לפתיחה"
          art={<span className="art-vs">VS</span>} />
        <HoloCard href="/destinations" tone="cyan" kind="עולם" title="יעדי גיימינג" stat={String(DESTINATIONS.length)} statLabel="ערים במפה"
          art={<svg viewBox={`60 0 ${MAP.width - 60} ${MAP.height - 10}`} preserveAspectRatio="xMidYMid slice"><path d={LAND_PATH} shapeRendering="crispEdges" /></svg>} />
      </div>
    </div>
  );
}
