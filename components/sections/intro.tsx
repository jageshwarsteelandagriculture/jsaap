import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

export function Intro({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Image collage */}
        <div className="relative">
          <div className="grid h-85 grid-cols-5 grid-rows-5 gap-3 sm:h-120 sm:gap-4">
            <PlaceholderImage
              hue={142}
              className="col-span-3 row-span-5 rounded-2xl"
              label={dict.intro.imageManufacturing}
            />
            <PlaceholderImage
              hue={96}
              className="col-span-2 row-span-3 rounded-2xl"
              label={dict.intro.imageFieldTesting}
            />
            <PlaceholderImage
              hue={32}
              className="col-span-2 row-span-2 rounded-2xl"
              label={dict.intro.imageSteel}
            />
          </div>
          <div className="absolute -bottom-6 left-6 hidden rounded-xl bg-brand px-6 py-4 text-white shadow-xl sm:block">
            <div className="text-3xl font-extrabold">{siteConfig.stats.yearsExperience}+</div>
            <div className="text-xs font-medium uppercase tracking-wide text-white/80">
              {dict.intro.yearsOfExperience}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading eyebrow={dict.intro.eyebrow} title={dict.intro.title} />
          <p className="mt-4 text-base font-semibold text-brand sm:text-lg">{dict.intro.lead}</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {fill(dict.intro.body, {
              company: siteConfig.name,
              years: siteConfig.stats.yearsExperience,
            })}
          </p>

          <ul className="mt-6 space-y-3">
            {dict.intro.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Check className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="mt-8 w-full sm:w-auto"
            render={<Link href={localePath(lang, "/company/about")} />}
          >
            {dict.common.moreAboutUs} <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
