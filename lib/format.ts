import { localeMeta, type Locale } from "@/lib/i18n/config";

/** Long-form date in the visitor's language (e.g. "09 જુલાઈ 2025"). */
export function formatDate(iso: string, lang: Locale) {
  return new Date(iso).toLocaleDateString(localeMeta[lang].intl, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Numbers in the visitor's locale, keeping the Indian grouping (1,229). */
export function formatNumber(value: number, lang: Locale) {
  return value.toLocaleString(localeMeta[lang].intl);
}
