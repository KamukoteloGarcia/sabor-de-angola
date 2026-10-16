// "Kz 12.500" — same output on the server and in the browser (no locale data needed).
export function formatKz(value: number) {
  return `Kz ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
