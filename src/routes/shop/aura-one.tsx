import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AccordionList } from "@/components/ui/Accordion";
import { finishes } from "@/lib/products";
import { formatINR, pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/shop/aura-one")({
  head: () =>
    pageMeta(
      "Buy AURA ONE — ₹34,999",
      "AURA ONE in ceramic, graphite, or sand. Concept price ₹34,999, free delivery across India in this preview.",
    ),
  component: Pdp,
});

const reviews = [
  { name: "Meera S.", city: "Bengaluru", copy: "I stopped checking the app after the first week. The bedroom is simply less stale in the morning." },
  { name: "Arjun P.", city: "Mumbai", copy: "The ring is the right amount of control. I was afraid of another glowing puck." },
  { name: "Leela N.", city: "Delhi", copy: "Noticeable when the windows are shut for a dusty afternoon. Invisible at night, which was the test." },
];

function Pdp() {
  const [finish, setFinish] = useState("ceramic");
  const image = finishes.find((item) => item.id === finish)?.image;

  return (
    <main id="main" className="pt-24 pb-28 lg:pb-0" data-nav="light">
      <div className="aura-wrap grid gap-10 pb-16 lg:grid-cols-12 lg:pt-8">
        <div className="min-w-0 lg:col-span-7">
          <ProductGallery image={image} />
        </div>
        <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <p className="eyebrow text-stone">AURA ONE</p>
          <h1 className="type-title mt-3">AI-powered smart air purifier</h1>
          <div className="mt-6">
            <ProductConfigurator onFinish={setFinish} />
          </div>
        </div>
      </div>
      <section className="border-t border-line py-16">
        <div className="aura-wrap grid gap-10 lg:grid-cols-2">
          <h2 className="type-title">Overview</h2>
          <div className="space-y-4 text-stone">
            <p>
              Three layers of filtration remove particles, odors, and volatile compounds while AURA continuously adapts airflow to the room.
            </p>
            <p>Coverage 750 sq ft. Noise 24–52 dB. Power up to 45 W. Filter life up to 12 months. Warranty 2 years.</p>
            <p>These are concept specifications for a fictional product.</p>
          </div>
        </div>
      </section>
      <section className="border-t border-line">
        <div className="aura-wrap max-w-3xl py-8">
          <AccordionList
            items={[
              { q: "What’s included", a: "AURA ONE with a pre-installed HEPA and carbon set, a two-meter power cable, and a short paper guide." },
              { q: "Shipping", a: "Free across India in this concept shop. Dispatch in 3–5 days. Metro delivery is usually next-day once it ships." },
              { q: "Warranty", a: "Two years on the tower. Filters are consumable and covered against defects on arrival, not against ordinary use." },
              { q: "Reviews", a: reviews.map((review) => `${review.name}, ${review.city}: ${review.copy}`).join(" ") },
            ]}
          />
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-paper px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <p className="mono">{formatINR(34999)}</p>
        <a href="#main" className="inline-flex min-h-11 shrink-0 items-center bg-ink px-4 text-paper">
          Choose finish
        </a>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "AURA ONE",
            brand: "AURA",
            description: "Fictional AI-powered smart air purifier.",
            offers: { "@type": "Offer", priceCurrency: "INR", price: "34999", availability: "https://schema.org/InStock" },
          }),
        }}
      />
    </main>
  );
}
