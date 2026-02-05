import { getUser } from "@/lib/user/user.action";
import { createPost } from "@/lib/post/post.action";
import { CreatePostParams } from "@/lib/post/post.action";
import FormPost from "@/components/FormPost";
import { redirect } from "next/navigation";
function CreatePostPage() {
  const handleSubmit = async (values: CreatePostParams) => {
    "use server";
    const user = await getUser();
    if (!user) {
      throw new Error("用户未登录");
    }
    const post = await createPost({
      ...values,
      authorId: user.id,
    });
    if (!post) {
      throw new Error("创建失败");
    }
    redirect("/");
  };

  return (
    <div className="w-3xl">
      {/* <Editor /> */}
      <FormPost onSubmit={handleSubmit} />
    </div>
  );
}

export default CreatePostPage;
