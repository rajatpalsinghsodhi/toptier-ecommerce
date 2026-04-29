export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: Record<string, number>; // variant key -> stock count
  isPreOrder?: boolean;
  preOrderShipDate?: string;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  variantKey: string; // e.g., "M-Black"
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    variantKey: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "fulfilled" | "pre-order";
  shippingAddress: {
    line1: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  expectedShipDate?: string;
};
