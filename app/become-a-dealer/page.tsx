import type { Metadata } from "next";
import { TrendingUp, Headset, PackageCheck, BadgeIndianRupee } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Become a Dealer",
  description: `Partner with ${siteConfig.name}. Join our nationwide dealer network and grow your agricultural machinery business.`,
  path: "/become-a-dealer",
});

const benefits = [
  { Icon: TrendingUp, title: "Strong margins", text: "Competitive dealer pricing and healthy returns on a trusted product range." },
  { Icon: PackageCheck, title: "Genuine parts supply", text: "Reliable access to genuine spares keeps your customers running and loyal." },
  { Icon: Headset, title: "Sales & service support", text: "Training, marketing material and responsive support from our team." },
  { Icon: BadgeIndianRupee, title: "Established brand", text: `Over ${siteConfig.stats.yearsExperience} years of reputation behind every sale.` },
];

export default function BecomeADealerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title="Become a Dealer"
        description="Join our growing network of dealers and bring trusted agricultural machinery to farmers in your region."
        crumbs={[{ name: "Become a Dealer", href: "/become-a-dealer" }]}
        hue={96}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Why partner with us</span>
            <h2 className="mt-3 text-3xl font-bold">Grow your business with a trusted brand</h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re always looking for committed partners to expand our reach. As a dealer
              you&apos;ll benefit from a proven product range, genuine parts and dedicated support.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {benefits.map(({ Icon, title, text }) => (
                <div key={title} className="rounded-xl border bg-card p-5 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-heading">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">Dealership enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your business and region — our team will reach out to discuss the
              opportunity.
            </p>
            <div className="mt-6">
              <EnquiryForm source="quote-form" submitLabel="Apply for Dealership" />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Become a Dealer", path: "/become-a-dealer" },
        ])}
      />
    </>
  );
}
