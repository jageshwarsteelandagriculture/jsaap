/**
 * Locale configuration — the single source of truth for which languages the
 * site ships in. Adding a language means adding it here and creating the
 * matching dictionary in `lib/i18n/dictionaries/`.
 */

export const locales = ["en", "hi", "gu"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Set once the visitor picks a language; its absence is what triggers the
 * first-visit language dialog, so only ever write it on an explicit choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Menu metadata for the language picker and switcher. */
export const localeMeta: Record<
  Locale,
  { native: string; english: string; short: string; htmlLang: string; intl: string }
> = {
  en: { native: "English", english: "English", short: "EN", htmlLang: "en", intl: "en-IN" },
  hi: { native: "हिन्दी", english: "Hindi", short: "हि", htmlLang: "hi", intl: "hi-IN" },
  gu: { native: "ગુજરાતી", english: "Gujarati", short: "ગુ", htmlLang: "gu", intl: "gu-IN" },
};
