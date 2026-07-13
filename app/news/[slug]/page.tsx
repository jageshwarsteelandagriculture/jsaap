import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Article not found", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        hue={post.hue}
        crumbs={[
          { name: "News", href: "/news" },
          { name: post.title, href: `/news/${post.slug}` },
        ]}
      />

      <article className="section">
        <div className="container-site max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" /> {post.author}
            </span>
          </div>

          <div className="prose-content mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
            <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
            <p>
              At {siteConfig.name}, we believe the right equipment transforms how farms operate.
              This article explores the practical considerations behind {post.title.toLowerCase()},
              drawing on decades of manufacturing experience and feedback from farmers across the
              country.
            </p>
            <h2 className="text-2xl font-bold">Why it matters</h2>
            <p>
              Choosing and maintaining the correct implement directly affects fuel use, soil health
              and ultimately yield. Modern tractor-mounted machinery is engineered to deliver
              consistent results while reducing the labour and time required for each operation.
            </p>
            <h2 className="text-2xl font-bold">Our recommendation</h2>
            <p>
              Speak with our team about your soil type, tractor HP and acreage and we&apos;ll help
              you match the ideal implement. Every machine is backed by genuine spare parts and a
              nationwide dealer network.
            </p>
          </div>

          <div className="mt-10 border-t pt-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              <ArrowLeft className="size-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <section className="section bg-muted/40">
        <div className="container-site">
          <h2 className="text-2xl font-bold">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          url: absoluteUrl(`/news/${post.slug}`),
          author: { "@type": "Organization", name: siteConfig.legalName },
          publisher: {
            "@type": "Organization",
            name: siteConfig.legalName,
            logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/news/${post.slug}`) },
        }}
      />
    </>
  );
}
