import type { Metadata } from "next";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Counters } from "@/components/sections/counters";
import { WhyChoose } from "@/components/sections/why-choose";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name} — over ${siteConfig.stats.yearsExperience} years of manufacturing reliable, tractor-mounted agricultural machinery.`,
  path: "/company/about",
});

const values = [
  "Reliability engineered into every implement",
  "Practical designs informed by real farming needs",
  "Quality materials and rigorous field testing",
  "Lasting partnerships with farmers and dealers",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Company"
        title="About Us"
        description={`Over ${siteConfig.stats.yearsExperience} years of diligence, quality and partnership with the agricultural community.`}
        crumbs={[
          { name: "The Company", href: "/company/about" },
          { name: "About", href: "/company/about" },
        ]}
      />

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <PlaceholderImage hue={142} className="aspect-4/3 rounded-2xl" label="Our manufacturing facility" />
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl font-bold">
              A trusted name in agricultural machinery since {siteConfig.foundingYear}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {siteConfig.name} began with a simple goal: to build farm equipment that farmers can
              depend on. Four decades later, we manufacture a comprehensive range of tractor-mounted
              implements that combine practical engineering with modern manufacturing.
            </p>
            <p className="mt-4 text-muted-foreground">
              From our production facility we serve a nationwide network of {siteConfig.stats.dealers}+
              dealers, supported by genuine spare parts and responsive service.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
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

      <Counters />
      <WhyChoose />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/company/about" },
        ])}
      />
    </>
  );
}
