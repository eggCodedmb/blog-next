import { getUser } from "@/lib/user/user.action";
import { createPost } from "@/lib/post/post.action";
import { CreatePostParams } from "@/lib/post/post.action";
// import FormPost from "@/components/FormPost";

import TiptapEdit from "@/components/tiptap/TiptapEdit";

function CreatePostPage() {
  const handleSubmit = async (values: CreatePostParams) => {
    "use server";
    const user = await getUser();
    if (!user) {
      return { success: false, message: "未登录" };
    }
    const post = await createPost({
      ...values,
      authorId: user.id,
    });
    if (!post) {
      return { success: false, message: "创建失败" };
    }
    return { success: true, message: "发布成功" };
  };

  return (
    <div className="w-full justify-center items-center">
      {/* <Editor /> */}
      {/* <FormPost onSubmit={handleSubmit} /> */}
      <TiptapEdit />
    </div>
  );
}

export default CreatePostPage;
