import { Mail, Phone, Download, MessageCircleMore } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/fill";

export function Quote({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { contact } = siteConfig;

  return (
    <section id="quote" className="section bg-brand-dark text-white">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left: contact copy + CTAs. min-w-0 so the email address cannot widen
            the grid column past the viewport on narrow phones. */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow={dict.quote.eyebrow}
            title={<span className="text-white">{dict.quote.title}</span>}
            className="[&_.eyebrow]:text-brand-light"
          />
          <p className="mt-4 max-w-md text-white/80">
            {fill(dict.quote.description, { company: siteConfig.name })}
          </p>

          <div className="mt-8 space-y-4">
            <a href={contact.phoneHref} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
                <Phone className="size-5 text-brand-light" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs uppercase tracking-wide text-white/60">
                  {dict.common.callAnytime}
                </span>
                <span className="font-semibold">{contact.phone}</span>
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
                <Mail className="size-5 text-brand-light" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs uppercase tracking-wide text-white/60">
                  {dict.common.emailUs}
                </span>
                <span className="break-all font-semibold">{contact.email}</span>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-brand-dark hover:bg-white/90"
              render={<a href={siteConfig.brochures.english} download />}
            >
              <Download className="size-4" /> {dict.brochureCta.shortEnglish}
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-brand-dark hover:bg-white/90"
              render={<a href={siteConfig.brochures.gujarati} download />}
            >
              <Download className="size-4" /> {dict.brochureCta.shortGujarati}
            </Button>
            <Button
              className="bg-whatsapp text-white hover:bg-whatsapp/90"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircleMore className="size-4" /> {dict.common.whatsapp}
            </Button>
          </div>
        </div>

        {/* Right: enquiry form on a light card */}
        <div className="rounded-2xl bg-background p-5 text-foreground shadow-xl sm:p-8">
          <h3 className="text-xl font-bold text-heading">{dict.quote.formTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{dict.quote.formSubtitle}</p>
          <div className="mt-6">
            <EnquiryForm
              lang={lang}
              dict={dict}
              source="quote-form"
              submitLabel={dict.common.enquireNow}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
