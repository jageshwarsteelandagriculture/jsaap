import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { productMeta } from "@/lib/data";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/**
 * Build the primary nav for a locale. Labels come from the dictionary, hrefs
 * are locale-prefixed, so the whole menu keeps the visitor in their language.
 */
export function getMainNav(lang: Locale, dict: Dictionary): NavItem[] {
  const path = (p: string) => localePath(lang, p);

  return [
    { label: dict.nav.home, href: path("/") },
    {
      label: dict.nav.company,
      href: path("/company/about"),
      children: [
        { label: dict.nav.about, href: path("/company/about") },
        { label: dict.nav.events, href: path("/company/events") },
        { label: dict.nav.photoGallery, href: path("/company/photo-gallery") },
        { label: dict.nav.videoGallery, href: path("/company/video-gallery") },
      ],
    },
    {
      label: dict.nav.products,
      href: path("/products"),
      children: productMeta.map((p) => ({
        label: dict.products.items[p.slug].title,
        href: path(`/products/${p.slug}`),
      })),
    },
    { label: dict.nav.contact, href: path("/contact") },
  ];
}

export function getFooterExploreLinks(lang: Locale, dict: Dictionary): NavChild[] {
  const path = (p: string) => localePath(lang, p);

  return [
    { label: dict.nav.about, href: path("/company/about") },
    { label: dict.nav.products, href: path("/products") },
    { label: dict.nav.careers, href: path("/careers") },
    { label: dict.nav.news, href: path("/news") },
    { label: dict.nav.contact, href: path("/contact") },
    { label: dict.nav.privacyPolicy, href: path("/privacy-policy") },
  ];
}
