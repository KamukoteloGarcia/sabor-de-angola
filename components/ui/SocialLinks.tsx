import { socialIcons } from "@/components/icons/SocialIcons";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {site.socials.map(({ id, label, href }) => {
        const Icon = socialIcons[id];
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-gold hover:text-gold"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
