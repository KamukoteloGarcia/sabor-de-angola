import { useId } from "react";
import { logoGradientStops, logoPaths } from "./logo-paths";

// Emblem: the horns of the palanca negra (Angola's national symbol) rising from a bowl, inside a ring.
export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  const gradientId = useId();
  const gold = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          {logoGradientStops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke={gold} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.55" />
      <path d={logoPaths.hornLeft} fill={gold} />
      <path d={logoPaths.hornRight} fill={gold} />
      <path d={logoPaths.diamond} fill={gold} />
      <path d={logoPaths.bowlRim} stroke={gold} strokeWidth="1.8" strokeLinecap="round" />
      <path d={logoPaths.bowl} fill="none" stroke={gold} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
