"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  priceUsd: number;
  variant?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string, variant?: string) => void;
  setQuantity: (slug: string, variant: string | undefined, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotalUsd: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ndr-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage unavailable — cart just starts empty
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === item.slug && i.variant === item.variant,
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback<CartContextValue["removeItem"]>((slug, variant) => {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.variant === variant)),
    );
  }, []);

  const setQuantity = useCallback<CartContextValue["setQuantity"]>(
    (slug, variant, quantity) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.slug === slug && i.variant === variant ? { ...i, quantity } : i,
          )
          .filter((i) => i.quantity > 0),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );
  const subtotalUsd = useMemo(
    () => items.reduce((sum, i) => sum + i.priceUsd * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQuantity, clear, count, subtotalUsd }),
    [items, addItem, removeItem, setQuantity, clear, count, subtotalUsd],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
