import { PauseWhenHidden } from "@/components/ui/PauseWhenHidden";

// Endless band of words. The track holds the list twice so sliding half its width loops seamlessly.
export function Marquee({ words }: { words: string[] }) {
  const track = [...words, ...words];

  return (
    <PauseWhenHidden className="overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul aria-label="Pratos angolanos" className="flex w-max motion-safe:animate-marquee">
        {track.map((word, i) => (
          <li
            key={i}
            aria-hidden={i >= words.length}
            className="flex items-center gap-10 pr-10 font-display text-[3rem] font-semibold italic leading-none text-transparent [-webkit-text-stroke:1px_var(--gold)] sm:text-[4.5rem]"
          >
            {word}
            <span className="text-[1.5rem] not-italic text-gold [-webkit-text-stroke:0]">✦</span>
          </li>
        ))}
      </ul>
    </PauseWhenHidden>
  );
}
