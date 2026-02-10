import { getUser } from "@/lib/user/user.action";
import {
  getPostById,
  updatePost,
  CreatePostParams,
} from "@/lib/post/post.action";
import FormPost from "@/components/FormPost";

export default async function EditMyPostPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();
  const postId = await params;

  if (!user) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        请先登录后编辑帖子
      </div>
    );
  }

  const id = Number(postId.id);

  if (!id) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        参数错误
      </div>
    );
  }

  const post = await getPostById(id);
  if (!post || post.author?.id !== user.id) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        无权限编辑该帖子
      </div>
    );
  }

  const handleSubmit = async (values: CreatePostParams) => {
    "use server";
    const currentUser = await getUser();
    if (!currentUser) {
      return { success: false, message: "用户未登录" };
    }
    const currentPost = await getPostById(id);
    if (!currentPost || currentPost.author?.id !== currentUser.id) {
      return { success: false, message: "无权限" };
    }
    await updatePost(id, {
      ...values,
      authorId: currentUser.id,
      cover: values.cover || currentPost.cover || "",
      published: "0", //编辑后重新审核
    });
    return { success: true, message: "保存成功" };
  };

  return (
    <div className="w-full max-w-3xl">
      <FormPost
        onSubmit={handleSubmit}
        initialPost={{
          title: post.title,
          content: post.content,
          cover: post.cover,
          published: post.published,
          authorId: user.id,
        }}
        submitLabel="保存"
        redirectTo="/my-posts"
        cache={false}
      />
    </div>
  );
}
