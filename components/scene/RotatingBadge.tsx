import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RotatingBadgeProps = { text: string; size?: number; className?: string; children: ReactNode };

// Round seal: text written along a circle that slowly turns around an icon.
export function RotatingBadge({ text, size = 120, className, children }: RotatingBadgeProps) {
  const pathId = useId();

  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full border border-gold/50 bg-[radial-gradient(circle,#231c14,#100d0a)] text-gold shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full motion-safe:animate-orbit [animation-duration:22s]">
        <defs>
          <path id={pathId} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[9.5px] uppercase tracking-[0.25em]">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
