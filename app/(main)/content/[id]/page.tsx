import Content from "@/components/post/centent";
import { getPostDetail } from "@/lib/post/post.action";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/user/user.action";

interface ContentPageProps {
  params: Promise<{ id: string }>;
}
// 参数类型必须与路由文件名匹配（[id] -> params.id）
export default async function ContentPage({ params }: ContentPageProps) {
  // 1. 正确解析路由参数
  const { id } = await params;

  // 2. 参数验证
  if (isNaN(Number(id))) {
    notFound(); // 无效ID返回404
  }

  // 3. 直接使用await获取数据（无需use钩子）
  const user = await getUser();
  const post = await getPostDetail(Number(id), user?.id);

  // 4. 数据验证
  if (!post) {
    notFound(); // 文章不存在返回404
  }

  // 5. 将解析后的数据传递给子组件
  return (
    <Content
      post={post}
      currentUserId={user?.id || null}
      comments={post.comments || []}
      commentCount={post._count?.comments || 0}
      favoriteCount={post._count?.favorites || 0}
      favorited={(post.favorites?.length || 0) > 0}
    />
  );
}
