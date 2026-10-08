import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/terms")({
  head: () => pageMeta("Terms — AURA", "Terms for a fictional product site. No sale is formed."),
  component: () => (
    <LegalPage title="Terms">
      <p>Nothing on this site is an offer to sell. Prices, specifications, and delivery times are illustrative.</p>
      <p>Placing a demonstration order does not create a contract, a shipment, or a charge.</p>
      <p>Product photography shows a consistent concept object. It is not a measurement drawing. Use the specifications page for figures, and treat those as fiction too.</p>
    </LegalPage>
  ),
});
