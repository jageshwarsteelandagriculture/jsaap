import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { videoHues } from "@/lib/data";
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
    title: dict.videoGallery.metaTitle,
    description: dict.videoGallery.metaDescription,
    path: "/company/video-gallery",
  });
}

export default async function VideoGalleryPage({
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
        title={dict.videoGallery.title}
        description={dict.videoGallery.headerDescription}
        crumbs={[
          { name: dict.nav.company, href: "/company/about" },
          { name: dict.nav.videoGallery, href: "/company/video-gallery" },
        ]}
        hue={200}
      />
      <section className="section">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:gap-6">
          {dict.videoGallery.videos.map((title, i) => (
            <a
              key={title}
              href={`https://www.youtube.com/watch?v=${siteConfig.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video">
                <PlaceholderImage
                  hue={videoHues[i]}
                  icon={false}
                  className="absolute inset-0 size-full"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/30">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-brand transition-transform group-hover:scale-110">
                    <Play className="size-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-heading group-hover:text-brand">{title}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
