import { Mail, Phone, Download, MessageCircleMore } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function Quote() {
  const { contact } = siteConfig;

  return (
    <section id="quote" className="section bg-brand-dark text-white">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        {/* Left: contact copy + CTAs */}
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title={<span className="text-white">Request a Quote</span>}
            className="[&_.eyebrow]:text-brand-light"
          />
          <p className="mt-4 max-w-md text-white/80">
            Have questions about how {siteConfig.name} can help your farm or dealership? Share your
            requirements and our team will prepare a tailored quote.
          </p>

          <div className="mt-8 space-y-4">
            <a href={contact.phoneHref} className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-white/10">
                <Phone className="size-5 text-brand-light" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-white/60">Call anytime</span>
                <span className="font-semibold">{contact.phone}</span>
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-white/10">
                <Mail className="size-5 text-brand-light" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-white/60">Email us</span>
                <span className="font-semibold">{contact.email}</span>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-brand-dark hover:bg-white/90"
              render={<a href={siteConfig.brochures.english} download />}
            >
              <Download className="size-4" /> Brochure (EN)
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-brand-dark hover:bg-white/90"
              render={<a href={siteConfig.brochures.gujarati} download />}
            >
              <Download className="size-4" /> Brochure (GU)
            </Button>
            <Button
              className="bg-whatsapp text-white hover:bg-whatsapp/90"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircleMore className="size-4" /> WhatsApp
            </Button>
          </div>
        </div>

        {/* Right: enquiry form on a light card */}
        <div className="rounded-2xl bg-background p-6 text-foreground shadow-xl sm:p-8">
          <h3 className="text-xl font-bold text-heading">Send an enquiry</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the form and we&apos;ll get back to you within one business day.
          </p>
          <div className="mt-6">
            <EnquiryForm source="quote-form" submitLabel="Enquire Now" />
          </div>
        </div>
      </div>
    </section>
  );
}
