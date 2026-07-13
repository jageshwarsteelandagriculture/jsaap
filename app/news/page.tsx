import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News & Articles",
  description: "Product news, farming guides and equipment insights from our team.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the Blog"
        title="News & Articles"
        description="Practical guides, product news and farming insights from our team."
        crumbs={[{ name: "News", href: "/news" }]}
        hue={200}
      />

      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ])}
      />
    </>
  );
}
