import { useId } from "react";
import { cn } from "@/lib/cn";

// Faint lattice inspired by "sona", the sand drawings of the Tchokwe people of Angola:
// a grid of dots with one continuous line weaving around them.
export function SonaPattern({ className }: { className?: string }) {
  const id = useId();

  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full text-gold", className)}>
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.6" fill="currentColor" />
          <circle cx="42" cy="42" r="1.6" fill="currentColor" />
          <path
            d="M0 28C7 28 14 21 14 14S21 0 28 0M28 56c7 0 14-7 14-14s7-14 14-14M28 0c7 0 14 7 14 14s7 14 14 14M0 28c7 0 14 7 14 14s7 14 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
