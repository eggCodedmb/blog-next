"use client";

import Image from "next/image";
import Link from "next/link";
import { PostItemProps } from "@/types/post";
import { Heart, MessageCircle, Eye, Pencil, Trash2, Clock } from "lucide-react";

function getStatusConfig(status?: string) {
  if (status === "1") return { label: "已发布", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" };
  if (status === "2") return { label: "已拒绝", className: "bg-red-500/10 text-red-600 dark:text-red-400" };
  return { label: "待审核", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" };
}

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
  const minutes = Math.max(1, Math.ceil(text.length / 500));
  return `${minutes} 分钟`;
}

export default function MyPostItem({
  post,
  onDelete,
}: {
  post: PostItemProps & { published?: string };
  onDelete: (id: number) => void;
}) {
  const status = getStatusConfig(post.published);
  const preview = getPreview(post.content);
  const readingTime = getReadingTime(post.content);
  const hasCover = Boolean(post.cover?.trim());
  const createdAt = new Date(post.createdAt).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = () => {
    if (!confirm(`确定要删除「${post.title}」吗？此操作不可撤销。`)) return;
    onDelete(post.id);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-theme bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/20">
      <div className="flex flex-col sm:flex-row">
        {/* Cover */}
        {hasCover && (
          <Link
            href={`/content/${post.id}`}
            className="relative block w-full sm:w-48 md:w-56 flex-shrink-0"
          >
            <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:bg-gradient-to-r" />
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                {status.label}
              </span>
              <span className="text-xs text-muted">{createdAt}</span>
            </div>

            <Link
              href={`/content/${post.id}`}
              className="block font-display text-lg font-bold leading-snug text-theme line-clamp-2 transition-colors group-hover:text-primary sm:text-xl"
            >
              {post.title}
            </Link>

            {preview && (
              <p className="text-sm leading-6 text-muted line-clamp-2">
                {preview}
              </p>
            )}
          </div>

          {/* Footer: stats + actions */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5 text-xs text-muted">
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

            <div className="flex items-center gap-1">
              <Link
                href={`/my-posts/${post.id}/edit`}
                className="btn-icon inline-flex items-center justify-center rounded-lg p-1.5 text-muted transition hover:bg-primary/10 hover:text-primary"
                title="编辑"
              >
                <Pencil className="size-4" />
              </Link>
              <button
                onClick={handleDelete}
                className="btn-icon inline-flex items-center justify-center rounded-lg p-1.5 text-muted transition hover:bg-red-500/10 hover:text-red-500"
                title="删除"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
