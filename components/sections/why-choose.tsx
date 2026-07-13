import Link from "next/link";
import { ShieldCheck, Users, Wrench, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Button } from "@/components/ui/button";
import { benefits } from "@/lib/data";

const icons = [ShieldCheck, Users, Wrench];

export function WhyChoose() {
  return (
    <section className="section bg-brand-tint/60">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Our Farm Benefits"
            title="Why Choose Our Company"
            description="Over four decades of diligence and quality, strong links with the agricultural community, and a reputation preferred both locally and internationally."
          />

          <ul className="mt-8 space-y-5">
            {benefits.map((benefit, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={benefit.title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                    <Icon className="size-6" />
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

          <Button size="lg" className="mt-8" render={<Link href="/company/about" />}>
            More About Us <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="order-first grid grid-cols-2 gap-4 lg:order-last">
          <PlaceholderImage hue={142} className="aspect-[3/4] rounded-2xl" label="In the field" />
          <div className="grid gap-4">
            <PlaceholderImage hue={96} className="aspect-square rounded-2xl" label="Precision build" />
            <PlaceholderImage hue={32} className="aspect-square rounded-2xl" label="Harvest ready" />
          </div>
        </div>
      </div>
    </section>
  );
}
