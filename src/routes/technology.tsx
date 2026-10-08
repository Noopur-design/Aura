import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Photo } from "@/components/media/Photo";
import { AssemblyNotes } from "@/components/technology/AssemblyNotes";
import { pageMeta } from "@/lib/utils";

const Exploded = lazy(() => import("@/components/technology/ExplodedView"));

export const Route = createFileRoute("/technology")({
  head: () =>
    pageMeta(
      "Inside AURA — Technology",
      "How AURA ONE senses, filters, and stays quiet: airflow, sensors, acoustics, and power.",
    ),
  component: TechnologyPage,
});

const sensors = [
  ["PM2.5 / PM10", "Laser particle counter, sampled continuously"],
  ["VOC", "Metal-oxide sensor for volatile compounds"],
  ["CO₂", "NDIR module, used as a proxy for a full room"],
  ["Temperature", "Used to correct the other readings"],
  ["Humidity", "Used the same way, and shown on its own"],
];

function AssemblyPreview({ onLive }: { onLive: () => void }) {
  const [active, setActive] = useState("hepa");
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="relative min-h-[22rem] bg-charcoal lg:col-span-7">
        <Photo
          src="/images/aura/internal.jpg"
          alt="Cutaway of the fan, HEPA cylinder and carbon bed"
          sizes="(max-width: 1024px) 92vw, 50vw"
          className="absolute inset-0 object-contain"
        />
        <button type="button" className="absolute right-4 bottom-4 left-4 min-h-11 bg-paper px-4 text-ink" onClick={onLive}>
          Load interactive assembly
        </button>
      </div>
      <div className="lg:col-span-5">
        <AssemblyNotes active={active} onSelect={setActive} />
      </div>
    </div>
  );
}

function TechnologyPage() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) setLive(true);
  }, []);
  return (
    <main id="main">
      <section className="bg-ink pt-32 pb-16 text-paper" data-nav="dark">
        <div className="aura-wrap">
          <p className="eyebrow text-mist">Engineering</p>
          <h1 className="type-display mt-4 max-w-4xl">Inside AURA.</h1>
          <p className="mt-6 max-w-xl text-sand">
            A short machine. A sealed air path. A motor you should not hear from the pillow. These are concept drawings for a fictional product — precise on purpose, not a lab certificate.
          </p>
        </div>
      </section>
      <section className="bg-paper py-16 md:py-24" data-nav="light">
        <div className="aura-wrap">
          {live ? (
            <Suspense fallback={<div className="min-h-[24rem] bg-charcoal" />}>
              <Exploded />
            </Suspense>
          ) : (
            <AssemblyPreview onLive={() => setLive(true)} />
          )}
        </div>
      </section>
      <section className="border-t border-line py-16 md:py-24">
        <div className="aura-wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="type-title">Sensor architecture</h2>
            <p className="mt-4 text-stone">
              The array sits in the intake stream, not in a decorative port on the front. Corrections for heat and humidity happen before a number is trusted.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {sensors.map(([name, note]) => (
              <div key={name} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-medium">{name}</dt>
                <dd className="text-stone">{note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="border-t border-line py-16 md:py-24">
        <div className="aura-wrap grid gap-10 md:grid-cols-3">
          <article>
            <p className="mono text-stone">01</p>
            <h3 className="type-title mt-4">Filtration</h3>
            <p className="mt-3 text-stone">
              Pre-filter mesh, H13 HEPA with about 2.4 m² of media, then a carbon bed. CADR, as designed: 380 m³/h. Concept figure.
            </p>
          </article>
          <article>
            <p className="mono text-stone">02</p>
            <h3 className="type-title mt-4">Noise</h3>
            <p className="mt-3 text-stone">
              The motor is on rubber. The shell is heavy. Sleep is tuned to 24 dB at one meter. Boost reaches 52 dB and is not the point.
            </p>
          </article>
          <article>
            <p className="mono text-stone">03</p>
            <h3 className="type-title mt-4">Power</h3>
            <p className="mt-3 text-stone">
              Sleep sits near 6 W. A typical auto hour is about 18 W. Full power is 45 W — less than a bright lamp, and rarely held.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
