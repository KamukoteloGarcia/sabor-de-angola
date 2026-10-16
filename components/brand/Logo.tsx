import Link from "next/link";
import { site } from "@/config/site";
import { LogoMark } from "./LogoMark";

// Emblem + wordmark, side by side.
export function Logo() {
  return (
    <Link href="#inicio" aria-label={`${site.name}, início`} className="group inline-flex items-center gap-3">
      <LogoMark size={46} className="size-10 shrink-0 transition duration-700 group-hover:rotate-[360deg] sm:size-[46px]" />
      <span className="flex flex-col">
        <span className="whitespace-nowrap font-display text-[19px] font-semibold uppercase leading-none tracking-[0.1em] text-fg sm:text-[25px] sm:tracking-[0.12em]">
          Sabor <span className="text-[0.62em] italic normal-case tracking-normal text-gold">de</span> Angola
        </span>
        <span className="mt-1.5 text-[9.5px] uppercase tracking-[0.42em] text-gold/80">{site.tagline}</span>
      </span>
    </Link>
  );
}
