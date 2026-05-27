"use client";

import { useState, useTransition } from "react";
import { createComment, deleteComment } from "@/lib/comment/comment.action";
import { toggleFavorite } from "@/lib/favorite/favorite.action";
import * as Avatar from "@radix-ui/react-avatar";
import { Heart, MessageCircle, Trash2 } from "lucide-react";

export interface CommentItem {
  id: number;
  content: string;
  createdAt: Date | string;
  author: {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
  };
}

function getRelativeTime(date: Date | string) {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 30) return `${days} 天前`;
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CommentSection({
  postId,
  currentUserId,
  initialComments,
  initialCommentCount,
  initialFavoriteCount,
  initialFavorited,
}: {
  postId: number;
  currentUserId: number | null;
  initialComments: CommentItem[];
  initialCommentCount: number;
  initialFavoriteCount: number;
  initialFavorited: boolean;
}) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    startTransition(async () => {
      try {
        const newComment = await createComment(postId, trimmed);
        setComments((prev) => [newComment, ...prev]);
        setCommentCount((prev) => prev + 1);
        setContent("");
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onDelete = (commentId: number) => {
    startTransition(async () => {
      try {
        await deleteComment(commentId);
        setComments((prev) => prev.filter((item) => item.id !== commentId));
        setCommentCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onToggleFavorite = () => {
    startTransition(async () => {
      try {
        const res = await toggleFavorite(postId);
        setFavorited(res.favorited);
        setFavoriteCount((prev) => prev + (res.favorited ? 1 : -1));
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <section className="mt-10 space-y-8">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-theme">
          <MessageCircle className="size-5 text-primary" />
          评论 ({commentCount})
        </h2>
        <button
          onClick={onToggleFavorite}
          disabled={isPending}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            favorited
              ? "bg-primary/10 text-primary"
              : "border border-theme text-muted hover:border-primary/30 hover:text-primary"
          }`}
        >
          <Heart className={`size-4 ${favorited ? "fill-primary" : ""}`} />
          {favorited ? "已收藏" : "收藏"} {favoriteCount}
        </button>
      </div>

      {/* Comment form */}
      <div className="space-y-3">
        <textarea
          className="w-full min-h-[100px] rounded-xl border border-theme bg-transparent p-4 text-sm leading-relaxed text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors resize-none"
          placeholder={currentUserId ? "写下你的评论..." : "登录后才能评论"}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={!currentUserId || isPending}
        />
        <div className="flex justify-end">
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            onClick={onSubmit}
            disabled={!currentUserId || isPending || !content.trim()}
          >
            <MessageCircle className="size-4" />
            发布评论
          </button>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-1">
        {comments.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted">
            <MessageCircle className="mx-auto mb-3 size-8 opacity-30" />
            <p>暂无评论，来发表第一条评论吧</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="group/comment flex gap-3 rounded-xl p-4 transition-colors hover:bg-card-2"
            >
              <Avatar.Root className="size-9 shrink-0 overflow-hidden rounded-full bg-muted/20">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src={comment.author?.avatar || ""}
                  alt={comment.author?.name || ""}
                />
                <Avatar.Fallback className="flex size-full items-center justify-center rounded-[inherit] text-xs text-muted">
                  {(comment.author?.name || comment.author?.email || "?")
                    .slice(0, 1)
                    .toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-theme">
                    {comment.author.name || comment.author.email}
                  </span>
                  <span className="text-xs text-muted">
                    {getRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-theme whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {currentUserId === comment.author.id && (
                <button
                  onClick={() => onDelete(comment.id)}
                  disabled={isPending}
                  className="shrink-0 self-start rounded-lg p-1.5 text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 group-hover/comment:opacity-100"
                  title="删除评论"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
