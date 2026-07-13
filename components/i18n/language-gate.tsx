"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Languages } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { readLocaleCookie, writeLocaleCookie } from "@/lib/i18n/locale-cookie";
import { swapLocale } from "@/lib/i18n/routing";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * First-visit language picker.
 *
 * The proxy has already guessed a locale from `Accept-Language`, so the site is
 * readable behind the dialog. What it cannot know is whether the visitor *chose*
 * that language — the `NEXT_LOCALE` cookie is written only on an explicit pick,
 * so its absence is exactly the "has never chosen" signal we gate on.
 */
/** The cookie only ever changes through this component, so there is nothing to
 * subscribe to — but reading it still has to go through the external-store API
 * to stay correct across SSR and hydration. */
const subscribe = () => () => {};

export function LanguageGate({ dict }: { dict: Dictionary }) {
  const router = useRouter();
  const pathname = usePathname();
  const [choice, setChoice] = useState<Locale | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // `document.cookie` is unreadable on the server, so the server snapshot says
  // "already chosen" and renders the dialog closed. The client then re-reads the
  // real cookie on hydration — same markup both sides, no mismatch.
  const hasChosenLanguage = useSyncExternalStore(
    subscribe,
    () => readLocaleCookie() !== null,
    () => true,
  );

  const open = !hasChosenLanguage && !dismissed;

  const confirm = (locale: Locale) => {
    writeLocaleCookie(locale);
    setDismissed(true);
    router.push(swapLocale(pathname, locale));
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={() => { /* choice required — no dismiss */ }}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100vw-2rem)] gap-0 p-6 sm:max-w-md sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-full bg-brand-tint text-brand">
            <Languages className="size-6" />
          </span>
          <DialogTitle className="mt-4 text-xl font-bold sm:text-2xl">
            {dict.language.gateTitle}
          </DialogTitle>
          <p className="mt-2 text-sm text-muted-foreground">{dict.language.gateSubtitle}</p>
        </div>

        <div className="mt-6 grid gap-2.5">
          {locales.map((locale) => {
            const meta = localeMeta[locale];
            const selected = choice === locale;
            return (
              <button
                key={locale}
                type="button"
                onClick={() => setChoice(locale)}
                aria-pressed={selected}
                className={cn(
                  "flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors",
                  selected
                    ? "border-brand bg-brand-tint"
                    : "border-border hover:border-brand/50 hover:bg-accent",
                )}
              >
                <span className="flex flex-col">
                  <span className="text-base font-bold text-heading">{meta.native}</span>
                  <span className="text-xs text-muted-foreground">{meta.english}</span>
                </span>
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    selected ? "border-brand bg-brand text-white" : "border-border",
                  )}
                >
                  {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!choice}
          onClick={() => choice && confirm(choice)}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-40"
        >
          {dict.language.gateContinue}
        </button>
      </DialogContent>
    </Dialog>
  );
}
