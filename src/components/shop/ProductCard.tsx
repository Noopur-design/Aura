import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { formatINR } from "@/lib/utils";

export function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  const add = useCart((state) => state.add);
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);
  const frame = large ? "aspect-[4/5]" : "aspect-square";

  return (
    <article
      className="group flex h-full min-w-0 flex-col"
      data-cursor="view"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
    >
      <Link to={product.href} className="relative block overflow-hidden bg-sand/40">
        <Photo
          src={product.image}
          alt={product.name}
          sizes={large ? "(max-width: 768px) 92vw, 66vw" : "(max-width: 768px) 92vw, 30vw"}
          className={`object-contain transition-opacity duration-500 ${frame} ${hover ? "opacity-0" : ""}`}
        />
        {hover ? (
          <Photo
            src={product.hoverImage}
            alt=""
            sizes={large ? "(max-width: 768px) 92vw, 66vw" : "(max-width: 768px) 92vw, 30vw"}
            className={`absolute inset-0 object-contain ${frame}`}
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <h3 className="min-w-0 text-body">
            <Link to={product.href}>{product.name}</Link>
          </h3>
          <p className="mono shrink-0 text-label">{formatINR(product.price)}</p>
        </div>
        <p className="mt-2 text-stone">{product.tagline}</p>
        <p className="mt-1 text-fine text-stone">{product.availability}</p>
        <button
          type="button"
          className="mt-4 inline-flex min-h-11 items-center self-start text-label underline-offset-4 hover:underline"
          onClick={() => {
            add(product.id, 1, product.finishes?.[0]?.id);
            setAdded(true);
          }}
        >
          {added ? "Added" : "Quick add"}
        </button>
      </div>
    </article>
  );
}
