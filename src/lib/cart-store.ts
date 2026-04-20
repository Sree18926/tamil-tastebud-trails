import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findItem } from "./menu-data";

type CartState = {
  items: Record<string, number>; // itemId -> qty
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
  detailed: () => Array<{ id: string; name: string; price: number; qty: number; subtotal: number }>;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (id) => set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + 1 } })),
      remove: (id) =>
        set((s) => {
          const next = { ...s.items };
          const cur = next[id] ?? 0;
          if (cur <= 1) delete next[id];
          else next[id] = cur - 1;
          return { items: next };
        }),
      setQty: (id, qty) =>
        set((s) => {
          const next = { ...s.items };
          if (qty <= 0) delete next[id];
          else next[id] = Math.min(qty, 50);
          return { items: next };
        }),
      clear: () => set({ items: {} }),
      count: () => Object.values(get().items).reduce((a, b) => a + b, 0),
      total: () =>
        Object.entries(get().items).reduce((sum, [id, qty]) => {
          const item = findItem(id);
          return sum + (item ? item.price * qty : 0);
        }, 0),
      detailed: () =>
        Object.entries(get().items)
          .map(([id, qty]) => {
            const item = findItem(id);
            if (!item) return null;
            return { id, name: item.name, price: item.price, qty, subtotal: item.price * qty };
          })
          .filter((x): x is NonNullable<typeof x> => x !== null),
    }),
    { name: "annapoorani-cart" },
  ),
);
