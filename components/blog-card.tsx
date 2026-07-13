import Link from "next/link";
import { CalendarDays, User } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/news/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <PlaceholderImage
          hue={post.hue}
          className="size-full transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" /> {post.author}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-heading transition-colors group-hover:text-brand">
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <Link
          href={`/news/${post.slug}`}
          className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
