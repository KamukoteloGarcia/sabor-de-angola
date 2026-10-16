import { cn } from "@/lib/cn";

// Line – dot – diamond – dot – line divider.
export function Ornament({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex items-center gap-2 text-gold", className)}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/80" />
      <span className="size-1 rounded-full bg-current" />
      <span className="size-2 rotate-45 border border-current" />
      <span className="size-1 rounded-full bg-current" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/80" />
    </span>
  );
}
