"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PlaneGeometry, type Group } from "three";
import { coverUvs } from "../core/cover";
import { roundedMask } from "../core/textures";
import { GlowSprite } from "./GlowSprite";

const cardWidth = 1;
const cardHeight = 1.25;
const frameGeometry = new PlaneGeometry(cardWidth + 0.06, cardHeight + 0.06);

type DishHelixProps = { photos: string[]; radius?: number; turn?: number; rise?: number };

// Every dish of the menu on a spiral around a column of golden light.
export function DishHelix({ photos, radius = 2.3, turn = 0.55, rise = 0.17 }: DishHelixProps) {
  const textures = useTexture(photos);
  const mask = useMemo(() => roundedMask(), []);
  const helix = useRef<Group>(null);
  const cards = useMemo(
    () =>
      textures.map((texture, i) => {
        const angle = i * turn;
        return {
          texture,
          geometry: coverUvs(new PlaneGeometry(cardWidth, cardHeight), cardWidth / cardHeight, texture),
          position: [Math.sin(angle) * radius, (i - (textures.length - 1) / 2) * rise, Math.cos(angle) * radius] as [number, number, number],
          rotation: angle,
        };
      }),
    [textures, radius, turn, rise],
  );

  useFrame(({ clock }, delta) => {
    if (!helix.current) return;
    helix.current.rotation.y += delta * 0.22;
    helix.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.12;
  });

  return (
    <group>
      <group ref={helix}>
        {cards.map((card, i) => (
          <group key={i} position={card.position} rotation-y={card.rotation}>
            <mesh geometry={frameGeometry} position-z={-0.004}>
              <meshBasicMaterial color="#deb36d" alphaMap={mask} alphaTest={0.5} toneMapped={false} />
            </mesh>
            <mesh geometry={card.geometry}>
              <meshStandardMaterial map={card.texture} alphaMap={mask} alphaTest={0.5} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh>
        <cylinderGeometry args={[0.035, 0.035, 5.2, 12]} />
        <meshBasicMaterial color="#ffe2a8" toneMapped={false} />
      </mesh>
      {[-1.8, -0.6, 0.6, 1.8].map((y) => (
        <GlowSprite key={y} color="#deb36d" size={1.8} opacity={0.45} position={[0, y, 0]} />
      ))}
    </group>
  );
}
