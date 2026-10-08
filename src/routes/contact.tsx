import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Field, SelectField, TextArea } from "@/components/ui/Input";
import { pageMeta } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact AURA", "Write to AURA about support, business, press, or partnerships. This preview does not send the message."),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) next.name = "Please add your name.";
    if (!email.includes("@") || !email.includes(".")) next.email = "That email doesn’t look complete.";
    if (message.length < 8) next.message = "A few more words will help.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  }

  return (
    <main id="main" className="aura-wrap grid gap-12 pt-32 pb-24 lg:grid-cols-12" data-nav="light">
      <div className="lg:col-span-5">
        <h1 className="type-display">Contact</h1>
        <ul className="mt-8 space-y-4 text-stone">
          <li>Customer support — filters, faults, delivery</li>
          <li>Business — projects and trade</li>
          <li>Press — images and interviews</li>
          <li>Partnerships — a specific reason, please</li>
        </ul>
        <p className="mt-8 text-fine text-stone">hello@aura.example · a fictional address</p>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {sent ? (
          <p className="type-title" role="status">
            Received on this device. Nothing was sent — AURA is a concept, and this form does not leave the browser.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <Field label="Name" name="name" autoComplete="name" error={errors.name} />
            <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <SelectField label="Subject" name="subject" defaultValue="Customer support">
              <option>Customer support</option>
              <option>Business</option>
              <option>Press</option>
              <option>Partnerships</option>
            </SelectField>
            <TextArea label="Message" name="message" error={errors.message} />
            <button type="submit" className="min-h-11 bg-ink px-5 text-paper">
              Send
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
