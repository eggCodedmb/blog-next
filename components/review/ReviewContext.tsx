"use client";

import { createContext, useContext } from "react";
import { PostItemProps } from "@/types/post";
type ReviewStatus = "0" | "1" | "2";

type ReviewContextValue = {
  posts: PostItemProps[];
  status: ReviewStatus;
  pageSize: number;
  approveAction: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  rejectAction: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
};

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function ReviewProvider({
  posts,
  status,
  pageSize,
  approveAction,
  rejectAction,
  children,
}: ReviewContextValue & { children: React.ReactNode }) {
  return (
    <ReviewContext.Provider
      value={{ posts, status, pageSize, approveAction, rejectAction }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviewContext() {
  const ctx = useContext(ReviewContext);
  if (!ctx) {
    throw new Error("useReviewContext must be used within ReviewProvider");
  }
  return ctx;
}
