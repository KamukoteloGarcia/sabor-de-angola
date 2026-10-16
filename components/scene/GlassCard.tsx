import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Dark glass panel with a gold edge, used for the floating info cards.
// (No backdrop-filter: it is too expensive inside animated 3D scenes.)
export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold/30 bg-[linear-gradient(140deg,rgba(38,32,24,0.95),rgba(16,14,11,0.92))] px-4 py-3 text-fg shadow-[0_28px_50px_-18px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
