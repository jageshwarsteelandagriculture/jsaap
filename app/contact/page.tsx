import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircleMore } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} for quotes, dealership enquiries and product support.`,
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const details = [
    { Icon: Phone, label: "Call anytime", value: contact.phone, href: contact.phoneHref },
    { Icon: Mail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    {
      Icon: MapPin,
      label: "Visit us",
      value: `${contact.addressLine}, ${contact.city}, ${contact.state} ${contact.postalCode}`,
      href: contact.mapUrl,
    },
    { Icon: Clock, label: "Working hours", value: "Mon – Sat, 9:00 AM – 6:00 PM", href: undefined },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        description="Have a question about our machinery or want a tailored quote? Our team is ready to help."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Reach us</span>
            <h2 className="mt-3 text-3xl font-bold">We&apos;d love to hear from you</h2>
            <p className="mt-4 text-muted-foreground">
              Whether you&apos;re a farmer looking for the right implement or a business interested
              in a dealership, get in touch and we&apos;ll respond within one business day.
            </p>

            <ul className="mt-8 space-y-5">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                    {href ? (
                      <a href={href} className="font-semibold text-heading hover:text-brand">
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
              className="mt-8 bg-whatsapp text-white hover:bg-whatsapp/90"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircleMore className="size-4" /> Chat on WhatsApp
            </Button>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the form and our team will get back to you shortly.
            </p>
            <div className="mt-6">
              <EnquiryForm source="quote-form" submitLabel="Send Message" />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
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
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        }}
      />
    </>
  );
}
