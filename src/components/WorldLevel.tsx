"use client";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LAND_PATH } from "@/data/world";
import { DESTINATIONS, ORIGIN } from "@/data/content";
import { arc, frame, project } from "@/lib/geo";

gsap.registerPlugin(useGSAP);
const from = project(ORIGIN.lat, ORIGIN.lon);
const INITIAL = frame(from, project(DESTINATIONS[0].lat, DESTINATIONS[0].lon), 1.38, 14);

export function WorldLevel() {
  const [sel, setSel] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const route = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const dest = DESTINATIONS[sel];
  const to = project(dest.lat, dest.lon);

  useGSAP(() => {
    const path = route.current!;
    const len = path.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = svg.current!.getBoundingClientRect();
    const view = frame(from, to, box.width / Math.max(box.height, 1), 14);
    const place = (t: number) => {
      const p = path.getPointAtLength(t * len);
      const q = path.getPointAtLength(Math.min(len, t * len + 0.5));
      const r = t >= 1 ? 0 : (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      plane.current!.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${r})`);
    };
    path.style.strokeDasharray = `${len}`;
    if (reduced) {
      path.style.strokeDashoffset = "0";
      svg.current!.setAttribute("viewBox", view);
      place(1);
      return;
    }
    const s = { t: 0 };
    gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(svg.current, { attr: { viewBox: view }, duration: 0.7, ease: "power3.out" }, 0)
      .fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1 }, 0)
      .to(s, { t: 1, duration: 1.1, onUpdate: () => place(s.t) }, 0);
  }, { dependencies: [sel], scope: root, revertOnUpdate: false });

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowLeft: 1, ArrowUp: -1, ArrowRight: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (sel + step + DESTINATIONS.length) % DESTINATIONS.length;
    setSel(n);
    buttons.current[n]?.focus();
  };

  return (
    <div className="level" ref={root}>
      <div className="level-map">
        <svg ref={svg} viewBox={INITIAL} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`מפה: מסלול מ${ORIGIN.name} אל ${dest.name}`}>
          <path d={LAND_PATH} className="land" shapeRendering="crispEdges" />
          <path ref={route} d={arc(from, to)} className="route" />
          <rect x={from.x - 1} y={from.y - 1} width="2" height="2" className="node home" />
          {DESTINATIONS.map((d, i) => {
            const p = project(d.lat, d.lon);
            return <rect key={d.id} x={p.x - 1} y={p.y - 1} width="2" height="2" className={`node${i === sel ? " on" : ""}`} onClick={() => setSel(i)} />;
          })}
          <g ref={plane} className="plane" transform={`translate(${to.x} ${to.y})`}>
            <path d="M-2.5 -.5h1.5l-1-1.5h1l1.5 1.5h1.5v1h-1.5l-1.5 1.5h-1l1-1.5h-1.5z" />
          </g>
        </svg>
      </div>
      <div className="level-panel">
        <h1 className="hero-title">לאן ממשיכים?</h1>
        <p className="hero-sub">המדריך בעברית לגיימרים שיוצאים מישראל. בוחרים שלב, ורואים מה יש שם ומתי כדאי להגיע.</p>
        <div role="radiogroup" aria-label="בחירת יעד" className="stages" onKeyDown={onKey}>
          {DESTINATIONS.map((d, i) => (
            <button key={d.id} ref={(el) => { buttons.current[i] = el; }} role="radio" aria-checked={i === sel} tabIndex={i === sel ? 0 : -1} onClick={() => setSel(i)} className="stage">
              {d.name}
            </button>
          ))}
        </div>
        <div className="stage-card" aria-live="polite">
          <h2>{dest.name}, {dest.country}</h2>
          <p>{dest.pitch}</p>
          <p className="stage-when">הזמן המתאים: {dest.bestText}</p>
          <Link className="btn" href={`/destinations/${dest.id}`}>למדריך של {dest.name}</Link>
        </div>
      </div>
    </div>
  );
}
