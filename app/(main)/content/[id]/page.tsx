import Content from "./centent";
import { getPostById } from "@/lib/post/post.action";
import { notFound } from "next/navigation";


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
  const post = await getPostById(Number(id));

  // 4. 数据验证
  if (!post) {
    notFound(); // 文章不存在返回404
  }

  // 5. 将解析后的数据传递给子组件
  return (
    <div>
      <Content post={post} />
    </div>
  );
}
