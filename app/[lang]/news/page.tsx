import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPosts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
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
    title: dict.newsPage.metaTitle,
    description: dict.newsPage.metaDescription,
    path: "/news",
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const posts = getBlogPosts(dict);

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={dict.blogSection.eyebrow}
        title={dict.blogSection.title}
        description={dict.blogSection.description}
        crumbs={[{ name: dict.nav.news, href: "/news" }]}
        hue={200}
      />

      <section className="section">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
          ))}
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.news, path: "/news" },
        ])}
      />
    </>
  );
}
