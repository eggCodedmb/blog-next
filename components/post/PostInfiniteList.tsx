"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import { PostItemProps } from "@/types/post";

export default function PostInfiniteList({
  initialPosts,
  pageSize,
}: {
  initialPosts: PostItemProps[];
  pageSize: number;
}) {
  const [posts, setPosts] = useState<PostItemProps[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsLoading(true);
        const nextPage = page + 1;
        fetch(`/api/posts?page=${nextPage}&pageSize=${pageSize}`)
          .then((res) => res.json())
          .then((data: PostItemProps[]) => {
            if (!Array.isArray(data) || data.length === 0) {
              setHasMore(false);
              return;
            }
            setPosts((prev) => [...prev, ...data]);
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
        rootMargin: "400px 0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page, pageSize]);

  if (!posts.length) {
    return (
      <div className="py-20 text-center text-muted">
        <p className="text-4xl">✍️</p>
        <p className="mt-3 text-sm">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {posts.map((post) => (
        <PostCard key={`${post.id}-${post.createdAt}`} post={post} />
      ))}
      <div ref={sentinelRef} />
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted">
          <span className="size-4 animate-spin rounded-full border-2 border-muted/30 border-t-primary" />
          加载中...
        </div>
      )}
      {!hasMore && (
        <div className="py-6 text-center text-sm text-muted">
          — 已加载全部 —
        </div>
      )}
    </div>
  );
}
