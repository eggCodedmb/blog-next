"use client";

import Link from "next/link";
import { AssistItem } from "@/types/assist";

interface AssistGridProps {
  items: AssistItem[];
}

export default function AssistGrid({ items }: AssistGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-theme bg-card p-8 text-center text-muted">
        暂无助力内容，先发布一条吧。
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const preview =
          item.contentType === "token"
            ? item.content
            : "图片助力，点击查看详情";

        return (
          <Link
            key={item.id}
            href={`/assist/${item.id}`}
            className="rounded-2xl border border-theme bg-card p-4 hover:shadow-md transition-shadow card-glow"
          >
            <p className="inline-flex rounded-full border border-theme px-2 py-0.5 text-xs text-muted">
              {item.taskName}
            </p>
            <p className="mt-3 text-theme font-semibold line-clamp-2">{preview}</p>
            <p className="mt-3 text-xs text-muted">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
