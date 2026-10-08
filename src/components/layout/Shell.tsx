import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { useCart } from "@/lib/cart";
import { scrollTopImmediate } from "@/lib/lenis-bridge";

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    scrollTopImmediate();
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Cursor />
      <SmoothScroll />
      <Navbar onSearch={() => setSearch(true)} />
      <SearchDialog open={search} onOpenChange={setSearch} />
      <div key={pathname} className="page-enter">
        {children}
      </div>
      <Footer />
    </>
  );
}
