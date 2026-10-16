import { BookOpen, ChefHat, Clock, Fish, Flame, Martini, Sparkles, Star, Waves, Wine, type LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/scene/GlassCard";
import type { BadgeIcon, HeroBadge } from "@/config/hero";
import { cn } from "@/lib/cn";

const icons: Record<BadgeIcon, LucideIcon> = {
  star: Star,
  chef: ChefHat,
  flame: Flame,
  clock: Clock,
  fish: Fish,
  waves: Waves,
  martini: Martini,
  wine: Wine,
  book: BookOpen,
  sparkles: Sparkles,
};

// Where the two cards sit around the 3D scene, and when each one starts bobbing.
const placements = [
  "left-0 top-[6%] [animation-delay:-1s] sm:left-[2%]",
  "bottom-[8%] right-0 [animation-delay:-3.5s] sm:right-[2%]",
];

// Floating glass cards over the 3D scene (key facts about the current banner).
export function HeroBadges({ badges }: { badges: readonly HeroBadge[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 max-sm:hidden">
      {badges.map((badge, i) => {
        const Icon = icons[badge.icon];
        return (
          <div key={badge.title} className={cn("absolute motion-safe:animate-float", placements[i])}>
            <GlassCard className={cn("flex items-center gap-3 motion-safe:animate-rise", i === 1 && "[animation-delay:300ms]")}>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gold-gradient)] text-bg">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-display text-[21px] font-semibold leading-tight text-fg">{badge.title}</span>
                <span className="text-[12px] text-muted">{badge.detail}</span>
              </span>
            </GlassCard>
          </div>
        );
      })}
    </div>
  );
}
