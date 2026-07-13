"use client";

import { useEffect, useRef, useState } from "react";
import { Tractor, Factory, Star, Handshake } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { icon: Tractor, value: siteConfig.stats.yearsExperience, suffix: "+", label: "Years of Experience" },
  { icon: Factory, value: siteConfig.stats.productionAreaSqMtr, suffix: "+", label: "Sq Mtr Production Area" },
  { icon: Star, value: siteConfig.stats.fiveStarReviews, suffix: "+", label: "5-Star Reviews" },
  { icon: Handshake, value: siteConfig.stats.dealers, suffix: "+", label: "Dealers Nationwide" },
];

export function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

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
      <div ref={ref} className="container-site grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon className="mb-3 size-8 text-brand-light" strokeWidth={1.5} />
            <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <CountUp target={value} run={active} />
              {suffix}
            </div>
            <div className="mt-2 text-sm font-medium text-white/75">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ target, run, duration = 1600 }: { target: number; run: boolean; duration?: number }) {
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

  return <span>{value.toLocaleString("en-IN")}</span>;
}
