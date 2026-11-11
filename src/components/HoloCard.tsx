"use client";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";

// קלף עם ברק הולוגרפי שעוקב אחרי העכבר או האצבע
export function HoloCard({ href, kind, title, stat, statLabel, art, tone }: {
  href: string; kind: string; title: string; stat: string; statLabel: string; art: ReactNode; tone: "pink" | "cyan" | "gold";
}) {
  const el = useRef<HTMLAnchorElement>(null);
  const move = (e: PointerEvent) => {
    const r = el.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.current!.style.setProperty("--mx", `${x * 100}%`);
    el.current!.style.setProperty("--my", `${y * 100}%`);
    el.current!.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.current!.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
  };
  const leave = () => ["--rx", "--ry"].forEach((p) => el.current!.style.setProperty(p, "0deg"));
  return (
    <Link ref={el} href={href} className={`holo tone-${tone}`} onPointerMove={move} onPointerLeave={leave}>
      <span className="holo-in">
        <span className="holo-top"><span className="holo-kind">{kind}</span><span className="holo-title">{title}</span></span>
        <span className="holo-art" aria-hidden>{art}</span>
        <span className="holo-stat"><b>{stat}</b><span>{statLabel}</span></span>
      </span>
      <span className="holo-foil" aria-hidden />
      <span className="holo-glare" aria-hidden />
    </Link>
  );
}
