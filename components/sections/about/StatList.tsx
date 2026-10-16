import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/config/about";

export function StatList() {
  return (
    <dl className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse gap-2 rounded-2xl border border-line bg-white/[0.03] px-3 py-6 text-center sm:px-5"
        >
          <dt className="text-[10.5px] uppercase tracking-[0.18em] text-subtle sm:text-[11.5px]">{stat.label}</dt>
          <dd className="font-display text-[2.6rem] font-semibold leading-none gold-text sm:text-[3.2rem]">
            <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
