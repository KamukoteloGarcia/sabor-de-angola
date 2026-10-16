import { ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const fieldClass =
  "h-12 w-full border border-line bg-bg/60 px-4 text-[15px] text-fg outline-none transition placeholder:text-subtle focus:border-gold [color-scheme:dark] user-invalid:border-ember";

type FormFieldProps = { label: string; className?: string; children: ReactNode };

// Label + control, stacked.
export function FormField({ label, className, children }: FormFieldProps) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input className={fieldClass} {...props} />;
}

type SelectInputProps = ComponentProps<"select"> & { options: Array<string | { value: string; label: string }> };

export function SelectInput({ options, ...props }: SelectInputProps) {
  return (
    <span className="relative">
      <select className={cn(fieldClass, "appearance-none pr-10")} {...props}>
        {options.map((option) => {
          const { value, label } = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <option key={value} value={value} className="bg-surface">
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gold" />
    </span>
  );
}
