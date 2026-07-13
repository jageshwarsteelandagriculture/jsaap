import type { Locale } from "@/lib/i18n/config";
import { en, type Dictionary } from "@/lib/i18n/dictionaries/en";
import { gu } from "@/lib/i18n/dictionaries/gu";
import { hi } from "@/lib/i18n/dictionaries/hi";

const dictionaries: Record<Locale, Dictionary> = { en, hi, gu };

/**
 * Resolve the dictionary for a locale.
 *
 * Dictionaries are plain serializable objects, so a Server Component can read
 * one and pass it straight to a Client Component as a prop — that is how the
 * header, forms and carousels get their copy without a context provider.
 */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
