"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { markPageReady } from "@/lib/page-ready";
import { SplashMark } from "./SplashMark";

// Always shown for at least 5 seconds, even when the page loads instantly
// (keep in sync with the .splash-bar duration and the fail-safe delay in globals.css).
const minVisibleMs = 5000;
const leaveMs = 900;

type Phase = "showing" | "leaving" | "gone";

function waitForLoad() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else addEventListener("load", () => resolve(), { once: true });
  });
}

// Full-screen intro on every page load: the emblem draws itself in gold, the name appears and a bar fills.
// It is server-rendered, so it covers the page from the very first paint; when everything has loaded
// it opens like a curtain. A CSS fail-safe hides it even if JavaScript never runs.
export function Splash() {
  const [phase, setPhase] = useState<Phase>("showing");

  useEffect(() => {
    let cancelled = false;
    const elapsed = performance.now();
    const minimum = new Promise((resolve) => setTimeout(resolve, Math.max(0, minVisibleMs - elapsed)));

    Promise.all([waitForLoad(), minimum]).then(() => {
      if (cancelled) return;
      markPageReady();
      setPhase("leaving");
      setTimeout(() => !cancelled && setPhase("gone"), leaveMs);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // No scrolling while the splash covers the page.
  useEffect(() => {
    if (phase !== "showing") return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;

  const letters = Array.from(site.name);

  return (
    <div
      role="status"
      aria-label="A carregar o site"
      className={cn("splash fixed inset-0 z-[100] grid place-items-center overflow-hidden", phase === "leaving" && "splash-leave pointer-events-none")}
    >
      {/* Two curtain halves that slide apart when leaving */}
      <div aria-hidden="true" className="splash-curtain absolute inset-y-0 left-0 w-1/2 bg-bg" />
      <div aria-hidden="true" className="splash-curtain splash-curtain-right absolute inset-y-0 right-0 w-1/2 bg-bg" />
      <div aria-hidden="true" className="splash-content absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_45%,rgba(222,179,109,0.22),transparent_70%)]" />

      <div className="splash-content relative flex flex-col items-center px-6 text-center">
        <div className="relative">
          <span aria-hidden="true" className="splash-glow absolute inset-[-40%] rounded-full bg-[radial-gradient(closest-side,rgba(246,215,152,0.45),transparent)]" />
          <SplashMark />
        </div>

        <p aria-hidden="true" className="mt-8 font-display text-[30px] font-semibold uppercase leading-none tracking-[0.18em] text-fg sm:text-[40px]">
          {letters.map((letter, i) => (
            <span key={i} className="splash-letter inline-block" style={{ animationDelay: `${900 + i * 45}ms` }}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
        <p aria-hidden="true" className="splash-fade mt-3 text-[11px] uppercase tracking-[0.5em] text-gold" style={{ animationDelay: "1600ms" }}>
          {site.tagline}
        </p>

        <div aria-hidden="true" className="mt-10 h-px w-56 overflow-hidden bg-line">
          <span className="splash-bar block h-full origin-left bg-[image:var(--gold-gradient)]" />
        </div>
        <p className="splash-fade mt-4 font-script text-[22px] text-gold-bright/90" style={{ animationDelay: "1200ms" }}>
          A preparar a sua mesa…
        </p>
      </div>
    </div>
  );
}
