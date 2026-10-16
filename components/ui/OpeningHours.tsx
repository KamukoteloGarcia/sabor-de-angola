import { site } from "@/config/site";

export function OpeningHours() {
  return site.hours.map((h) => (
    <span key={h.days} className="block leading-snug">
      {h.days}: {h.time}
    </span>
  ));
}
