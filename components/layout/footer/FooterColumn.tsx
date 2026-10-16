import type { ReactNode } from "react";

export function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-[12px] font-medium uppercase tracking-[0.25em] text-gold">{title}</h2>
      <div className="mt-6 space-y-3 text-[15px] text-muted">{children}</div>
    </div>
  );
}
