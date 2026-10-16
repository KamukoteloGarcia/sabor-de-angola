import { useId, type CSSProperties } from "react";
import { logoGradientStops, logoPaths } from "@/components/brand/logo-paths";

// `pathLength={1}` lets every stroke be "drawn" with the same dash animation, whatever its real length.
const draw = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` });

// The emblem drawing itself: rings trace around, horns rise, the diamond pops, the bowl is traced.
export function SplashMark({ size = 132 }: { size?: number }) {
  const gradientId = useId();
  const gold = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          {logoGradientStops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>

      <g className="origin-center -rotate-90">
        <circle cx="32" cy="32" r="30" fill="none" stroke={gold} strokeWidth="1.2" pathLength={1} className="splash-draw" style={draw(0)} />
        <circle cx="32" cy="32" r="26.5" fill="none" stroke={gold} strokeWidth="0.5" strokeOpacity={0.55} pathLength={1} className="splash-draw" style={draw(250)} />
      </g>

      <path d={logoPaths.hornLeft} fill={gold} className="splash-rise" style={draw(550)} />
      <path d={logoPaths.hornRight} fill={gold} className="splash-rise" style={draw(650)} />
      <path d={logoPaths.diamond} fill={gold} className="splash-pop" style={draw(1000)} />
      <path d={logoPaths.bowlRim} stroke={gold} strokeWidth="1.8" strokeLinecap="round" pathLength={1} className="splash-draw" style={draw(800)} />
      <path d={logoPaths.bowl} fill="none" stroke={gold} strokeWidth="1.8" strokeLinecap="round" pathLength={1} className="splash-draw" style={draw(900)} />
    </svg>
  );
}
