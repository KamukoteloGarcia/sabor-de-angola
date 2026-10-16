import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FloatProps = {
  x: number;
  y: number;
  /** Depth towards the viewer, in px. */
  z?: number;
  /** Animation delay in seconds (negative starts mid-cycle). */
  delay?: number;
  slow?: boolean;
  className?: string;
  children: ReactNode;
};

// Places something in the 3D scene and makes it bob up and down.
export function Float({ x, y, z = 0, delay = 0, slow, className, children }: FloatProps) {
  return (
    <div className="absolute transform-3d" style={{ left: x, top: y, transform: `translateZ(${z}px)` }}>
      <div
        className={cn("transform-3d", slow ? "motion-safe:animate-float-slow" : "motion-safe:animate-float", className)}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  );
}
