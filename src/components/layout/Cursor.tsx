import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!fine || reduce || !node) return;

    document.documentElement.classList.add("has-cursor");
    node.dataset.on = "true";
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const loop = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      node.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };
    const over = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const zone = target.closest("[data-cursor]");
      const kind = zone?.getAttribute("data-cursor") ?? "";
      node.dataset.label = kind === "view" ? "View" : kind === "drag" ? "Drag" : kind === "explore" ? "Explore" : "";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
      node.dataset.on = "false";
    };
  }, []);

  return <div ref={ref} className="aura-cursor" data-label="" aria-hidden="true" />;
}
