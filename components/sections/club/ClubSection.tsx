import { Gift } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SonaPattern } from "@/components/ui/SonaPattern";
import { club } from "@/config/club";
import { NewsletterForm } from "./NewsletterForm";

// Section: "Clube Sabor" newsletter, on a light (cream) background.
export function ClubSection() {
  return (
    <section id="clube" data-theme="light" className="relative overflow-hidden bg-bg py-24 sm:py-28">
      <div className="container-site">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-surface p-8 shadow-[0_40px_80px_-40px_rgba(60,35,15,0.4)] ring-1 ring-line sm:p-14">
          <SonaPattern className="opacity-[0.08] [mask-image:radial-gradient(60%_80%_at_100%_50%,#000,transparent)]" />
          <LogoMark size={260} className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-[0.12] lg:block" />

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <SectionHeading eyebrow={club.eyebrow} title={club.title} accent={club.accent} description={club.description} />
              <div className="mt-8 max-w-[520px]">
                <NewsletterForm />
                <p className="mt-3 text-[13px] text-subtle">Sem spam. Pode sair quando quiser.</p>
              </div>
            </div>

            <ul className="space-y-4">
              {club.perks.map((perk) => (
                <li key={perk.title} className="flex gap-4 rounded-2xl border border-line bg-bg/60 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gold-gradient)] text-surface">
                    <Gift aria-hidden="true" className="size-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-display text-[21px] font-semibold leading-tight text-fg">{perk.title}</span>
                    <span className="mt-1 block text-[14.5px] text-muted">{perk.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
