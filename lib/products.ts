import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Lucky Graphic Tee",
    slug: "essential-oversized-tee",
    price: 45,
    salePrice: 38,
    description:
      "Heavy cotton graphic tee with a boxy streetwear fit. Cream base, bold blue front artwork, and an easy drop-shoulder silhouette.",
    category: "Tops",
    images: ["/catalog/tee-a.jpg", "/catalog/tee-b.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Cream", "White", "Sand", "Sage"],
    stock: {
      "S-Cream": 12,
      "M-Cream": 25,
      "L-Cream": 18,
      "XL-Cream": 8,
      "M-White": 15,
      "L-White": 10,
      "L-Sand": 5,
    },
    featured: true,
  },
  {
    id: "2",
    name: "Khaki Trail Cargo Pants",
    slug: "cargo-utility-pants",
    price: 120,
    description:
      "Khaki cargo pants with utility pocketing and an outdoor-ready fit. Durable cotton twill, relaxed through the thigh, and built for everyday wear.",
    category: "Bottoms",
    images: ["/catalog/cargo-v2.jpg"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Olive", "Black"],
    stock: {
      "30-Khaki": 8,
      "32-Khaki": 12,
      "34-Khaki": 6,
      "32-Olive": 10,
    },
    featured: true,
  },
  {
    id: "3",
    name: "Tomorrow Graphic Hoodie",
    slug: "classic-hoodie",
    price: 95,
    description:
      "Black heavyweight hoodie with a relaxed body and oversized back graphic. Ribbed cuffs, drop shoulder, and classic streetwear weight.",
    category: "Tops",
    images: ["/catalog/hoodie-v2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Washed Black", "Charcoal"],
    stock: {
      "M-Black": 20,
      "L-Black": 15,
      "M-Washed Black": 12,
      "L-Washed Black": 8,
    },
    featured: true,
  },
  {
    id: "4",
    name: "Olive Utility Field Jacket",
    slug: "minimal-windbreaker",
    price: 150,
    salePrice: 120,
    description:
      "Olive utility field jacket with oversized flap pockets and a relaxed layered fit. Pre-order now for the May 15 outerwear wave.",
    category: "Outerwear",
    images: ["/catalog/shell.jpg"],
    sizes: ["M", "L", "XL"],
    colors: ["Olive", "Washed Olive", "Charcoal"],
    stock: {},
    isPreOrder: true,
    preOrderShipDate: "2026-05-15",
    featured: true,
  },
  {
    id: "5",
    name: "Raw Denim Chore Jacket",
    slug: "washed-denim-jacket",
    price: 180,
    description:
      "Rigid indigo denim jacket with a contrast cord collar, button front, and utility chest pockets. A structured outer layer with workwear roots.",
    category: "Outerwear",
    images: ["/catalog/denim-v2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Indigo", "Raw Blue"],
    stock: {
      "M-Indigo": 6,
      "L-Indigo": 4,
      "M-Raw Blue": 8,
    },
  },
  {
    id: "6",
    name: "Side-Tape Track Pants",
    slug: "performance-track-pants",
    price: 85,
    description:
      "Pale blue track pants with contrast side tape and a straight athletic drape. Lightweight, easy to style, and built around movement.",
    category: "Bottoms",
    images: ["/catalog/track-v2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ice Blue", "Black", "Navy"],
    stock: {
      "M-Ice Blue": 15,
      "L-Ice Blue": 12,
      "M-Navy": 10,
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCoverImage(product: Product): string {
  return product.images[0] ?? "/catalog/tee-a.jpg";
}
