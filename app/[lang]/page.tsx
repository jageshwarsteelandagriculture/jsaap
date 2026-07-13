import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/sections/hero";
import { ProductPortfolio } from "@/components/sections/product-portfolio";
import { Intro } from "@/components/sections/intro";
import { Counters } from "@/components/sections/counters";
import { VideoCta } from "@/components/sections/video-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { BrochureCta } from "@/components/sections/brochure-cta";
import { WhyChoose } from "@/components/sections/why-choose";
import { Blog } from "@/components/sections/blog";
import { Quote } from "@/components/sections/quote";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
    description: dict.brand.description,
    path: "/",
    tagline: dict.brand.tagline,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <ProductPortfolio lang={lang} dict={dict} />
      <Intro lang={lang} dict={dict} />
      <Counters lang={lang} dict={dict} />
      <VideoCta dict={dict} />
      <Testimonials lang={lang} dict={dict} />
      <BrochureCta dict={dict} />
      <WhyChoose lang={lang} dict={dict} />
      <Blog lang={lang} dict={dict} />
      <Quote lang={lang} dict={dict} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          "@id": `${siteConfig.url}/#aggregaterating`,
          itemReviewed: { "@type": "Organization", name: siteConfig.legalName },
          ratingValue: siteConfig.googleReviews.rating,
          reviewCount: siteConfig.googleReviews.count,
          bestRating: 5,
          worstRating: 1,
        }}
      />
    </>
  );
}
