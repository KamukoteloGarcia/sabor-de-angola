"use client";

import { Sparkles } from "@react-three/drei";
import { menu } from "@/config/menu";
import { DishHelix } from "../parts/DishHelix";

const photos = menu.flatMap((category) => category.dishes.map((dish) => dish.photo));

// Banner 5: the whole catalog spiralling around a column of golden light.
export function CatalogScene() {
  return (
    <group rotation-x={0.06}>
      <DishHelix photos={photos} />
      <Sparkles count={70} scale={[5, 5, 5]} size={2.5} speed={0.4} color="#f6d798" opacity={0.9} />
    </group>
  );
}
