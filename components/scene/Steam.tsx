const wisps = [
  { x: 0, delay: 0 },
  { x: 34, delay: 1.5 },
  { x: -30, delay: 3 },
];

const tones = {
  steam: "radial-gradient(ellipse at center, rgba(255,255,255,0.32), transparent 68%)",
  smoke: "radial-gradient(ellipse at center, rgba(190,180,170,0.28), transparent 68%)",
};

type SteamProps = { x: number; y: number; z?: number; tone?: keyof typeof tones };

// Soft wisps rising from a hot dish (gradients, no blur filter).
export function Steam({ x, y, z = 40, tone = "steam" }: SteamProps) {
  return (
    <div aria-hidden="true" className="absolute" style={{ left: x, top: y, transform: `translateZ(${z}px)` }}>
      {wisps.map((wisp) => (
        <span
          key={wisp.delay}
          className="absolute -top-[140px] h-[160px] w-[80px] -translate-x-1/2 opacity-0 motion-safe:animate-steam"
          style={{ left: wisp.x, background: tones[tone], animationDelay: `${wisp.delay}s` }}
        />
      ))}
    </div>
  );
}
