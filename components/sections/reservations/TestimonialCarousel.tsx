"use client";

import { Quote } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/cn";

type Testimonial = { quote: string; name: string; detail: string };

type TestimonialCarouselProps = { items: Testimonial[]; intervalMs: number };

const initials = (name: string) =>
  name
    .split(" ")
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .map((part) => part[0])
    .join("");

// Position of a slide relative to the active one, going the short way round (…, -1, 0, 1, …).
function offsetOf(index: number, active: number, total: number) {
  const offset = (index - active + total) % total;
  return offset > total / 2 ? offset - total : offset;
}

// The next quote rises from below, the previous one tips away upwards (3D, around the X axis).
function slideStyle(offset: number): CSSProperties {
  if (offset === 0) return { transform: "none", opacity: 1 };
  const dir = offset > 0 ? 1 : -1;
  return { transform: `translateY(${dir * 50}px) rotateX(${dir * -40}deg)`, opacity: 0 };
}

// One big quote at a time; turns on its own, pauses under the pointer or keyboard focus.
export function TestimonialCarousel({ items, intervalMs }: TestimonialCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (isPaused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % total), intervalMs);
    return () => clearTimeout(id);
  }, [active, isPaused, total, intervalMs]);

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Testemunhos de clientes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="reveal relative mx-auto max-w-[860px]"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(160deg,var(--card),var(--surface))] px-6 py-12 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:px-16 sm:py-16">
        <Quote aria-hidden="true" className="absolute left-6 top-6 size-16 text-gold/15 sm:left-10 sm:top-10" strokeWidth={1} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(142,42,54,0.35),transparent)]" />

        <div className="grid perspective-[1000px]">
          {items.map((item, i) => {
            const offset = offsetOf(i, active, total);
            const isActive = offset === 0;
            return (
              <figure
                key={item.name}
                aria-hidden={!isActive}
                inert={!isActive}
                className="flex flex-col items-center text-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] [grid-area:1/1] motion-reduce:transition-opacity"
                style={slideStyle(offset)}
              >
                <Stars className="h-5" />
                <blockquote className="mt-6 font-display text-[24px] italic leading-snug text-fg sm:text-[30px]">“{item.quote}”</blockquote>
                <figcaption className="mt-8 flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="grid size-14 place-items-center rounded-full bg-[image:var(--gold-gradient)] font-display text-[20px] font-bold text-bg ring-2 ring-gold/40 ring-offset-4 ring-offset-surface"
                  >
                    {initials(item.name)}
                  </span>
                  <span className="mt-4 text-[14px] font-medium uppercase tracking-[0.15em] text-fg">{item.name}</span>
                  <span className="mt-1 text-[13px] text-subtle">{item.detail}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Ver testemunho ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className="grid h-6 place-items-center"
          >
            <span className={cn("block h-1.5 rounded-full transition-all duration-300", i === active ? "w-8 bg-gold" : "w-1.5 bg-fg/25 hover:bg-fg/50")} />
          </button>
        ))}
      </div>
    </div>
  );
}
