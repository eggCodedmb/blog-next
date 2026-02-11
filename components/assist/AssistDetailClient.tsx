"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAssistItemById } from "@/lib/assist/assist.storage";
import { AssistItem } from "@/types/assist";

interface AssistDetailClientProps {
  id: string;
}

export default function AssistDetailClient({ id }: AssistDetailClientProps) {
  const [item, setItem] = useState<AssistItem | null>(null);
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    setItem(getAssistItemById(id));
  }, [id]);

  const handleCopy = async () => {
    if (!item || item.contentType !== "token") {
      return;
    }

    try {
      await navigator.clipboard.writeText(item.content);
      setActionDone(true);
      window.setTimeout(() => setActionDone(false), 1500);
    } catch {
      setActionDone(false);
    }
  };

  const handleDownload = async () => {
    if (!item || item.contentType !== "image") {
      return;
    }

    try {
      const response = await fetch(item.content, { mode: "cors" });
      if (!response.ok) {
        throw new Error("下载失败");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${item.taskName}-${new Date(item.createdAt).getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);

      setActionDone(true);
      window.setTimeout(() => setActionDone(false), 1500);
    } catch {
      window.open(item.content, "_blank", "noopener,noreferrer");
      setActionDone(false);
    }
  };

  if (!item) {
    return (
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="rounded-2xl border border-theme bg-card p-6 text-center text-muted">
          内容不存在或已被清除。
          <div className="mt-4">
            <Link href="/assist" className="btn btn-outline text-muted">
              返回助力列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-theme bg-card p-5 sm:p-6 card-glow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{item.taskName}</p>
            <h1 className="mt-1 text-2xl font-semibold text-theme">助力详情</h1>
            <p className="mt-1 text-xs text-muted">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
          {item.contentType === "token" ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
            >
              {actionDone ? "已复制" : "复制"}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownload}
            >
              {actionDone ? "已下载" : "下载"}
            </button>
          )}
        </div>

        <div className="mt-5 rounded-xl border border-theme p-4">
          {item.contentType === "token" ? (
            <p className="whitespace-pre-wrap wrap-break-word text-theme">
              {item.content}
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted break-all">{item.content}</p>
              <div className="relative h-90 w-full overflow-hidden rounded-lg border border-theme">
                <Image
                  src={item.content}
                  alt={item.taskName}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <Link href="/assist" className="btn btn-outline text-muted">
            返回助力列表
          </Link>
        </div>
      </div>
    </div>
  );
}
