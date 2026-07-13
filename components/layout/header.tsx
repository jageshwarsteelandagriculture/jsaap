"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircleMore, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/layout/search-dialog";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useInquiryModal } from "@/components/inquiry/inquiry-modal";
import { Facebook, Linkedin, Youtube } from "@/components/brand/social-icons";
import { getMainNav } from "@/lib/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
];

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { open } = useInquiryModal();
  const mainNav = getMainNav(lang, dict);

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Top utility bar. On mobile this carries the language switcher and the
          two actions farmers reach for first — quote and WhatsApp. */}
      <div className="bg-brand-dark text-white">
        <div className="container-site flex min-h-11 items-center justify-between gap-2 py-1 text-xs sm:text-sm">
          <p className="hidden truncate font-medium lg:block">
            {fill(dict.common.headerTagline, {
              tagline: dict.brand.tagline,
              year: siteConfig.foundingYear,
            })}
          </p>

          <div className="flex flex-1 items-center gap-0.5 sm:gap-2 lg:flex-none">
            <LanguageSwitcher lang={lang} dict={dict} />

            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:block" />

            <button
              type="button"
              onClick={open}
              className="hidden min-h-9 rounded px-2 py-1 font-semibold transition-colors hover:bg-white/10 sm:inline-flex sm:items-center"
            >
              {dict.common.requestQuote}
            </button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded px-2 py-1 font-semibold transition-colors hover:bg-white/10 sm:ml-0"
            >
              <MessageCircleMore className="size-4" />
              <span className="hidden sm:inline">{dict.common.whatsapp}</span>
            </a>
            <SearchDialog
              lang={lang}
              dict={dict}
              className="grid min-h-9 min-w-9 place-items-center rounded transition-colors hover:bg-white/10"
            />
          </div>
        </div>
      </div>

      {/* Main bar: logo, contact blocks, socials, menu trigger */}
      <div className="container-site flex items-center justify-between gap-3 py-3">
        <Logo href={localePath(lang, "/")} tagline={dict.brand.tagline} />

        <div className="hidden items-stretch gap-6 xl:flex">
          <ContactBlock
            Icon={Phone}
            label={dict.common.callAnytime}
            value={siteConfig.contact.phone}
            href={siteConfig.contact.phoneHref}
          />
          <ContactBlock
            Icon={Mail}
            label={dict.common.sendEmailLabel}
            value={siteConfig.contact.email}
            href={`mailto:${siteConfig.contact.email}`}
          />
          <ContactBlock
            Icon={MapPin}
            label={dict.common.location}
            value={`${siteConfig.contact.city}, ${siteConfig.contact.state}`}
            href={siteConfig.contact.mapUrl}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <MobileNav lang={lang} dict={dict} />
        </div>
      </div>

      {/* Desktop navigation bar */}
      <div className="hidden border-t bg-secondary/60 lg:block">
        <div className="container-site flex items-center justify-between">
          <nav aria-label={dict.a11y.primaryNav}>
            <ul className="flex items-center">
              {mainNav.map((item) => (
                <li key={item.label} className="group relative">
                  {item.children ? (
                    <>
                      <Link
                        href={item.href}
                        className="inline-flex h-16 items-center gap-1 px-3 text-[0.95rem] font-semibold transition-colors hover:text-brand group-focus-within:text-brand"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                      </Link>
                      <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-lg border bg-popover p-2 opacity-0 shadow-lg ring-1 ring-foreground/5 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm font-semibold text-brand hover:bg-accent"
                        >
                          {fill(dict.nav.allOf, { label: item.label })}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex h-16 items-center px-3 text-[0.95rem] font-semibold transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Button render={<Link href={localePath(lang, "/contact")} />} size="sm" className="my-2">
            {dict.common.getQuote}
          </Button>
        </div>
      </div>
    </header>
  );
}

function ContactBlock({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-full bg-brand-tint text-brand">
        <Icon className="size-4" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-semibold text-heading group-hover:text-brand">
          {value}
        </span>
      </span>
    </a>
  );
}
