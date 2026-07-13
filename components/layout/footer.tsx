import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Linkedin, Youtube } from "@/components/brand/social-icons";

import { Logo } from "@/components/brand/logo";
import { getFooterExploreLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { contact } = siteConfig;
  const exploreLinks = getFooterExploreLinks(lang, dict);

  return (
    <footer className="mt-auto bg-brand-dark text-white/80">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div className="space-y-4">
          <Logo variant="light" href={localePath(lang, "/")} tagline={dict.brand.tagline} />
          <p className="text-sm leading-relaxed text-white/70">
            {fill(dict.footer.blurb, {
              short: dict.brand.shortDescription,
              years: siteConfig.stats.yearsExperience,
            })}
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.explore}
          </h3>
          <ul className="mt-4 space-y-1 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-9 items-center transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="font-semibold text-white">{siteConfig.legalName}</li>
            <li>
              <a
                href={contact.phoneHref}
                className="flex min-h-9 items-start gap-2.5 hover:text-white"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-light" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-9 items-start gap-2.5 break-all hover:text-white"
              >
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
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.brochures}
          </h3>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a
                href={siteConfig.brochures.english}
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                {dict.brochureCta.downloadEnglish}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.brochures.gujarati}
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                {dict.brochureCta.downloadGujarati}
              </a>
            </li>
            <li className="pt-2">
              <Link
                href={localePath(lang, "/become-a-dealer")}
                className="inline-flex min-h-11 items-center rounded-md bg-brand px-4 py-2 font-semibold text-white transition-colors hover:bg-brand-light"
              >
                {dict.nav.becomeADealer}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>
            {fill(dict.footer.copyright, {
              year: new Date().getFullYear(),
              company: siteConfig.legalName,
            })}
          </p>
          <p>
            <Link href={localePath(lang, "/privacy-policy")} className="hover:text-white">
              {dict.nav.privacyPolicy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
