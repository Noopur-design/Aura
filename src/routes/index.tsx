import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta(
      "AURA — Clean air. Quietly intelligent.",
      "AURA ONE is an AI-powered air purifier for the rooms you live in. Quiet, precise, and designed to disappear.",
    ),
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/images/aura/hero.webp",
        imageSrcSet: "/images/aura/hero-xs.webp 320w, /images/aura/hero-sm.webp 800w, /images/aura/hero.webp 1600w",
        imageSizes: "(max-width: 768px) 92vw, 46vw",
        fetchPriority: "high",
      },
    ],
  }),
  component: HomePage,
});
