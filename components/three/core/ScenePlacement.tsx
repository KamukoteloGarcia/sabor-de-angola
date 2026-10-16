"use client";

import { useThree } from "@react-three/fiber";
import type { ReactNode } from "react";

const desktop = 1024;

// On large screens the canvas covers the whole hero, so the scenes move to the right half (beside the text).
// On small screens the canvas sits below the text and the scenes stay centred.
export function ScenePlacement({ children }: { children: ReactNode }) {
  const viewport = useThree((state) => state.viewport);
  const width = useThree((state) => state.size.width);
  const isDesktop = width >= desktop;

  return (
    <group position-x={isDesktop ? viewport.width * 0.24 : 0} scale={isDesktop ? 0.92 : 1}>
      {children}
    </group>
  );
}
