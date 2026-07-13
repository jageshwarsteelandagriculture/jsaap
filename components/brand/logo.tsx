import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const light = variant === "light";
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-lg shadow-sm",
          light ? "bg-white text-brand" : "bg-brand text-white",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
          <path
            d="M4 16a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm11 1a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 13V7h4l2 4h3.5L18 14M9 7l1.5-3M3 10h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-extrabold tracking-tight",
            light ? "text-white" : "text-heading",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "text-[11px] font-medium",
            light ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
