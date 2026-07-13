import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function BrochureCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="section">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl bg-brand px-5 py-10 text-white sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent 0 22px, rgba(255,255,255,.6) 22px 23px)",
            }}
          />
          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-sm">
                {dict.brochureCta.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {dict.brochureCta.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
                {dict.brochureCta.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-dark hover:bg-white/90"
                render={<a href={siteConfig.brochures.english} download />}
              >
                <Download className="size-4" /> {dict.brochureCta.english}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 bg-transparent text-white hover:bg-white hover:text-brand-dark"
                render={<a href={siteConfig.brochures.gujarati} download />}
              >
                <Download className="size-4" /> {dict.brochureCta.gujarati}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
