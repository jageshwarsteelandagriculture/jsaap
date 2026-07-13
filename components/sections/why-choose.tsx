import Link from "next/link";
import { ShieldCheck, Users, Wrench, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

const icons = [ShieldCheck, Users, Wrench];

export function WhyChoose({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="section bg-brand-tint/60">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            eyebrow={dict.whyChoose.eyebrow}
            title={dict.whyChoose.title}
            description={dict.whyChoose.description}
          />

          <ul className="mt-8 space-y-5">
            {dict.whyChoose.benefits.map((benefit, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={benefit.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-white sm:size-12">
                    <Icon className="size-5 sm:size-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-heading">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Button
            size="lg"
            className="mt-8 w-full sm:w-auto"
            render={<Link href={localePath(lang, "/company/about")} />}
          >
            {dict.common.moreAboutUs} <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="order-first grid grid-cols-2 gap-3 sm:gap-4 lg:order-last">
          <PlaceholderImage
            hue={142}
            className="aspect-3/4 rounded-2xl"
            label={dict.whyChoose.imageField}
          />
          <div className="grid gap-3 sm:gap-4">
            <PlaceholderImage
              hue={96}
              className="aspect-square rounded-2xl"
              label={dict.whyChoose.imagePrecision}
            />
            <PlaceholderImage
              hue={32}
              className="aspect-square rounded-2xl"
              label={dict.whyChoose.imageHarvest}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
