import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Small gold caps label in a pill, above headings.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex", className)}>
      <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold-bright">
        <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
        {children}
      </span>
    </p>
  );
}
