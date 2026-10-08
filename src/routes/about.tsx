import { createFileRoute } from "@tanstack/react-router";
import { Photo } from "@/components/media/Photo";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About AURA",
      "AURA is a fictional studio making a purifier you should not have to think about.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main id="main" data-nav="light">
      <section className="aura-wrap pt-32 pb-16">
        <h1 className="type-display max-w-4xl">We believe air should be something you never have to think about.</h1>
      </section>
      <section className="grid lg:grid-cols-2">
        <Photo src="/images/aura/plants.jpg" alt="AURA ONE among indoor plants" className="h-full min-h-80" />
        <Photo src="/images/aura/internal.jpg" alt="Cutaway of the filtration stack" className="h-full min-h-80 object-contain bg-sand/30" />
      </section>
      <section className="aura-wrap grid gap-16 py-20 md:grid-cols-2">
        <article>
          <h2 className="type-title">Why AURA</h2>
          <p className="mt-4 text-stone">
            Most purifiers shout. A light ring, a percentage, a weekly chart. We started from the opposite end: a heavy, quiet object that does the work and then recedes.
          </p>
        </article>
        <article>
          <h2 className="type-title">Our philosophy</h2>
          <p className="mt-4 text-stone">
            Measure carefully. Act early. Spend as little fan speed as the room will allow. If a feature needs a screen on the product, it probably belongs in the phone, or nowhere.
          </p>
        </article>
        <article>
          <h2 className="type-title">Engineering</h2>
          <p className="mt-4 text-stone">
            The studio, in this fiction, sits in Bengaluru. Acoustics and filtration are argued in the same room. The motor is isolated. The shell is thick because thin plastic rings.
          </p>
        </article>
        <article>
          <h2 className="type-title">Design</h2>
          <p className="mt-4 text-stone">
            Ceramic, a metal ring, a metal plinth. The silhouette should read as furniture before it reads as an appliance. Finishes are ceramic, graphite, and sand — not a rainbow of plastics.
          </p>
        </article>
        <article className="md:col-span-2">
          <h2 className="type-title">Sustainability</h2>
          <p className="mt-4 max-w-3xl text-stone">
            The tower is meant to stay. The filter is the consumable, and we would rather say that plainly than pretend a machine has no waste. Packaging is paper. The motor is serviceable. Take-back of spent filters is part of the concept, not a badge on the box. AURA itself is a fictional brand — these intentions are part of the story, not a corporate report.
          </p>
        </article>
      </section>
    </main>
  );
}
