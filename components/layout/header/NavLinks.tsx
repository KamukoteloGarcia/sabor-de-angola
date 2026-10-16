import { navigation } from "@/config/site";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  active: string;
  onNavigate?: () => void;
  variant: "bar" | "panel";
};

export function NavLinks({ active, onNavigate, variant }: NavLinksProps) {
  return (
    <ul className={cn(variant === "bar" ? "flex items-center gap-8" : "flex flex-col gap-1")}>
      {navigation.map(({ href, label }) => {
        const isActive = href === `#${active}`;
        return (
          <li key={href}>
            <a
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative uppercase transition hover:text-gold",
                isActive ? "text-gold" : "text-fg/85",
                variant === "bar"
                  ? "py-2 text-[12.5px] tracking-[0.18em] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform aria-[current]:after:scale-x-100"
                  : "block border-b border-line py-4 font-display text-[26px] normal-case tracking-normal",
              )}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
