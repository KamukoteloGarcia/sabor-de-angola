"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, type BufferAttribute, type Points } from "three";
import { seeded } from "../core/random";
import { glowTexture } from "../core/textures";

type RisingSparksProps = {
  count?: number;
  /** Width and depth of the area they rise from. */
  area?: [number, number];
  height?: number;
  position?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
};

// Glowing particles drifting upwards and starting again at the bottom (embers, bubbles, gold dust).
export function RisingSparks({ count = 80, area = [3, 1.4], height = 3, position, color = "#ffae5c", size = 0.09, speed = 1 }: RisingSparksProps) {
  const points = useRef<Points>(null);
  const map = useMemo(() => glowTexture(), []);
  const [width, depth] = area;
  const { positions, speeds } = useMemo(() => {
    const rand = seeded(11);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * width;
      positions[i * 3 + 1] = rand() * height;
      positions[i * 3 + 2] = (rand() - 0.5) * depth;
      speeds[i] = (0.35 + rand() * 0.9) * speed;
    }
    return { positions, speeds };
  }, [count, width, depth, height, speed]);

  useFrame(({ clock }, delta) => {
    const attribute = points.current?.geometry.attributes.position as BufferAttribute | undefined;
    if (!attribute) return;
    const array = attribute.array as Float32Array;
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i] * delta;
      array[i * 3] += Math.sin(clock.elapsedTime * 2 + i) * delta * 0.15;
      if (array[i * 3 + 1] > height) array[i * 3 + 1] = 0;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={map} color={color} size={size} sizeAttenuation transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </points>
  );
}
