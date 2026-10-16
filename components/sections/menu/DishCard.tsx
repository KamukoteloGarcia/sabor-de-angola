import Image from "next/image";
import type { CSSProperties } from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Dish } from "@/config/menu";
import { formatKz } from "@/lib/format";
import { DishTag } from "./DishTag";

type DishCardProps = { dish: Dish; style?: CSSProperties };

export function DishCard({ dish, style }: DishCardProps) {
  return (
    <div style={style} className="motion-safe:animate-tab-in">
      <TiltCard className="h-full rounded-[22px]">
        <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(160deg,var(--card),var(--surface))] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition duration-500 hover:border-gold/50 hover:shadow-[0_30px_70px_-30px_rgba(222,179,109,0.45)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={dish.photo}
              alt={dish.name}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
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
        </article>
      </TiltCard>
    </div>
  );
}
