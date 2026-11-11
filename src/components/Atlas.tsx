"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LAND_PATH } from "@/data/world";
import { DESTINATIONS, ORIGIN, spotsFor, eventsFor } from "@/data/content";
import { arc, distanceKm, frame, project } from "@/lib/geo";

gsap.registerPlugin(useGSAP);
const home = project(ORIGIN.lat, ORIGIN.lon);
const viewWidth = (v: string) => Number(v.split(" ")[2]);

export function Atlas() {
  const [sel, setSel] = useState(0);
  const [aspect, setAspect] = useState(1.6);
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const route = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  const dest = DESTINATIONS[sel];
  const to = project(dest.lat, dest.lon);
  const view = frame(home, to, aspect, 18);
  // הסימונים נמדדים ביחידות המפה, ולכן גדלם נגזר מרוחב התצוגה הנוכחי
  const u = viewWidth(view) / 150;
  const km = distanceKm(ORIGIN, dest);
  const spots = spotsFor(dest.id).length;
  const events = eventsFor(dest.id).length;

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      if (b.width && b.height) setAspect(b.width / b.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(() => {
    const path = route.current!;
    const len = path.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = (t: number) => {
      const p = path.getPointAtLength(t * len);
      const q = path.getPointAtLength(Math.min(len, t * len + 0.4));
      const r = t >= 1 ? 0 : (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      plane.current!.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${r})`);
    };
    path.style.strokeDasharray = `${len}`;

    if (reduced) {
      gsap.set([".atlas-land", ".city", ".atlas-hud"], { opacity: 1 });
      gsap.set(plane.current, { opacity: 0 });
      gsap.set(path, { strokeDashoffset: 0 });
      svg.current!.setAttribute("viewBox", view);
      place(1);
      first.current = false;
      return;
    }

    const t = { v: 0 };
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (first.current) {
      // הרגע האחד: היבשות עולות, אורות הערים נדלקים, והמסלול נמתח
      first.current = false;
      tl.fromTo(".atlas-land", { opacity: 0, scale: 1.04, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 1 }, 0)
        .fromTo(".city", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: { each: 0.07, from: "start" }, transformOrigin: "50% 50%" }, 0.35)
        .fromTo(".atlas-hud > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.5);
    }
    tl.to(svg.current, { attr: { viewBox: view }, duration: 1, ease: "power2.inOut" }, first.current ? 0 : 0)
      .fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "<")
      .to(t, { v: 1, duration: 1.2, ease: "power2.inOut", onUpdate: () => place(t.v) }, "<")
      .fromTo(plane.current, { opacity: 0 }, { opacity: 1, duration: 0.25 }, "<")
      .to(plane.current, { opacity: 0, duration: 0.3 }, "-=0.3");
  }, { dependencies: [sel], scope: root, revertOnUpdate: false });

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowLeft: 1, ArrowDown: 1, ArrowRight: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (sel + step + DESTINATIONS.length) % DESTINATIONS.length;
    setSel(n);
    chips.current[n]?.focus();
  };

  return (
    <section className="atlas" ref={root} aria-labelledby="atlas-h">
      <svg ref={svg} viewBox={view} preserveAspectRatio="xMidYMid slice" className="atlas-map" aria-hidden focusable="false">
        <defs>
          <radialGradient id="glow"><stop offset="0" stopColor="currentColor" stopOpacity=".55" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
        </defs>
        <path className="atlas-land" d={LAND_PATH} shapeRendering="crispEdges" />
        <path ref={route} className="atlas-route" d={arc(home, to)} style={{ strokeWidth: 0.34 * u }} />
        <g className="city home">
          <circle cx={home.x} cy={home.y} r={3.4 * u} className="halo" />
          <rect x={home.x - 0.75 * u} y={home.y - 0.75 * u} width={1.5 * u} height={1.5 * u} />
        </g>
        {DESTINATIONS.map((d, i) => {
          const p = project(d.lat, d.lon);
          return (
            <g key={d.id} className={`city${i === sel ? " on" : ""}`} onClick={() => setSel(i)}>
              <circle cx={p.x} cy={p.y} r={3.8 * u} className="halo" />
              <rect x={p.x - 0.85 * u} y={p.y - 0.85 * u} width={1.7 * u} height={1.7 * u} />
            </g>
          );
        })}
        <g ref={plane} className="atlas-plane">
          <path d="M-2.4 0 L-1.1 -1.1 L2.4 -0.34 L2.4 0.34 L-1.1 1.1 Z" transform={`scale(${(u * 0.85).toFixed(3)})`} />
        </g>
      </svg>

      <div className="atlas-hud">
        <h1 id="atlas-h" className="title-xl">המקומות<br />שלא כתובים<br />במדריך.</h1>
        <p className="atlas-lead">
          ארקייד בקומה חמישית, בר שנראה רגיל מבחוץ, קניון שהקומות העליונות שלו הן מבוך של חנויות.
          בוחרים יעד, ונדליק את המסלול.
        </p>

        <div className="chips" role="radiogroup" aria-label="בחירת יעד" onKeyDown={onKey}>
          {DESTINATIONS.map((d, i) => (
            <button key={d.id} ref={(el) => { chips.current[i] = el; }} className="chip" role="radio"
              aria-checked={i === sel} tabIndex={i === sel ? 0 : -1} onClick={() => setSel(i)}>
              {d.name}
            </button>
          ))}
        </div>

        <div className="readout" aria-live="polite">
          <h2>{dest.name}<span>{dest.country}</span></h2>
          <p>{dest.pitch}</p>
          <dl className="gauges">
            <div><dt>מרחק מתל אביב</dt><dd className="num">{km.toLocaleString("en-US")} ק״מ</dd></div>
            <div><dt>מקומות נסתרים</dt><dd className="num">{spots}</dd></div>
            <div><dt>אירועים בלוח</dt><dd className="num">{events}</dd></div>
          </dl>
          <div className="actions">
            <Link className="btn" href={`/destinations/${dest.id}`}>כניסה ל{dest.name}</Link>
            <Link className="btn ghost" href="/spots">כל המקומות הנסתרים</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
