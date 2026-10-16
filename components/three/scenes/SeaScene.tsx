"use client";

import { Sparkles } from "@react-three/drei";
import { getDish } from "@/config/menu";
import { GlowSprite } from "../parts/GlowSprite";
import { PhotoRing } from "../parts/PhotoRing";
import { Water } from "../parts/Water";

const photos = [
  getDish("cacusso").photo,
  getDish("gambas").photo,
  getDish("calulu").photo,
  getDish("peixe-fresco").photo,
  "/photos/ambiance/terraco.webp",
];

// Banner 3: seafood dishes on curved panels, turning above mirror-like water.
export function SeaScene() {
  return (
    <group>
      <GlowSprite color="#54a0aa" size={6} opacity={0.4} position={[0, -1.1, 0]} />
      <group position-y={0.2}>
        <PhotoRing photos={photos} radius={2.5} height={1.9} arc={0.66} />
      </group>
      <Water y={-1.15} />
      <Sparkles count={45} scale={[6, 3, 4]} size={2.2} speed={0.3} color="#bfeaf0" opacity={0.8} />
    </group>
  );
}
