"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, Mail, MapPin } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { getMainNav } from "@/lib/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

export function MobileNav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const mainNav = getMainNav(lang, dict);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="size-11 lg:hidden"
            aria-label={dict.a11y.openMenu}
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="sr-only">
            {fill(dict.a11y.siteNavigation, { company: siteConfig.name })}
          </SheetTitle>
          <Logo href={localePath(lang, "/")} tagline={dict.brand.tagline} />
        </SheetHeader>

        <div className="border-b p-4">
          <LanguageSwitcher lang={lang} dict={dict} variant="light" className="w-full" />
        </div>

        <nav className="p-2" aria-label={dict.a11y.mobileNav}>
          <Accordion multiple className="w-full">
            {mainNav.map((item) =>
              item.children ? (
                <AccordionItem key={item.label} value={item.label} className="border-b-0">
                  <AccordionTrigger className="min-h-12 rounded-md px-3 py-3 text-base font-semibold hover:bg-accent hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pl-3">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-brand hover:bg-accent"
                    >
                      {fill(dict.nav.allOf, { label: item.label })}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className="flex min-h-12 items-center rounded-md px-3 py-3 text-base font-semibold hover:bg-accent"
                >
                  {item.label}
                </Link>
              ),
            )}
          </Accordion>
        </nav>

        <div className="space-y-3 border-t p-4 text-sm">
          <a href={siteConfig.contact.phoneHref} className="flex min-h-11 items-center gap-3">
            <Phone className="size-4 shrink-0 text-brand" /> {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex min-h-11 items-center gap-3 break-all"
          >
            <Mail className="size-4 shrink-0 text-brand" /> {siteConfig.contact.email}
          </a>
          <p className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-brand" /> {siteConfig.contact.city},{" "}
            {siteConfig.contact.state}
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              size="lg"
              render={<Link href={localePath(lang, "/contact")} onClick={close} />}
            >
              {dict.common.requestQuote}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-whatsapp text-whatsapp hover:text-whatsapp"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              {dict.common.whatsappUs}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
