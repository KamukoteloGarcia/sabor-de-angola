"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CircleGeometry, LatheGeometry, Vector2, type Mesh } from "three";
import { coverUvs } from "../core/cover";

// Half cross-section of the bowl (outer wall, rim, inner wall), turned around the Y axis.
const profile = [
  [0, -0.5],
  [0.85, -0.5],
  [0.95, -0.43],
  [1.4, -0.12],
  [1.76, 0.27],
  [1.83, 0.33],
  [1.79, 0.37],
  [1.7, 0.32],
  [1.32, -0.02],
  [0.86, -0.3],
  [0, -0.33],
].map(([x, y]) => new Vector2(x, y));

const bowlGeometry = new LatheGeometry(profile, 96);

// Black glazed ceramic bowl with a gold rim; the dish inside slowly turns.
export function Bowl({ photo }: { photo: string }) {
  const texture = useTexture(photo);
  const food = useRef<Mesh>(null);
  const foodGeometry = useMemo(() => coverUvs(new CircleGeometry(1.37, 96), 1, texture, 1.25), [texture]);

  useFrame((_, delta) => {
    if (food.current) food.current.rotation.z += delta * 0.08;
  });

  return (
    <group>
      <mesh geometry={bowlGeometry}>
        <meshPhysicalMaterial color="#1b1613" roughness={0.3} metalness={0.1} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
      <mesh position-y={0.355} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.79, 0.032, 16, 160]} />
        <meshStandardMaterial color="#eac27a" metalness={1} roughness={0.2} />
      </mesh>
      <mesh ref={food} geometry={foodGeometry} position-y={0.02} rotation-x={-Math.PI / 2}>
        <meshPhysicalMaterial map={texture} roughness={0.35} clearcoat={0.8} clearcoatRoughness={0.25} />
      </mesh>
    </group>
  );
}
