import { PauseWhenHidden } from "@/components/ui/PauseWhenHidden";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/config/about";
import { AboutVisual } from "./AboutVisual";
import { PillarList } from "./PillarList";
import { StatList } from "./StatList";

// Section 2: our story, with 3D photos on the left.
export function AboutSection() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-[linear-gradient(180deg,transparent,rgba(29,22,17,0.85)_15%,rgba(29,22,17,0.85)_85%,transparent)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(142,42,54,0.35),transparent_65%)]"
      />

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <PauseWhenHidden className="reveal-left">
          <AboutVisual />
        </PauseWhenHidden>

        <div className="reveal-right">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} accent={about.accent} />
          <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-muted sm:text-[17px]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 flex flex-wrap items-baseline gap-x-4">
            <span className="font-script text-[2.6rem] leading-none text-gold">{about.chef.name}</span>
            <span className="text-[12px] uppercase tracking-[0.25em] text-subtle">{about.chef.role}</span>
          </p>

          <div className="mt-10">
            <StatList />
          </div>
          <div className="mt-10">
            <PillarList />
          </div>
        </div>
      </div>
    </section>
  );
}
