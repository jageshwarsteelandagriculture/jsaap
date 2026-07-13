import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { productMeta, blogMeta } from "@/lib/data";
import { locales, localeMeta } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/routing";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

/**
 * Every page is emitted once per locale, each entry carrying `alternates` so
 * Google knows `/en/products`, `/hi/products` and `/gu/products` are the same
 * page in three languages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/company/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/become-a-dealer", changeFrequency: "monthly", priority: 0.7 },
    { path: "/news", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    ...productMeta.map<Entry>((p) => ({
      path: `/products/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...blogMeta.map<Entry>((p) => ({
      path: `/news/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
      lastModified: new Date(p.date),
    })),
  ];

  return entries.flatMap((entry) =>
    locales.map((lang) => ({
      url: `${siteConfig.url}${localePath(lang, entry.path)}`,
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            localeMeta[l].intl,
            `${siteConfig.url}${localePath(l, entry.path)}`,
          ]),
        ),
      },
    })),
  );
}
