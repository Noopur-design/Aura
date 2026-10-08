import { useEffect, useRef } from "react";

const stages = ["Dirty air", "Pre-filter", "H13 HEPA", "Activated carbon", "Clean air"];

export function AirflowVisualization() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const particles = Array.from({ length: 70 }, () => ({
      y: Math.random(),
      x: 0.35 + Math.random() * 0.3,
      v: 0.0015 + Math.random() * 0.0025,
      r: 1 + Math.random() * 1.6,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      const w = rect.width;
      const h = rect.height;
      ctx.fillStyle = "rgba(244,242,237,0.04)";
      ctx.fillRect(w * 0.34, h * 0.06, w * 0.32, h * 0.88);
      particles.forEach((particle) => {
        if (!reduce) particle.y += particle.v;
        if (particle.y > 0.96) particle.y = 0.04;
        const clean = particle.y > 0.72;
        ctx.beginPath();
        ctx.fillStyle = clean ? "rgba(168,199,199,0.9)" : "rgba(170,166,157,0.75)";
        ctx.arc(particle.x * w, particle.y * h, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12">
      <div className="relative min-w-0 lg:col-span-7">
        <canvas ref={ref} className="h-[22rem] w-full min-w-0 sm:h-[28rem] md:h-[40rem]" aria-hidden="true" />
        <ol className="mt-4 flex gap-x-4 gap-y-2 overflow-x-auto text-fine text-paper/80 lg:pointer-events-none lg:absolute lg:inset-y-8 lg:right-[14%] lg:mt-0 lg:flex-col lg:justify-between lg:overflow-visible">
          {stages.map((stage) => (
            <li key={stage} className="eyebrow">
              {stage}
            </li>
          ))}
        </ol>
      </div>
      <div className="min-w-0 lg:col-span-5">
        <p className="eyebrow text-mist">Air path</p>
        <h2 className="type-display mt-4">In at the base. Out at the crown.</h2>
        <p className="mt-6 max-w-md text-sand">
          Room air enters under the metal plinth, slows through a pre-filter, then a deep H13 pleat and a carbon bed.
          What leaves the radial grille is the same air, with less of what you would rather not breathe.
        </p>
      </div>
    </div>
  );
}
