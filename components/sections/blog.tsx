import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

export function Blog({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const posts = getBlogPosts(dict);

  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.blogSection.eyebrow}
            title={dict.blogSection.title}
            description={dict.blogSection.description}
          />
          <Button
            variant="outline"
            className="w-full shrink-0 sm:w-auto"
            render={<Link href={localePath(lang, "/news")} />}
          >
            {dict.common.allArticles} <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
