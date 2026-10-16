import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span role="img" aria-label={`${count} de 5 estrelas`} className={cn("inline-flex w-fit gap-0.5 text-gold", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} aria-hidden="true" className="aspect-square h-full w-auto fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}
