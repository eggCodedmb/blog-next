"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import PostCard from "./PostCard";
import { PostItemProps } from "@/types/post";

export default function PostInfiniteList({
  initialPosts,
  pageSize,
  rootRef,
}: {
  initialPosts: PostItemProps[];
  pageSize: number;
  rootRef?: RefObject<HTMLElement | null>;
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
        root: rootRef?.current || null,
        rootMargin: "200px 0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page, pageSize, rootRef]);

  if (!posts.length) {
    return <div className="w-full max-w-4xl text-center py-20 text-muted">暂无文章 ✍️</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {posts.map((post) => (
        <PostCard key={`${post.id}-${post.createdAt}`} post={post} />
      ))}
      <div ref={sentinelRef} />
      {isLoading && (
        <div className="text-center text-sm text-muted py-4">加载中...</div>
      )}
      {!hasMore && (
        <div className="text-center text-sm text-muted py-4">
          已加载全部
        </div>
      )}
    </div>
  );
}
