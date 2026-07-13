import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, hasLocale, locales } from "@/lib/i18n/config";
import { matchLocale } from "@/lib/i18n/routing";

/**
 * Locale routing. Every page lives under `/[lang]`, so a request without a
 * locale prefix is redirected to one:
 *
 *   1. the `NEXT_LOCALE` cookie, if the visitor has explicitly picked a
 *      language (the language dialog writes it), otherwise
 *   2. the best match from `Accept-Language`, otherwise the default locale.
 *
 * Note: in Next.js 16 middleware is called Proxy. Same mechanics, new name.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && hasLocale(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /**
     * Everything except Next internals, static assets and the metadata routes
     * that must stay unprefixed (`/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`).
     */
    "/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.).*)",
  ],
};
