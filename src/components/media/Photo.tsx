import { imageMeta } from "@/lib/image-meta";
import { cn } from "@/lib/utils";

function sources(src: string) {
  if (!/\.jpe?g$/i.test(src)) return null;
  const base = src.replace(/\.jpe?g$/i, "");
  return {
    xs: `${base}-xs.webp`,
    sm: `${base}-sm.webp`,
    full: `${base}.webp`,
  };
}

export function Photo({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const set = sources(src);
  const meta = imageMeta[src];
  return (
    <img
      src={set?.full ?? src}
      srcSet={set ? `${set.xs} 320w, ${set.sm} 800w, ${set.full} 1600w` : undefined}
      sizes={set ? (sizes ?? "(max-width: 768px) 92vw, (max-width: 1280px) 48vw, 720px") : undefined}
      alt={alt}
      width={meta?.w}
      height={meta?.h}
      className={cn("h-full w-full object-cover", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
