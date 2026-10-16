import type { ReactNode, SVGProps } from "react";
import type { SocialId } from "@/config/site";

// Brand icons (lucide v1 no longer ships them). Same 24px stroke style as lucide.
type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 15.4 4c-2.4 0-4 1.4-4 4.1v2.4H8.8v3h2.6V21" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1.2-4A8.5 8.5 0 1 1 8.4 19z" />
      <path d="M9 8.8c0 3.3 2.9 6.2 6.2 6.2l1.3-1.4-1.9-1-1 .8a4.6 4.6 0 0 1-2.2-2.2l.8-1-1-1.9z" />
    </svg>
  );
}

export const socialIcons: Record<SocialId, (props: IconProps) => ReactNode> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};
