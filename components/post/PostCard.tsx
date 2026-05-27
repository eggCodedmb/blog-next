import Image from "next/image";
import { PostItemProps } from "@/types/post";
import Link from "next/link";
import { Heart, MessageCircle, Clock, Eye } from "lucide-react";

function getPreview(content: string | null) {
  return (content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getReadingTime(content: string | null) {
  const text = getPreview(content);
  const words = text.length;
  const minutes = Math.max(1, Math.ceil(words / 500));
  return `${minutes} 分钟`;
}

export default function PostCard({ post }: { post: PostItemProps }) {
  const preview = getPreview(post.content);
  const readingTime = getReadingTime(post.content);
  const hasCover = Boolean(post.cover?.trim());
  const createdAt = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/content/${post.id}`} className="group block min-w-0">
      <article className="overflow-hidden rounded-2xl border border-theme bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
        {hasCover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 720px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              文章
            </span>
            {createdAt && (
              <span className="text-xs text-muted">{createdAt}</span>
            )}
          </div>

          <h3 className="font-display text-xl font-bold leading-snug text-theme line-clamp-2 transition-colors group-hover:text-primary sm:text-2xl">
            {post.title}
          </h3>

          {preview && (
            <p className="text-sm leading-7 text-muted line-clamp-2 sm:line-clamp-3">
              {preview}
            </p>
          )}

          <div className="mt-1 flex items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3.5" />
              {post.viewCount || 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="size-3.5" />
              {post._count?.favorites || 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" />
              {post._count?.comments || 0}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
