import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import CommentSection, { CommentItem } from "@/components/comment/CommentSection";

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
    <article className="w-full max-w-3xl bg-card border border-theme p-5 sm:p-8 rounded-2xl card-glow">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="inline-flex items-center rounded-full border border-theme px-2 py-0.5">
            文章
          </span>
          <span>
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold text-theme font-display leading-tight">
          {post?.title || ""}
        </h1>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href={`/profile/${post.author?.id}`}>
            <div className="flex items-center gap-3">
              <Avatar.Root className="w-12 h-12 rounded-full border border-theme overflow-hidden">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src={post.author?.avatar || ""}
                  alt={post.author?.name || ""}
                />
              </Avatar.Root>
              <div className="min-w-0">
                <p className="text-theme font-medium truncate">
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

      <div className="my-6 h-px w-full bg(--border)" />

      <div
        className="prose prose-slate dark:prose-invert max-w-none text-theme"
        dangerouslySetInnerHTML={{ __html: post.content as string }}
        suppressHydrationWarning={true}
      ></div>

      <CommentSection
        postId={post.id}
        currentUserId={currentUserId}
        initialComments={comments}
        initialCommentCount={commentCount}
        initialFavoriteCount={favoriteCount}
        initialFavorited={favorited}
      />
    </article>
  );
}

export default Content;
