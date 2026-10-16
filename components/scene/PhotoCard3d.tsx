import Image from "next/image";
import type { CSSProperties } from "react";
import { Box3d } from "@/components/ui/Box3d";

const faces = {
  front:
    "overflow-hidden rounded-[18px] bg-card ring-1 ring-gold/40 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.9)]",
  side: "bg-[#2a2016]",
  top: "bg-[#3b2d1f]",
};

type PhotoCard3dProps = {
  src: string;
  width: number;
  height: number;
  depth?: number;
  title?: string;
  /** Small gold line under the title (price, category…). */
  detail?: string;
  className?: string;
  style?: CSSProperties;
};

// Real photo printed on a thick 3D card, with an optional caption.
export function PhotoCard3d({ src, width, height, depth = 12, title, detail, className, style }: PhotoCard3dProps) {
  return (
    <Box3d width={width} height={height} depth={depth} faces={faces} className={className} style={style}>
      <Image src={src} alt="" fill unoptimized className="object-cover" />
      {title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-14">
          <span className="block h-px w-8 bg-gold" />
          <span className="mt-2 block font-display text-[20px] font-semibold leading-tight text-white">{title}</span>
          {detail && <span className="mt-0.5 block text-[12px] uppercase tracking-[0.2em] text-gold-bright">{detail}</span>}
        </div>
      )}
    </Box3d>
  );
}
