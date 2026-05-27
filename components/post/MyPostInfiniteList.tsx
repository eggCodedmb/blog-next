"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import { PostItemProps } from "@/types/post";
import MyPostItem from "./MyPostItem";

type MyPost = PostItemProps & { published?: string };

export default function MyPostInfiniteList({
  initialPosts,
  pageSize,
  rootRef,
}: {
  initialPosts: MyPost[];
  pageSize: number;
  rootRef?: RefObject<HTMLElement | null>;
}) {
  const [extraPosts, setExtraPosts] = useState<MyPost[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const posts = [...initialPosts, ...extraPosts].filter((p) => !deletedIds.has(p.id));

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsLoading(true);
        const nextPage = page + 1;
        fetch(`/api/my-posts?page=${nextPage}&pageSize=${pageSize}`)
          .then((res) => res.json())
          .then((data: MyPost[]) => {
            if (!Array.isArray(data) || data.length === 0) {
              setHasMore(false);
              return;
            }
            setExtraPosts((prev) => [...prev, ...data]);
            setPage(nextPage);
            if (data.length < pageSize) {
              setHasMore(false);
            }
          })
          .catch(() => {
            setHasMore(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      {
        root: rootRef?.current || null,
        rootMargin: "200px 0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page, pageSize, rootRef]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/my-posts?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "删除失败");
        return;
      }
      setDeletedIds((prev) => new Set(prev).add(id));
    } catch {
      alert("删除失败，请重试");
    }
  }, []);

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-theme bg-card p-10 text-center text-muted">
        暂无帖子，开始创作吧
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <MyPostItem
          key={`${post.id}-${post.createdAt}`}
          post={post}
          onDelete={handleDelete}
        />
      ))}
      <div ref={sentinelRef} />
      {isLoading && (
        <div className="text-center text-sm text-muted py-4">加载中...</div>
      )}
      {!hasMore && (
        <div className="text-center text-sm text-muted py-4">已加载全部</div>
      )}
    </div>
  );
}
