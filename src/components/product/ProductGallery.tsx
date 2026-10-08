import { useState } from "react";
import { Photo } from "@/components/media/Photo";

const frames = [
  { src: "/images/aura/hero.jpg", alt: "AURA ONE, three-quarter view in ceramic" },
  { src: "/images/aura/front.jpg", alt: "AURA ONE, front view" },
  { src: "/images/aura/side.jpg", alt: "AURA ONE, side view" },
  { src: "/images/aura/back.jpg", alt: "AURA ONE, rear intake" },
  { src: "/images/aura/top.jpg", alt: "Radial outlet from above" },
  { src: "/images/aura/dial.jpg", alt: "Macro of the brushed control ring" },
  { src: "/images/aura/internal.jpg", alt: "Cutaway showing fan, HEPA and carbon" },
  { src: "/images/aura/living.jpg", alt: "AURA ONE beside a linen sofa" },
];

export function ProductGallery({ image }: { image?: string }) {
  const list = image ? [{ src: image, alt: "Selected finish" }, ...frames.filter((frame) => frame.src !== image)] : frames;
  const [index, setIndex] = useState(0);
  const current = list[index] ?? list[0];

  return (
    <div>
      <div className="overflow-hidden bg-sand/30" data-cursor="explore">
        {current ? (
          <Photo
            src={current.src}
            alt={current.alt}
            priority={index === 0}
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="aspect-[3/4] h-auto max-h-[70vh] object-contain"
          />
        ) : null}
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="listbox" aria-label="Product images">
        {list.slice(0, 8).map((frame, frameIndex) => (
          <button
            key={frame.src}
            type="button"
            role="option"
            aria-selected={frameIndex === index}
            className={`size-[4.5rem] shrink-0 overflow-hidden border sm:size-20 ${frameIndex === index ? "border-ink" : "border-transparent"}`}
            onClick={() => setIndex(frameIndex)}
          >
            <Photo src={frame.src} alt="" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
