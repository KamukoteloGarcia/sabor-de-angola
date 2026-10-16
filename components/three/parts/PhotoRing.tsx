"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BackSide, CylinderGeometry, type Group } from "three";
import { coverUvs } from "../core/cover";

type PhotoRingProps = { photos: string[]; radius?: number; height?: number; arc?: number; speed?: number };

// Curved photo panels standing on a slowly turning ring.
export function PhotoRing({ photos, radius = 2.6, height = 2, arc = 0.62, speed = 0.18 }: PhotoRingProps) {
  const textures = useTexture(photos);
  const ring = useRef<Group>(null);
  const step = (Math.PI * 2) / photos.length;
  const panels = useMemo(
    () => textures.map((texture) => coverUvs(new CylinderGeometry(radius, radius, height, 32, 1, true, -arc / 2, arc), (radius * arc) / height, texture)),
    [textures, radius, height, arc],
  );
  const backing = useMemo(() => new CylinderGeometry(radius - 0.01, radius - 0.01, height, 32, 1, true, -arc / 2, arc), [radius, height, arc]);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.y += delta * speed;
  });

  return (
    <group ref={ring}>
      {textures.map((texture, i) => (
        <group key={i} rotation-y={i * step}>
          <mesh geometry={panels[i]}>
            <meshStandardMaterial map={texture} roughness={0.45} />
          </mesh>
          <mesh geometry={backing}>
            <meshStandardMaterial color="#20170f" side={BackSide} />
          </mesh>
          {[1, -1].map((edge) => (
            // The torus arc starts on +X in the XY plane: turn it to the panel's start, then lay it flat.
            <mesh key={edge} position-y={(edge * height) / 2} rotation={[Math.PI / 2, 0, Math.PI / 2 - arc / 2]}>
              <torusGeometry args={[radius, 0.01, 6, 32, arc]} />
              <meshBasicMaterial color="#f6d798" toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
