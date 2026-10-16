import { HandHeart, Leaf, Wine, type LucideIcon } from "lucide-react";

export const about = {
  eyebrow: "A nossa história",
  title: "Da cozinha da avó",
  accent: "para a sua mesa",
  paragraphs: [
    "Tudo começou em 1987, no quintal da avó Rosa, no Sambizanga: um fogareiro, uma panela de muamba e a família inteira à volta da mesa.",
    "Hoje, na Marginal de Luanda, servimos as mesmas receitas com ingredientes de pequenos produtores angolanos, técnica contemporânea e o carinho de quem recebe em casa.",
  ],
  chef: { name: "Domingos Kiala", role: "Chef & fundador" },
  photos: {
    main: "/photos/ambiance/chef.webp",
    table: "/photos/ambiance/familia.webp",
    service: "/photos/ambiance/servico.webp",
  },
};

export const stats = [
  { value: 12, label: "anos na Marginal" },
  { value: 60, suffix: "+", label: "pratos no catálogo" },
  { value: 4.9, decimals: 1, label: "avaliação média" },
];

export const pillars: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Leaf, title: "Ingredientes da terra", text: "Produtores locais, peixe da Ilha e legumes da época." },
  { icon: Wine, title: "Bebidas selecionadas", text: "Cocktails de autor e mais de 80 vinhos." },
  { icon: HandHeart, title: "Hospitalidade angolana", text: "Aqui, cada cliente é recebido como família." },
];
