import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/shipping")({
  head: () => pageMeta("Shipping — AURA", "Concept delivery for AURA inside India: free, in 3–5 days."),
  component: () => (
    <LegalPage title="Shipping">
      <p>In this concept, orders dispatch in 3–5 days and travel free across India. Metro addresses are often next-day after dispatch.</p>
      <p>The wall mount is made to order and takes about two weeks. Filters ship with the tower or on their own.</p>
    </LegalPage>
  ),
});
