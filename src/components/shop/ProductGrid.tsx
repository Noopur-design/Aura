import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  const [lead, ...rest] = products;
  if (!lead) return null;
  return (
    <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2">
        <ProductCard product={lead} large />
      </div>
      {rest.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
