import { useCallback, useEffect, useState } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price_usd: number | null;
  qty: number;
}

const KEY = "noyis-cart-v1";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("noyis-cart-change"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    window.addEventListener("noyis-cart-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("noyis-cart-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const current = read();
    const idx = current.findIndex((i) => i.slug === item.slug);
    if (idx >= 0) current[idx].qty += qty;
    else current.push({ ...item, qty });
    write(current);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const current = read().map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i));
    write(current);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * (i.price_usd ?? 0), 0);

  return { items, add, setQty, remove, clear, count, total };
}
