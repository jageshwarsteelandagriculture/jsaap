import { defaultLocale, hasLocale, locales, type Locale } from "@/lib/i18n/config";

/**
 * Prefix an app-relative path with a locale. Every internal `href` must go
 * through this — an unprefixed link would bounce through the proxy and lose
 * the visitor's chosen language.
 */
export function localePath(lang: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** Strip the locale segment from a pathname: `/hi/products` -> `/products`. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first)) {
    return rest.length ? `/${rest.join("/")}` : "/";
  }
  return pathname || "/";
}

/** Rewrite a pathname to another locale, preserving the rest of the path. */
export function swapLocale(pathname: string, next: Locale): string {
  return localePath(next, stripLocale(pathname));
}

/**
 * Pick the best supported locale from an `Accept-Language` header.
 * Used only as the pre-selection hint before the visitor chooses explicitly.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.split("=")[1]) : 1;
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const hit = locales.find((locale) => locale === base);
    if (hit) return hit;
  }

  return defaultLocale;
}
