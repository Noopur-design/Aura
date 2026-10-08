import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={cn("relative block", className)}>
      <input
        {...props}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        className="peer w-full border-b border-line bg-transparent pt-6 pb-2 text-body text-ink outline-none transition-colors placeholder:text-transparent focus:border-ink"
      />
      <span className="pointer-events-none absolute top-4 left-0 text-stone transition-all duration-200 peer-focus:top-0 peer-focus:text-fine peer-focus:tracking-[0.14em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-fine peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
      </span>
      {error ? <span className="mt-1 block text-fine text-danger">{error}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  return (
    <label className={cn("relative block", className)}>
      <textarea
        {...props}
        placeholder=" "
        rows={props.rows ?? 5}
        aria-invalid={error ? true : undefined}
        className="peer w-full resize-y border-b border-line bg-transparent pt-6 pb-2 text-body text-ink outline-none transition-colors placeholder:text-transparent focus:border-ink"
      />
      <span className="pointer-events-none absolute top-4 left-0 text-stone transition-all duration-200 peer-focus:top-0 peer-focus:text-fine peer-focus:tracking-[0.14em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-fine peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
      </span>
      {error ? <span className="mt-1 block text-fine text-danger">{error}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow text-stone">{label}</span>
      <select
        {...props}
        className="mt-2 w-full appearance-none border-b border-line bg-transparent py-3 text-body outline-none focus:border-ink"
      >
        {children}
      </select>
    </label>
  );
}
