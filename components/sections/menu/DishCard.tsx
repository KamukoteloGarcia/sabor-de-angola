import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HoverSparks } from "@/components/ui/HoverSparks";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Dish } from "@/config/menu";
import { formatKz } from "@/lib/format";
import { DishTag } from "./DishTag";

type DishCardProps = { dish: Dish; style?: CSSProperties };

// On hover: the card lifts and tilts, an ember glow rises over the photo, a light streak sweeps across,
// sparks fly up ("lightning"), a gold badge pops in and a gold line grows under the card.
export function DishCard({ dish, style }: DishCardProps) {
  return (
    <div style={style} className="h-full motion-safe:animate-tab-in">
      <TiltCard className="h-full rounded-[22px]">
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(160deg,var(--card),var(--surface))] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition duration-500 hover:border-gold/50 hover:shadow-[0_30px_70px_-30px_rgba(238,113,57,0.5)]">
          <div className="relative isolate aspect-[4/3] overflow-hidden">
            <Image
              src={dish.photo}
              alt={dish.name}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
              className="-z-10 object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

            {/* Ember glow rising from the bottom */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-full bg-[linear-gradient(to_top,rgba(238,113,57,0.7),rgba(222,179,109,0.25)_55%,transparent)] transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0"
            />
            {/* Light streak sweeping across */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-[linear-gradient(90deg,transparent,rgba(255,240,210,0.5),transparent)] transition-transform duration-[900ms] ease-out group-hover:translate-x-[520%] group-focus-within:translate-x-[520%]"
            />
            <HoverSparks />
            {/* Gold badge popping in */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 scale-50 place-items-center rounded-full bg-[image:var(--gold-gradient)] text-bg opacity-0 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
            >
              <UtensilsCrossed className="size-7" strokeWidth={1.6} />
            </span>

            {dish.tag && <DishTag tag={dish.tag} className="absolute left-4 top-4" />}
            <span className="absolute bottom-4 right-4 rounded-full bg-[image:var(--gold-gradient)] px-4 py-1.5 font-display text-[18px] font-bold text-bg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]">
              {formatKz(dish.price)}
              {dish.unit && <span className="ml-1 text-[13px] font-semibold">{dish.unit}</span>}
            </span>
          </div>

          <div className="flex flex-1 flex-col px-6 pb-7 pt-3">
            <h3 className="font-display text-[25px] font-semibold leading-tight text-fg transition group-hover:text-gold-bright">{dish.name}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{dish.description}</p>
          </div>

          {/* Gold line growing under the card */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[image:var(--gold-gradient)] transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100"
          />
        </article>
      </TiltCard>
    </div>
  );
}
