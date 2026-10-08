import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuraLogo } from "@/components/brand/AuraLogo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "AURA ONE", to: "/product" },
      { label: "Accessories", to: "/shop" },
      { label: "Filters", to: "/shop" },
      { label: "App", to: "/app" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Technology", to: "/technology" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/support" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Warranty", to: "/warranty" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
] as const;

export function Footer() {
  const [joined, setJoined] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!email.includes("@")) return;
    setJoined(true);
    event.currentTarget.reset();
  }

  return (
    <footer className="defer-paint border-t border-line bg-paper text-ink" data-nav="light">
      <div className="aura-wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <AuraLogo variant="lockup" />
          <p className="type-title mt-8 max-w-md">Intelligence you can breathe.</p>
          <form onSubmit={onSubmit} className="mt-8 max-w-sm">
            <label htmlFor="newsletter" className="eyebrow text-stone">
              Notes, rarely
            </label>
            <div className="mt-3 flex min-w-0 border-b border-ink">
              <input
                id="newsletter"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className="min-h-11 w-full min-w-0 bg-transparent outline-none placeholder:text-stone"
              />
              <button type="submit" className="min-h-11 px-2 text-label">
                Join
              </button>
            </div>
            <p className="mt-3 text-fine text-stone" aria-live="polite">
              {joined
                ? "You’re on the list. This preview keeps the address only for this moment — nothing is sent."
                : "A short letter when there is something worth saying. No weekly drip."}
            </p>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-stone">{column.title}</p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-body hover:text-tide">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="aura-wrap flex flex-col gap-4 border-t border-line py-6 text-fine text-stone md:flex-row md:items-center md:justify-between">
        <p>© 2026 AURA Technologies. A fictional concept.</p>
        <div className="flex flex-wrap items-center gap-4">
          <span>India</span>
          <a href="https://instagram.com" className="hover:text-ink">
            Instagram
          </a>
          <a href="https://x.com" className="hover:text-ink">
            X
          </a>
          <a href="https://youtube.com" className="hover:text-ink">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
