"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, BadgeCheck, ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Initial sync from the Embla API (an external system).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="section bg-muted/40">
      <div className="container-site">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Our Testimonials"
            title="What They're Saying About Our Company"
            description="Customer satisfaction and product quality drive everything we build. Here is what farmers across the country say about working with us."
          />
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-harvest text-harvest" />
                ))}
              </div>
              <span className="text-sm font-semibold">
                {siteConfig.googleReviews.rating} · {siteConfig.googleReviews.count.toLocaleString("en-IN")} Google reviews
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              render={<a href={siteConfig.googleReviews.writeReviewUrl} target="_blank" rel="noopener noreferrer" />}
            >
              Write a review <ExternalLink className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="min-w-0 flex-[0_0_100%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <figure className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-harvest text-harvest" />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{t.source}</span>
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                      <span className="grid size-10 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                        {t.name.charAt(0)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-heading">{t.name}</span>
                        <span className="text-xs text-muted-foreground">{t.location}</span>
                      </span>
                      {t.verified ? (
                        <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-brand">
                          <BadgeCheck className="size-4" /> Verified
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <CarouselButton dir="prev" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} />
            <CarouselButton dir="next" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
      className={cn(
        "grid size-11 place-items-center rounded-full border bg-card text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white",
        disabled && "opacity-40 hover:border-border hover:bg-card hover:text-foreground",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
