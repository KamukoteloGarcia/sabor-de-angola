import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SonaPattern } from "@/components/ui/SonaPattern";
import { eventPerks, events } from "@/config/events";
import { EventCard } from "./EventCard";

// Section: private events, on a light (cream) background.
export function EventsSection() {
  return (
    <section id="eventos" data-theme="light" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <SonaPattern className="opacity-[0.06] [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />

      <div className="container-site relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Eventos privados"
            title="A sua celebração,"
            accent="à nossa mesa"
            description="Do jantar a dois à festa de família: tratamos do menu, da decoração e da música para que só tenha de aproveitar."
          />
          <ButtonLink href="#reservas" className="shrink-0 self-start lg:self-auto">
            Pedir orçamento
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>

        <ul className="reveal mt-12 flex flex-wrap justify-center gap-3">
          {eventPerks.map((perk) => (
            <li key={perk} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-[14px] text-fg">
              <Check aria-hidden="true" className="size-4 text-gold" strokeWidth={2} />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
