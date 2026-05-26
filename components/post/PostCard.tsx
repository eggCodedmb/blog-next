import Image from "next/image";
import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { Heart, MessageCircle } from "lucide-react";

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

export default function PostCard({ post }: { post: PostItemProps }) {
  const preview = getPreview(post.content);
  const hasCover = Boolean(post.cover?.trim());
  const authorName = post.author.name || post.author.email;
  const createdAt = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <article className="group w-full min-w-0 overflow-hidden rounded-xl border border-theme bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/content/${post.id}`}
        className={[
          "grid min-w-0 gap-0",
          hasCover ? "sm:grid-cols-[220px_minmax(0,1fr)]" : "",
        ].join(" ")}
      >
        {hasCover ? (
          <div className="relative min-h-44 overflow-hidden bg-muted/10 sm:min-h-full">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 220px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex h-6 items-center rounded-full border border-theme px-2.5">
              文章
            </span>
            {createdAt ? <span>{createdAt}</span> : null}
          </div>

          <div className="mt-3 min-w-0">
            <h3
              className={[
                "font-display text-xl font-semibold leading-snug text-theme line-clamp-2 transition-colors group-hover:text-primary",
                hasCover ? "sm:text-xl" : "sm:text-2xl",
              ].join(" ")}
            >
              {post.title}
            </h3>

            {preview ? (
              <p
                className={[
                  "mt-2 text-sm leading-6 text-muted wrap-break-word",
                  hasCover ? "line-clamp-3" : "line-clamp-2 sm:line-clamp-3",
                ].join(" ")}
              >
                {preview}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-theme pt-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <Avatar.Root className="size-9 shrink-0 rounded-full bg-muted/20">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src={post.author?.avatar || ""}
                  alt={authorName}
                />
                <Avatar.Fallback className="flex size-full items-center justify-center rounded-[inherit] text-xs text-muted">
                  {authorName.slice(0, 1).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="min-w-0">
                <p className="truncate text-theme">{authorName}</p>
                <p className="text-xs text-muted">作者</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Heart className="size-4" aria-hidden="true" />
                {post._count?.favorites || 0}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="size-4" aria-hidden="true" />
                {post._count?.comments || 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
