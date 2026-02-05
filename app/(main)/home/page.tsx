import { getPostAll } from "@/lib/post/post.action";
import PostList from "@/components/post/PostList";
import Link from "next/link";
import * as ScrollArea from "@radix-ui/react-scroll-area";
const BlogHome = async () => {
  const posts = await getPostAll({
    page:1,
    pageSize:10,
  });
  return (
    <section className="w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-theme font-display">
          最新文章
        </h1>
        <Link href="/createPost">
          <div>
            <button className="w-30 bg-primary text-white px-4 py-2 rounded-md transition hover:opacity-90">
              创建文章
            </button>
          </div>
        </Link>
      </div>
      <div className="h-[calc(100vh-170px)]">
        <ScrollArea.Root className="h-full w-full overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full p-2">
            <PostList posts={posts} />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className="w-2">
            <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </section>
  );
};

export default BlogHome;
