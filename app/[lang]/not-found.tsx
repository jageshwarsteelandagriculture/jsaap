"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

/**
 * Next does not pass `params` to a not-found boundary, so the locale is read
 * back off the URL — that keeps the 404 in the visitor's language instead of
 * dropping them into English.
 */
export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const lang = hasLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-5xl font-extrabold text-brand sm:text-6xl">404</p>
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.notFound.title}</h1>
      <p className="max-w-md text-muted-foreground">{dict.notFound.body}</p>
      <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
        <Button size="lg" render={<Link href={localePath(lang, "/")} />}>
          <Home className="size-4" /> {dict.common.backToHome}
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<a href={siteConfig.contact.phoneHref} />}
        >
          <Phone className="size-4" /> {dict.common.callUs}
        </Button>
      </div>
    </div>
  );
}
