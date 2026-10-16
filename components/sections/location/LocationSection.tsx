import { Car, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { location, site } from "@/config/site";

function InfoRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-white/[0.03] p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gold-gradient)] text-bg">{icon}</span>
      <span>
        <span className="block text-[11.5px] font-medium uppercase tracking-[0.2em] text-gold-bright">{title}</span>
        <span className="mt-1 block text-[15px] leading-relaxed text-muted">{children}</span>
      </span>
    </li>
  );
}

// Section: where we are, with a satellite map of the Marginal (Google embed, no API key, lazy-loaded).
export function LocationSection() {
  return (
    <section id="localizacao" className="relative py-24 sm:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Localização" title="Visite-nos na" accent="Marginal" description="Em frente à baía de Luanda, com vista para o pôr do sol e estacionamento gratuito." />

          <ul className="reveal mt-10 space-y-3">
            <InfoRow icon={<MapPin className="size-5" strokeWidth={1.6} />} title="Morada">
              {site.address.line}, {site.address.city}
            </InfoRow>
            <InfoRow icon={<Clock className="size-5" strokeWidth={1.6} />} title="Horário">
              <OpeningHours />
            </InfoRow>
            <InfoRow icon={<Phone className="size-5" strokeWidth={1.6} />} title="Reservas">
              <a href={site.phone.href} className="transition hover:text-gold">
                {site.phone.label}
              </a>
            </InfoRow>
            <InfoRow icon={<Car className="size-5" strokeWidth={1.6} />} title="Estacionamento">
              {location.parking}
            </InfoRow>
          </ul>

          <ButtonLink href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="reveal mt-8">
            <Navigation className="size-4" />
            Como chegar
          </ButtonLink>
        </div>

        <div className="reveal relative">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <div className="relative overflow-hidden rounded-[28px] border border-gold/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <iframe
              src={location.embedUrl}
              title={`Mapa: ${site.name}, ${site.address.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full border-0 sm:h-[520px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
