import { ArrowRight } from "lucide-react";
import { GoldRing } from "@/components/scene/GoldRing";
import { Plate } from "@/components/scene/Plate";
import { Stage } from "@/components/scene/Stage";
import { Steam } from "@/components/scene/Steam";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PauseWhenHidden } from "@/components/ui/PauseWhenHidden";
import { SonaPattern } from "@/components/ui/SonaPattern";
import { featuredDish, getDish } from "@/config/menu";
import { formatKz } from "@/lib/format";

// The steaming plate, on a fixed 460×400 canvas scaled for small screens.
function FeaturedPlate({ src }: { src: string }) {
  return (
    <PauseWhenHidden className="relative h-[300px] w-full sm:h-[400px]">
      <div className="absolute left-1/2 top-0 h-[400px] w-[460px] origin-top -translate-x-1/2 scale-75 sm:scale-100">
        <Stage>
          <GoldRing size={440} x={10} y={-10} tilt={70} />
          <div className="absolute left-[60px] top-[40px] transform-3d motion-safe:animate-float-slow">
            <Plate src={src} size={340} />
          </div>
          <Steam x={230} y={170} z={60} />
        </Stage>
      </div>
    </PauseWhenHidden>
  );
}

export function FeaturedDish() {
  const dish = getDish(featuredDish.id);

  return (
    // `reveal` lives on the wrapper: both effects use the `animation` property.
    <div className="reveal">
      <article className="relative overflow-hidden rounded-[28px] border-spin [--card-bg:#1f1512] motion-safe:animate-border-spin">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_50%,rgba(142,42,54,0.45),transparent_70%),radial-gradient(40%_60%_at_10%_0%,rgba(222,179,109,0.14),transparent_70%)]" />
        <SonaPattern className="opacity-[0.06]" />

        <div className="relative grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:p-14">
          <div>
            <Eyebrow>{featuredDish.label}</Eyebrow>
            <h3 className="mt-6 font-display text-[2.8rem] font-semibold leading-none text-fg sm:text-[4rem]">{dish.name}</h3>
            <p className="mt-5 max-w-[480px] text-[16.5px] leading-[1.8] text-muted">{featuredDish.story}</p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {featuredDish.ingredients.map((ingredient) => (
                <li key={ingredient} className="rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-[13px] text-fg/85">
                  {ingredient}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <span className="font-display text-[2.6rem] font-semibold leading-none gold-text">{formatKz(dish.price)}</span>
              <ButtonLink href="#reservas">
                Reservar e provar
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </div>

          <FeaturedPlate src={dish.photo} />
        </div>
      </article>
    </div>
  );
}
