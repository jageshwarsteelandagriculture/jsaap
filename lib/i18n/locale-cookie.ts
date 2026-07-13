import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  hasLocale,
  type Locale,
} from "@/lib/i18n/config";

/** Read the visitor's explicitly chosen locale, if any. Client-side only. */
export function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
  if (!match) return null;

  const value = decodeURIComponent(match.slice(LOCALE_COOKIE.length + 1));
  return hasLocale(value) ? value : null;
}

/**
 * Record an explicit language choice. The proxy reads this on every subsequent
 * request, so an unprefixed URL (a bookmark, a bare domain hit) lands the
 * visitor back in their language.
 */
export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
