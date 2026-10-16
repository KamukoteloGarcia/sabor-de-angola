import { ButtonLink } from "@/components/ui/ButtonLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { NavLinks } from "./NavLinks";

type MobileMenuProps = { isOpen: boolean; active: string; onClose: () => void };

// Panel that slides down under the header on small screens.
export function MobileMenu({ isOpen, active, onClose }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      inert={!isOpen}
      className={cn(
        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 xl:hidden",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0">
        <nav aria-label="Menu móvel" className="container-site pb-8 pt-4">
          <NavLinks active={active} variant="panel" onNavigate={onClose} />
          <ButtonLink href="#reservas" onClick={onClose} className="mt-8 w-full">
            Reservar mesa
          </ButtonLink>
          <div className="mt-6 flex items-center justify-between text-[14px] text-muted">
            <a href={site.phone.href}>{site.phone.label}</a>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </div>
  );
}
