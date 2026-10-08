import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/$")({
  head: () => pageMeta("Not found — AURA", "That page is not part of AURA."),
  component: Missing,
});

function Missing() {
  return (
    <main id="main" className="aura-wrap flex min-h-[70vh] flex-col justify-center pt-28" data-nav="light">
      <p className="eyebrow text-stone">404</p>
      <h1 className="type-display mt-4">This page isn’t in the room.</h1>
      <Link to="/" className="mt-8 inline-flex min-h-11 items-center underline">
        Return home
      </Link>
    </main>
  );
}
