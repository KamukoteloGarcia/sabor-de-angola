import type { Dish } from "@/config/menu";
import { cn } from "@/lib/cn";

const tones: Record<NonNullable<Dish["tag"]>, string> = {
  Assinatura: "bg-gold",
  "Do chef": "bg-[#e0566a]",
  Picante: "bg-ember",
  Vegetariano: "bg-palm",
  "Para partilhar": "bg-[#8fd3dc]",
};

export function DishTag({ tag, className }: { tag: NonNullable<Dish["tag"]>; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-bg/80 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-fg ring-1 ring-white/15 backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", tones[tag])} />
      {tag}
    </span>
  );
}
