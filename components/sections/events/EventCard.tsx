import { Users } from "lucide-react";
import Image from "next/image";
import { revealFromSide } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";

type EventCardProps = { title: string; text: string; capacity: string; photo: string; index: number };

export function EventCard({ title, text, capacity, photo, index }: EventCardProps) {
  return (
    <TiltCard className={cn(revealFromSide(index), "h-full rounded-[24px]")} max={6}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-surface shadow-[0_30px_60px_-35px_rgba(60,35,15,0.45)] ring-1 ring-line transition duration-500 hover:shadow-[0_40px_70px_-30px_rgba(168,116,47,0.45)]">
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image src={photo} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-fg backdrop-blur-sm">
            <Users aria-hidden="true" className="size-3.5 text-gold" />
            {capacity}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-[27px] font-semibold leading-tight text-fg">{title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{text}</p>
        </div>
      </article>
    </TiltCard>
  );
}
