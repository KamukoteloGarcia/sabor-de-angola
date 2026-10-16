import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/Stars";

const initials = (name: string) =>
  name
    .split(" ")
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .map((part) => part[0])
    .join("");

type TestimonialCardProps = { quote: string; name: string; detail: string };

export function TestimonialCard({ quote, name, detail }: TestimonialCardProps) {
  return (
    <figure className="reveal relative flex flex-col rounded-[22px] border border-line bg-[linear-gradient(160deg,var(--card),var(--surface))] p-8 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition duration-500 hover:-translate-y-1 hover:border-gold/40">
      <Quote aria-hidden="true" className="absolute right-6 top-6 size-10 text-gold/20" strokeWidth={1} />
      <Stars className="h-4" />
      <blockquote className="mt-5 flex-1 font-display text-[21px] italic leading-snug text-fg">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
        <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-[image:var(--gold-gradient)] font-display text-[18px] font-bold text-bg">
          {initials(name)}
        </span>
        <span>
          <span className="block text-[14px] font-medium uppercase tracking-[0.15em] text-fg">{name}</span>
          <span className="text-[13px] text-subtle">{detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}
