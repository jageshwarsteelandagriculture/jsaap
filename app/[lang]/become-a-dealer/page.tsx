import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrendingUp, Headset, PackageCheck, BadgeIndianRupee } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/fill";

const icons = [TrendingUp, PackageCheck, Headset, BadgeIndianRupee];

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
    title: dict.dealer.metaTitle,
    description: fill(dict.dealer.metaDescription, { company: siteConfig.name }),
    path: "/become-a-dealer",
  });
}

export default async function BecomeADealerPage({
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
        eyebrow={dict.dealer.eyebrow}
        title={dict.dealer.title}
        description={dict.dealer.headerDescription}
        crumbs={[{ name: dict.nav.becomeADealer, href: "/become-a-dealer" }]}
        hue={96}
      />

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">{dict.dealer.whyEyebrow}</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{dict.dealer.whyTitle}</h2>
            <p className="mt-4 text-muted-foreground">{dict.dealer.whyBody}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {dict.dealer.benefits.map((benefit, i) => {
                const Icon = icons[i];
                return (
                  <div key={benefit.title} className="rounded-xl border bg-card p-5 shadow-sm">
                    <span className="grid size-11 place-items-center rounded-lg bg-brand text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-heading">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {fill(benefit.text, { years: siteConfig.stats.yearsExperience })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">{dict.dealer.formTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{dict.dealer.formSubtitle}</p>
            <div className="mt-6">
              <EnquiryForm
                lang={lang}
                dict={dict}
                source="quote-form"
                submitLabel={dict.dealer.submit}
              />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.becomeADealer, path: "/become-a-dealer" },
        ])}
      />
    </>
  );
}
