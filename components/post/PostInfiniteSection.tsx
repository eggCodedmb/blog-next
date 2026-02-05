"use client";

import { useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import PostInfiniteList from "./PostInfiniteList";
import { PostItemProps } from "@/types/post";

export default function PostInfiniteSection({
  initialPosts,
  pageSize,
}: {
  initialPosts: PostItemProps[];
  pageSize: number;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-[calc(100vh-170px)]">
      <ScrollArea.Root className="h-full w-full overflow-hidden">
        <ScrollArea.Viewport ref={viewportRef} className="h-full w-full p-2">
          <PostInfiniteList
            initialPosts={initialPosts}
            pageSize={pageSize}
            rootRef={viewportRef}
          />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="w-2">
          <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
