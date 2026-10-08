import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/specifications")({
  head: () =>
    pageMeta(
      "AURA ONE specifications",
      "Dimensions, noise, power, sensors, filtration, and warranty for AURA ONE. Concept figures for a fictional product.",
    ),
  component: SpecsPage,
});

const groups = [
  {
    title: "Dimensions",
    rows: [
      ["Height", "560 mm"],
      ["Width", "310 mm"],
      ["Depth", "310 mm"],
      ["Weight", "7.8 kg"],
    ],
  },
  {
    title: "Coverage",
    rows: [
      ["Room size", "750 sq ft · about 70 m²"],
      ["CADR", "380 m³/h · concept"],
    ],
  },
  {
    title: "Noise",
    rows: [
      ["Sleep", "24 dB"],
      ["Auto, typical", "28–40 dB"],
      ["Boost", "52 dB"],
    ],
  },
  {
    title: "Power",
    rows: [
      ["Sleep", "6 W"],
      ["Auto", "about 18 W"],
      ["Maximum", "45 W"],
      ["Supply", "220–240 V"],
    ],
  },
  {
    title: "Connectivity",
    rows: [
      ["Wireless", "Wi-Fi"],
      ["Local", "Bluetooth"],
      ["App", "iOS and Android"],
    ],
  },
  {
    title: "Sensors",
    rows: [
      ["Particles", "PM2.5, PM10"],
      ["Gases", "VOC, CO₂"],
      ["Climate", "Temperature, humidity"],
    ],
  },
  {
    title: "Filtration",
    rows: [
      ["Stage 1", "Pre-filter mesh"],
      ["Stage 2", "H13 HEPA"],
      ["Stage 3", "Activated carbon"],
      ["Filter life", "Up to 12 months"],
    ],
  },
  {
    title: "Warranty",
    rows: [
      ["Tower", "2 years"],
      ["Filters", "Defects on arrival"],
    ],
  },
];

function SpecsPage() {
  return (
    <main id="main" className="pt-28 pb-24" data-nav="light">
      <div className="aura-wrap">
        <p className="eyebrow text-stone">AURA ONE</p>
        <h1 className="type-display mt-4">Specifications</h1>
        <p className="mt-4 max-w-xl text-stone">
          Illustrative figures for a fictional product. Not a certified test report.
        </p>
        <div className="mt-12 grid items-center gap-10 border-y border-line py-10 lg:grid-cols-2">
          <svg viewBox="0 0 420 560" className="mx-auto w-full max-w-sm text-ink" role="img" aria-label="Dimension drawing, 310 by 560 millimeters">
            <rect x="110" y="40" width="180" height="460" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="96" y="470" width="208" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <line x1="70" y1="40" x2="70" y2="500" stroke="currentColor" strokeWidth="1" />
            <line x1="96" y1="530" x2="304" y2="530" stroke="currentColor" strokeWidth="1" />
            <text x="48" y="270" className="fill-current" fontSize="14" transform="rotate(-90 48 270)">
              560 mm
            </text>
            <text x="160" y="552" fontSize="14" className="fill-current">
              310 mm
            </text>
          </svg>
          <p className="max-w-md text-stone">
            A square footprint so it sits in a corner without a “front.” The plinth is the widest part. The cap is the outlet.
          </p>
        </div>
        <div className="mt-4 divide-y divide-line">
          {groups.map((group) => (
            <section key={group.title} className="grid gap-6 py-10 md:grid-cols-12">
              <h2 className="type-title md:col-span-4">{group.title}</h2>
              <dl className="md:col-span-8">
                {group.rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 border-b border-line py-3 sm:gap-4">
                    <dt className="text-stone">{label}</dt>
                    <dd className="mono text-right break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <a href="/aura-one-technical-sheet.txt" download className="mt-8 inline-flex min-h-11 items-center border border-ink px-5">
          Download technical sheet
        </a>
      </div>
    </main>
  );
}
