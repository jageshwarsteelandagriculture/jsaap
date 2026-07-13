import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Linkedin, Youtube } from "@/components/brand/social-icons";

import { Logo } from "@/components/brand/logo";
import { footerExploreLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
];

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="mt-auto bg-brand-dark text-white/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="text-sm leading-relaxed text-white/70">
            {siteConfig.shortDescription} Built on over {siteConfig.stats.yearsExperience} years of
            engineering trusted by farmers and dealers nationwide.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerExploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="font-semibold text-white">{siteConfig.legalName}</li>
            <li>
              <a href={contact.phoneHref} className="flex items-start gap-2.5 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-light" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-2.5 hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-light" /> {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-light" />
              <span>
                {contact.addressLine}, {contact.city}, {contact.state} {contact.postalCode}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Brochures</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={siteConfig.brochures.english} className="transition-colors hover:text-white">
                Download Brochure (English)
              </a>
            </li>
            <li>
              <a href={siteConfig.brochures.gujarati} className="transition-colors hover:text-white">
                Download Brochure (Gujarati)
              </a>
            </li>
            <li className="pt-2">
              <Link
                href="/become-a-dealer"
                className="inline-block rounded-md bg-brand px-4 py-2 font-semibold text-white transition-colors hover:bg-brand-light"
              >
                Become a Dealer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            Copyright © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
