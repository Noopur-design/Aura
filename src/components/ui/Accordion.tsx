import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function AccordionList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-line">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q} className="border-b border-line">
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-body">
              <span>{item.q}</span>
              <ChevronDown
                className="size-4 shrink-0 text-stone transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 data-[state=open]:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="max-w-2xl pb-5 text-stone">{item.a}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
