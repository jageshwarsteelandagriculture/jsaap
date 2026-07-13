"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { getHeroSlides } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";
import { cn } from "@/lib/utils";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const slides = getHeroSlides(dict);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(id);
    };
  }, [emblaApi]);

  return (
    <section aria-label={dict.a11y.featured} className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => {
            // Exactly one <h1> per page: the first slide is the heading,
            // the rest are styled paragraphs.
            const Title = i === 0 ? "h1" : "p";
            return (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative min-h-[clamp(420px,72vh,640px)]">
                  <PlaceholderImage
                    hue={slide.hue}
                    icon={false}
                    className="absolute inset-0 size-full"
                  />
                  {/* Text sits over the image on mobile, so the scrim runs top-to-bottom
                      there and left-to-right once there is room beside it. */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/45 sm:to-black/20" />
                  <div className="container-site relative flex min-h-[clamp(420px,72vh,640px)] items-center py-14">
                    <div className="max-w-xl text-white">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur sm:text-xs">
                        {slide.eyebrow}
                      </span>
                      <Title className="mt-4 text-[1.75rem] font-bold leading-[1.15] text-white drop-shadow sm:mt-5 sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
                        {slide.title}
                      </Title>
                      <p className="mt-4 max-w-lg text-sm text-white/85 sm:mt-5 sm:text-base lg:text-lg">
                        {slide.subtitle}
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                        <Button size="lg" render={<Link href={localePath(lang, slide.ctaHref)} />}>
                          {slide.ctaLabel} <ArrowRight className="size-4" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-brand-dark"
                          render={<Link href={localePath(lang, "/contact")} />}
                        >
                          {dict.common.getQuote}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows — pointer devices only; on touch the carousel is swipeable */}
      <button
        type="button"
        aria-label={dict.a11y.prevSlide}
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition-colors hover:bg-white hover:text-brand-dark sm:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label={dict.a11y.nextSlide}
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition-colors hover:bg-white hover:text-brand-dark sm:grid"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={fill(dict.a11y.goToSlide, { n: i + 1 })}
            aria-current={selected === i}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 rounded-full bg-white/50 transition-all",
              selected === i ? "w-7 bg-white" : "w-2.5 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
