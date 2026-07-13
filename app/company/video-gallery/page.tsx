import type { Metadata } from "next";
import { Play } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Video Gallery",
  description: "Product walkthroughs, field demonstrations and company videos.",
  path: "/company/video-gallery",
});

const videos = [
  { title: "Company Overview", hue: 142 },
  { title: "Hydraulic Reversible Plough in Action", hue: 96 },
  { title: "Disc Harrow Field Demo", hue: 200 },
  { title: "Land Leveller Walkthrough", hue: 122 },
];

export default function VideoGalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Company"
        title="Our Video Gallery"
        description="Watch our machinery at work and learn more about how we build it."
        crumbs={[
          { name: "The Company", href: "/company/about" },
          { name: "Video Gallery", href: "/company/video-gallery" },
        ]}
        hue={200}
      />
      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2">
          {videos.map((v) => (
            <a
              key={v.title}
              href={`https://www.youtube.com/watch?v=${siteConfig.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/9]">
                <PlaceholderImage hue={v.hue} icon={false} className="absolute inset-0 size-full" />
                <span className="absolute inset-0 grid place-items-center bg-black/30">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-brand transition-transform group-hover:scale-110">
                    <Play className="size-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-heading group-hover:text-brand">{v.title}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
