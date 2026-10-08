import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AuraLogo } from "@/components/brand/AuraLogo";
import { lineCount, useCart } from "@/lib/cart";
import { startLenis, stopLenis } from "@/lib/lenis-bridge";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", to: "/product" },
  { label: "Technology", to: "/technology" },
  { label: "Experience", to: "/experience" },
  { label: "App", to: "/app" },
  { label: "Support", to: "/support" },
] as const;

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const count = useCart((state) => lineCount(state.lines));
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) stopLenis();
    else startLenis();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      let next = false;
      document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 72 && rect.bottom >= 72) next = el.dataset.nav === "dark";
      });
      setDark(next);
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
  }, [pathname]);

  const tone = open ? "light" : dark ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-300",
        tone === "dark" ? "text-paper" : "text-ink",
        open && "bg-paper text-ink",
        !open && scrolled && tone === "dark" && "border-b border-pure/15 bg-ink/85 backdrop-blur-md",
        !open && scrolled && tone === "light" && "border-b border-line bg-paper/85 backdrop-blur-md",
        !open && !scrolled && "border-b border-transparent bg-transparent",
      )}
    >
      <div className="aura-wrap flex h-16 min-w-0 items-center justify-between gap-2 md:h-20">
        <button
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <AuraLogo variant="compact" tone={tone === "dark" && !open ? "paper" : "ink"} className="md:hidden" />
        <div className="hidden md:block">
          <AuraLogo tone={tone === "dark" ? "paper" : "ink"} />
        </div>
        <nav className="hidden min-w-0 items-center gap-4 md:flex lg:gap-7" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "whitespace-nowrap text-[0.75rem] lg:text-label",
                pathname === link.to && "underline decoration-mist decoration-2 underline-offset-8",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" className="hidden size-11 place-items-center md:grid" aria-label="Search" onClick={onSearch}>
            <Search className="size-4" />
          </button>
          <Link
            to="/cart"
            className="relative grid size-11 place-items-center"
            aria-label={`Bag, ${ready ? count : 0} ${(ready ? count : 0) === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="size-4" />
            {ready && count > 0 ? (
              <span className="mono absolute top-2 right-1 text-fine">{count}</span>
            ) : null}
          </Link>
          <Link
            to="/shop/aura-one"
            className={cn(
              "ml-1 hidden min-h-11 shrink-0 items-center px-3 text-label md:inline-flex lg:ml-2 lg:px-4",
              tone === "dark" ? "bg-paper text-ink" : "bg-ink text-paper",
            )}
          >
            Buy AURA
          </Link>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-paper px-5 pt-6 pb-10 text-ink md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="menu-item type-title border-b border-line py-4"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/shop" className="menu-item type-title border-b border-line py-4" style={{ animationDelay: "300ms" }}>
              Shop
            </Link>
          </nav>
          <button type="button" className="mt-8 inline-flex min-h-11 items-center gap-2 text-left" onClick={onSearch}>
            <Search className="size-4" /> Search
          </button>
        </div>
      ) : null}
    </header>
  );
}
