import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HeroSlide } from "@/config/hero";

type HeroContentProps = { slide: HeroSlide; heading: "h1" | "h2" };

// Each block rises in after the previous one.
const rise = "motion-safe:animate-rise";

export function HeroContent({ slide, heading: Heading }: HeroContentProps) {
  return (
    <div className="relative z-10 w-full min-w-0 max-w-[560px] lg:flex-1">
      <Eyebrow className={rise}>{slide.eyebrow}</Eyebrow>

      <Heading className={`mt-7 font-display text-[2.9rem] font-semibold leading-[0.98] text-fg sm:text-[4.2rem] lg:text-[clamp(3.6rem,5.6vw,5.4rem)] ${rise} [animation-delay:100ms]`}>
        {slide.lines.map((line, i) => (
          <span key={line} className={i === slide.lines.length - 1 ? "block gold-text pb-2 motion-safe:animate-shimmer" : "block"}>
            {line}
          </span>
        ))}
      </Heading>
      <p className={`mt-2 font-script text-[2.6rem] leading-tight text-gold-bright/90 sm:text-[3.4rem] ${rise} [animation-delay:250ms]`}>
        {slide.script}.
      </p>

      <p className={`mt-6 max-w-[470px] text-[16px] leading-[1.75] text-muted sm:text-[17px] ${rise} [animation-delay:400ms]`}>
        {slide.description}
      </p>

      <div className={`mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 ${rise} [animation-delay:550ms]`}>
        <ButtonLink href="#reservas">
          Reservar mesa
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
        <ButtonLink href="#menu" variant="outline">
          Ver o menu
        </ButtonLink>
      </div>
    </div>
  );
}
