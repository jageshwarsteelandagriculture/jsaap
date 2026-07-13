import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

/** `href` is an unprefixed app path — this component localizes it. */
export type Crumb = { name: string; href: string };

export function PageHeader({
  lang,
  dict,
  eyebrow,
  title,
  description,
  crumbs = [],
  hue = 142,
}: {
  lang: Locale;
  dict: Dictionary;
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  hue?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <PlaceholderImage hue={hue} icon={false} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/45" />
      <div className="container-site relative py-12 text-white sm:py-16 md:py-20">
        <nav aria-label={dict.a11y.breadcrumb} className="mb-3 sm:mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-white/75 sm:text-sm">
            <li>
              <Link href={localePath(lang, "/")} className="hover:text-white">
                {dict.common.home}
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                <ChevronRight className="size-3.5 shrink-0" />
                {i === crumbs.length - 1 ? (
                  <span className="text-white" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={localePath(lang, c.href)} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light sm:text-sm">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:mt-4 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
