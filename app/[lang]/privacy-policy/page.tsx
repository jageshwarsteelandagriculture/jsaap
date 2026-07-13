import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { hasLocale, localeMeta } from "@/lib/i18n/config";
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
    title: dict.privacy.metaTitle,
    description: fill(dict.privacy.metaDescription, { company: siteConfig.name }),
    path: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage({
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
        title={dict.privacy.title}
        description={dict.privacy.headerDescription}
        crumbs={[{ name: dict.nav.privacyPolicy, href: "/privacy-policy" }]}
        hue={160}
      />

      <section className="section">
        <div className="container-site max-w-3xl space-y-8">
          <p className="text-muted-foreground">
            {dict.privacy.lastUpdated}{" "}
            {new Date().toLocaleDateString(localeMeta[lang].intl, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          {dict.privacy.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold sm:text-xl">{s.heading}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
          <div>
            <h2 className="text-lg font-bold sm:text-xl">{dict.privacy.contactHeading}</h2>
            <p className="mt-2 text-muted-foreground">
              {dict.privacy.contactBody}{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="wrap-break-word font-medium text-brand hover:underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              {dict.privacy.or} {siteConfig.contact.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
