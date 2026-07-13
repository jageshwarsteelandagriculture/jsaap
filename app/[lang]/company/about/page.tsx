import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Counters } from "@/components/sections/counters";
import { WhyChoose } from "@/components/sections/why-choose";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/fill";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return buildMetadata({
    lang,
    title: dict.about.metaTitle,
    description: fill(dict.about.metaDescription, {
      company: siteConfig.name,
      years: siteConfig.stats.yearsExperience,
    }),
    path: "/company/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={dict.nav.company}
        title={dict.about.title}
        description={fill(dict.about.headerDescription, {
          years: siteConfig.stats.yearsExperience,
        })}
        crumbs={[
          { name: dict.nav.company, href: "/company/about" },
          { name: dict.nav.about, href: "/company/about" },
        ]}
      />

      <section className="section">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <PlaceholderImage
            hue={142}
            className="aspect-4/3 rounded-2xl"
            label={dict.about.facilityLabel}
          />
          <div>
            <span className="eyebrow">{dict.about.storyEyebrow}</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              {fill(dict.about.storyTitle, { year: siteConfig.foundingYear })}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {fill(dict.about.storyBody1, { company: siteConfig.name })}
            </p>
            <p className="mt-4 text-muted-foreground">
              {fill(dict.about.storyBody2, { dealers: siteConfig.stats.dealers })}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {dict.about.values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Counters lang={lang} dict={dict} />
      <WhyChoose lang={lang} dict={dict} />

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.about, path: "/company/about" },
        ])}
      />
    </>
  );
}
