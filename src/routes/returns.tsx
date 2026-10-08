import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/returns")({
  head: () => pageMeta("Returns — AURA", "A 30-day concept return window for an unopened fictional purifier."),
  component: () => (
    <LegalPage title="Returns">
      <p>Unopened towers would be returnable within 30 days. Opened filters would not, unless they arrive damaged.</p>
      <p>Because nothing is sold here, there is no return label to generate. Write via the contact page if you are exploring the flow.</p>
    </LegalPage>
  ),
});
