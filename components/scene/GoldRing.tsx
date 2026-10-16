import type { CSSProperties } from "react";

type GoldRingProps = { size: number; x: number; y: number; tilt?: number; color?: string };

// Glowing ring lying in the scene. The glow is static (painted once); only the bright spot spins.
export function GoldRing({ size, x, y, tilt = 72, color = "var(--gold)" }: GoldRingProps) {
  const spark: CSSProperties = {
    background: `conic-gradient(from 0deg, #fff6e0, ${color} 8%, transparent 30%, transparent 100%)`,
    mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
  };

  return (
    <div
      aria-hidden="true"
      className="absolute transform-3d"
      style={{ left: x, top: y, width: size, height: size, transform: `rotateX(${tilt}deg)` }}
    >
      <div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color, boxShadow: `0 0 18px ${color}, inset 0 0 18px ${color}` }}
      />
      <div className="absolute inset-0 rounded-full motion-safe:animate-orbit" style={spark} />
      <div className="absolute inset-[48px] rounded-full border opacity-30" style={{ borderColor: color }} />
    </div>
  );
}
