"use client";

import { useMemo } from "react";
import { AdditiveBlending } from "three";
import { glowTexture } from "../core/textures";

type GlowSpriteProps = { color: string; size: number; opacity?: number; position?: [number, number, number] };

// Soft additive light blob (a cheap stand-in for bloom that also works on a transparent canvas).
export function GlowSprite({ color, size, opacity = 1, position }: GlowSpriteProps) {
  const map = useMemo(() => glowTexture(), []);

  return (
    <sprite position={position} scale={size}>
      <spriteMaterial map={map} color={color} opacity={opacity} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </sprite>
  );
}
