import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const features = [
  "Manufacturing tractor-mounted agricultural equipment",
  "Technologically-driven, field-tested farming equipment",
  "Nationwide dealer network with genuine spare parts",
];

export function Intro() {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        {/* Image collage */}
        <div className="relative">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 h-[420px] sm:h-[480px]">
            <PlaceholderImage hue={142} className="col-span-3 row-span-5 rounded-2xl" label="Manufacturing floor" />
            <PlaceholderImage hue={96} className="col-span-2 row-span-3 rounded-2xl" label="Field testing" />
            <PlaceholderImage hue={32} className="col-span-2 row-span-2 rounded-2xl" label="Quality steel" />
          </div>
          <div className="absolute -bottom-6 left-6 hidden rounded-xl bg-brand px-6 py-4 text-white shadow-xl sm:block">
            <div className="text-3xl font-extrabold">{siteConfig.stats.yearsExperience}+</div>
            <div className="text-xs font-medium uppercase tracking-wide text-white/80">
              Years of Experience
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="Our Introduction"
            title="Most reliable and competent agriculture equipment manufacturer"
          />
          <p className="mt-4 text-lg font-semibold text-brand">
            With over four decades of diligence and quality.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} manufactures a comprehensive range of tractor-mounted agricultural
            equipment. For over {siteConfig.stats.yearsExperience} years we have combined practical
            farming knowledge with modern manufacturing to build implements that are dependable,
            durable and genuinely valuable for farmers.
          </p>

          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Check className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="mt-8" render={<Link href="/company/about" />}>
            More About Us <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
