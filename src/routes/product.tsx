import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { ClientViewer } from "@/components/product/ClientViewer";
import { ProductHotspots } from "@/components/product/ProductHotspots";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/product")({
  head: () =>
    pageMeta(
      "AURA ONE — The product",
      "Meet AURA ONE. A ceramic air purifier with a single control ring, six sensors, and a filter you replace once a year.",
    ),
  component: ProductPage,
});

const studies = [
  {
    title: "Design",
    copy: "A cylinder, slightly tapered, with one metal line. No display on the body. The room should not have to look at a product that is looking back.",
    image: "/images/aura/angle.jpg",
    alt: "Three-quarter view of AURA ONE",
  },
  {
    title: "Materials",
    copy: "The shell is a mineral-filled ceramic composite. The ring and plinth are brushed metal. The filter media is the only soft surface, and it stays inside.",
    image: "/images/aura/dial.jpg",
    alt: "Close view of the brushed metal control ring",
  },
  {
    title: "Controls",
    copy: "Turn the ring for a manual speed. Press it to step through Sleep, Auto, and Boost. The aqua point confirms the press. That is the entire interface.",
    image: "/images/aura/front.jpg",
    alt: "Front of AURA ONE",
  },
  {
    title: "Sensors",
    copy: "A flush band reads PM2.5, PM10, VOC, CO₂, temperature, and humidity. The openings are small enough to disappear at arm’s length.",
    image: "/images/aura/sensor.jpg",
    alt: "Macro of the sensor band",
  },
];

export function ProductPage() {
  const [split, setSplit] = useState(56);

  return (
    <main id="main">
      <section className="aura-wrap grid min-h-svh items-center gap-10 pt-28 pb-16 lg:grid-cols-12" data-nav="light">
        <div className="lg:col-span-5">
          <p className="eyebrow text-stone">AURA ONE</p>
          <h1 className="type-display mt-4">Meet AURA ONE.</h1>
          <p className="mt-6 max-w-md text-stone">
            A tower for rooms up to 750 square feet. It filters, then it waits. Most of what it does should be difficult to notice.
          </p>
        </div>
        <div className="h-[46vh] min-h-[16rem] sm:h-[58vh] lg:col-span-7 lg:h-[70vh]">
          <ClientViewer interactive showHotspots autoRotate background="paper" />
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="aura-wrap">
          <p className="eyebrow text-stone">On the object</p>
          <h2 className="type-display mt-4 max-w-3xl">Touch the points. The rest can stay quiet.</h2>
          <div className="mt-12">
            <ProductHotspots />
          </div>
        </div>
      </section>

      {studies.map((study, index) => (
        <section key={study.title} className="border-t border-line py-16 md:py-24" data-nav="light">
          <div className={`aura-wrap grid items-center gap-10 lg:grid-cols-2 ${index % 2 ? "" : ""}`}>
            <div className={index % 2 ? "lg:order-2" : ""}>
              <h2 className="type-title">{study.title}</h2>
              <p className="mt-4 max-w-md text-stone">{study.copy}</p>
            </div>
            <Photo src={study.image} alt={study.alt} sizes="(max-width: 1024px) 92vw, 46vw" className="mx-auto h-auto max-h-[28rem] w-full object-contain md:max-h-[36rem]" />
          </div>
        </section>
      ))}

      <section className="border-t border-line py-16 md:py-24">
        <div className="aura-wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="type-title">Airflow</h2>
            <p className="mt-4 max-w-md text-stone">
              Intake under the plinth, a sealed rise through the filters, outlet at the crown. The fan never faces the room.
            </p>
          </div>
          <Photo src="/images/aura/internal.jpg" alt="Cutaway of the fan, HEPA cylinder and carbon bed" className="object-contain" />
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="aura-wrap grid items-center gap-10 lg:grid-cols-2">
          <Photo src="/images/aura/replace.jpg" alt="Replacing the filter from the top of AURA ONE" className="object-cover" />
          <div>
            <h2 className="type-title">Maintenance</h2>
            <p className="mt-4 max-w-md text-stone">
              Lift the cap. Slide the cylinder out. Slide the new one in. In ordinary homes that is a yearly gesture, not a subscription.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="aura-wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="type-title">The room, with and without the window shut.</h2>
            <p className="mt-4 text-stone">Drag the line. The photograph is the same. The haze is what AURA is for.</p>
          </div>
          <div className="relative aspect-video overflow-hidden" data-cursor="drag">
            <Photo src="/images/aura/living.jpg" alt="Living room with AURA ONE" className="absolute inset-0" />
            <div className="absolute inset-0 bg-stone/40" style={{ width: `${split}%` }} />
            <input
              type="range"
              min={8}
              max={92}
              value={split}
              aria-label="Compare haze"
              onChange={(event) => setSplit(Number(event.target.value))}
              className="absolute inset-x-4 bottom-2 h-11 w-auto accent-ink sm:inset-x-0 sm:mx-auto sm:w-2/3"
            />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-paper" data-nav="dark">
        <div className="aura-wrap grid gap-8 md:grid-cols-3">
          {[
            ["Auto", "Learns the shape of your day and spends less power when the room is already clean."],
            ["Schedules", "Sleep at ten. A short clear before you wake. Nothing in between unless the sensors disagree."],
            ["The app", "Readings, history, filter life. The tower itself stays free of a screen."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3 className="type-title">{title}</h3>
              <p className="mt-3 text-sand">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "AURA ONE",
            description: "Concept AI-powered smart air purifier. Fictional product.",
            brand: { "@type": "Brand", name: "AURA" },
            image: "/images/aura/hero.jpg",
            offers: { "@type": "Offer", priceCurrency: "INR", price: "34999", availability: "https://schema.org/InStock" },
          }),
        }}
      />
    </main>
  );
}
