"use client";

import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, type Group, type Mesh, type MeshBasicMaterial } from "three";
import { glowTexture } from "../core/textures";

type WaterProps = { y?: number; color?: string; rippleColor?: string };

const ripples = [0, 1 / 3, 2 / 3];

// Mirror-like water that reflects the scene, fading out at the edges, with rings spreading on it.
export function Water({ y = -1.3, color = "#0b2a30", rippleColor = "#8fd3dc" }: WaterProps) {
  const fade = useMemo(() => glowTexture(), []);
  const rings = useRef<Group>(null);

  useFrame(({ clock }) => {
    rings.current?.children.forEach((child, i) => {
      const t = (clock.elapsedTime * 0.22 + ripples[i]) % 1;
      child.scale.setScalar(0.4 + t * 3.2);
      ((child as Mesh).material as MeshBasicMaterial).opacity = (1 - t) * 0.5;
    });
  });

  return (
    <group position-y={y}>
      <mesh rotation-x={-Math.PI / 2}>
        <circleGeometry args={[7, 64]} />
        <MeshReflectorMaterial
          alphaMap={fade}
          transparent
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={4}
          mirror={0.7}
          roughness={0.85}
          depthScale={0.6}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={color}
          metalness={0.6}
        />
      </mesh>
      <group ref={rings} position-y={0.01} rotation-x={-Math.PI / 2}>
        {ripples.map((phase) => (
          <mesh key={phase}>
            <ringGeometry args={[0.98, 1, 96]} />
            <meshBasicMaterial color={rippleColor} transparent opacity={0} depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
