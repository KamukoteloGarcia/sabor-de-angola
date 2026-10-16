// [left %, size px, delay s, drift px] of each spark.
const sparks = [
  [10, 5, 0, -8],
  [22, 3, 0.45, 6],
  [35, 6, 0.9, -4],
  [48, 4, 0.2, 10],
  [61, 5, 1.15, -10],
  [74, 3, 0.65, 4],
  [86, 5, 1.4, -6],
  [94, 3, 0.35, 8],
];

// Glowing embers that rise from the bottom of a photo while its card (a `group`) is hovered or focused.
export function HoverSparks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map(([left, size, delay, drift]) => (
        <span key={left} className="absolute bottom-2" style={{ left: `${left}%`, translate: `${drift}px 0` }}>
          <span
            className="block rounded-full bg-[#ffe2a8] opacity-0 shadow-[0_0_12px_3px_rgba(238,113,57,0.85)] motion-safe:group-hover:animate-spark motion-safe:group-focus-within:animate-spark"
            style={{ width: size, height: size, animationDelay: `${delay}s` }}
          />
        </span>
      ))}
    </div>
  );
}
