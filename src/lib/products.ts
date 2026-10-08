export type AppHref = "/shop" | "/shop/aura-one";

export type Finish = {
  id: string;
  name: string;
  image: string;
  swatch: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  image: string;
  hoverImage: string;
  href: AppHref;
  availability: string;
  category: "purifier" | "filter" | "accessory";
  finishes?: Finish[];
};

export const finishes: Finish[] = [
  { id: "ceramic", name: "Ceramic", image: "/images/aura/hero.jpg", swatch: "bg-paper" },
  { id: "graphite", name: "Graphite", image: "/images/aura/graphite.jpg", swatch: "bg-charcoal" },
  { id: "sand", name: "Sand", image: "/images/aura/sand.jpg", swatch: "bg-sand" },
];

export const products: Product[] = [
  {
    id: "aura-one",
    name: "AURA ONE",
    price: 34999,
    tagline: "AI-powered smart air purifier",
    description:
      "Three layers of filtration for rooms up to 750 sq ft. Quiet enough for sleep. Attentive enough to change speed before you notice the air has.",
    image: "/images/aura/hero.jpg",
    hoverImage: "/images/aura/angle.jpg",
    href: "/shop/aura-one",
    availability: "In stock · ships in 3–5 days",
    category: "purifier",
    finishes,
  },
  {
    id: "hepa",
    name: "Replacement HEPA Filter",
    price: 4499,
    tagline: "H13 particle filter",
    description: "Pleated H13 media for the annual service. Drops in from the top. No tools.",
    image: "/images/aura/hepa.jpg",
    hoverImage: "/images/aura/replace.jpg",
    href: "/shop",
    availability: "In stock",
    category: "filter",
  },
  {
    id: "carbon",
    name: "Carbon Filter",
    price: 3299,
    tagline: "Activated carbon bed",
    description: "A dense carbon cylinder for odors and volatile compounds. Replace with the HEPA, or sooner after a renovation.",
    image: "/images/aura/carbon.jpg",
    hoverImage: "/images/aura/internal.jpg",
    href: "/shop",
    availability: "In stock",
    category: "filter",
  },
  {
    id: "bundle",
    name: "Filter Bundle",
    price: 6999,
    tagline: "HEPA and carbon, together",
    description: "Both filters for a full year of ordinary use. Less than buying them apart.",
    image: "/images/aura/internal.jpg",
    hoverImage: "/images/aura/hepa.jpg",
    href: "/shop",
    availability: "In stock",
    category: "filter",
  },
  {
    id: "stand",
    name: "AURA Floor Stand",
    price: 8999,
    tagline: "Raised plinth",
    description: "A brushed-metal plinth that lifts AURA ONE slightly and gives the intake a cleaner path.",
    image: "/images/aura/stand.jpg",
    hoverImage: "/images/aura/hero.jpg",
    href: "/shop",
    availability: "In stock",
    category: "accessory",
  },
  {
    id: "wall",
    name: "AURA Wall Mount",
    price: 6499,
    tagline: "Slim bracket",
    description: "For rooms where the floor should stay clear. Holds the tower close to the wall without covering the outlet.",
    image: "/images/aura/wall.jpg",
    hoverImage: "/images/aura/side.jpg",
    href: "/shop",
    availability: "Made to order · 2 weeks",
    category: "accessory",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export const auraOne = products[0];
