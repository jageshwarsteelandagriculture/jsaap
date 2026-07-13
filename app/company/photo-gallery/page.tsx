import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Photo Gallery",
  description: "Photos from our manufacturing facility, products and field operations.",
  path: "/company/photo-gallery",
});

const photos = [
  { label: "Manufacturing floor", hue: 142 },
  { label: "Plough assembly", hue: 96 },
  { label: "Field testing", hue: 122 },
  { label: "Quality inspection", hue: 32 },
  { label: "Harvest season", hue: 48 },
  { label: "Disc harrow line", hue: 200 },
  { label: "Dealer meet", hue: 160 },
  { label: "Land levelling", hue: 110 },
];

export default function PhotoGalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Company"
        title="Our Photo Gallery"
        description="A look inside our manufacturing, products and the farms we serve."
        crumbs={[
          { name: "The Company", href: "/company/about" },
          { name: "Photo Gallery", href: "/company/photo-gallery" },
        ]}
      />
      <section className="section">
        <div className="container-site grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <PlaceholderImage
              key={p.label}
              hue={p.hue}
              label={p.label}
              className="aspect-square rounded-xl"
            />
          ))}
        </div>
      </section>
    </>
  );
}
