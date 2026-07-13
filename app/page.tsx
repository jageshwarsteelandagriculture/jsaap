import type { Metadata } from "next";
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

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPortfolio />
      <Intro />
      <Counters />
      <VideoCta />
      <Testimonials />
      <BrochureCta />
      <WhyChoose />
      <Blog />
      <Quote />

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
