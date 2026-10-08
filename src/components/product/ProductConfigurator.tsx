import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { Quantity } from "@/components/ui/Quantity";
import { useCart } from "@/lib/cart";
import { finishes } from "@/lib/products";
import { cn, formatINR } from "@/lib/utils";

export function ProductConfigurator({
  price = 34999,
  onFinish,
}: {
  price?: number;
  onFinish?: (id: string) => void;
}) {
  const [finish, setFinish] = useState(finishes[0]?.id ?? "ceramic");
  const [qty, setQty] = useState(1);
  const add = useCart((state) => state.add);
  const navigate = useNavigate();
  const selected = finishes.find((item) => item.id === finish);

  function choose(id: string) {
    setFinish(id);
    onFinish?.(id);
  }

  return (
    <div>
      <p className="mono text-title">{formatINR(price)}</p>
      <p className="mt-2 text-stone">Free delivery across India · Ships in 3–5 days</p>
      <fieldset className="mt-8">
        <legend className="eyebrow text-stone">Finish · {selected?.name}</legend>
        <div className="mt-3 flex gap-3">
          {finishes.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              aria-pressed={finish === item.id}
              onClick={() => choose(item.id)}
              className={cn("size-11 border", item.swatch, finish === item.id ? "border-ink" : "border-line")}
            />
          ))}
        </div>
      </fieldset>
      <div className="mt-8">
        <p className="eyebrow text-stone">Quantity</p>
        <div className="mt-3">
          <Quantity value={qty} onChange={setQty} />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="buy"
          className="flex-1"
          onClick={() => add("aura-one", qty, finish)}
        >
          Add to bag
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            add("aura-one", qty, finish);
            void navigate({ to: "/checkout" });
          }}
        >
          Buy now
        </Button>
      </div>
      <p className="mt-4 text-fine text-stone">Concept product. No payment is processed on this preview.</p>
    </div>
  );
}
