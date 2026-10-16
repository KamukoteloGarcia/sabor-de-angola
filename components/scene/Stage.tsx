"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Perspective + shared 3D space. Tilts gently towards the mouse while it is over the section.
export function Stage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    const area = stage?.closest("section");
    const canTilt =
      matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!stage || !area || !canTilt) return;

    let frame = 0;
    function handleMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / innerWidth) * 2 - 1;
        const y = (event.clientY / innerHeight) * 2 - 1;
        stage?.style.setProperty("--tilt-x", x.toFixed(2));
        stage?.style.setProperty("--tilt-y", y.toFixed(2));
      });
    }

    area.addEventListener("pointermove", handleMove);
    return () => {
      area.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="size-full perspective-[1800px]">
      <div
        ref={ref}
        className="relative size-full transform-3d transition-transform duration-700 ease-out [transform:rotateX(calc(var(--tilt-y,0)*-6deg))_rotateY(calc(var(--tilt-x,0)*9deg))]"
      >
        {children}
      </div>
    </div>
  );
}
