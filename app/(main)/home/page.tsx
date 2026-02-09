import { getPostAll } from "@/lib/post/post.action";
import Link from "next/link";
import PostInfiniteSection from "@/components/post/PostInfiniteSection";
const BlogHome = async () => {
  const posts = await getPostAll({
    page: 1,
    pageSize: 10,
  });
  return (
    <section className="w-full px-4 sm:px-6">
      <div className="m-1 flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-theme font-display mb-0">
          最新文章
        </h1>
        <Link href="/create-post" className="shrink-0">
          <button className="btn btn-primary whitespace-nowrap hover:opacity-90">
            创建文章
          </button>
        </Link>
      </div>
      <PostInfiniteSection initialPosts={posts} pageSize={10} />
    </section>
  );
};

export default BlogHome;
