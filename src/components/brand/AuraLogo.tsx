import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "lockup" | "wordmark" | "mark" | "compact";
  tone?: "ink" | "paper";
  className?: string;
  linked?: boolean;
};

export function AuraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M16 6.2c4.6 2.1 7.2 5.6 7.2 9.8S20.6 23.7 16 25.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M16 9c2.9 1.4 4.6 3.8 4.6 7s-1.7 5.6-4.6 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
      />
      <circle cx="16" cy="16" r="1.45" fill="currentColor" />
    </svg>
  );
}

export function AuraLogo({
  variant = "lockup",
  tone = "ink",
  className,
  linked = true,
}: LogoProps) {
  const mark = <AuraMark className={cn("size-6", variant === "compact" && "size-5")} />;
  const word = <span className="eyebrow">AURA</span>;
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", tone === "paper" ? "text-paper" : "text-ink", className)}>
      {variant !== "wordmark" ? mark : null}
      {variant !== "mark" ? word : null}
    </span>
  );
  if (!linked) return inner;
  return (
    <Link to="/" aria-label="AURA home" className="inline-flex">
      {inner}
    </Link>
  );
}
