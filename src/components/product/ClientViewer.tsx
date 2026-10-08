import { lazy, Suspense, useEffect, useState } from "react";
import { Photo } from "@/components/media/Photo";
import type { ProductViewerProps } from "@/components/product/ProductViewer";

const ProductViewer = lazy(() => import("@/components/product/ProductViewer"));

function Fallback({ alt = "AURA ONE" }: { alt?: string }) {
  return (
    <div className="grid h-full min-h-[16rem] place-items-center">
      <Photo src="/images/aura/hero.jpg" alt={alt} sizes="(max-width: 768px) 92vw, 50vw" className="h-auto max-h-[36rem] w-full object-contain" priority />
    </div>
  );
}

function canView() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ClientViewer(props: ProductViewerProps) {
  const [mode, setMode] = useState<"wait" | "view" | "photo">("wait");
  useEffect(() => {
    setMode(canView() ? "view" : "photo");
  }, []);
  if (mode !== "view") return <Fallback />;
  return (
    <Suspense fallback={<Fallback />}>
      <ProductViewer {...props} />
    </Suspense>
  );
}
