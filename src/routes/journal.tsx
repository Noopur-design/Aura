import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/journal")({
  head: () => pageMeta("Journal — AURA", "Short notes from the AURA studio on quiet rooms and what 24 decibels means."),
  component: JournalPage,
});

function JournalPage() {
  return (
    <main id="main" className="aura-wrap pt-32 pb-24" data-nav="light">
      <p className="eyebrow text-stone">Journal</p>
      <h1 className="type-display mt-4">Notes from a quieter room.</h1>
      <article className="mt-16 max-w-2xl border-t border-line pt-10">
        <p className="eyebrow text-stone">01 — Rooms</p>
        <h2 className="type-title mt-3">The room you stop noticing</h2>
        <p className="mt-4 text-stone">
          A good purifier has a strange success condition: after a week, you forget the reason you bought it. The morning air is simply ordinary. We design toward that, not toward a graph you check before breakfast.
        </p>
      </article>
      <article className="mt-12 max-w-2xl border-t border-line pt-10">
        <p className="eyebrow text-stone">02 — Sound</p>
        <h2 className="type-title mt-3">What 24 decibels actually means</h2>
        <p className="mt-4 text-stone">
          It is not silence. It is below a whisper and near the noise of a quiet house at night. If you can hear the product from the pillow as a tone, rather than as air, we have failed the spec. Boost is allowed to be obvious. Sleep is not.
        </p>
      </article>
    </main>
  );
}
