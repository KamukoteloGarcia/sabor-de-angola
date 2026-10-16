import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Ornament } from "./Ornament";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Last words of the title, in gold italics. */
  accent?: string;
  /** Handwritten accent under the title. */
  script?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, accent, script, description, align = "left", className }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("reveal max-w-[660px]", centered && "mx-auto text-center", className)}>
      <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] text-fg sm:text-[3.6rem]">
        {title}
        {accent && (
          <>
            {" "}
            <em className="gold-text pr-1 font-medium motion-safe:animate-shimmer">{accent}</em>
          </>
        )}
      </h2>
      {centered && <Ornament className="mt-5 justify-center" />}
      {script && <p className="mt-1 font-script text-[2.1rem] leading-tight text-gold-bright/90 sm:text-[2.5rem]">{script}</p>}
      {description && <p className="mt-5 text-[16px] leading-[1.8] text-muted sm:text-[17px]">{description}</p>}
    </div>
  );
}
