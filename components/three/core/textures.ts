import { CanvasTexture } from "three";

// Textures drawn once on a 2D canvas (browser only) and shared by every mesh that uses them.
type Draw = (ctx: CanvasRenderingContext2D, size: number) => void;

const cache = new Map<string, CanvasTexture>();

function canvasTexture(key: string, size: number, draw: Draw) {
  const cached = cache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d")!, size);
  const texture = new CanvasTexture(canvas);
  cache.set(key, texture);
  return texture;
}

/** Soft white dot fading to transparent: glows, steam, sparks. */
export const glowTexture = () =>
  canvasTexture("glow", 128, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });

/** White rounded rectangle on black, used as an alpha map for photo cards. */
export const roundedMask = () =>
  canvasTexture("rounded", 256, (ctx, s) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.roundRect(4, 4, s - 8, s - 8, 30);
    ctx.fill();
  });

const citrusColors = {
  lime: { rind: "#4f8a2b", pith: "#eef5cf", flesh: "#a9cd4c" },
  orange: { rind: "#e8731c", pith: "#fde9c9", flesh: "#f59a2c" },
};

/** Cut face of a citrus slice: rind, pith and ten juicy segments. */
export const citrusTexture = (kind: keyof typeof citrusColors) =>
  canvasTexture(`citrus-${kind}`, 256, (ctx, s) => {
    const { rind, pith, flesh } = citrusColors[kind];
    const c = s / 2;
    ctx.fillStyle = rind;
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pith;
    ctx.beginPath();
    ctx.arc(c, c, c * 0.9, 0, Math.PI * 2);
    ctx.fill();
    const segments = 10;
    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2 + 0.05;
      const a1 = ((i + 1) / segments) * Math.PI * 2 - 0.05;
      const g = ctx.createRadialGradient(c, c, c * 0.1, c, c, c * 0.84);
      g.addColorStop(0, pith);
      g.addColorStop(0.25, flesh);
      g.addColorStop(1, flesh);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos((a0 + a1) / 2) * c * 0.1, c + Math.sin((a0 + a1) / 2) * c * 0.1);
      ctx.arc(c, c, c * 0.84, a0, a1);
      ctx.closePath();
      ctx.fill();
    }
  });

/** Charred speckles for grilled meat (multiplies the base colour). */
export const charTexture = () =>
  canvasTexture("char", 256, (ctx, s) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, s, s);
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(40,14,4,${0.12 + rand() * 0.3})`;
      ctx.beginPath();
      ctx.ellipse(rand() * s, rand() * s, 3 + rand() * 14, 2 + rand() * 6, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    // Grill marks
    ctx.strokeStyle = "rgba(25,8,0,0.7)";
    ctx.lineWidth = 9;
    for (let x = -s; x < s * 2; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + s * 0.6, s);
      ctx.stroke();
    }
  });
