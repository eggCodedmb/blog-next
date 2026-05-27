import Link from "next/link";
import { getUser } from "@/lib/user/user.action";
import { getPostByAuthorId } from "@/lib/post/post.action";
import UserCard from "@/components/user/UserCard";
import MyPostInfiniteSection from "@/components/post/MyPostInfiniteSection";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="w-full max-w-5xl text-center text-muted py-16">
        请先登录后查看
      </div>
    );
  }

  const pageSize = 10;
  const posts = await getPostByAuthorId(user.id, { page: 1, pageSize });

  return (
    <div className="w-full max-w-5xl px-2 py-4 space-y-6">
      <UserCard
        name={user.name || ""}
        email={user.email}
        avatar={user.avatar}
        postCount={posts.length}
        editHref="/profile/edit"
      />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-theme">我的文章</h2>
            <p className="text-sm text-muted mt-1">包含已发布、待审与拒绝</p>
          </div>
          <Link href="/create-post" className="btn btn-primary">
            创作文章
          </Link>
        </div>

        <div className="h-[calc(100vh-600px)] min-h-100">
          <MyPostInfiniteSection
            initialPosts={posts}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
