import Image from "next/image";

type PlateProps = { src: string; size: number; tilt?: number };

const rimLayers = [2, 4, 6, 8, 10, 12];

// A dark ceramic plate lying in 3D (stacked discs give it thickness). The dish slowly turns.
export function Plate({ src, size, tilt = 62 }: PlateProps) {
  return (
    <div className="relative transform-3d" style={{ width: size, height: size, transform: `rotateX(${tilt}deg)` }}>
      {/* Shadow on the table */}
      <div
        className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.75),transparent)]"
        style={{ transform: "translateZ(-40px)" }}
      />

      {rimLayers.map((depth) => (
        <div
          key={depth}
          className="absolute inset-0 rounded-full bg-[#15120f]"
          style={{ transform: `translateZ(-${depth}px)` }}
        />
      ))}

      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a4036,#221d18_55%,#14110e)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_40px_rgba(0,0,0,0.6)]" />

      <div className="absolute inset-[10%] overflow-hidden rounded-full shadow-[0_0_0_6px_rgba(0,0,0,0.25)] motion-safe:animate-spin-slow" style={{ transform: "translateZ(2px)" }}>
        <Image src={src} alt="" fill unoptimized className="scale-125 object-cover" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.55)]" />
      </div>
    </div>
  );
}
