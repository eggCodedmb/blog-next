import Image from "next/image";
import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";

export default function PostCard({ post }: { post: PostItemProps }) {
  const preview = (post.content || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);

  return (
    <article className="w-full min-w-0 bg-card rounded-2xl border border-theme p-4 sm:p-5 hover:shadow-md transition-shadow card-glow overflow-hidden">
      <Link href={`/content/${post.id}`}>
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
                文章
              </span>
              <span>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-theme font-display line-clamp-2">
              {post.title}
            </h3>

            {preview ? (
              <p className="mt-2 text-sm text-muted line-clamp-3 wrap-break-word">
                {preview}...
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar.Root className="w-9 h-9 rounded-full">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={post.author?.avatar || ""}
                alt={post.author?.name || ""}
              />
            </Avatar.Root>
            <div className="min-w-0">
              <p className="text-theme truncate">
                {post.author.name || post.author.email}
              </p>
              <p className="text-xs text-muted">作者</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Image
                src="/assets/like.svg"
                alt="收藏"
                width={18}
                height={18}
              />
              <span>{post._count?.favorites || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/assets/reply.svg"
                alt="评论"
                width={18}
                height={18}
              />
              <span>{post._count?.comments || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
