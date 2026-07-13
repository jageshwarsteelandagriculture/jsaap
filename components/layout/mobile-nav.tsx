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
import { mainNav } from "@/lib/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="sr-only">{siteConfig.name} navigation</SheetTitle>
          <Logo />
        </SheetHeader>

        <nav className="p-2" aria-label="Mobile">
          <Accordion multiple className="w-full">
            {mainNav.map((item) =>
              item.children ? (
                <AccordionItem key={item.label} value={item.label} className="border-b-0">
                  <AccordionTrigger className="rounded-md px-3 py-3 text-base font-semibold hover:bg-accent hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pl-3">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-brand hover:bg-accent"
                    >
                      All {item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
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
                  className="block rounded-md px-3 py-3 text-base font-semibold hover:bg-accent"
                >
                  {item.label}
                </Link>
              ),
            )}
          </Accordion>
        </nav>

        <div className="space-y-3 border-t p-4 text-sm">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3">
            <Phone className="size-4 text-brand" /> {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3">
            <Mail className="size-4 text-brand" /> {siteConfig.contact.email}
          </a>
          <p className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="size-4 text-brand" /> {siteConfig.contact.city},{" "}
            {siteConfig.contact.state}
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Button render={<Link href="/contact" onClick={close} />}>Request a Quote</Button>
            <Button
              variant="outline"
              className="border-whatsapp text-whatsapp hover:text-whatsapp"
              render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
