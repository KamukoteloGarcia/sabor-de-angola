"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroScene3D } from "@/components/three/HeroScene3D";
import type { HeroSlideId, HeroTone } from "@/config/hero";
import { cn } from "@/lib/cn";
import { usePageReady } from "@/lib/page-ready";

type HeroCarouselProps = {
  slideIds: readonly HeroSlideId[];
  /** Light or dark palette of each banner (text, controls and the header follow it). */
  tones: HeroTone[];
  /** One entry per banner, in the same order. */
  texts: ReactNode[];
  backdrops: ReactNode[];
  badges: ReactNode[];
  intervalMs: number;
};

const leaveMs = 900;

function prefersReducedMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Banners play on their own (no controls): the text swaps on the left with a 3D turn, while a single
// WebGL canvas morphs from one scene to the next. Autoplay and rendering pause when the hero is off screen.
export function HeroCarousel({ slideIds, tones, texts, backdrops, badges, intervalMs }: HeroCarouselProps) {
  const total = slideIds.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  // Everything (autoplay, 3D) starts once the splash has gone.
  const isReady = usePageReady();
  const isRunning = isVisible && isReady;

  // Autoplay (restarts whenever the banner changes).
  useEffect(() => {
    if (!isRunning || prefersReducedMotion()) return;
    const id = setTimeout(() => {
      setLeaving(active);
      setActive((active + 1) % total);
    }, intervalMs);
    return () => clearTimeout(id);
  }, [active, isRunning, intervalMs, total]);

  // Unmount the previous text once its exit animation is over.
  useEffect(() => {
    if (leaving === null) return;
    const id = setTimeout(() => setLeaving(null), leaveMs);
    return () => clearTimeout(id);
  }, [leaving]);

  // Tell the header which palette the visible banner uses (it sits outside the hero).
  useEffect(() => {
    document.documentElement.dataset.heroTone = tones[active];
  }, [active, tones]);

  // Pause autoplay, CSS animations and the WebGL loop when the hero is off screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques do restaurante"
      data-paused={isVisible ? undefined : ""}
      className="relative flex flex-1 flex-col"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {backdrops.map((backdrop, i) => (
          <div key={i} className={cn("absolute inset-0 transition-opacity duration-[1400ms]", i === active ? "opacity-100" : "opacity-0")}>
            {backdrop}
          </div>
        ))}
      </div>

      {/* On large screens the grid and the scene cell are static, so the canvas fills the whole hero. */}
      <div className="container-site relative grid flex-1 items-center gap-2 pb-28 pt-32 lg:static lg:min-h-[calc(100svh-96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:pb-24 lg:pt-28">
        <div className="relative z-10 grid">
          {texts.map((text, i) => {
            if (i !== active && i !== leaving) return null;
            const isLeaving = i === leaving;
            return (
              <div
                key={i}
                inert={isLeaving}
                data-theme={tones[i]}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}`}
                className={cn("[grid-area:1/1]", isLeaving && "pointer-events-none motion-safe:animate-hero-out")}
              >
                {text}
              </div>
            );
          })}
        </div>

        <div role="img" aria-label="Cena 3D animada do banner atual" className="relative h-[340px] sm:h-[480px] lg:static lg:h-[min(560px,calc(100svh-260px))]">
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-12 lg:inset-0">
            <HeroScene3D slides={slideIds} active={active} isRunning={isRunning} eventSource={rootRef} />
          </div>
          <div key={active} className="relative size-full">
            {badges[active]}
          </div>
        </div>
      </div>
    </div>
  );
}
