import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AccordionList } from "@/components/ui/Accordion";
import { pageMeta } from "@/lib/utils";

const faqs = [
  { cat: "Getting started", q: "Where should AURA ONE stand?", a: "A little away from corners and curtains, on a hard floor. The intake is under the plinth and needs a few centimeters of air." },
  { cat: "Installation", q: "Does it need a technician?", a: "No. Unbox, place, plug in, and open the app if you want an account of the room. The filter is already fitted." },
  { cat: "Filters", q: "How do I replace the filter?", a: "Lift the cap, draw the cylinder straight up, and lower the new set in the same orientation. The app shows remaining life." },
  { cat: "App", q: "Will it run without the app?", a: "Yes. The ring covers Sleep, Auto, and Boost. The app is for history, schedules, and filter life." },
  { cat: "Troubleshooting", q: "The aqua point is blinking.", a: "A slow blink means the filter is due. A fast blink means the cap is not seated. If it stays fast with the cap down, contact support." },
  { cat: "Warranty", q: "What does the warranty cover?", a: "Two years on the tower against manufacturing faults. Filters wear out and are not part of that promise." },
  { cat: "Shipping", q: "How long does delivery take?", a: "In this concept shop, dispatch is 3–5 days inside India, with free delivery." },
];

const categories = ["Getting started", "Installation", "Filters", "App", "Troubleshooting", "Warranty", "Shipping"];

export const Route = createFileRoute("/support")({
  head: () => pageMeta("Support — AURA", "Setup, filters, the app, warranty, and shipping for AURA ONE."),
  component: SupportPage,
});

function SupportPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const items = useMemo(() => {
    return faqs.filter((item) => {
      const inCat = cat ? item.cat === cat : true;
      const q = query.trim().toLowerCase();
      const inQuery = q ? `${item.q} ${item.a} ${item.cat}`.toLowerCase().includes(q) : true;
      return inCat && inQuery;
    });
  }, [query, cat]);

  return (
    <main id="main" className="aura-wrap pt-32 pb-24" data-nav="light">
      <h1 className="type-display">How can we help?</h1>
      <label className="mt-8 block max-w-xl">
        <span className="sr-only">Search support</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search filters, blinking light, delivery…"
          className="w-full border-b border-ink bg-transparent py-3 text-body outline-none placeholder:text-stone"
        />
      </label>
      <div className="mt-10 flex flex-wrap gap-2">
        <button type="button" className={`min-h-11 px-3 ${cat === null ? "bg-ink text-paper" : "border border-line"}`} onClick={() => setCat(null)}>
          All
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`min-h-11 px-3 ${cat === item ? "bg-ink text-paper" : "border border-line"}`}
            onClick={() => setCat(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ["Setup", "Place it, plug it in, leave Auto on for a day.", "/support"],
          ["Filters", "A yearly cylinder. The top cap is the whole procedure.", "/shop"],
          ["Warranty", "Two years. Write to us with the serial under the plinth.", "/warranty"],
        ].map(([title, copy, to]) => (
          <Link key={title} to={to as "/support"} className="border border-line p-6">
            <h2 className="text-body">{title}</h2>
            <p className="mt-2 text-stone">{copy}</p>
          </Link>
        ))}
      </div>
      <div className="mt-16">
        {items.length ? (
          <AccordionList items={items.map((item) => ({ q: item.q, a: item.a }))} />
        ) : (
          <p className="text-stone">Nothing matches. Try a shorter word, or write to us.</p>
        )}
      </div>
    </main>
  );
}
