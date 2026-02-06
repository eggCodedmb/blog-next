"use client";

import { useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PostItemProps } from "@/types/post";
import ReviewInfiniteList from "./ReviewInfiniteList";

type ReviewStatus = "pending" | "approved" | "rejected";

export default function ReviewInfiniteSection({
  initialPosts,
  pageSize,
  status,
  approveAction,
  rejectAction,
}: {
  initialPosts: PostItemProps[];
  pageSize: number;
  status: ReviewStatus;
  approveAction: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
  rejectAction: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport ref={viewportRef} className="h-full w-full pr-1">
        <ReviewInfiniteList
          initialPosts={initialPosts}
          pageSize={pageSize}
          status={status}
          rootRef={viewportRef}
          approveAction={approveAction}
          rejectAction={rejectAction}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="hidden sm:block w-2">
        <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
