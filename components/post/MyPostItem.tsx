import Link from "next/link";
import { PostItemProps } from "@/types/post";

// type MyPostStatus = "0" | "1" | "2";

function getStatusLabel(status?: string) {
  if (status === "1") return "已发布";
  if (status === "2") return "已拒绝";
  return "待审核";
}

export default function MyPostItem({
  post,
  onDelete,
}: {
  post: PostItemProps & { published?: string };
  onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
}) {
  const preview = (post.content || "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 140);

  return (
    <div className="rounded-2xl border border-theme bg-card p-5 sm:p-6 card-glow">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
              {getStatusLabel(post.published)}
            </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <Link
            href={`/content/${post.id}`}
            className="text-lg sm:text-xl font-semibold text-theme hover:underline font-display"
          >
            {post.title}
          </Link>
          {preview ? (
            <p className="text-sm text-muted line-clamp-3">{preview}...</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end lg:min-w-60">
          <Link
            href={`/content/${post.id}`}
            className="btn btn-outline text-muted"
          >
            查看
          </Link>
          <Link href={`/my-posts/${post.id}/edit`} className="btn btn-primary">
            编辑
          </Link>
          <form
            action={async (formData) => {
              await onDelete(formData);
            }}
          >
            <input type="hidden" name="id" value={post.id} />
            <button className="btn btn-outline text-muted">删除</button>
          </form>
        </div>
      </div>
    </div>
  );
}
