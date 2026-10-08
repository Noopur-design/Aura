import { createFileRoute } from "@tanstack/react-router";
import { AppStudio } from "@/components/app/AppStudio";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () =>
    pageMeta(
      "AURA app — Air, quietly reported",
      "The AURA app shows air quality, history, schedules, and filter life. The purifier itself has no screen.",
    ),
  component: AppPage,
});

function AppPage() {
  return (
    <main id="main" className="aura-wrap pt-32 pb-20" data-nav="light">
      <p className="eyebrow text-stone">Application</p>
      <h1 className="type-display mt-4 max-w-3xl">The room stays plain. The detail lives here.</h1>
      <div className="mt-16">
        <AppStudio />
      </div>
    </main>
  );
}
