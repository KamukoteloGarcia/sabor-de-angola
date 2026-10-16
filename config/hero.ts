// Icons available to the floating info cards (mapped to components in HeroBadges).
export type BadgeIcon = "star" | "chef" | "flame" | "clock" | "fish" | "waves" | "martini" | "wine" | "book" | "sparkles";

export type HeroTone = "light" | "dark";

export type HeroBadge = { icon: BadgeIcon; title: string; detail: string };

// Hero banners, in display order. Each one has its own WebGL scene (components/three/scenes)
// and two floating info cards (`badges`).
export const heroSlides = [
  {
    id: "signature",
    // The first banner is light (cream); the others are dark.
    tone: "light",
    eyebrow: "Cozinha angolana contemporânea",
    lines: ["Boa comida.", "Bons momentos."],
    script: "feito para partilhar",
    description:
      "Receitas de família com mais de três gerações, ingredientes da terra e o calor da hospitalidade angolana, à beira da Marginal de Luanda.",
    backdrop: "/photos/backdrops/calulu.webp",
    glow: "rgb(200 164 107 / 0.30)",
    badges: [
      { icon: "star", title: "4.9", detail: "1.248 avaliações no Google" },
      { icon: "chef", title: "Calulu de peixe", detail: "Kz 9.800 · Assinatura" },
    ],
  },
  {
    id: "grill",
    eyebrow: "Grelhados na brasa",
    lines: ["Fogo lento.", "Sabor intenso."],
    script: "direto da brasa",
    description:
      "Picanha, espetadas e costela fumada no carvão de lenha, temperadas com gindungo e servidas com banana-pão e farofa da casa.",
    backdrop: "/photos/backdrops/brasa.webp",
    glow: "rgb(224 103 44 / 0.32)",
    badges: [
      { icon: "flame", title: "380°C", detail: "Carvão de lenha" },
      { icon: "clock", title: "6h de fumo", detail: "Costela fumada lentamente" },
    ],
  },
  {
    id: "sea",
    eyebrow: "Do mar à mesa",
    lines: ["A frescura da Ilha,", "todos os dias."],
    script: "pescado do dia",
    description:
      "Cacusso grelhado, gambas à moda da Ilha e calulu de peixe: o melhor do Atlântico escolhido de manhã pelos nossos pescadores.",
    backdrop: "/photos/backdrops/mar.webp",
    glow: "rgb(84 160 170 / 0.28)",
    badges: [
      { icon: "fish", title: "Pescado do dia", detail: "Chega às 7h da Ilha de Luanda" },
      { icon: "waves", title: "100% Atlântico", detail: "Pesca artesanal" },
    ],
  },
  {
    id: "bar",
    eyebrow: "Bar & cocktails",
    lines: ["Brindes que ficam", "na memória."],
    script: "ao pôr do sol",
    description:
      "Cocktails de autor com frutas tropicais, uma carta de vinhos com mais de 80 referências e o melhor pôr do sol de Luanda.",
    backdrop: "/photos/backdrops/bar.webp",
    glow: "rgb(214 150 82 / 0.30)",
    badges: [
      { icon: "martini", title: "Happy hour", detail: "Todos os dias · 18h – 20h" },
      { icon: "wine", title: "+80 vinhos", detail: "Carta selecionada" },
    ],
  },
  {
    id: "catalog",
    eyebrow: "O nosso catálogo",
    lines: ["Mais de 60 pratos", "para descobrir."],
    script: "folheie connosco",
    description:
      "Do funge à mousse de maracujá, explore o menu completo, com histórias, ingredientes e sugestões do chef para cada prato.",
    backdrop: "/photos/backdrops/menu.webp",
    glow: "rgb(200 164 107 / 0.26)",
    badges: [
      { icon: "book", title: "+60 pratos", detail: "6 categorias" },
      { icon: "sparkles", title: "Menu de degustação", detail: "Sugestões do chef" },
    ],
  },
] as const satisfies ReadonlyArray<{ id: string; tone?: HeroTone; badges: readonly [HeroBadge, HeroBadge] } & Record<string, unknown>>;

export type HeroSlide = (typeof heroSlides)[number];
export type HeroSlideId = HeroSlide["id"];

export const toneOf = (slide: HeroSlide): HeroTone => ("tone" in slide ? slide.tone : "dark");

export const heroIntervalMs = 9000;
