import { ArrowLeft, ArrowRight } from "lucide-react";

type HeroControlsProps = {
  total: number;
  active: number;
  isRunning: boolean;
  intervalMs: number;
  onSelect: (index: number) => void;
  onStep: (step: 1 | -1) => void;
};

const arrowButton =
  "grid size-11 place-items-center rounded-full border border-fg/25 text-fg transition hover:border-gold hover:bg-gold hover:text-bg";

const pad = (n: number) => String(n).padStart(2, "0");

// Counter, progress bars (each fills while its banner is shown) and previous/next arrows.
export function HeroControls({ total, active, isRunning, intervalMs, onSelect, onStep }: HeroControlsProps) {
  return (
    <div className="flex items-center gap-5 lg:max-w-[560px]">
      <span className="font-display text-[18px] tabular-nums text-subtle">
        <span className="text-gold-bright">{pad(active + 1)}</span> / {pad(total)}
      </span>

      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o destaque ${i + 1}`}
            aria-current={i === active}
            onClick={() => onSelect(i)}
            className="relative h-6 w-8 sm:w-12"
          >
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden bg-fg/15">
              {i === active && (
                <span
                  key={active}
                  className="block size-full origin-left bg-gold motion-safe:animate-progress"
                  style={{ animationDuration: `${intervalMs}ms`, animationPlayState: isRunning ? "running" : "paused" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="ml-auto flex gap-2">
        <button type="button" aria-label="Destaque anterior" onClick={() => onStep(-1)} className={arrowButton}>
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" aria-label="Próximo destaque" onClick={() => onStep(1)} className={arrowButton}>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
