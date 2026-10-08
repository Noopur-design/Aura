export const assemblyParts = [
  { id: "shell", name: "Outer shell", note: "Ceramic composite, 4.2 mm wall" },
  { id: "ring", name: "Control ring", note: "Brushed metal, capacitive press" },
  { id: "sensor", name: "Sensor array", note: "PM, VOC, CO₂, temperature, humidity" },
  { id: "motor", name: "Motor", note: "Low-RPM brushless, isolated on rubber" },
  { id: "fan", name: "Fan", note: "Mixed-flow impeller" },
  { id: "hepa", name: "H13 HEPA", note: "Pleated cylinder, 2.4 m² media" },
  { id: "carbon", name: "Carbon filter", note: "Activated carbon bed" },
  { id: "chamber", name: "Air chamber", note: "Sealed path from plinth to crown" },
  { id: "base", name: "Base", note: "Brushed plinth and hidden intake" },
];

export function AssemblyNotes({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const part = assemblyParts.find((item) => item.id === active) ?? assemblyParts[0];
  return (
    <div>
      <p className="eyebrow text-stone">Assembly</p>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {assemblyParts.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full min-w-0 items-baseline justify-between gap-4 py-3 text-left"
              onClick={() => onSelect(item.id)}
              aria-pressed={active === item.id}
            >
              <span className="mono text-fine text-stone">0{index + 1}</span>
              <span className="min-w-0 flex-1">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
      {part ? <p className="mt-4 text-stone">{part.note}</p> : null}
    </div>
  );
}
