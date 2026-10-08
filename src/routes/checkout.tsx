import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Field } from "@/components/ui/Input";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatINR, pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => pageMeta("Checkout — AURA", "A demonstration checkout. No payment is taken."),
  component: CheckoutPage,
});

const steps = ["Contact", "Shipping", "Payment", "Confirmation"] as const;

function CheckoutPage() {
  const lines = useCart((state) => state.lines);
  const clear = useCart((state) => state.clear);
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<string | null>(null);
  const [error, setError] = useState("");
  const subtotal = lines.reduce((sum, line) => sum + (getProduct(line.id)?.price ?? 0) * line.qty, 0);

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (step === 0) {
      const email = String(data.get("email") ?? "");
      if (!email.includes("@")) {
        setError("Add a real-looking email to continue.");
        return;
      }
    }
    if (step === 1) {
      const city = String(data.get("city") ?? "").trim();
      const pin = String(data.get("pin") ?? "").trim();
      if (city.length < 2 || pin.length < 6) {
        setError("City and a 6-digit PIN are required.");
        return;
      }
    }
    if (step === 2) {
      const card = String(data.get("card") ?? "").replace(/\s/g, "");
      const expiry = String(data.get("expiry") ?? "");
      const cvc = String(data.get("cvc") ?? "");
      if (card.length < 12 || !expiry.includes("/") || cvc.length < 3) {
        setError("Check the card fields. This is a demonstration — use any plausible numbers. They are not stored.");
        return;
      }
      const id = `AURA-${Date.now().toString().slice(-6)}`;
      setOrder(id);
      clear();
    }
    setError("");
    setStep((value) => Math.min(3, value + 1));
  }

  return (
    <main id="main" className="aura-wrap grid gap-12 pt-32 pb-24 lg:grid-cols-12" data-nav="light">
      <div className="lg:col-span-7">
        <p className="eyebrow text-stone">Checkout</p>
        <ol className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-fine sm:flex sm:flex-wrap sm:gap-4 sm:text-body">
          {steps.map((label, index) => (
            <li key={label} className={index === step ? "text-ink" : "text-stone"} aria-current={index === step ? "step" : undefined}>
              0{index + 1} {label}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-lg text-stone">Demonstration only. No payment is processed and card numbers are discarded with the page.</p>
        {lines.length === 0 && step < 3 ? (
          <p className="mt-10">
            Your bag is empty. <Link to="/shop" className="underline">Return to the shop.</Link>
          </p>
        ) : null}
        {step < 3 && lines.length > 0 ? (
          <form onSubmit={next} className="mt-10 max-w-lg space-y-8" key={step}>
            {step === 0 ? (
              <>
                <Field label="Email" name="email" type="email" autoComplete="email" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              </>
            ) : null}
            {step === 1 ? (
              <>
                <Field label="Full name" name="name" autoComplete="name" required />
                <Field label="Address" name="address" autoComplete="street-address" required />
                <Field label="City" name="city" autoComplete="address-level2" required />
                <Field label="PIN code" name="pin" inputMode="numeric" autoComplete="postal-code" required />
              </>
            ) : null}
            {step === 2 ? (
              <>
                <Field label="Name on card" name="cardname" autoComplete="cc-name" required />
                <Field label="Card number" name="card" inputMode="numeric" autoComplete="off" required />
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Expiry" name="expiry" placeholder="MM/YY" autoComplete="off" required />
                  <Field label="CVC" name="cvc" inputMode="numeric" autoComplete="off" required />
                </div>
              </>
            ) : null}
            {error ? <p className="text-danger">{error}</p> : null}
            <button type="submit" className="min-h-11 bg-ink px-5 text-paper">
              {step === 2 ? "Place demonstration order" : "Continue"}
            </button>
          </form>
        ) : null}
        {step === 3 && order ? (
          <div className="mt-10" role="status">
            <h1 className="type-display">You’re confirmed.</h1>
            <p className="mt-4 text-stone">Order {order}. Nothing was charged. In this fiction, it would leave the studio in 3–5 days.</p>
            <Link to="/" className="mt-8 inline-flex min-h-11 items-center underline">
              Back to AURA
            </Link>
          </div>
        ) : null}
      </div>
      <aside className="order-first h-fit border border-line p-5 sm:p-6 lg:order-none lg:col-span-5">
        <h2 className="eyebrow text-stone">Order</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((line) => {
            const product = getProduct(line.id);
            if (!product) return null;
            return (
              <li key={`${line.id}${line.finish ?? ""}`} className="flex justify-between gap-4">
                <span>
                  {product.name} × {line.qty}
                  {line.finish ? <span className="block text-fine text-stone">{line.finish}</span> : null}
                </span>
                <span className="mono">{formatINR(product.price * line.qty)}</span>
              </li>
            );
          })}
        </ul>
        <p className="mono mt-6 border-t border-line pt-4">{formatINR(subtotal)}</p>
      </aside>
    </main>
  );
}
