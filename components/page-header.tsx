import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";

export type Crumb = { name: string; href: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  hue = 142,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  hue?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <PlaceholderImage hue={hue} icon={false} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/45" />
      <div className="container-site relative py-16 text-white md:py-20">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/75">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                <ChevronRight className="size-3.5" />
                {i === crumbs.length - 1 ? (
                  <span className="text-white" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-white/85">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
