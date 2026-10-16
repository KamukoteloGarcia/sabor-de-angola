"use client";

import { ContactShadows, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";
import { getDish } from "@/config/menu";
import { Bowl } from "../parts/Bowl";
import { GlowSprite } from "../parts/GlowSprite";
import { GoldRing } from "../parts/GoldRing";
import { CitrusSlice, Gindungo, Leaf } from "../parts/Ingredients";
import { Steam } from "../parts/Steam";

const orbitRadius = 2.55;

// Ingredients circling the bowl: angle around it, height, and the model.
const ingredients: Array<{ angle: number; y: number; item: ReactNode }> = [
  { angle: 0.2, y: 0.7, item: <Gindungo rotation={[0.4, 0, 0.9]} /> },
  { angle: 1.25, y: -0.25, item: <Leaf scale={0.55} rotation={[0.6, 0.4, 0.3]} /> },
  { angle: 2.2, y: 1.0, item: <CitrusSlice kind="lime" rotation={[1.1, 0.3, 0.2]} /> },
  { angle: 3.2, y: -0.45, item: <Gindungo rotation={[-0.3, 0.5, -1.1]} scale={1.15} /> },
  { angle: 4.2, y: 0.85, item: <Leaf scale={0.6} rotation={[-0.4, 1.2, 0.8]} color="#4a8c36" /> },
  { angle: 5.25, y: 0.05, item: <CitrusSlice kind="lime" radius={0.36} rotation={[0.3, 0.8, 1.2]} /> },
];

// Banner 1: the signature calulu in a black ceramic bowl, steaming, with gindungo, lime and herbs in orbit.
export function SignatureScene() {
  const dish = getDish("calulu");
  const orbit = useRef<Group>(null);

  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * 0.22;
  });

  return (
    <group>
      <GlowSprite color="#deb36d" size={6.5} opacity={0.22} position={[0, -0.1, -1.2]} />
      <GoldRing radius={2.8} tilt={[1.36, 0, 0.12]} />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <group rotation-x={0.42} position-y={-0.35}>
          <Bowl photo={dish.photo} />
          <Steam position={[0, 0.25, 0]} height={2.1} spread={1.3} size={1.4} opacity={0.16} />
        </group>
      </Float>

      <group ref={orbit}>
        {ingredients.map(({ angle, y, item }, i) => (
          <group key={i} position={[Math.cos(angle) * orbitRadius, y, Math.sin(angle) * orbitRadius]}>
            <Float speed={2 + i * 0.2} rotationIntensity={1.6} floatIntensity={1.2}>
              {item}
            </Float>
          </group>
        ))}
      </group>

      <ContactShadows position-y={-1.25} opacity={0.65} scale={8} blur={2.8} far={2.5} color="#000000" />
    </group>
  );
}
