import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="main" className="aura-wrap max-w-3xl pt-32 pb-24" data-nav="light">
      <h1 className="type-display">{title}</h1>
      <div className="mt-8 space-y-4 text-stone">{children}</div>
      <p className="mt-10 text-fine">AURA is a fictional concept brand. This page is part of the demonstration, not a binding policy.</p>
    </main>
  );
}
