import { useState } from "react";
import { Photo } from "@/components/media/Photo";

const spots = [
  {
    id: "ring",
    label: "Control ring",
    x: "58%",
    y: "32%",
    copy: "Turn for manual speed. Press to move between Sleep, Auto, and Boost. Nothing else is asking for your attention.",
  },
  {
    id: "shell",
    label: "Ceramic body",
    x: "46%",
    y: "58%",
    copy: "The shell is a mineral composite with a soft matte. It stays cool, hides fingerprints, and keeps motor vibration in the metal, not the room.",
  },
  {
    id: "base",
    label: "Intake",
    x: "50%",
    y: "88%",
    copy: "Air enters under the plinth. You don’t see a grille from across the room, and dust collects where it is easy to wipe.",
  },
  {
    id: "top",
    label: "Outlet",
    x: "50%",
    y: "16%",
    copy: "A radial pattern, flush with the cap. The air leaves upward and outward, not as a jet aimed at the sofa.",
  },
];

export function ProductHotspots({ src = "/images/aura/hero.jpg" }: { src?: string }) {
  const [active, setActive] = useState<string | null>("ring");
  const spot = spots.find((item) => item.id === active) ?? spots[0];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12">
      <div className="relative lg:col-span-7" data-cursor="view">
        <Photo src={src} alt="AURA ONE with callouts for the ring, shell, intake and outlet" priority />
        {spots.map((item) => (
          <button
            key={item.id}
            type="button"
            className="absolute size-11 -translate-x-1/2 -translate-y-1/2"
            style={{ left: item.x, top: item.y }}
            aria-pressed={active === item.id}
            aria-label={item.label}
            onClick={() => setActive(item.id)}
          >
            <span className={`mx-auto block size-3 rounded-full border ${active === item.id ? "border-ink bg-ink" : "border-ink bg-paper"}`} />
          </button>
        ))}
      </div>
      <aside className="lg:col-span-5">
        <p className="eyebrow text-stone">Detail</p>
        <h3 className="type-title mt-3">{spot?.label}</h3>
        <p className="mt-4 max-w-md text-stone">{spot?.copy}</p>
      </aside>
    </div>
  );
}
