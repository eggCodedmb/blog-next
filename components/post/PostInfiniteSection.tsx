"use client";

import PostInfiniteList from "./PostInfiniteList";
import { PostItemProps } from "@/types/post";

export default function PostInfiniteSection({
  initialPosts,
  pageSize,
}: {
  initialPosts: PostItemProps[];
  pageSize: number;
}) {
  return (
    <PostInfiniteList
      initialPosts={initialPosts}
      pageSize={pageSize}
    />
  );
}
