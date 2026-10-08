import { Minus, Plus } from "lucide-react";

export function Quantity({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center border border-line" role="group" aria-label={label}>
      <button
        type="button"
        className="grid size-11 place-items-center"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="size-4" />
      </button>
      <span className="mono w-8 text-center text-body">{value}</span>
      <button
        type="button"
        className="grid size-11 place-items-center"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(5, value + 1))}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
