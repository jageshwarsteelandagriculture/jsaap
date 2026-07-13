import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
  href = "/",
  tagline,
}: {
  className?: string;
  variant?: "default" | "light";
  /** Locale-prefixed home path. */
  href?: string;
  tagline?: string;
}) {
  const light = variant === "light";
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-lg shadow-sm sm:size-10",
          light ? "bg-white text-brand" : "bg-brand text-white",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5 sm:size-6" fill="none" aria-hidden>
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
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "truncate font-heading text-[0.95rem] font-extrabold tracking-tight sm:text-lg",
            light ? "text-white" : "text-heading",
          )}
        >
          {siteConfig.name}
        </span>
        {tagline ? (
          <span
            className={cn(
              "truncate text-[10px] font-medium sm:text-[11px]",
              light ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
