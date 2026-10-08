import { useEffect } from "react";
import { registerLenis } from "@/lib/lenis-bridge";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    if (reduce || !desktop) return;
    let destroy = () => {};
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, gsapMod, scrollMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = scrollMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        respectReducedMotion: true,
      });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      registerLenis(lenis);
      destroy = () => {
        lenis.off("scroll", onScroll);
        lenis.destroy();
        registerLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  return null;
}
