import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  qty: number;
  finish?: string;
};

type CartState = {
  lines: CartLine[];
  add: (id: string, qty?: number, finish?: string) => void;
  setQty: (id: string, qty: number, finish?: string) => void;
  remove: (id: string, finish?: string) => void;
  clear: () => void;
};

function keyOf(id: string, finish?: string) {
  return `${id}:${finish ?? ""}`;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (id, qty = 1, finish) =>
        set((state) => {
          const key = keyOf(id, finish);
          const existing = state.lines.find((line) => keyOf(line.id, line.finish) === key);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                keyOf(line.id, line.finish) === key
                  ? { ...line, qty: Math.min(5, line.qty + qty) }
                  : line,
              ),
            };
          }
          return { lines: [...state.lines, { id, qty: Math.min(5, qty), finish }] };
        }),
      setQty: (id, qty, finish) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((line) => keyOf(line.id, line.finish) !== keyOf(id, finish))
              : state.lines.map((line) =>
                  keyOf(line.id, line.finish) === keyOf(id, finish)
                    ? { ...line, qty: Math.min(5, qty) }
                    : line,
                ),
        })),
      remove: (id, finish) =>
        set((state) => ({
          lines: state.lines.filter((line) => keyOf(line.id, line.finish) !== keyOf(id, finish)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "aura-cart", skipHydration: true },
  ),
);

export function lineCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.qty, 0);
}
