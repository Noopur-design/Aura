import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";
import { startLenis, stopLenis } from "@/lib/lenis-bridge";

const pages = [
  { title: "Product", hint: "AURA ONE", to: "/product" },
  { title: "Technology", hint: "Inside the machine", to: "/technology" },
  { title: "Experience", hint: "A day with AURA", to: "/experience" },
  { title: "App", hint: "Mobile dashboard", to: "/app" },
  { title: "Shop", hint: "Purifier and care", to: "/shop" },
  { title: "Specifications", hint: "Measurements", to: "/specifications" },
  { title: "Support", hint: "Help and warranty", to: "/support" },
  { title: "About", hint: "The studio", to: "/about" },
  { title: "Contact", hint: "Write to us", to: "/contact" },
  { title: "Journal", hint: "Notes on quiet rooms", to: "/journal" },
];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) stopLenis();
    else startLenis();
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const productHits = products.map((product) => ({
      title: product.name,
      hint: product.tagline,
      to: product.href,
    }));
    const all = [...productHits, ...pages];
    if (!q) return all.slice(0, 7);
    return all.filter((item) => `${item.title} ${item.hint}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30" />
        <Dialog.Content
          className="fixed top-[8vh] left-1/2 z-50 max-h-[84vh] w-[min(100%-1.5rem,40rem)] -translate-x-1/2 overflow-y-auto bg-paper p-5 text-ink sm:p-6"
          aria-describedby={undefined}
          onCloseAutoFocus={() => setQuery("")}
        >
          <Dialog.Title className="eyebrow text-stone">Search</Dialog.Title>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Product, support, app…"
            className="mt-4 w-full border-b border-ink bg-transparent py-3 text-body outline-none placeholder:text-stone sm:type-title"
            aria-label="Search AURA"
          />
          <ul className="mt-4 divide-y divide-line">
            {results.length === 0 ? <li className="py-4 text-stone">Nothing matches that.</li> : null}
            {results.map((item) => (
              <li key={item.title + item.to}>
                <Link
                  to={item.to as "/"}
                  onClick={() => onOpenChange(false)}
                  className="flex min-w-0 items-baseline justify-between gap-4 py-3"
                >
                  <span className="shrink-0">{item.title}</span>
                  <span className="min-w-0 truncate text-right text-fine text-stone">{item.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
