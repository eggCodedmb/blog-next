"use client";

import Image from "next/image";
import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { addAssistItem } from "@/lib/assist/assist.storage";
import { UploadButton } from "@/lib/uploadthing/uploadthing";
import {
  ASSIST_TASK_OPTIONS,
  AssistContentType,
  AssistItem,
} from "@/types/assist";

interface AssistPublishFormProps {
  onCreated: (item: AssistItem) => void;
  onCancel?: () => void;
}

const ASSIST_CONTENT_TYPE_OPTIONS: {
  value: AssistContentType;
  label: string;
}[] = [
  { value: "token", label: "口令" },
  { value: "image", label: "图片" },
];

export default function AssistPublishForm({
  onCreated,
  onCancel,
}: AssistPublishFormProps) {
  const [taskName, setTaskName] = useState<(typeof ASSIST_TASK_OPTIONS)[number]>(
    ASSIST_TASK_OPTIONS[0],
  );
  const [contentType, setContentType] = useState<AssistContentType>("token");
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const isSubmitDisabled =
    contentType === "token" ? token.trim().length === 0 : image.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = contentType === "token" ? token.trim() : image.trim();
    if (!value) {
      return;
    }

    const item: AssistItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      taskName,
      contentType,
      content: value,
      createdAt: new Date().toISOString(),
    };

    addAssistItem(item);
    setToken("");
    setImage("");
    setUploadError("");
    setContentType("token");
    onCreated(item);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <h2 className="text-lg font-semibold text-theme">发布助力</h2>

      <label className="grid gap-2">
        <span className="text-sm text-muted">任务名称</span>
        <Select.Root
          value={taskName}
          onValueChange={(next) =>
            setTaskName(next as (typeof ASSIST_TASK_OPTIONS)[number])
          }
        >
          <Select.Trigger className="inline-flex h-10 w-full items-center justify-between rounded-md border border-theme bg-transparent px-3 text-sm text-theme outline-none transition data-[placeholder]:text-muted">
            <Select.Value />
            <Select.Icon className="text-muted">
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 mt-2 overflow-hidden rounded-xl border border-theme bg-card shadow-lg">
              <Select.Viewport className="p-1">
                {ASSIST_TASK_OPTIONS.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-theme outline-none data-[highlighted]:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator className="text-primary">
                      <CheckCircle2 size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-muted">任务内容类型</span>
        <Select.Root
          value={contentType}
          onValueChange={(next) => {
            setContentType(next as AssistContentType);
            setUploadError("");
          }}
        >
          <Select.Trigger className="inline-flex h-10 w-full items-center justify-between rounded-md border border-theme bg-transparent px-3 text-sm text-theme outline-none transition data-placeholder:text-muted">
            <Select.Value />
            <Select.Icon className="text-muted">
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 mt-2 overflow-hidden rounded-xl border border-theme bg-card shadow-lg">
              <Select.Viewport className="p-1">
                {ASSIST_CONTENT_TYPE_OPTIONS.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-theme outline-none data-highlighted:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="text-primary">
                      <CheckCircle2 size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </label>

      {contentType === "token" ? (
        <label className="grid gap-2">
          <span className="text-sm text-muted">任务内容（口令）</span>
          <textarea
            required
            rows={3}
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="请输入口令"
            className="rounded-md border border-theme bg-transparent px-3 py-2 text-theme placeholder:text-muted"
          />
        </label>
      ) : (
        <div className="grid gap-3">
          <span className="text-sm text-muted">任务内容（图片）</span>

          {image ? (
            <div className="overflow-hidden rounded-lg border border-theme">
              <Image
                src={image}
                alt={taskName}
                width={1200}
                height={800}
                unoptimized
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(result) => {
              const url = result?.[0]?.ufsUrl;
              if (!url) {
                setUploadError("上传失败，请重试");
                return;
              }

              setImage(url);
              setUploadError("");
            }}
            onUploadError={(error) => {
              setUploadError(error.message || "上传失败，请稍后重试");
            }}
            appearance={{
              container: "w-full",
              button: "btn btn-outline h-10 w-full",
              allowedContent: "hidden",
            }}
            content={{
              button: image ? "重新上传图片" : "上传图片",
              allowedContent: "",
            }}
            config={{
              mode: "auto",
            }}
          />

          {image ? (
            <p className="text-xs text-muted break-all">{image}</p>
          ) : (
            <p className="text-xs text-muted">请先上传图片，再发布助力。</p>
          )}

          {uploadError ? <p className="text-xs text-red-500">{uploadError}</p> : null}
        </div>
      )}

      <div className="mt-2 flex justify-end gap-3">
        {onCancel ? (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            取消
          </button>
        ) : null}
        <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled}>
          发布助力
        </button>
      </div>
    </form>
  );
}
