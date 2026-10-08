import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Photo } from "@/components/media/Photo";
import { ClientViewer } from "@/components/product/ClientViewer";
import { AirflowVisualization } from "@/components/technology/AirflowVisualization";
import { Button } from "@/components/ui/Button";
import { cn, formatINR } from "@/lib/utils";

const AirChart = lazy(() => import("@/components/home/AirChart"));

const angles = [
  { src: "/images/aura/angle.jpg", label: "A quiet object", copy: "Designed to disappear into your space." },
  { src: "/images/aura/dial.jpg", label: "One control", copy: "A metal ring. Everything else is decided for you." },
  { src: "/images/aura/front.jpg", label: "Ceramic", copy: "Matte, dense, and cool. Not a plastic shell." },
  { src: "/images/aura/side.jpg", label: "Proportion", copy: "310 millimeters across. Tall enough to work. Short enough to live with." },
];

const steps = [
  {
    n: "01",
    title: "Sense",
    copy: "Six sensors sample the room every few seconds — particles, gases, CO₂, heat, and humidity.",
    src: "/images/aura/sensor.jpg",
    alt: "Close view of the sensor band on AURA ONE",
  },
  {
    n: "02",
    title: "Understand",
    copy: "AURA keeps a pattern of your hours, so a brief spike from the kitchen is not treated like a closed bedroom.",
    src: "/images/aura/living.jpg",
    alt: "AURA ONE beside a sofa in a living room",
  },
  {
    n: "03",
    title: "Filter",
    copy: "Air passes a pre-filter, an H13 HEPA pleat, then a carbon bed. Particles, odors, volatile compounds.",
    src: "/images/aura/internal.jpg",
    alt: "Cutaway of the fan, HEPA cylinder and carbon bed",
  },
  {
    n: "04",
    title: "Adapt",
    copy: "Fan speed changes before the room feels different, then falls back toward 24 dB when it can.",
    src: "/images/aura/dial.jpg",
    alt: "Brushed metal control ring on AURA ONE",
  },
];

