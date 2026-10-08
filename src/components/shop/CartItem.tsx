import { Photo } from "@/components/media/Photo";
import { Quantity } from "@/components/ui/Quantity";
import { useCart, type CartLine } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatINR } from "@/lib/utils";

export function CartItem({ line }: { line: CartLine }) {
  const product = getProduct(line.id);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  if (!product) return null;
  const finish = product.finishes?.find((item) => item.id === line.finish);
  const image = finish?.image ?? product.image;
  return (
    <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-line py-6 sm:grid-cols-[8rem_minmax(0,1fr)_auto]">
      <div className="bg-sand/40">
        <Photo src={image} alt="" className="aspect-square object-contain" />
      </div>
      <div>
        <h3>{product.name}</h3>
        <p className="mt-1 text-stone">{finish ? finish.name : product.tagline}</p>
        <div className="mt-4">
          <Quantity value={line.qty} onChange={(qty) => setQty(line.id, qty, line.finish)} />
        </div>
        <button type="button" className="mt-3 text-fine text-stone underline" onClick={() => remove(line.id, line.finish)}>
          Remove
        </button>
      </div>
      <p className="mono hidden sm:block">{formatINR(product.price * line.qty)}</p>
      <p className="mono col-span-2 sm:hidden">{formatINR(product.price * line.qty)}</p>
    </article>
  );
}
