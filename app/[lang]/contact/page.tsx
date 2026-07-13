import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, Clock, MessageCircleMore } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
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
    title: dict.contact.metaTitle,
    description: fill(dict.contact.metaDescription, { company: siteConfig.name }),
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { contact } = siteConfig;

  const details = [
    {
      Icon: Phone,
      label: dict.common.callAnytime,
      value: contact.phone,
      href: contact.phoneHref,
    },
    {
      Icon: Mail,
      label: dict.common.emailUs,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      Icon: MapPin,
      label: dict.contact.visitUs,
      value: `${contact.addressLine}, ${contact.city}, ${contact.state} ${contact.postalCode}`,
      href: contact.mapUrl,
    },
    {
      Icon: Clock,
      label: dict.contact.workingHours,
      value: dict.contact.hours,
      href: undefined,
    },
  ];

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.headerDescription}
        crumbs={[{ name: dict.nav.contact, href: "/contact" }]}
      />

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* min-w-0: grid items default to min-width:auto, so the long unbroken
              email address would otherwise widen the column past the viewport. */}
          <div className="min-w-0">
            <span className="eyebrow">{dict.contact.reachUs}</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{dict.contact.heading}</h2>
            <p className="mt-4 text-muted-foreground">{dict.contact.body}</p>

            <ul className="mt-8 space-y-5">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="wrap-break-word font-semibold text-heading hover:text-brand"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-semibold text-heading">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-8 w-full bg-whatsapp text-white hover:bg-whatsapp/90 sm:w-auto"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircleMore className="size-4" /> {dict.common.chatOnWhatsapp}
            </Button>
          </div>

          <div className="min-w-0 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">{dict.contact.formTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{dict.contact.formSubtitle}</p>
            <div className="mt-6">
              <EnquiryForm
                lang={lang}
                dict={dict}
                source="quote-form"
                submitLabel={dict.common.sendMessage}
              />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/#localbusiness`,
          name: siteConfig.legalName,
          image: absoluteUrl(siteConfig.ogImage),
          url: siteConfig.url,
          telephone: contact.phone,
          email: contact.email,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.addressLine,
            addressLocality: contact.city,
            addressRegion: contact.state,
            postalCode: contact.postalCode,
            addressCountry: contact.countryCode,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        }}
      />
    </>
  );
}
