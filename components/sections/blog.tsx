import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";

export function Blog() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="From the Blog"
            title="News & Articles"
            description="Practical guides, product news and farming insights from our team."
          />
          <Button variant="outline" className="shrink-0" render={<Link href="/news" />}>
            All articles <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
