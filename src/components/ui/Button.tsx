import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-ink text-paper hover:bg-charcoal",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink",
  ghost: "bg-transparent text-ink px-0 min-h-0",
  buy: "bg-ink text-paper hover:bg-charcoal",
  paper: "bg-paper text-ink hover:bg-pure",
} as const;

type Variant = keyof typeof variants;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  to?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", to, className, children, ...props }: Props) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-label tracking-wide transition-[background-color,border-color,color] duration-200 ease-out active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    variant === "ghost" && "group",
    className,
  );

  const content = (
    <>
      {children}
      {variant === "ghost" ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      ) : null}
    </>
  );

  function onMove(event: PointerEvent<HTMLElement>) {
    if (variant === "ghost") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.06}px, ${y * 0.1}px)`;
  }

  function onLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  if (to) {
    return (
      <Link to={to} className={classes} onPointerMove={onMove} onPointerLeave={onLeave}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onPointerMove={onMove} onPointerLeave={onLeave} {...props}>
      {content}
    </button>
  );
}
