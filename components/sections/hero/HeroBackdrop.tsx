import Image from "next/image";
import { SonaPattern } from "@/components/ui/SonaPattern";
import type { HeroTone } from "@/config/hero";

type HeroBackdropProps = { src: string; glow: string; tone: HeroTone };

// Dark banners: pre-blurred photo of the room (bokeh) fading into the background.
// Light banners: warm cream paper with a faint sona lattice and a golden glow.
// Static: painted once, no CSS filters.
export function HeroBackdrop({ src, glow, tone }: HeroBackdropProps) {
  if (tone === "light") {
    return (
      <div data-theme="light" className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(70%_90%_at_75%_45%,#fffaf1,#f3e8d6_55%,#e9dcc6)]">
        <SonaPattern className="opacity-[0.07] [mask-image:radial-gradient(60%_70%_at_75%_50%,#000,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(38%_48%_at_72%_52%,rgba(222,179,109,0.35),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e9dcc6] to-transparent" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-bg">
      <div className="absolute inset-y-0 right-0 w-full opacity-70 [mask-image:linear-gradient(to_right,transparent,#000_55%)] lg:w-[75%]">
        <Image src={src} alt="" fill unoptimized className="object-cover" />
      </div>
      <div className="absolute inset-0" style={{ background: `radial-gradient(42% 50% at 72% 50%, ${glow}, transparent 70%)` }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--bg)_20%,transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
