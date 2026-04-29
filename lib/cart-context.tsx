"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { CartItem } from "./types";
import { getProductById } from "./products";

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string, variantKey: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantKey: string) => void;
  updateQuantity: (productId: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const didLoadCart = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("toptier-cart");
    queueMicrotask(() => {
      if (stored) {
        setCart(JSON.parse(stored));
      }
      didLoadCart.current = true;
    });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!didLoadCart.current) return;
    localStorage.setItem("toptier-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: string, variantKey: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.variantKey === variantKey
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.variantKey === variantKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, variantKey, quantity }];
    });
  };

  const removeFromCart = (productId: string, variantKey: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantKey === variantKey)
      )
    );
  };

  const updateQuantity = (productId: string, variantKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantKey === variantKey
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      if (!product) return total;
      const price = product.salePrice || product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
