import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/warranty")({
  head: () => pageMeta("Warranty — AURA", "A two-year concept warranty on the AURA ONE tower."),
  component: () => (
    <LegalPage title="Warranty">
      <p>The tower would carry two years against manufacturing faults. The serial sits under the plinth.</p>
      <p>Filters are consumable. A defect on arrival is replaced. Ordinary loading with dust is the filter doing its work.</p>
      <p>The motor is designed to be serviceable rather than glued shut. That is a design intent in the fiction, not a service network.</p>
    </LegalPage>
  ),
});
