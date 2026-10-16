// The catalog: categories and dishes. Prices in kwanzas (Kz).
export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Shown after the price, e.g. "/ kg". */
  unit?: string;
  photo: string;
  tag?: "Assinatura" | "Do chef" | "Picante" | "Vegetariano" | "Para partilhar";
};

export type MenuCategory = { id: string; label: string; dishes: Dish[] };

const photo = (name: string) => `/photos/dishes/${name}.webp`;

export const menu: MenuCategory[] = [
  {
    id: "tradicionais",
    label: "Tradicionais",
    dishes: [
      {
        id: "calulu",
        name: "Calulu de peixe",
        description: "Peixe seco e fresco com folhas de mandioca, tomate, beringela e óleo de palma.",
        price: 9800,
        photo: photo("calulu"),
        tag: "Assinatura",
      },
      {
        id: "muamba",
        name: "Muamba de galinha",
        description: "Galinha do campo cozinhada lentamente em óleo de palma, quiabos e abóbora. Com funge.",
        price: 8500,
        photo: photo("muamba"),
        tag: "Do chef",
      },
      {
        id: "feijao",
        name: "Feijão de óleo de palma",
        description: "Feijão cozido em óleo de palma, servido com banana-pão frita e farofa da casa.",
        price: 6200,
        photo: photo("feijao"),
        tag: "Vegetariano",
      },
      {
        id: "caril",
        name: "Caril de frango",
        description: "Frango em molho de caril suave com leite de coco, gengibre e arroz branco.",
        price: 7200,
        photo: photo("caril"),
      },
    ],
  },
  {
    id: "grelhados",
    label: "Grelhados",
    dishes: [
      {
        id: "picanha",
        name: "Picanha na brasa",
        description: "Picanha maturada grelhada no carvão, com mandioca frita e molho de gindungo.",
        price: 14500,
        photo: photo("picanha"),
        tag: "Do chef",
      },
      {
        id: "grelhado-misto",
        name: "Grelhado misto para dois",
        description: "Frango, picanha, chouriço e espetadas, com legumes assados e três molhos.",
        price: 24000,
        photo: photo("grelhado-misto"),
        tag: "Para partilhar",
      },
      {
        id: "espetada",
        name: "Espetada mista",
        description: "Vaca e frango marinados em alho, limão e louro, grelhados na brasa viva.",
        price: 11900,
        photo: photo("espetada"),
      },
      {
        id: "frango",
        name: "Frango à angolana",
        description: "Frango do campo assado com gindungo, alho e limão. Batata-doce e salada.",
        price: 9500,
        photo: photo("frango"),
        tag: "Picante",
      },
      {
        id: "costela",
        name: "Costela fumada",
        description: "Costela de porco fumada seis horas, com glaçagem de mel e malagueta.",
        price: 13200,
        photo: photo("costela"),
      },
      {
        id: "bife",
        name: "Bife da casa",
        description: "Lombo de vaca com ovo estrelado, batata frita e o nosso molho secreto.",
        price: 12800,
        photo: photo("bife"),
      },
    ],
  },
  {
    id: "mar",
    label: "Do mar",
    dishes: [
      {
        id: "cacusso",
        name: "Cacusso grelhado",
        description: "Cacusso inteiro grelhado com limão, banana-pão e molho de cebola.",
        price: 10500,
        photo: photo("cacusso"),
        tag: "Assinatura",
      },
      {
        id: "gambas",
        name: "Gambas à moda da Ilha",
        description: "Gambas salteadas em alho, gindungo e leite de coco, com arroz de tomate.",
        price: 15800,
        photo: photo("gambas"),
        tag: "Picante",
      },
      {
        id: "peixe-fresco",
        name: "Peixe fresco do dia",
        description: "Escolha o peixe na nossa banca: grelhado, cozido ou no forno, como preferir.",
        price: 18000,
        unit: "/ kg",
        photo: photo("peixe-fresco"),
      },
    ],
  },
  {
    id: "entradas",
    label: "Entradas",
    dishes: [
      {
        id: "petiscos",
        name: "Tábua de petiscos",
        description: "Chouriço, queijos, pão caseiro, azeitonas e molho de gindungo para partilhar.",
        price: 7500,
        photo: photo("petiscos"),
        tag: "Para partilhar",
      },
      {
        id: "asinhas",
        name: "Asinhas com gindungo",
        description: "Asinhas crocantes marinadas em alho e gindungo, com molho de manga.",
        price: 4900,
        photo: photo("asinhas"),
        tag: "Picante",
      },
      {
        id: "salada",
        name: "Salada da horta",
        description: "Folhas frescas, abacate, cebola roxa, nozes e vinagrete de maracujá.",
        price: 4200,
        photo: photo("salada"),
        tag: "Vegetariano",
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    dishes: [
      {
        id: "semifrio",
        name: "Semifrio de café do Amboim",
        description: "Camadas de creme de mascarpone e café angolano, com cacau amargo.",
        price: 3900,
        photo: photo("semifrio"),
        tag: "Assinatura",
      },
      {
        id: "mousse",
        name: "Mousse de maracujá",
        description: "Mousse leve de maracujá com coulis de morango e folhas de hortelã.",
        price: 3200,
        photo: photo("mousse"),
      },
      {
        id: "bolo-chocolate",
        name: "Bolo de chocolate e ginguba",
        description: "Bolo húmido de chocolate negro com creme de ginguba torrada.",
        price: 3800,
        photo: photo("bolo-chocolate"),
      },
      {
        id: "bolo-coco",
        name: "Bolo de coco e framboesa",
        description: "Pão de ló de coco com creme de baunilha e framboesas frescas.",
        price: 3500,
        photo: photo("bolo-coco"),
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    dishes: [
      {
        id: "cocktail",
        name: "Cocktail Kianda",
        description: "Rum envelhecido, mel, laranja, canela e um toque de fumo.",
        price: 5500,
        photo: photo("cocktail"),
        tag: "Assinatura",
      },
      {
        id: "mojito",
        name: "Mojito de maracujá",
        description: "Rum branco, maracujá fresco, hortelã, lima e açúcar mascavado.",
        price: 4800,
        photo: photo("mojito"),
      },
      {
        id: "sumo",
        name: "Sumo de pitanga",
        description: "Pitanga, morango e lima, batidos na hora. Sem açúcar adicionado.",
        price: 2500,
        photo: photo("sumo"),
      },
      {
        id: "whisky",
        name: "Old fashioned de mel",
        description: "Whisky, mel da Huíla e bitter de laranja, servido sobre gelo cristalino.",
        price: 6500,
        photo: photo("whisky"),
      },
    ],
  },
];

const dishes = new Map(menu.flatMap((category) => category.dishes).map((dish) => [dish.id, dish]));

export function getDish(id: string): Dish {
  const dish = dishes.get(id);
  if (!dish) throw new Error(`Unknown dish: ${id}`);
  return dish;
}

// Highlighted at the top of the menu section.
export const featuredDish = {
  id: "muamba",
  label: "Sugestão do chef",
  story: "A receita da avó Rosa, cozinhada durante três horas em lume brando, como se faz aos domingos em Luanda.",
  ingredients: ["Galinha do campo", "Óleo de palma", "Quiabos", "Abóbora", "Gindungo", "Funge de bombó"],
};
