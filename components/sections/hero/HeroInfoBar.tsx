import { Clock, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/config/site";

function InfoItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[14px] text-muted">
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold-bright">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

// Address, opening hours, phone and socials along the bottom of the hero.
export function HeroInfoBar() {
  return (
    <div className="relative z-20 mt-auto bg-[linear-gradient(90deg,rgba(35,26,20,0.94),rgba(26,20,16,0.88))] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <div aria-hidden="true" className="h-px bg-[linear-gradient(90deg,transparent,var(--gold)_25%,var(--gold-bright)_50%,var(--gold)_75%,transparent)] opacity-70" />
      <div className="container-site flex flex-col gap-5 py-6 lg:h-24 lg:flex-row lg:items-center lg:justify-between lg:py-0">
        <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-line lg:[&>li]:px-8 lg:[&>li:first-child]:pl-0">
          <InfoItem icon={<MapPin className="size-5" strokeWidth={1.5} />}>
            {site.address.line}, {site.address.city}
          </InfoItem>
          <InfoItem icon={<Clock className="size-5" strokeWidth={1.5} />}>
            <OpeningHours />
          </InfoItem>
          <InfoItem icon={<Phone className="size-5" strokeWidth={1.5} />}>
            <a href={site.phone.href} className="transition hover:text-gold">
              {site.phone.label}
            </a>
          </InfoItem>
        </ul>
        <SocialLinks />
      </div>
    </div>
  );
}
