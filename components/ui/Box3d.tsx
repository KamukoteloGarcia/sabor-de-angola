import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Box3dProps = {
  width: number;
  height: number;
  depth: number;
  /** Classes for each kind of face. */
  faces: { front: string; side: string; top: string };
  className?: string;
  style?: CSSProperties;
  /** Content drawn on the front face. */
  children?: ReactNode;
};

// CSS 3D cuboid (6 faces). Must live inside a preserve-3d context.
export function Box3d({ width: w, height: h, depth: d, faces, className, style, children }: Box3dProps) {
  const sides: Array<[string, CSSProperties]> = [
    [faces.front, { width: w, height: h, transform: `translateZ(${d / 2}px)` }],
    [faces.side, { width: w, height: h, transform: `rotateY(180deg) translateZ(${d / 2}px)` }],
    [faces.side, { width: d, height: h, left: (w - d) / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }],
    [faces.side, { width: d, height: h, left: (w - d) / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }],
    [faces.top, { width: w, height: d, top: (h - d) / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)` }],
    [faces.top, { width: w, height: d, top: (h - d) / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)` }],
  ];

  return (
    <div className={cn("absolute transform-3d", className)} style={{ width: w, height: h, ...style }}>
      {sides.map(([faceClass, faceStyle], i) => (
        <div key={i} className={cn("absolute left-0 top-0", faceClass)} style={faceStyle}>
          {i === 0 && children}
        </div>
      ))}
    </div>
  );
}
