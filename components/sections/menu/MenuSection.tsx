import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SonaPattern } from "@/components/ui/SonaPattern";
import { menu } from "@/config/menu";
import { FeaturedDish } from "./FeaturedDish";
import { MenuTabs } from "./MenuTabs";

// Section 1: the catalog, by category.
export function MenuSection() {
  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <SonaPattern className="opacity-[0.035] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_70%,transparent)]" />
      <div className="container-site relative">
        <FeaturedDish />

        <div className="mt-28 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="O nosso catálogo"
            title="Sabores que contam"
            accent="histórias"
            description="Receitas tradicionais angolanas, grelhados na brasa e marisco fresco. Escolha uma categoria e descubra os pratos da casa."
          />
          <ButtonLink href="#reservas" variant="outline" className="shrink-0 self-start lg:self-auto">
            Reservar mesa
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>

        <div className="mt-14">
          <MenuTabs categories={menu} />
        </div>
      </div>
    </section>
  );
}
