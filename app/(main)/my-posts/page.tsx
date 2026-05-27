import Link from "next/link";
import { getUser } from "@/lib/user/user.action";
import { getPostByAuthorId } from "@/lib/post/post.action";
import MyPostInfiniteSection from "@/components/post/MyPostInfiniteSection";
import { Plus } from "lucide-react";

export default async function MyPostsPage() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        请先登录后查看我的帖子
      </div>
    );
  }

  const pageSize = 10;
  const posts = await getPostByAuthorId(user.id, { page: 1, pageSize });

  return (
    <div className="w-full max-w-5xl pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-theme">我的文章</h1>
          <p className="text-sm text-muted mt-1">管理已发布、待审与被拒绝的文章</p>
        </div>
        <Link href="/create-post" className="btn btn-primary">
          <Plus className="size-4" />
          创作文章
        </Link>
      </div>

      <div className="h-[calc(100vh-160px)]">
        <MyPostInfiniteSection
          initialPosts={posts}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
