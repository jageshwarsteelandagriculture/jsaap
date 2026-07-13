import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/routing";

export const absoluteUrl = (path = "") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetaInput = {
  lang: Locale;
  title?: string;
  description: string;
  /** Unprefixed app path, e.g. "/products". */
  path?: string;
  image?: string;
  noIndex?: boolean;
  /** Localized tagline — used only for the untitled (home) page's title. */
  tagline?: string;
};

/**
 * Build per-page metadata with brand defaults, a locale-correct canonical URL,
 * `hreflang` alternates for the other languages, Open Graph and Twitter cards.
 *
 * The alternates are what let Google treat `/en/products`, `/hi/products` and
 * `/gu/products` as one page in three languages rather than duplicate content.
 */
export function buildMetadata({
  lang,
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  tagline = siteConfig.tagline,
}: PageMetaInput): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${tagline}`;
  const url = absoluteUrl(localePath(lang, path));

  return {
    // A bare string here would get the brand suffix twice — once from us and
    // once from the root layout's title template. Hand the template the raw
    // title and mark the untitled home page as absolute.
    title: title ?? { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [localeMeta[l].intl, absoluteUrl(localePath(l, path))]),
      ),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: localeMeta[lang].intl.replace("-", "_"),
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/** Organization schema.org JSON-LD for the site root. */
export function organizationJsonLd(description: string) {
  const { contact, social } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    description,
    foundingDate: String(siteConfig.foundingYear),
    sameAs: [social.facebook, social.linkedin, social.youtube],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "sales",
      areaServed: contact.country,
      availableLanguage: ["en", "hi", "gu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine,
      addressLocality: contact.city,
      addressRegion: contact.state,
      postalCode: contact.postalCode,
      addressCountry: contact.countryCode,
    },
  };
}

/** WebSite schema with SearchAction for sitelinks search box. */
export function websiteJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** `path` values are unprefixed app paths; this localizes them. */
export function breadcrumbJsonLd(lang: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}
