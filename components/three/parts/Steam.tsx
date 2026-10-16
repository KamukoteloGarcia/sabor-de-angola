"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Sprite, SpriteMaterial } from "three";
import { seeded } from "../core/random";
import { glowTexture } from "../core/textures";

type SteamProps = {
  position?: [number, number, number];
  color?: string;
  height?: number;
  spread?: number;
  opacity?: number;
  size?: number;
  speed?: number;
};

const wisps = 7;

// Soft puffs that rise, grow and fade out, one after the other.
export function Steam({ position, color = "#ffffff", height = 1.8, spread = 0.8, opacity = 0.2, size = 1, speed = 0.22 }: SteamProps) {
  const map = useMemo(() => glowTexture(), []);
  const group = useRef<Group>(null);
  const puffs = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: wisps }, (_, i) => ({ phase: i / wisps, x: (rand() - 0.5) * spread, drift: (rand() - 0.5) * 0.6 }));
  }, [spread]);

  useFrame(({ clock }) => {
    group.current?.children.forEach((child, i) => {
      const puff = puffs[i];
      const t = (clock.elapsedTime * speed + puff.phase) % 1;
      child.position.set(puff.x + puff.drift * t, t * height, 0);
      child.scale.setScalar(size * (0.5 + t * 1.5));
      ((child as Sprite).material as SpriteMaterial).opacity = Math.sin(Math.PI * t) * opacity;
    });
  });

  return (
    <group ref={group} position={position}>
      {puffs.map((_, i) => (
        <sprite key={i}>
          <spriteMaterial map={map} color={color} transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  );
}
