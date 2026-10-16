import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

const base =
  "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium uppercase tracking-[0.18em] transition-all duration-500";

// A light streak that sweeps across on hover.
const shine =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/3 before:-translate-x-[160%] before:skew-x-[-20deg] before:bg-white/40 before:transition-transform before:duration-700 hover:before:translate-x-[420%]";

const variants = {
  solid: `bg-[image:var(--gold-gradient)] bg-[length:200%_auto] text-bg shadow-[0_12px_32px_-12px_rgba(222,179,109,0.8)] hover:bg-right hover:shadow-[0_18px_44px_-10px_rgba(238,113,57,0.55)] ${shine}`,
  outline: "border border-fg/30 bg-white/[0.04] text-fg hover:border-gold hover:bg-gold/10 hover:text-gold-bright",
  gold: `border border-gold/70 text-gold-bright hover:bg-gold hover:text-bg ${shine}`,
};

const sizes = {
  md: "h-13 px-8 text-[12.5px]",
  sm: "h-11 px-6 text-[11.5px]",
};

export function buttonClass({ variant = "solid", size = "md" }: Pick<ButtonLinkProps, "variant" | "size"> = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonClass({ variant, size }), className)} {...props} />;
}
