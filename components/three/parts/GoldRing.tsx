"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { GlowSprite } from "./GlowSprite";

type GoldRingProps = { radius?: number; tilt?: [number, number, number]; speed?: number; color?: string };

// A thin glowing ring with a bright spark travelling around it.
export function GoldRing({ radius = 2.6, tilt = [1.3, 0, 0.12], speed = 0.6, color = "#f6d798" }: GoldRingProps) {
  const spark = useRef<Group>(null);

  useFrame((_, delta) => {
    if (spark.current) spark.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 220]} />
        <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <group ref={spark}>
        <GlowSprite color="#ffe6b0" size={0.6} position={[radius, 0, 0]} />
        <GlowSprite color={color} size={1.6} opacity={0.35} position={[radius, 0, 0]} />
      </group>
    </group>
  );
}
