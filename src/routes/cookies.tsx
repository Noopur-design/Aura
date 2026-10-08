import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/cookies")({
  head: () => pageMeta("Cookies — AURA", "This concept site stores a bag and a loading flag in your browser."),
  component: () => (
    <LegalPage title="Cookies">
      <p>The bag uses local storage under the key aura-cart. A loading flag uses session storage so the intro plays once per visit.</p>
      <p>There is no advertising cookie and no third-party analytics in this preview.</p>
    </LegalPage>
  ),
});
