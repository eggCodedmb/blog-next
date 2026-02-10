import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import CommentSection, { CommentItem } from "@/components/comment/CommentSection";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Editor from "@/components/tiptap/Editor";

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
  return (
    <div className="h-[calc(100vh-70px)] w-full">
      <ScrollArea.Root className="h-full w-full overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="mx-auto w-full max-w-screen-2xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_300px]">
              <article className="min-w-0 rounded-2xl border border-theme bg-card p-4 card-glow sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
                      文章
                    </span>
                    <span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
                    </span>
                  </div>

                  <h1 className="text-2xl font-semibold leading-tight text-theme font-display sm:text-3xl lg:text-4xl">
                    {post?.title || ""}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link href={`/profile/${post.author?.id}`}>
                      <div className="flex items-center gap-3">
                        <Avatar.Root className="h-10 w-10 overflow-hidden rounded-full border border-theme sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                          <Avatar.Image
                            className="size-full rounded-[inherit] object-cover"
                            src={post.author?.avatar || ""}
                            alt={post.author?.name || ""}
                          />
                        </Avatar.Root>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-theme">
                            {post.author?.name || post.author?.email || "匿名用户"}
                          </p>
                          <p className="text-xs text-muted">作者</p>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span>收藏 {favoriteCount}</span>
                      <span>评论 {commentCount}</span>
                    </div>
                  </div>
                </div>

                <div className="my-4 h-px w-full bg-(--border)" />

                <Editor content={post.content as string} mode="post" />

                <CommentSection
                  postId={post.id}
                  currentUserId={currentUserId}
                  initialComments={comments}
                  initialCommentCount={commentCount}
                  initialFavoriteCount={favoriteCount}
                  initialFavorited={favorited}
                />
              </article>

              <aside className="hidden lg:block">
                <div className="sticky top-6 space-y-4">
                  <div className="rounded-2xl border border-theme bg-card p-4 card-glow">
                    <p className="text-xs text-muted">文章信息</p>
                    <div className="mt-3 space-y-2 text-sm text-theme">
                      <p className="flex items-center justify-between gap-2">
                        <span className="text-muted">发布时间</span>
                        <span className="text-right">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString()
                            : "--"}
                        </span>
                      </p>
                      <p className="flex items-center justify-between gap-2">
                        <span className="text-muted">收藏</span>
                        <span>{favoriteCount}</span>
                      </p>
                      <p className="flex items-center justify-between gap-2">
                        <span className="text-muted">评论</span>
                        <span>{commentCount}</span>
                      </p>
                    </div>
                  </div>

                  <Link href="/" className="btn btn-outline w-full text-muted">
                    返回首页
                  </Link>
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
