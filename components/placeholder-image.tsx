import { Tractor } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight stand-in for real photography. Renders a deterministic green
 * gradient (driven by `hue`) with a subtle field texture and a machinery
 * icon, so the image-led layout reads correctly before real assets land.
 * Swap instances for next/image once photos are available.
 */
export function PlaceholderImage({
  hue = 142,
  label,
  className,
  icon = true,
}: {
  hue?: number;
  label?: string;
  className?: string;
  icon?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Agricultural machinery photo placeholder"}
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 45% 32%), hsl(${
          hue + 18
        } 55% 22%))`,
      }}
    >
      {/* furrow texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 14px, rgba(255,255,255,.4) 14px 15px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />
      {icon ? (
        <Tractor
          aria-hidden
          className="relative size-12 text-white/85 drop-shadow"
          strokeWidth={1.5}
        />
      ) : null}
      {label ? (
        <span className="absolute bottom-3 left-4 right-4 text-sm font-medium text-white/90">
          {label}
        </span>
      ) : null}
    </div>
  );
}
