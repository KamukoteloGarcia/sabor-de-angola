import { cn } from "@/lib/cn";

type Dot = { x: number; y: number; z: number; size: number; delay: number };

// Fixed positions (no Math.random: server and browser must render the same thing).
const defaultDots: Dot[] = [
  { x: 60, y: 80, z: 60, size: 4, delay: 0 },
  { x: 150, y: 30, z: -40, size: 3, delay: 1.2 },
  { x: 610, y: 120, z: 90, size: 5, delay: 0.6 },
  { x: 560, y: 40, z: -80, size: 3, delay: 2.1 },
  { x: 30, y: 330, z: 120, size: 3, delay: 1.7 },
  { x: 640, y: 360, z: 40, size: 4, delay: 2.6 },
  { x: 110, y: 520, z: -60, size: 5, delay: 0.3 },
  { x: 590, y: 560, z: 100, size: 3, delay: 1.4 },
  { x: 330, y: 20, z: 140, size: 3, delay: 2.9 },
  { x: 250, y: 590, z: 20, size: 4, delay: 0.9 },
  { x: 470, y: 590, z: -20, size: 3, delay: 2.3 },
  { x: 660, y: 230, z: -100, size: 3, delay: 3.1 },
];

const tones = {
  gold: "bg-gold-bright shadow-[0_0_10px_2px_rgba(230,199,143,0.55)]",
  ember: "bg-[#ffb26b] shadow-[0_0_10px_2px_rgba(255,140,60,0.6)]",
  sea: "bg-[#bfeaf0] shadow-[0_0_10px_2px_rgba(143,211,220,0.55)]",
};

type GoldDustProps = { dots?: Dot[]; tone?: keyof typeof tones };

// Twinkling specks of light floating at different depths.
export function GoldDust({ dots = defaultDots, tone = "gold" }: GoldDustProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 transform-3d">
      {dots.map((dot, i) => (
        <span
          key={i}
          className={cn("absolute rounded-full motion-safe:animate-twinkle", tones[tone])}
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            transform: `translateZ(${dot.z}px)`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
