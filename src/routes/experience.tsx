import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { pageMeta } from "@/lib/utils";

const modes = [
  {
    id: "morning",
    kicker: "Morning",
    title: "Automatic purification.",
    copy: "The night has pooled in a closed room. Auto clears it before coffee, then eases off once the numbers settle.",
    noise: "32 dB",
    speed: "38%",
    image: "/images/aura/living.jpg",
  },
  {
    id: "work",
    kicker: "Work",
    title: "Balanced airflow.",
    copy: "A shut window and a long call. AURA holds a steady middle speed so the room doesn’t go stale by four.",
    noise: "36 dB",
    speed: "46%",
    image: "/images/aura/workspace.jpg",
  },
  {
    id: "evening",
    kicker: "Evening",
    title: "Quiet operation.",
    copy: "Cooking is over. People are talking. The fan drops so the machine is not the third voice.",
    noise: "28 dB",
    speed: "22%",
    image: "/images/aura/plants.jpg",
  },
  {
    id: "sleep",
    kicker: "Sleep",
    title: "24 dB night mode.",
    copy: "The lowest curve. Sensors stay awake. The fan only rises if the room actually asks.",
    noise: "24 dB",
    speed: "12%",
    image: "/images/aura/bedroom.jpg",
  },
];

export const Route = createFileRoute("/experience")({
  head: () =>
    pageMeta(
      "Experience — Air that works around you",
      "Morning, work, evening, and sleep. AURA ONE changes speed so you don’t have to manage it.",
    ),
  component: ExperiencePage,
});

function ExperiencePage() {
  const [id, setId] = useState(modes[0]?.id ?? "morning");
  const mode = modes.find((item) => item.id === id) ?? modes[0];
  return (
    <main id="main">
      <section className="relative min-h-svh" data-nav="dark">
        {mode ? <Photo src={mode.image} alt="" sizes="100vw" className="absolute inset-0 h-full" priority /> : null}
        <div className="absolute inset-0 bg-ink/35" />
        <div className="aura-wrap relative flex min-h-svh flex-col justify-end pb-12 text-paper">
          <p className="eyebrow">A day with AURA</p>
          <h1 className="type-display mt-4 max-w-3xl">Air that works around you.</h1>
        </div>
      </section>
      <section className="bg-paper py-16 md:py-24" data-nav="light">
        <div className="aura-wrap grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-4" role="tablist" aria-label="Modes">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={id === item.id}
                className={`min-h-14 border-b border-line px-1 text-left ${id === item.id ? "text-ink" : "text-stone"}`}
                onClick={() => setId(item.id)}
              >
                <span className="eyebrow">{item.kicker}</span>
              </button>
            ))}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="type-display">{mode?.title}</h2>
            <p className="mt-6 max-w-xl text-lead text-stone">{mode?.copy}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="eyebrow text-stone">Noise</dt>
                <dd className="mono mt-2 type-title">{mode?.noise}</dd>
              </div>
              <div>
                <dt className="eyebrow text-stone">Fan</dt>
                <dd className="mono mt-2 type-title">{mode?.speed}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
