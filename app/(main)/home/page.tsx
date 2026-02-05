import { getPostAll } from "@/lib/post/post.action";
import Link from "next/link";
import PostInfiniteSection from "@/components/post/PostInfiniteSection";
const BlogHome = async () => {
  const posts = await getPostAll({
    page:1,
    pageSize:10,
  });
  return (
    <section className="w-3xl">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-3xl font-bold text-theme font-display mb-0">
          最新文章
        </h1>
        <Link href="/createPost">
          <div>
            <button className="btn btn-primary w-30 hover:opacity-90">
              创建文章
            </button>
          </div>
        </Link>
      </div>
      <PostInfiniteSection initialPosts={posts} pageSize={10} />
    </section>
  );
};

export default BlogHome;
