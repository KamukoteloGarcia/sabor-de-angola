"use client";

import { useEffect, useRef } from "react";

type CountUpProps = { value: number; decimals?: number; suffix?: string; durationMs?: number };

// Counts from 0 to `value` the first time it scrolls into view.
// The final number is rendered on the server, so it is correct without JavaScript.
export function CountUp({ value, decimals = 0, suffix = "", durationMs = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const eased = 1 - (1 - progress) ** 3;
        element.textContent = `${(value * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, suffix, durationMs]);

  return (
    <span ref={ref} className="lining-nums">
      {format(value)}
    </span>
  );
}
