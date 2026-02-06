"use client";

import { useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PostItemProps } from "@/types/post";
import MyPostInfiniteList from "./MyPostInfiniteList";

type MyPost = PostItemProps & { published?: string };

export default function MyPostInfiniteSection({
  initialPosts,
  pageSize,
  onDelete,
}: {
  initialPosts: MyPost[];
  pageSize: number;
  onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden">
      <ScrollArea.Viewport ref={viewportRef} className="h-full w-full pr-1">
        <MyPostInfiniteList
          initialPosts={initialPosts}
          pageSize={pageSize}
          rootRef={viewportRef}
          onDelete={onDelete}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="hidden sm:block w-2">
        <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
