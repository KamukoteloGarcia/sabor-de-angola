// Gallery tiles, in reading order. `size` sets how many grid cells a tile spans on large screens.
export const gallery = [
  { src: "/photos/ambiance/familia.webp", title: "Jantares em família", caption: "Mesas para 12 pessoas", size: "large" },
  { src: "/photos/ambiance/brasa.webp", title: "Cozinha de fogo", caption: "Tudo feito na brasa", size: "tall" },
  { src: "/photos/ambiance/bartender.webp", title: "O nosso bar", caption: "Cocktails de autor", size: "normal" },
  { src: "/photos/ambiance/terraco.webp", title: "Esplanada", caption: "Vista para a baía", size: "normal" },
  { src: "/photos/ambiance/brinde.webp", title: "Noites a dois", caption: "Jantar à luz das velas", size: "wide" },
  { src: "/photos/ambiance/banquete.webp", title: "Para partilhar", caption: "Tábuas e petiscos", size: "normal" },
  { src: "/photos/ambiance/tradicao.webp", title: "Tradição", caption: "Sabores de geração em geração", size: "normal" },
] as const;

export type GalleryItem = (typeof gallery)[number];

export const dishNames = ["Muamba", "Calulu", "Funge", "Mufete", "Kizaca", "Cacusso", "Moamba de ginguba", "Kissangua", "Gindungo"];
