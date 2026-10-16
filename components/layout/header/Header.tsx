"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navigation } from "@/config/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { useActiveSection } from "./useActiveSection";
import { useHeroTone } from "./useHeroTone";

const sectionIds = navigation.map((item) => item.href.slice(1));

// Transparent over the hero, solid once the page scrolls.
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const heroTone = useHeroTone();
  const isSolid = isScrolled || isOpen;

  useEffect(() => {
    const update = () => setIsScrolled(scrollY > 24);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <header
      // Over a light banner (before scrolling) the header switches to the light palette.
      data-theme={!isSolid && heroTone === "light" ? "light" : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500",
        isSolid ? "border-b border-line bg-bg/90 py-3 backdrop-blur-md" : "border-b border-transparent py-6",
      )}
    >
      <div className="container-site flex items-center justify-between gap-8">
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <NavLinks active={active} variant="bar" />
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="#reservas" variant="gold" size="sm" className="max-sm:hidden">
            Reservar mesa
          </ButtonLink>
          <button
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="grid size-11 place-items-center rounded-full border border-line text-fg transition hover:border-gold hover:text-gold xl:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} active={active} onClose={() => setIsOpen(false)} />
    </header>
  );
}
