import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/user/user.action";
import ReviewInfiniteSection from "@/components/review/ReviewInfiniteSection";
import ReviewFilter from "@/components/review/ReviewFilter";
import {
  approvePost,
  getReviewCount,
  getReviewPosts,
  rejectPost,
} from "@/lib/post/post.action";

type ReviewStatus = "pending" | "approved" | "rejected";

function getStatusLabel(status: ReviewStatus) {
  if (status === "approved") return "已审核";
  if (status === "rejected") return "已拒绝";
  return "待审核";
}

export default async function ReviewPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const user = await getUser();

  if (!user?.isAdmin) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        无权限访问该页面
      </div>
    );
  }

  const statusParam = searchParams?.status;
  const status: ReviewStatus =
    statusParam === "approved" || statusParam === "rejected"
      ? statusParam
      : "pending";

  const pageSize = 10;
  const [posts, total] = await Promise.all([
    getReviewPosts(status, 1, pageSize),
    getReviewCount(status),
  ]);

  const approveAction = async (formData: FormData) => {
    "use server";
    const currentUser = await getUser();
    if (!currentUser?.isAdmin) {
      return { success: false, message: "无权限" };
    }
    const id = Number(formData.get("id"));
    if (!id) return { success: false, message: "参数错误" };
    await approvePost(id);
    revalidatePath("/review");
    return { success: true };
  };

  const rejectAction = async (formData: FormData) => {
    "use server";
    const currentUser = await getUser();
    if (!currentUser?.isAdmin) {
      return { success: false, message: "无权限" };
    }
    const id = Number(formData.get("id"));
    if (!id) return { success: false, message: "参数错误" };
    await rejectPost(id);
    revalidatePath("/review");
    return { success: true };
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] px-4 py-6 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden rounded-2xl border border-theme bg-card p-6 sm:p-8 card-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_55%)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Review Center
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-theme font-display">
              帖子审核
            </h1>
            <p className="mt-2 text-sm text-muted">
              处理社区提交，确保内容质量与规范
            </p>
          </div>
          <div className="min-w-40 rounded-xl border border-theme bg-[color-mix(in_srgb,var(--card)_90%,transparent)] px-4 py-3 text-center">
            <p className="text-xs text-muted">{getStatusLabel(status)}</p>
            <p className="mt-1 text-2xl font-semibold text-theme">
              {total}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ReviewFilter value={status} />
        <span className="text-sm text-muted">
          {getStatusLabel(status)} {total} 篇
        </span>
      </div>

      <div className="mt-4 flex-1 min-h-0">
        <ReviewInfiniteSection
          initialPosts={posts}
          pageSize={pageSize}
          status={status}
          approveAction={approveAction}
          rejectAction={rejectAction}
        />
      </div>
    </div>
  );
}
