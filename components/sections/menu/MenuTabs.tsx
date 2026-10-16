"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { MenuCategory } from "@/config/menu";
import { cn } from "@/lib/cn";
import { revealFromSide } from "@/components/ui/reveal";
import { DishCard } from "./DishCard";

// Category tabs (arrow keys move between them) and the grid of dishes of the chosen one.
export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + categories.length) % categories.length;
    setActiveId(categories[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorias do menu"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category, i) => {
          const isActive = category.id === active.id;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={isActive}
              aria-controls="menu-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              onKeyDown={(event) => handleKeyDown(event, i)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] transition duration-300",
                isActive
                  ? "border-transparent bg-[image:var(--gold-gradient)] text-bg shadow-[0_10px_26px_-10px_rgba(222,179,109,0.8)]"
                  : "border-line bg-white/[0.03] text-muted hover:border-gold/60 hover:text-fg",
              )}
            >
              {category.label}
              <span className={cn("grid size-5 place-items-center rounded-full text-[10px]", isActive ? "bg-bg/15 text-bg" : "bg-white/5 text-subtle")}>
                {category.dishes.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="menu-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {active.dishes.map((dish, i) => (
          <div key={`${active.id}-${dish.id}`} className={revealFromSide(i)}>
            <DishCard dish={dish} style={{ animationDelay: `${i * 90}ms` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
