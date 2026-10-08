import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({
  head: () =>
    pageMeta(
      "Shop — AURA",
      "AURA ONE, replacement filters, and the floor stand and wall mount. Concept pricing in rupees.",
    ),
  component: ShopPage,
});

function ShopPage() {
  return (
    <main id="main" className="aura-wrap pt-32 pb-24" data-nav="light">
      <p className="eyebrow text-stone">Shop</p>
      <h1 className="type-display mt-4 max-w-3xl">The purifier, and the few things it needs later.</h1>
      <p className="mt-6 max-w-xl text-stone">
        Prices are concept figures for a fictional product. Adding to the bag stays on this device.
      </p>
      <div className="mt-16" id="filters">
        <ProductGrid />
      </div>
    </main>
  );
}
