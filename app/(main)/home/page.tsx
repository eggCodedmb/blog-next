import { getPostAll } from "@/lib/post/post.action";
import Link from "next/link";
import PostInfiniteSection from "@/components/post/PostInfiniteSection";
import { getUser } from "@/lib/user/user.action";
import { PenLine, Flame, Clock, ArrowRight } from "lucide-react";

const BlogHome = async () => {
  const [posts, user] = await Promise.all([
    getPostAll({ page: 1, pageSize: 10 }),
    getUser(),
  ]);

  const recentTitles = posts.slice(0, 5);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="border-b border-theme">
        <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-theme font-display sm:text-4xl lg:text-5xl">
                最新文章
              </h1>
              <p className="mt-2 text-sm text-muted sm:text-base">
                探索技术、设计与生活的最新分享
              </p>
            </div>
            {user && (
              <Link
                href="/create-post"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <PenLine className="size-4" />
                写文章
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Post feed */}
          <div className="min-w-0">
            <PostInfiniteSection initialPosts={posts} pageSize={10} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* About */}
              <div className="rounded-2xl border border-theme bg-card p-5">
                <h3 className="text-sm font-semibold text-theme">关于博客</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  这里是 DMB 博客，分享技术心得与生活感悟。欢迎交流讨论。
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80"
                >
                  了解更多
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              {/* Recent articles */}
              {recentTitles.length > 0 && (
                <div className="rounded-2xl border border-theme bg-card p-5">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-theme">
                    <Flame className="size-4 text-orange-500" />
                    热门文章
                  </h3>
                  <div className="mt-3 space-y-3">
                    {recentTitles.map((post) => (
                      <Link
                        key={post.id}
                        href={`/content/${post.id}`}
                        className="group/item block"
                      >
                        <p className="text-sm font-medium text-theme line-clamp-2 transition-colors group-hover/item:text-primary">
                          {post.title}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                          <Clock className="size-3" />
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("zh-CN", {
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div className="rounded-2xl border border-theme bg-card p-5">
                <h3 className="text-sm font-semibold text-theme">快捷导航</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { href: "/profile", label: "我的创作" },
                    { href: "/about", label: "关于" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg border border-theme px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
