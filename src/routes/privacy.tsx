import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/privacy")({
  head: () => pageMeta("Privacy — AURA", "How this concept site treats information. Nothing is sent to a server."),
  component: () => (
    <LegalPage title="Privacy">
      <p>This preview keeps your bag in local storage on your device. The contact form and newsletter do not transmit what you type.</p>
      <p>Card fields on the demonstration checkout are discarded when you leave the step. They are not saved.</p>
      <p>If AURA were a real company, this page would name a controller, a retention period, and a way to write to them. It is not.</p>
    </LegalPage>
  ),
});
