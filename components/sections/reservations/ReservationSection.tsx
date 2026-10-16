import { Clock, Phone } from "lucide-react";
import Image from "next/image";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialIntervalMs, testimonials } from "@/config/reservations";
import { site } from "@/config/site";
import { ReservationForm } from "./ReservationForm";
import { TestimonialCarousel } from "./TestimonialCarousel";

// Section 4: what guests say, and the booking form.
export function ReservationSection() {
  return (
    <section id="reservas" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src="/photos/ambiance/sala.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg),rgba(23,17,13,0.8)_30%,rgba(23,17,13,0.88)_70%,var(--bg))]" />
      </div>

      <div className="container-site">
        <SectionHeading align="center" eyebrow="Testemunhos" title="O que dizem os" accent="nossos clientes" />
        <div className="mt-14">
          <TestimonialCarousel items={testimonials} intervalMs={testimonialIntervalMs} />
        </div>

        <div className="reveal-left mt-24">
          <div className="relative grid overflow-hidden rounded-[28px] border-spin [--card-bg:#1d1611] motion-safe:animate-border-spin lg:grid-cols-[1fr_1.2fr]">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(142,42,54,0.4),transparent)]" />
            <div className="relative border-b border-line p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <SectionHeading
                eyebrow="Reservas"
                title="Reserve a sua mesa"
                script="esperamos por si"
                description="Para grupos com mais de 12 pessoas, eventos privados ou menus de degustação, ligue-nos diretamente."
              />
              <ul className="mt-10 space-y-5 text-[15px] text-muted">
                <li className="flex gap-4">
                  <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={site.phone.href} className="transition hover:text-gold">
                    {site.phone.label}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>
                    <OpeningHours />
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative p-8 sm:p-12">
              <ReservationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
