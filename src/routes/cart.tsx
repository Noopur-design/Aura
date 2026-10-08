import { createFileRoute, Link } from "@tanstack/react-router";
import { CartItem } from "@/components/shop/CartItem";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/lib/cart";
import { getProduct, products } from "@/lib/products";
import { formatINR, pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => pageMeta("Your bag — AURA", "Review AURA ONE and accessories before checkout."),
  component: CartPage,
});

function CartPage() {
  const lines = useCart((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + (getProduct(line.id)?.price ?? 0) * line.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 400;
  const extras = products.filter((product) => product.category !== "purifier" && !lines.some((line) => line.id === product.id)).slice(0, 3);

  return (
    <main id="main" className="aura-wrap pt-32 pb-24" data-nav="light">
      <h1 className="type-display">Bag</h1>
      {lines.length === 0 ? (
        <div className="mt-10 max-w-md">
          <p className="text-stone">Nothing here yet. The purifier is a good place to start.</p>
          <Link to="/shop/aura-one" className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 text-paper">
            View AURA ONE
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {lines.map((line) => (
              <CartItem key={`${line.id}-${line.finish ?? ""}`} line={line} />
            ))}
          </div>
          <aside className="h-fit border border-line p-6 lg:col-span-5">
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="mono">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="mono">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt>Total</dt>
                <dd className="mono">{formatINR(subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="mt-6 flex min-h-11 items-center justify-center bg-ink text-paper">
              Continue to checkout
            </Link>
          </aside>
        </div>
      )}
      {extras.length ? (
        <section className="mt-20">
          <h2 className="type-title">Alongside</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {extras.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
