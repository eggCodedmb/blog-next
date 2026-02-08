"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { PostItemProps } from "@/types/post";
import ReviewItem from "./ReviewItem";
import { useReviewContext } from "./ReviewContext";

type ReviewStatus = "0" | "1" | "2";

function getStatusLabel(status: ReviewStatus) {
  if (status === "1") return "已审核";
  if (status === "2") return "已拒绝";
  return "待审核";
}

export default function ReviewInfiniteList({
  // initialPosts,
  rootRef,
}: {
  // initialPosts: PostItemProps[];
  rootRef?: RefObject<HTMLElement | null>;
}) {
  const { posts, pageSize, status, approveAction, rejectAction } =
    useReviewContext();
  // const [posts, setPosts] = useState<PostItemProps[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(posts.length >= pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const activeRequestId = useRef(0);
  const activeController = useRef<AbortController | null>(null);

  useEffect(() => {
    // setPosts(initialPosts);
    setPage(1);
    setHasMore(posts.length >= pageSize);
    setIsLoading(false);
    activeController.current?.abort();
    activeController.current = null;
  }, [pageSize, status]);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsLoading(true);
        const nextPage = page + 1;
        const requestId = ++activeRequestId.current;
        activeController.current?.abort();
        const controller = new AbortController();
        activeController.current = controller;
        fetch(
          `/api/review?status=${status}&page=${nextPage}&pageSize=${pageSize}`,
          { signal: controller.signal },
        )
          .then((res) => res.json())
          .then((data: PostItemProps[]) => {
            if (requestId !== activeRequestId.current) return;
            if (!Array.isArray(data) || data.length === 0) {
              setHasMore(false);
              return;
            }
            // setPosts((prev) => [...prev, ...data]);
            setPage(nextPage);
            if (data.length < pageSize) {
              setHasMore(false);
            }
          })
          .catch(() => {
            if (requestId !== activeRequestId.current) return;
            setHasMore(false);
          })
          .finally(() => {
            if (requestId !== activeRequestId.current) return;
            setIsLoading(false);
          });
      },
      {
        root: rootRef?.current || null,
        rootMargin: "200px 0px",
      },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      activeController.current?.abort();
    };
  }, [hasMore, isLoading, page, pageSize, rootRef, status]);

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-theme bg-card p-10 text-center text-muted card-glow">
        暂无{getStatusLabel(status)}帖子
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ReviewItem
          key={`${post.id}-${post.createdAt}`}
          post={post}
          status={status}
          approveAction={approveAction}
          rejectAction={rejectAction}
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
