// Restaurant details shown in the header, hero info bar and footer.
export const site = {
  name: "Sabor de Angola",
  tagline: "Cozinha & Bar",
  description:
    "Restaurante de cozinha angolana contemporânea na Marginal de Luanda. Muamba, calulu, grelhados na brasa, marisco fresco e cocktails de autor.",
  address: { line: "Av. 4 de Fevereiro, 23", city: "Marginal de Luanda" },
  phone: { label: "+244 923 000 000", href: "tel:+244923000000" },
  email: "reservas@sabordeangola.ao",
  hours: [
    { days: "Seg – Qui", time: "12h – 23h" },
    { days: "Sex – Dom", time: "12h – 00h" },
  ],
  socials: [
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
    { id: "facebook", label: "Facebook", href: "https://facebook.com" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me" },
  ],
} as const;

// Restaurant on the map. Google Maps embed needs no API key; `t=k` shows the satellite view.
const mapQuery = "Avenida 4 de Fevereiro, Marginal de Luanda, Angola";

export const location = {
  embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=k&z=16&output=embed`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  parking: "Parque privado gratuito para clientes",
};

export type SocialId = (typeof site.socials)[number]["id"];

export const navigation = [
  { href: "#inicio", label: "Início" },
  { href: "#menu", label: "Menu" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#eventos", label: "Eventos" },
  { href: "#reservas", label: "Reservas" },
  { href: "#localizacao", label: "Localização" },
] as const;
