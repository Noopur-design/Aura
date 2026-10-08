import { useEffect, useState } from "react";
import { AuraLogo } from "@/components/brand/AuraLogo";

export function Loader() {
  const [phase, setPhase] = useState<"boot" | "leave" | "done">("done");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("aura-booted")) return;
    } catch {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("boot");
    const hold = window.setTimeout(() => setPhase("leave"), reduce ? 80 : 380);
    const done = window.setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("aura-booted", "1");
      } catch {
        /* ignore private mode */
      }
    }, reduce ? 140 : 560);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-paper text-ink transition-opacity duration-300 ${phase === "leave" ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="status"
      aria-live="polite"
    >
      <AuraLogo variant="lockup" linked={false} />
      <p className="mt-6 text-stone">Initializing air intelligence…</p>
      <div className="mt-6 h-px w-40 bg-line">
        <div
          className="h-px origin-left bg-ink"
          style={{ transform: "scaleX(0)", animation: "boot-bar 700ms cubic-bezier(0.2,0,0,1) forwards" }}
        />
      </div>
    </div>
  );
}
