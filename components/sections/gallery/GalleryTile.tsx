import Image from "next/image";
import type { GalleryItem } from "@/config/gallery";
import { cn } from "@/lib/cn";

const spans: Record<GalleryItem["size"], string> = {
  large: "sm:col-span-2 sm:row-span-2",
  tall: "lg:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <figure className={cn("reveal group relative min-h-[260px] overflow-hidden rounded-[22px] bg-surface ring-1 ring-line", spans[item.size])}>
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition duration-500 group-hover:from-black/95" />
      <div className="absolute inset-3 rounded-[16px] border border-gold/0 transition duration-500 group-hover:border-gold/60" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6">
        <span className="block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" />
        <span className="mt-3 block font-display text-[26px] font-semibold leading-tight text-white">{item.title}</span>
        <span className="mt-1 block translate-y-2 text-[12px] uppercase tracking-[0.2em] text-gold-bright opacity-80 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{item.caption}</span>
      </figcaption>
    </figure>
  );
}
