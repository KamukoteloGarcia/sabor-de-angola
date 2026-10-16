import { heroIntervalMs, heroSlides, toneOf } from "@/config/hero";
import { HeroCarousel } from "./carousel/HeroCarousel";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroBadges } from "./HeroBadges";
import { HeroContent } from "./HeroContent";
import { HeroInfoBar } from "./HeroInfoBar";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg">
      <HeroCarousel
        intervalMs={heroIntervalMs}
        slideIds={heroSlides.map((slide) => slide.id)}
        tones={heroSlides.map(toneOf)}
        texts={heroSlides.map((slide, i) => (
          <HeroContent key={slide.id} slide={slide} heading={i === 0 ? "h1" : "h2"} />
        ))}
        backdrops={heroSlides.map((slide) => (
          <HeroBackdrop key={slide.id} src={slide.backdrop} glow={slide.glow} tone={toneOf(slide)} />
        ))}
        badges={heroSlides.map((slide) => (
          <HeroBadges key={slide.id} badges={slide.badges} />
        ))}
      />
      <HeroInfoBar />
    </section>
  );
}
