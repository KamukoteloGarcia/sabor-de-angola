import { Logo } from "@/components/brand/Logo";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navigation, site } from "@/config/site";
import { FooterColumn } from "./FooterColumn";

const linkClass = "transition hover:text-gold";

export function Footer() {
  return (
    <footer id="contactos" className="relative overflow-hidden border-t border-line bg-bg-soft">
      <div className="container-site grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-[320px]">
          <Logo />
          <p className="mt-6 text-[15px] leading-relaxed text-muted">{site.description}</p>
          <SocialLinks className="mt-6" />
        </div>

        <FooterColumn title="Navegação">
          <ul className="space-y-3">
            {navigation.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Horário">
          <OpeningHours />
          <p className="text-subtle">Cozinha fecha 30 min antes.</p>
        </FooterColumn>

        <FooterColumn title="Contactos">
          <address className="not-italic">
            {site.address.line}
            <br />
            {site.address.city}
          </address>
          <a href={site.phone.href} className={`block ${linkClass}`}>
            {site.phone.label}
          </a>
          <a href={`mailto:${site.email}`} className={`block ${linkClass}`}>
            {site.email}
          </a>
        </FooterColumn>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-display text-[18vw] font-semibold uppercase leading-[0.8] tracking-[0.04em] text-transparent [-webkit-text-stroke:1px_rgba(200,164,107,0.18)]"
      >
        Sabor
      </p>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-[13px] text-subtle sm:flex-row sm:justify-between">
          <span>© 2026 {site.name}. Todos os direitos reservados.</span>
          <span>Feito com amor em Luanda, Angola.</span>
        </div>
      </div>
    </footer>
  );
}
