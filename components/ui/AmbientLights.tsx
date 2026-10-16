// Page-wide atmosphere: soft drifting lights (gold, ember, palm wine) plus a fine film grain.
// Fixed behind everything; only transforms animate, so it stays on the compositor.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

export function AmbientLights() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute -right-[15vw] -top-[20vh] size-[70vw] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(222,179,109,0.16),transparent)] motion-safe:animate-aurora" />
      <div className="absolute -left-[20vw] top-[30vh] size-[60vw] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(142,42,54,0.22),transparent)] motion-safe:animate-aurora-slow" />
      <div className="absolute -bottom-[25vh] right-[10vw] size-[55vw] max-w-[850px] rounded-full bg-[radial-gradient(closest-side,rgba(238,113,57,0.12),transparent)] motion-safe:animate-aurora" />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: grain }} />
    </div>
  );
}
