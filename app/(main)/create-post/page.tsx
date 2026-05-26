import { getUser } from "@/lib/user/user.action";
import { createPost } from "@/lib/post/post.action";
import { CreatePostParams } from "@/lib/post/post.action";
import TiptapEdit from "@/components/tiptap/TiptapEdit";
import { redirect } from "next/navigation";

async function CreatePostPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const handleSubmit = async (values: CreatePostParams) => {
    "use server";
    const currentUser = await getUser();
    if (!currentUser) {
      return { success: false, message: "未登录" };
    }
    const post = await createPost({
      ...values,
      authorId: currentUser.id,
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
      <TiptapEdit submit={handleSubmit} />
    </div>
  );
}

export default CreatePostPage;
