"use client";

import { useState, useTransition } from "react";
import { createComment, deleteComment } from "@/lib/comment/comment.action";
import { toggleFavorite } from "@/lib/favorite/favorite.action";

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
    <section className="mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-muted">
          <span>评论 {commentCount}</span>
          <span>收藏 {favoriteCount}</span>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`btn ${favorited ? "btn-primary" : "btn-outline"} hover:opacity-90`}
          disabled={isPending}
        >
          {favorited ? "已收藏" : "收藏"}
        </button>
      </div>

      <div className="bg-card border border-theme rounded-xl p-4 space-y-3">
        <textarea
          className="w-full min-h-24 rounded-lg border border-theme bg-transparent p-3 text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
          placeholder={currentUserId ? "写下你的评论..." : "登录后才能评论"}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={!currentUserId || isPending}
        />
        <div className="flex justify-end">
          <button
            className="btn btn-primary hover:opacity-90"
            onClick={onSubmit}
            disabled={!currentUserId || isPending}
          >
            发布评论
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-sm text-muted">暂无评论</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-theme rounded-xl p-4"
            >
              <div className="flex items-center justify-between text-sm text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-theme font-medium">
                    {comment.author.name || comment.author.email}
                  </span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                {currentUserId === comment.author.id && (
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="btn btn-ghost text-muted hover:text-theme"
                    disabled={isPending}
                  >
                    删除
                  </button>
                )}
              </div>
              <p className="mt-2 text-theme whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
