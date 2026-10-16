import { SectionHeading } from "@/components/ui/SectionHeading";
import { dishNames, gallery } from "@/config/gallery";
import { GalleryTile } from "./GalleryTile";
import { Marquee } from "./Marquee";

// Section 3: moments at the table.
export function GallerySection() {
  return (
    <section id="galeria" className="relative py-24 sm:py-32">
      <Marquee words={dishNames} />

      <div className="container-site mt-24">
        <SectionHeading
          align="center"
          eyebrow="Experiências"
          title="Momentos"
          accent="à mesa"
          script="com sabor a casa"
          description="Almoços de domingo, jantares a dois e noites de festa. Cada visita é uma celebração da cultura angolana."
        />

        <div className="mt-14 grid auto-rows-[260px] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item) => (
            <GalleryTile key={item.src} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
