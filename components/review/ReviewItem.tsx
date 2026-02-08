import Link from "next/link";
import { PostItemProps } from "@/types/post";

type ReviewItemProps = {
  post: PostItemProps;
  status: "0" | "1" | "2";
  approveAction: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  rejectAction: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
};

export default function ReviewItem({
  post,
  status,
  approveAction,
  rejectAction,
}: ReviewItemProps) {
  const preview = (post.content || "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 140);

  const statusLabel =
    status === "1" ? "已审核" : status === "2" ? "已拒绝" : "待审核";

  return (
    <div className="rounded-2xl border border-theme bg-card p-5 sm:p-6 card-glow">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
              {statusLabel}
            </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
            <span>·</span>
            <span>{post.author?.name || post.author?.email || "匿名用户"}</span>
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
        <div className="flex flex-wrap items-center gap-2 lg:justify-end lg:min-w-[240px]">
          <Link
            href={`/content/${post.id}`}
            className="btn btn-outline text-muted"
          >
            查看
          </Link>
          {status !== "1" && (
            <>
              <form action={approveAction}>
                <input type="hidden" name="id" value={post.id} />
                <button className="btn btn-primary">通过</button>
              </form>
              {status !== "2" && (
                <form action={rejectAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="btn btn-outline text-muted">拒绝</button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
