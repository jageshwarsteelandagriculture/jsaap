"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

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
    <section aria-label="Featured" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, i) => {
            // Exactly one <h1> per page: the first slide is the heading,
            // the rest are styled paragraphs.
            const Title = i === 0 ? "h1" : "p";
            return (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[clamp(460px,70vh,640px)]">
                <PlaceholderImage hue={slide.hue} icon={false} className="absolute inset-0 size-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
                <div className="container-site relative flex h-full items-center">
                  <div className="max-w-xl text-white">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur">
                      {slide.eyebrow}
                    </span>
                    <Title className="mt-5 text-4xl font-bold leading-[1.1] text-white drop-shadow sm:text-5xl lg:text-[3.4rem]">
                      {slide.title}
                    </Title>
                    <p className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
                      {slide.subtitle}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button size="lg" render={<Link href={slide.ctaHref} />}>
                        {slide.ctaLabel} <ArrowRight className="size-4" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-brand-dark"
                        render={<Link href="/contact" />}
                      >
                        Get a Quote
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

      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition-colors hover:bg-white hover:text-brand-dark sm:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition-colors hover:bg-white hover:text-brand-dark sm:grid"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
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
