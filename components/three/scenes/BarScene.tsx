"use client";

import { ContactShadows, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { Cocktail, IceCube } from "../parts/Cocktail";
import { GlowSprite } from "../parts/GlowSprite";
import { CitrusSlice } from "../parts/Ingredients";
import { RisingSparks } from "../parts/RisingSparks";

// Banner 4: the signature cocktail turning on a coaster, with ice and orange floating around it.
export function BarScene() {
  const turntable = useRef<Group>(null);

  useFrame((_, delta) => {
    if (turntable.current) turntable.current.rotation.y += delta * 0.3;
  });

  return (
    <group scale={1.15}>
      <GlowSprite color="#ff9a3c" size={5} opacity={0.45} position={[0, 0.1, -1.4]} />

      <group ref={turntable}>
        <Cocktail />
        <mesh position-y={-0.95}>
          <cylinderGeometry args={[1.25, 1.25, 0.08, 64]} />
          <meshStandardMaterial color="#2a1c13" roughness={0.55} />
        </mesh>
        <mesh position-y={-0.91} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.25, 0.018, 8, 96]} />
          <meshStandardMaterial color="#eac27a" metalness={1} roughness={0.2} />
        </mesh>
      </group>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.2} position={[-1.85, 0.7, 0.4]}>
        <IceCube size={0.42} />
      </Float>
      <Float speed={1.6} rotationIntensity={2} floatIntensity={1} position={[1.75, -0.1, 0.6]}>
        <IceCube size={0.34} />
      </Float>
      <Float speed={2.3} rotationIntensity={2} floatIntensity={1.4} position={[1.45, 1.15, -0.7]}>
        <IceCube size={0.28} />
      </Float>
      <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1} position={[-1.55, -0.55, 0.9]}>
        <CitrusSlice kind="orange" radius={0.34} rotation={[1.2, 0.2, 0.4]} />
      </Float>

      <RisingSparks position={[0, -1, 0]} area={[4, 2]} height={3} count={40} color="#ffd9a0" size={0.05} speed={0.4} />
      <ContactShadows position-y={-1.0} opacity={0.6} scale={6} blur={2.4} far={2} color="#000000" />
    </group>
  );
}
