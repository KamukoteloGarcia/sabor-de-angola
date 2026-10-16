import type { BufferGeometry, Texture } from "three";

/**
 * Crops a photo like CSS `object-fit: cover` by scaling the geometry's UVs around the centre,
 * so the shared texture itself is never modified.
 */
export function coverUvs<T extends BufferGeometry>(geometry: T, surfaceAspect: number, texture: Texture, zoom = 1) {
  const image = texture.image as { width: number; height: number } | undefined;
  const imageAspect = image ? image.width / image.height : 1;
  const scaleU = (imageAspect > surfaceAspect ? surfaceAspect / imageAspect : 1) / zoom;
  const scaleV = (imageAspect > surfaceAspect ? 1 : imageAspect / surfaceAspect) / zoom;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, 0.5 + (uv.getX(i) - 0.5) * scaleU, 0.5 + (uv.getY(i) - 0.5) * scaleV);
  }
  uv.needsUpdate = true;
  return geometry;
}
