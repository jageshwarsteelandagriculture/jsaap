import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";
import { photoHues } from "@/lib/data";
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
    title: dict.photoGallery.metaTitle,
    description: dict.photoGallery.metaDescription,
    path: "/company/photo-gallery",
  });
}

export default async function PhotoGalleryPage({
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
        title={dict.photoGallery.title}
        description={dict.photoGallery.headerDescription}
        crumbs={[
          { name: dict.nav.company, href: "/company/about" },
          { name: dict.nav.photoGallery, href: "/company/photo-gallery" },
        ]}
      />
      <section className="section">
        <div className="container-site grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {dict.photoGallery.photos.map((label, i) => (
            <PlaceholderImage
              key={label}
              hue={photoHues[i]}
              label={label}
              className="aspect-square rounded-xl"
            />
          ))}
        </div>
      </section>
    </>
  );
}
