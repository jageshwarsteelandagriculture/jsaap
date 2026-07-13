import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
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
    title: dict.careers.metaTitle,
    description: fill(dict.careers.metaDescription, { company: siteConfig.name }),
    path: "/careers",
  });
}

export default async function CareersPage({
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
        eyebrow={dict.careers.eyebrow}
        title={dict.careers.title}
        description={dict.careers.headerDescription}
        crumbs={[{ name: dict.nav.careers, href: "/careers" }]}
        hue={122}
      />

      <section className="section">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{dict.careers.noOpenings}</h2>
          <p className="mt-4 text-muted-foreground">{dict.careers.body}</p>
          <Button
            size="lg"
            className="mt-8 w-full sm:w-auto"
            render={
              <a href={`mailto:${siteConfig.contact.email}?subject=Career%20Enquiry`} />
            }
          >
            <Mail className="size-4" /> {dict.careers.emailResume}
          </Button>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.careers, path: "/careers" },
        ])}
      />
    </>
  );
}
