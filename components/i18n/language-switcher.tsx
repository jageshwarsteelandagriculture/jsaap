"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";

import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { writeLocaleCookie } from "@/lib/i18n/locale-cookie";
import { swapLocale } from "@/lib/i18n/routing";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * Header language switcher. Rewrites the current path into the target locale
 * (`/hi/products` -> `/gu/products`) so the visitor keeps their place, and
 * records the choice so it survives the next visit.
 */
export function LanguageSwitcher({
  lang,
  dict,
  className,
  variant = "dark",
}: {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  /** `dark` sits on the brand-dark utility bar; `light` on a light surface. */
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (next: Locale) => {
    setOpen(false);
    if (next === lang) return;
    writeLocaleCookie(next);
    router.push(swapLocale(pathname, next));
    router.refresh();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dict.language.switcherLabel}
        className={cn(
          "inline-flex min-h-9 items-center gap-1.5 rounded px-2 py-1 font-semibold transition-colors",
          variant === "dark"
            ? "text-white hover:bg-white/10"
            : "border text-foreground hover:bg-accent",
        )}
      >
        <Globe className="size-4 shrink-0" />
        <span>{localeMeta[lang].native}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border bg-popover p-1 shadow-lg ring-1 ring-foreground/5"
        >
          {locales.map((locale) => {
            const meta = localeMeta[locale];
            const active = locale === lang;
            return (
              <button
                key={locale}
                type="button"
                role="menuitem"
                onClick={() => select(locale)}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left transition-colors",
                  active
                    ? "bg-brand-tint text-brand"
                    : "text-foreground hover:bg-accent",
                )}
              >
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">{meta.native}</span>
                  <span className="text-xs text-muted-foreground">{meta.english}</span>
                </span>
                {active ? <Check className="size-4 shrink-0" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
