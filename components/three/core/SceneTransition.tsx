"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import { MathUtils, type Group } from "three";

const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

// The leaving scene shrinks and spins away; the entering one grows in with a turn and a small overshoot.
// A scene is only mounted while it is shown (or leaving), so hidden scenes cost nothing:
// no frame callbacks, no extra render passes (glass, reflections, shadows).
export function SceneTransition({ active, children }: { active: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);
  const progress = useRef(0);
  const [isMounted, setIsMounted] = useState(active);

  useFrame((_, delta) => {
    if (active && !isMounted) setIsMounted(true);
    const g = group.current;
    if (!g) return;
    progress.current = MathUtils.damp(progress.current, active ? 1 : 0, active ? 2.6 : 4, delta);
    const p = progress.current;
    if (!active && p < 0.004) {
      if (isMounted) setIsMounted(false);
      return;
    }
    const scale = active ? easeOutBack(p) : p;
    g.scale.setScalar(Math.max(scale, 0.0001));
    g.rotation.y = (1 - p) * (active ? -Math.PI * 0.75 : Math.PI * 0.5);
    g.position.y = (1 - p) * (active ? -1.2 : 0.8);
  });

  return (
    <group ref={group} scale={0.0001}>
      {(active || isMounted) && children}
    </group>
  );
}
