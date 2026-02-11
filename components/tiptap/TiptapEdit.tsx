"use client";

import { useRef, useState } from "react";
import type { CreatePostParams } from "@/lib/post/post.action";
import {
  SimpleEditor,
  type SimpleEditorRef,
} from "@/components/tiptap-templates/simple/simple-editor";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import AvatarUploader from "@/components/user/AvatarUploader";
import ToastNotice from "@/components/feedback/ToastNotice";
import { useRouter } from "next/navigation";
interface TiptapEditProps {
  submit: (
    payload: CreatePostParams,
  ) => Promise<{ success: boolean; message?: string }>;

  redirectTo?: string;
}

function TiptapEdit({ submit, redirectTo = "/" }: TiptapEditProps) {
  const editorRef = useRef<SimpleEditorRef>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success",
  );
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    setOpenConfirm(true);
  };

  const confirmSubmit = async () => {
    if (isPending) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setToastVariant("error");
      setToastMessage("请输入标题");
      setToastOpen(true);
      return;
    }

    const html = editorRef.current?.getHTML() ?? "";
    const plainText = html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (!plainText) {
      setToastVariant("error");
      setToastMessage("内容不能为空");
      setToastOpen(true);
      setOpenConfirm(false);
      return;
    }

    setIsPending(true);
    try {
      const res = await submit({
        authorId: 0,
        title: trimmedTitle,
        cover: cover.trim(),
        content: html,
        published: "0",
      });

      if (res.success) {
        setToastVariant("success");
        setToastMessage(res.message || "发布成功");
        setOpenConfirm(false);
        window.setTimeout(() => {
          router.replace(redirectTo);
          // router.refresh();
        }, 300);
      } else {
        setToastVariant("error");
        setToastMessage(res.message || "发布失败");
      }
      setToastOpen(true);
    } catch (error) {
      setToastVariant("error");
      setToastMessage(
        error instanceof Error ? error.message : "发布失败，请稍后重试",
      );
      setToastOpen(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <SimpleEditor ref={editorRef} />
      </form>

      <ConfirmDialog
        open={openConfirm}
        title="确认发布"
        description="请补充标题和封面后确认发布。"
        confirmText="发布"
        cancelText="取消"
        onConfirm={confirmSubmit}
        onCancel={() => setOpenConfirm(false)}
        loading={isPending}
      >
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm text-muted">标题</span>
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="请输入标题"
              className="w-full h-10 px-4 border border-theme bg-transparent rounded-md text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
            />
          </label>

          <div className="grid gap-2">
            <span className="text-sm text-muted">封面</span>
            <AvatarUploader
              name={title || "cover"}
              image={cover}
              type="cover"
              onChange={(state, res) => {
                if (state === "success") {
                  setCover(res?.ufsUrl || "");
                }
              }}
            />
            {cover ? (
              <p className="text-xs text-muted break-all">{cover}</p>
            ) : (
              <p className="text-xs text-muted">可选：上传封面图片</p>
            )}
          </div>
        </div>
      </ConfirmDialog>

      <ToastNotice
        open={toastOpen}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

export default TiptapEdit;
