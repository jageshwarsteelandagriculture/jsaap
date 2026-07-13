import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function BrochureCta() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-12 text-white sm:px-12 sm:py-14">
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                Achieving more, together
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                The partner for successful farming
              </h2>
              <p className="mt-3 max-w-xl text-white/85">
                Download our complete product brochure to explore specifications, sizes and
                applications for every implement in our range.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-dark hover:bg-white/90"
                render={<a href={siteConfig.brochures.english} download />}
              >
                <Download className="size-4" /> Brochure (English)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 bg-transparent text-white hover:bg-white hover:text-brand-dark"
                render={<a href={siteConfig.brochures.gujarati} download />}
              >
                <Download className="size-4" /> Brochure (Gujarati)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
