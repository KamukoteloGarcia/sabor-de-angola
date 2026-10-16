import { pillars } from "@/config/about";

export function PillarList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {pillars.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="group rounded-2xl border border-line bg-[linear-gradient(160deg,rgba(255,255,255,0.04),transparent)] p-5 transition duration-500 hover:-translate-y-1 hover:border-gold/40"
        >
          <span className="grid size-12 place-items-center rounded-full bg-[image:var(--gold-gradient)] text-bg shadow-[0_10px_24px_-10px_rgba(222,179,109,0.8)] transition duration-500 group-hover:rotate-[10deg]">
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-4 text-[12.5px] font-medium uppercase tracking-[0.16em] text-fg">{title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{text}</p>
        </li>
      ))}
    </ul>
  );
}