function Checkpoints({ index }: { index: number }) {
  return (
    <ol className="flex items-center" aria-label="How it works">
      {steps.map((step, i) => {
        const state = i < index ? "done" : i === index ? "load" : "wait";
        return (
          <li key={step.n} className="flex items-center">
            <span
              className="relative grid size-7 place-items-center"
              aria-current={state === "load" ? "step" : undefined}
              aria-label={state === "load" ? `${step.title}, loading` : state === "done" ? `${step.title}, complete` : step.title}
            >
              {state === "load" ? (
                <svg className="size-7 text-tide" viewBox="0 0 28 28" aria-hidden="true">
                  <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" className="text-line" strokeWidth="1.5" />
                  <circle
                    cx="14"
                    cy="14"
                    r="11"
                    fill="none"
                    stroke="currentColor"
                    className="checkpoint-draw"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="18 52"
                  />
                </svg>
              ) : (
                <span className={`block size-2.5 rounded-full ${state === "done" ? "bg-tide" : "border border-stone/40"}`} />
              )}
            </span>
            {i < steps.length - 1 ? (
              <span className="relative mx-1 h-px w-8 overflow-hidden bg-line sm:w-14" aria-hidden="true">
                <span className={`absolute inset-y-0 left-0 bg-tide transition-[width] duration-500 ${i < index ? "w-full" : "w-0"}`} />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

const benefits = [
  { title: "750 sq ft", copy: "Enough for a living room and the rooms that open onto it. Not a number borrowed from an empty lab." },
  { title: "Three layers", copy: "Pre-filter, H13 HEPA, activated carbon. The path is short, the media is deep." },
  { title: "Six readings", copy: "PM2.5, PM10, VOC, CO₂, temperature, humidity. One decision, not six apps." },
  { title: "24 dB", copy: "Sleep mode is quieter than a library. Boost exists. You will rarely need it overnight." },
  { title: "45 watts", copy: "Full power is less than a bright lamp. Most hours sit far below that." },
  { title: "Once a year", copy: "The filter set is the only routine. The ring wipes clean. There is no monthly cartridge." },
];

const rooms = [
  { id: "living", label: "Living room", src: "/images/aura/living.jpg", copy: "Beside the sofa, out of the conversation." },
  { id: "bedroom", label: "Bedroom", src: "/images/aura/bedroom.jpg", copy: "Close enough to matter. Quiet enough to forget." },
  { id: "work", label: "Workspace", src: "/images/aura/workspace.jpg", copy: "A long afternoon, with the window shut." },
];

const spark = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  pm: Math.round(14 + Math.sin(hour / 2.4) * 7 + (hour > 17 && hour < 21 ? 8 : 0)),
}));

function Readings() {
  const [values, setValues] = useState({ pm: 18, voc: 42, co2: 680, rh: 48, temp: 26 });
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setValues((current) => ({
        pm: Math.max(6, Math.min(40, current.pm + (Math.random() - 0.48) * 2)),
        voc: Math.max(20, Math.min(90, current.voc + (Math.random() - 0.5) * 3)),
        co2: Math.max(520, Math.min(980, current.co2 + (Math.random() - 0.5) * 12)),
        rh: Math.max(36, Math.min(62, current.rh + (Math.random() - 0.5))),
        temp: Math.max(23, Math.min(29, current.temp + (Math.random() - 0.5) * 0.15)),
      }));
    }, 1400);
    return () => window.clearInterval(id);
  }, []);
  const rows = [
    ["PM2.5", `${values.pm.toFixed(0)} µg/m³`],
    ["VOC", `${values.voc.toFixed(0)} index`],
    ["CO₂", `${values.co2.toFixed(0)} ppm`],
    ["Humidity", `${values.rh.toFixed(0)}%`],
    ["Temperature", `${values.temp.toFixed(1)}°C`],
  ];
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-baseline justify-between py-4">
          <dt className="eyebrow text-stone">{label}</dt>
          <dd className="mono text-body">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AngleStory() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      setIndex(Math.min(angles.length - 1, Math.floor(progress * angles.length)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const frame = angles[index] ?? angles[0];

  return (
    <section ref={ref} className="relative bg-paper lg:h-[280vh]" data-nav="light">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="aura-wrap grid items-center gap-10 py-24 lg:grid-cols-12 lg:py-0">
          <div className="lg:col-span-5">
            <div key={index} className="angle-swap">
              <p className="eyebrow text-stone">{frame?.label}</p>
              <h2 className="type-display mt-4">{frame?.copy}</h2>
            </div>
            <p className="mt-6 hidden text-stone lg:block">Scroll. The object turns with you.</p>
          </div>
          <div className="hidden lg:col-span-7 lg:block">
            <div className="relative mx-auto h-[78vh] w-full">
              {angles.map((item, i) => (
                <Photo
                  key={item.src}
                  src={item.src}
                  alt={item.label}
                  priority={i === 0}
                  className={cn(
                    "absolute inset-0 mx-auto h-full w-full object-contain transition-opacity duration-700 ease-out motion-reduce:transition-none",
                    i === index ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
          <div className="space-y-12 lg:hidden">
            {angles.map((item) => (
              <figure key={item.src}>
                <Photo src={item.src} alt={item.label} className="mx-auto h-auto max-h-[68vh] w-full object-contain" />
                <figcaption className="mt-4">
                  <p className="eyebrow text-stone">{item.label}</p>
                  <p className="mt-2 text-body">{item.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const [room, setRoom] = useState(rooms[0]?.id ?? "living");
  const scene = rooms.find((item) => item.id === room) ?? rooms[0];
  const [chart, setChart] = useState(false);
  const [wide, setWide] = useState(false);
  const chartBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = chartBox.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setChart(true);
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main">
      <section className="relative flex min-h-svh flex-col justify-end pb-16 pt-28 md:justify-center" data-nav="light">
        <div className="aura-wrap grid items-end gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="eyebrow reveal text-stone">AURA ONE</p>
            <h1 className="type-hero reveal mt-5" style={{ animationDelay: "80ms" }}>
              Clean air.
              <br />
              Quietly <em>intelligent.</em>
            </h1>
            <p className="reveal mt-6 max-w-md text-lead text-stone" style={{ animationDelay: "160ms" }}>
              A purifier that senses the room, filters what doesn’t belong, and settles back to a whisper.
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
              <Button to="/product" className="w-full sm:w-auto">
                Explore AURA ONE
              </Button>
              <Button to="/shop/aura-one" variant="secondary" className="w-full sm:w-auto">
                Buy now — {formatINR(34999)}
              </Button>
            </div>
          </div>
          <div className="relative md:col-span-6 lg:col-span-7" data-cursor="drag">
            {wide ? (
              <div className="h-[58vh] min-h-[22rem] lg:h-[70vh]">
                <ClientViewer autoRotate interactive background="transparent" cameraPosition={[0, 0.15, 4.6]} />
              </div>
            ) : (
              <div className="aura-float">
                <Photo
                  src="/images/aura/hero.jpg"
                  alt="AURA ONE air purifier in warm ceramic"
                  priority
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="mx-auto h-auto max-h-[58vh] w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
        <p className="eyebrow mt-10 text-center text-stone">Scroll to explore</p>
      </section>

      <section className="bg-paper py-24 md:py-32" data-nav="light">
        <div className="aura-wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="type-display">Your air changes. You don’t always notice.</h2>
            <p className="mt-6 max-w-md text-stone">
              Cooking, a closed window, rain, four people in one room. The numbers move all day. AURA is built for that drift, not for a single dramatic reading.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Readings />
          </div>
        </div>
      </section>

      <AngleStory />

      <section data-nav="light" className="border-t border-line">
        <HorizontalScroll>
          {steps.map((step, index) => (
            <article
              key={step.n}
              className="flex h-svh w-full flex-col overflow-hidden border-t border-line px-5 pb-8 sm:px-8 lg:w-screen lg:flex-row lg:items-center lg:gap-12 lg:border-t-0 lg:border-l lg:px-16 lg:py-0"
            >
              <div className="order-2 flex min-h-0 flex-1 flex-col justify-end lg:order-1 lg:max-w-xl lg:flex-none lg:justify-center">
                <p className="eyebrow text-stone">How it works</p>
                <div className="mt-5">
                  <Checkpoints index={index} />
                </div>
                <p className="mono mt-6 text-stone">{step.n}</p>
                <h3 className="type-display mt-2">{step.title}</h3>
                <p className="mt-3 max-w-md text-stone">{step.copy}</p>
              </div>
              <div className="order-1 flex h-[48%] shrink-0 items-end pt-24 lg:order-2 lg:h-auto lg:w-1/2 lg:items-center lg:pt-0">
                <Photo
                  src={step.src}
                  alt={step.alt}
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="mx-auto h-full max-h-[42vh] w-full object-contain lg:max-h-[72vh]"
                />
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28" data-nav="dark">
        <div className="aura-wrap">
          <AirflowVisualization />
        </div>
      </section>

      <section className="py-24 md:py-32" data-nav="light">
        <div className="aura-wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="type-display">It doesn’t just clean. It learns your environment.</h2>
            <p className="mt-6 max-w-md text-stone">
              Auto is not a single fan speed. Over a week, AURA notices when you cook, when you sleep, and when the room is already fine — and spends less effort on the hours that don’t need it.
            </p>
          </div>
          <div ref={chartBox} className="min-w-0 border border-line p-4 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="eyebrow text-stone">Indoor PM2.5 · today</p>
              <p className="mono">12 µg/m³</p>
            </div>
            <div className="mt-6 h-40">
              {chart ? (
                <Suspense fallback={<div className="h-full bg-sand/30" />}>
                  <AirChart data={spark} />
                </Suspense>
              ) : (
                <div className="h-full bg-sand/30" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center" data-nav="light">
        <p className="type-hero">24 dB.</p>
        <p className="mt-6 text-lead text-stone">Quiet enough to disappear.</p>
        <div className="mt-12 flex h-16 items-center gap-1" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={index}
              className="w-px origin-center bg-ink/70"
              style={{
                height: `${12 + Math.sin(index / 2) * 10 + (index % 5)}px`,
                animation: `aura-float ${3 + (index % 4)}s ease-in-out ${index * 40}ms infinite`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="relative min-h-svh" data-nav="light">
        {scene ? (
          <Photo src={scene.src} alt={scene.label} sizes="100vw" className="absolute inset-0 h-full" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/15" />
        <div className="aura-wrap relative flex min-h-svh flex-col justify-end pb-10 text-paper">
          <p className="type-display max-w-xl">{scene?.copy}</p>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Rooms">
            {rooms.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={room === item.id}
                className={`min-h-11 px-4 text-label ${room === item.id ? "bg-paper text-ink" : "border border-paper/40 text-paper"}`}
                onClick={() => setRoom(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint py-20 md:py-32" data-nav="light">
        <div className="aura-wrap">
          <h2 className="type-display max-w-3xl">What you actually live with.</h2>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 40} className="bg-paper p-8">
                <h3 className="type-title">{benefit.title}</h3>
                <p className="mt-4 text-stone">{benefit.copy}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28" data-nav="light">
        <div className="aura-wrap grid items-center gap-10 lg:grid-cols-2">
          <Photo
            src="/images/aura/hero.jpg"
            alt="AURA ONE"
            sizes="(max-width: 1024px) 92vw, 40vw"
            className="mx-auto h-auto max-h-[32rem] w-full object-contain sm:max-h-[40rem]"
          />
          <div>
            <p className="eyebrow text-stone">AURA ONE</p>
            <p className="type-display mt-4">{formatINR(34999)}</p>
            <p className="mt-4 max-w-md text-stone">Ceramic, graphite, or sand. The filter is already inside.</p>
            <Button to="/shop/aura-one" variant="buy" className="mt-8">
              Buy AURA ONE
            </Button>
          </div>
        </div>
      </section>

      <section className="defer-paint bg-charcoal py-20 text-paper md:py-32" data-nav="dark">
        <div className="aura-wrap">
          <h2 className="type-display max-w-3xl">Breathe better, every day.</h2>
          <Button to="/product" variant="paper" className="mt-8">
            Explore AURA ONE
          </Button>
        </div>
      </section>
    </main>
  );
}
