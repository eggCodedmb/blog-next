import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/user/user.action";
import {
  deletePost,
  getPostByAuthorId,
  getPostById,
} from "@/lib/post/post.action";
import MyPostInfiniteSection from "@/components/post/MyPostInfiniteSection";

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

  const deleteAction = async (formData: FormData) => {
    "use server";
    const currentUser = await getUser();
    if (!currentUser) {
      return { success: false, message: "用户未登录" };
    }
    const id = Number(formData.get("id"));
    if (!id) return { success: false, message: "参数错误" };
    const post = await getPostById(id);
    if (!post || post.author?.id !== currentUser.id) {
      return { success: false, message: "无权限操作" };
    }
    await deletePost(id);
    revalidatePath("/my-posts");
    return { success: true };
  };

  return (
    <div className="w-full max-w-5xl pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-theme">我的帖子</h1>
          <p className="text-sm text-muted mt-1">包含已发布、待审与拒绝</p>
        </div>
        <Link href="/create-post" className="btn btn-primary">
          新建帖子
        </Link>
      </div>

      <div className="h-[calc(100vh-144px)]">
        <MyPostInfiniteSection
          initialPosts={posts}
          pageSize={pageSize}
          onDelete={deleteAction}
        />
      </div>
    </div>
  );
}
