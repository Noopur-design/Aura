import { useEffect, useRef, type ReactNode } from "react";

export function HorizontalScroll({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;
    let revert = () => {};
    let cancelled = false;

    void (async () => {
      const gsapMod = await import("gsap");
      const scrollMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const { ScrollTrigger } = scrollMod;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(trackEl, {
          x: () => -(trackEl.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: wrapEl,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${trackEl.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={wrap} className="overflow-hidden">
      <div ref={track} className="flex flex-col lg:w-max lg:flex-row">
        {children}
      </div>
    </div>
  );
}
