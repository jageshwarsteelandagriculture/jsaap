import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Events",
  description: "Exhibitions, dealer meets and farm demonstrations we take part in.",
  path: "/company/events",
});

const events = [
  { title: "National Agri Machinery Expo", date: "12 – 15 March 2026", location: "Pune, Maharashtra", hue: 142 },
  { title: "Regional Dealer Meet", date: "08 February 2026", location: "Rajkot, Gujarat", hue: 96 },
  { title: "Live Field Demonstration", date: "20 January 2026", location: "Ludhiana, Punjab", hue: 122 },
  { title: "Kisan Agri Show", date: "05 – 07 December 2025", location: "Nashik, Maharashtra", hue: 200 },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Company"
        title="Our Events"
        description="Meet us at exhibitions, dealer meets and on-field demonstrations across the country."
        crumbs={[
          { name: "The Company", href: "/company/about" },
          { name: "Our Events", href: "/company/events" },
        ]}
        hue={96}
      />
      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2">
          {events.map((e) => (
            <article key={e.title} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <PlaceholderImage hue={e.hue} className="aspect-[16/9] w-full" />
              <div className="p-5">
                <h2 className="text-lg font-bold text-heading">{e.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-brand" /> {e.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-brand" /> {e.location}
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
