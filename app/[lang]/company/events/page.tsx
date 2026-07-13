import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";
import { eventHues } from "@/lib/data";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return buildMetadata({
    lang,
    title: dict.events.metaTitle,
    description: dict.events.metaDescription,
    path: "/company/events",
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={dict.nav.company}
        title={dict.events.title}
        description={dict.events.headerDescription}
        crumbs={[
          { name: dict.nav.company, href: "/company/about" },
          { name: dict.nav.events, href: "/company/events" },
        ]}
        hue={96}
      />
      <section className="section">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:gap-6">
          {dict.events.items.map((e, i) => (
            <article key={e.title} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <PlaceholderImage hue={eventHues[i]} className="aspect-video w-full" />
              <div className="p-5">
                <h2 className="text-lg font-bold text-heading">{e.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 shrink-0 text-brand" /> {e.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0 text-brand" /> {e.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
