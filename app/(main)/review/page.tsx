import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/user/user.action";
import {
  approvePost,
  getPendingPosts,
  rejectPost,
} from "@/lib/post/post.action";

export default async function ReviewPage() {
  const user = await getUser();

  if (!user?.isAdmin) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        无权限访问该页面
      </div>
    );
  }

  const posts = await getPendingPosts();

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
    <div className="w-full max-w-5xl px-4 py-8">
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
          <div className="min-w-[160px] rounded-xl border border-theme bg-[color-mix(in_srgb,var(--card)_90%,transparent)] px-4 py-3 text-center">
            <p className="text-xs text-muted">待审核</p>
            <p className="mt-1 text-2xl font-semibold text-theme">
              {posts.length}
            </p>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-theme bg-card p-10 text-center text-muted card-glow">
          暂无待审核帖子
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {posts.map((post) => {
            const preview = (post.content || "")
              .replace(/<[^>]*>/g, "")
              .trim()
              .slice(0, 140);

            return (
              <div
                key={post.id}
                className="rounded-2xl border border-theme bg-card p-5 sm:p-6 card-glow"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
                        待审核
                      </span>
                      <span>
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                      <span>·</span>
                      <span>
                        {post.author?.name ||
                          post.author?.email ||
                          "匿名用户"}
                      </span>
                    </div>
                    <Link
                      href={`/content/${post.id}`}
                      className="text-lg sm:text-xl font-semibold text-theme hover:underline font-display"
                    >
                      {post.title}
                    </Link>
                    {preview ? (
                      <p className="text-sm text-muted line-clamp-3">
                        {preview}...
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/content/${post.id}`}
                      className="btn btn-outline text-muted"
                    >
                      查看
                    </Link>
                    <form action={approveAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button className="btn btn-primary">通过</button>
                    </form>
                    <form action={rejectAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button className="btn btn-outline text-muted">
                        拒绝
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
