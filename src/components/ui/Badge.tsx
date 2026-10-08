import { cn } from "@/lib/utils";

export function Badge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "good" | "warn" }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center px-2 py-1",
        tone === "neutral" && "bg-sand text-ink",
        tone === "good" && "bg-success/10 text-success",
        tone === "warn" && "bg-warning/10 text-warning",
      )}
    >
      {children}
    </span>
  );
}
