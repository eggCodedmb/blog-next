"use client";

import { useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ReviewInfiniteList from "./ReviewInfiniteList";
import { useReviewContext } from "./ReviewContext";

export default function ReviewInfiniteSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const { posts, pageSize, status } = useReviewContext();

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport ref={viewportRef} className="h-full w-full pr-1">
        <ReviewInfiniteList
          key={`${status}-${posts[0]?.id ?? "empty"}-${posts.length}-${pageSize}`}
          rootRef={viewportRef}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="hidden sm:block w-2"
      >
        <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
