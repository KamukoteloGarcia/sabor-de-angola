"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { PointLight } from "three";
import { GlowSprite } from "../parts/GlowSprite";
import { CharcoalBed, Grate, Skewer } from "../parts/Grill";
import { RisingSparks } from "../parts/RisingSparks";
import { Steam } from "../parts/Steam";

// Orange light from the coals, flickering, so the meat is lit from below.
function EmberLight() {
  const light = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (light.current) light.current.intensity = 14 + Math.sin(t * 9) * 2.5 + Math.sin(t * 23) * 1.5;
  });

  return <pointLight ref={light} position={[0, -0.75, 0.4]} color="#ff7a2e" distance={5} decay={2} />;
}

// Banner 2: espetadas turning over a grill, glowing charcoal, rising embers and smoke.
export function GrillScene() {
  return (
    <group position-y={-0.1} rotation-x={0.12}>
      <GlowSprite color="#ff5a14" size={6} opacity={0.6} position={[0, -1.05, 0]} />
      <group position-y={-1.15}>
        <CharcoalBed />
      </group>
      <Grate y={-0.68} />
      <EmberLight />

      <Skewer position={[0, -0.28, 0.3]} rotation={[0, 0.18, 0]} speed={0.35} seed={2} />
      <Skewer position={[0.12, 0.3, -0.3]} rotation={[0, -0.22, 0.06]} speed={-0.28} seed={9} />

      <RisingSparks position={[0, -1.05, 0]} area={[3.3, 1.6]} height={3.8} count={120} color="#ffa04d" size={0.075} />
      <Steam position={[0, -0.3, -0.3]} color="#a2958a" height={2.8} spread={2.2} size={2} opacity={0.1} speed={0.14} />
    </group>
  );
}
