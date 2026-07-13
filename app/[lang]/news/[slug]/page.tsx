import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { blogMeta, getBlogPost, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

export function generateStaticParams() {
  return locales.flatMap((lang) => blogMeta.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const post = getBlogPost(dict, slug);

  if (!post) {
    return buildMetadata({
      lang,
      title: dict.newsPage.articleNotFound,
      description: dict.newsPage.articleNotFound,
      noIndex: true,
    });
  }

  return buildMetadata({
    lang,
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const post = getBlogPost(dict, slug);
  if (!post) notFound();

  const related = getBlogPosts(dict)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={post.category}
        title={post.title}
        hue={post.hue}
        crumbs={[
          { name: dict.nav.news, href: "/news" },
          { name: post.title, href: `/news/${post.slug}` },
        ]}
      />

      <article className="section">
        <div className="container-site max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" /> {formatDate(post.date, lang)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" /> {post.author}
            </span>
          </div>

          <div className="prose-content mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
            <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
            <p>
              {fill(dict.newsPage.intro, {
                company: siteConfig.name,
                title: post.title,
              })}
            </p>
            <h2 className="text-xl font-bold sm:text-2xl">{dict.newsPage.whyHeading}</h2>
            <p>{dict.newsPage.why}</p>
            <h2 className="text-xl font-bold sm:text-2xl">
              {dict.newsPage.recommendationHeading}
            </h2>
            <p>{dict.newsPage.recommendation}</p>
          </div>

          <div className="mt-10 border-t pt-6">
            <Link
              href={localePath(lang, "/news")}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <ArrowLeft className="size-4" /> {dict.common.backToAllArticles}
            </Link>
          </div>
        </div>
      </article>

      <section className="section bg-muted/40">
        <div className="container-site">
          <h2 className="text-2xl font-bold">{dict.common.relatedArticles}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} lang={lang} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.news, path: "/news" },
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
          inLanguage: lang,
          url: absoluteUrl(localePath(lang, `/news/${post.slug}`)),
          author: { "@type": "Organization", name: siteConfig.legalName },
          publisher: {
            "@type": "Organization",
            name: siteConfig.legalName,
            logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(localePath(lang, `/news/${post.slug}`)),
          },
        }}
      />
    </>
  );
}
