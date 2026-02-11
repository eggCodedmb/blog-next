import UserCard from "@/components/user/UserCard";
import { userById } from "@/lib/user/user.action";
import { getPostByAuthorId } from "@/lib/post/post.action";
import PostList from "@/components/post/PostList";

async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await userById(Number(id));
  const posts = await getPostByAuthorId(Number(id), {
    page: 1,
    pageSize: 20,
    createdAt: "desc",
  });
  if (!user) {
    return null;
  }
  return (
    <div className="w-full max-w-3xl px-4 sm:px-6">
      <div className="mt-5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-theme font-display">
          {user.name}主页
        </h1>
        {/* <p className="mt-1 text-sm text-muted">展示作者信息与文章列表</p> */}
      </div>

      <UserCard
        name={user.name || ""}
        email={user.email}
        avatar={user.avatar}
        postCount={posts.length}
      />
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-theme">文章列表</h2>
          <span className="text-sm text-muted">{posts.length} 篇</span>
        </div>
        {posts.length > 0 ? (
          <div className="mt-4">
            <PostList posts={posts} />
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-theme bg-card p-6 text-center text-sm text-muted">
            暂无文章
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
