"use client";

import { useEffect, useRef, useState } from "react";
import { Tractor, Factory, Star, Handshake } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatNumber } from "@/lib/format";

export function Counters({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const stats = [
    {
      icon: Tractor,
      value: siteConfig.stats.yearsExperience,
      label: dict.counters.yearsExperience,
    },
    {
      icon: Factory,
      value: siteConfig.stats.productionAreaSqMtr,
      label: dict.counters.productionArea,
    },
    {
      icon: Star,
      value: siteConfig.stats.fiveStarReviews,
      label: dict.counters.fiveStarReviews,
    },
    { icon: Handshake, value: siteConfig.stats.dealers, label: dict.counters.dealers },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-brand-dark text-white">
      <div
        ref={ref}
        className="container-site grid grid-cols-2 gap-8 py-12 lg:grid-cols-4 lg:py-14"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon className="mb-3 size-7 text-brand-light sm:size-8" strokeWidth={1.5} />
            <div className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              <CountUp target={value} run={active} lang={lang} />+
            </div>
            <div className="mt-2 text-xs font-medium text-white/75 sm:text-sm">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({
  target,
  run,
  lang,
  duration = 1600,
}: {
  target: number;
  run: boolean;
  lang: Locale;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo for a snappy count
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return <span>{formatNumber(value, lang)}</span>;
}
