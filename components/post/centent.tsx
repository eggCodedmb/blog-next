import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import CommentSection, { CommentItem } from "@/components/comment/CommentSection";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ArticleContentPreview from "@/components/post/ArticleContentPreview";
import { ArrowLeft, Clock, Heart, MessageCircle, Eye } from "lucide-react";

function getReadingTime(content: string | null) {
  const text = (content || "").replace(/<[^>]*>/g, "").replace(/\s+/g, "").trim();
  const minutes = Math.max(1, Math.ceil(text.length / 500));
  return `${minutes} 分钟`;
}

function Content({
  post,
  currentUserId,
  comments,
  commentCount,
  favoriteCount,
  favorited,
}: {
  post: PostItemProps;
  currentUserId: number | null;
  comments: CommentItem[];
  commentCount: number;
  favoriteCount: number;
  favorited: boolean;
}) {
  const readingTime = getReadingTime(post.content);
  const createdAt = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="h-[calc(100vh-70px)] w-full">
      <ScrollArea.Root className="h-full w-full overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* Main content */}
              <div className="min-w-0">
                <article className="overflow-hidden rounded-2xl border border-theme bg-card">
                  {/* Cover image */}
                  {post.cover && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="size-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-5 sm:p-8 lg:p-10">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        文章
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="mt-4 text-2xl font-bold leading-tight text-theme font-display sm:text-3xl lg:text-[2.5rem]">
                      {post.title}
                    </h1>

                    {/* Meta row */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
                      <Link
                        href={`/profile/${post.author?.id}`}
                        className="group/author flex items-center gap-2.5"
                      >
                        <Avatar.Root className="size-9 shrink-0 overflow-hidden rounded-full bg-muted/20">
                          <Avatar.Image
                            className="size-full rounded-[inherit] object-cover"
                            src={post.author?.avatar || ""}
                            alt={post.author?.name || ""}
                          />
                          <Avatar.Fallback className="flex size-full items-center justify-center rounded-[inherit] text-xs text-muted">
                            {(post.author?.name || post.author?.email || "?")
                              .slice(0, 1)
                              .toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="font-medium text-theme transition-colors group-hover/author:text-primary">
                          {post.author?.name || post.author?.email || "匿名用户"}
                        </span>
                      </Link>

                      {createdAt && <span>{createdAt}</span>}

                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {readingTime}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px w-full bg-border" />

                    {/* Article body */}
                    <ArticleContentPreview html={post.content} />

                    {/* Footer actions */}
                    <div className="mt-8 flex items-center justify-between border-t border-theme pt-6">
                      <div className="flex items-center gap-5 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="size-4" />
                          {post.viewCount || 0} 浏览
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Heart className="size-4" />
                          {favoriteCount} 收藏
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="size-4" />
                          {commentCount} 评论
                        </span>
                      </div>
                    </div>

                    {/* Comments */}
                    <CommentSection
                      postId={post.id}
                      currentUserId={currentUserId}
                      initialComments={comments}
                      initialCommentCount={commentCount}
                      initialFavoriteCount={favoriteCount}
                      initialFavorited={favorited}
                    />
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-6 space-y-4">
                  {/* Back link */}
                  <Link
                    href="/"
                    className="group/back flex items-center gap-2 rounded-xl border border-theme bg-card px-4 py-3 text-sm text-muted transition-colors hover:border-primary/20 hover:text-theme"
                  >
                    <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-0.5" />
                    返回首页
                  </Link>

                  {/* Author card */}
                  <Link
                    href={`/profile/${post.author?.id}`}
                    className="block rounded-2xl border border-theme bg-card p-5 transition-colors hover:border-primary/20"
                  >
                    <p className="text-xs font-medium text-muted">关于作者</p>
                    <div className="mt-3 flex items-center gap-3">
                      <Avatar.Root className="size-11 shrink-0 overflow-hidden rounded-full bg-muted/20">
                        <Avatar.Image
                          className="size-full rounded-[inherit] object-cover"
                          src={post.author?.avatar || ""}
                          alt={post.author?.name || ""}
                        />
                        <Avatar.Fallback className="flex size-full items-center justify-center rounded-[inherit] text-sm text-muted">
                          {(post.author?.name || post.author?.email || "?")
                            .slice(0, 1)
                            .toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-theme">
                          {post.author?.name || post.author?.email || "匿名用户"}
                        </p>
                        <p className="text-xs text-muted">作者</p>
                      </div>
                    </div>
                  </Link>

                  {/* Article stats */}
                  <div className="rounded-2xl border border-theme bg-card p-5">
                    <p className="text-xs font-medium text-muted">文章信息</p>
                    <div className="mt-3 space-y-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">浏览</span>
                        <span className="font-medium text-theme">{post.viewCount || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">收藏</span>
                        <span className="font-medium text-theme">{favoriteCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">评论</span>
                        <span className="font-medium text-theme">{commentCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">阅读时间</span>
                        <span className="font-medium text-theme">{readingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="vertical"
          className="hidden w-2 hide-scrollbar lg:block"
        />
      </ScrollArea.Root>
    </div>
  );
}

export default Content;
