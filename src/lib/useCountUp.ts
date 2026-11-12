"use client";
import { useEffect, useRef, useState } from "react";

/** מטפס אל ערך היעד. מכבד הפחתת תנועה, ומציג את הערך מיד אם היא מופעלת. */
export function useCountUp(target: number, ms = 900) {
  const [n, setN] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const off = document.documentElement.dataset.motion === "off"
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (off) { from.current = target; setN(target); return; }
    const start = performance.now(), a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(a + (target - a) * e));
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}
