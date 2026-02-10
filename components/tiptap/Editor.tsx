"use client";

import { useMemo, useState } from "react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Tiptap, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TableOfContents from "@tiptap/extension-table-of-contents";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { Markdown } from "@tiptap/markdown";
import MenuBar from "./MenuBar";
import { save, load } from "@/lib/utils";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import "@/app/style.css";

const extensions = [
  TextStyleKit,
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    listItem: false,
  }),
  Image,
  OrderedList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
  BulletList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
  ListItem,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
  }),
  TableOfContents,
  Markdown,
];

type ViewMode = "edit" | "preview" | "post";

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  cache?: boolean;
  mode: ViewMode;
}

function isPreviewEmpty(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0;
}

function TiptapEditor({
  content,
  onChange,
  cache = false,
  mode = "edit",
}: TiptapEditorProps) {
  const cachedContent = cache ? load<string>("content") : null;
  const initialContent: string = cachedContent ?? content ?? "";
  const [viewMode, setViewMode] = useState<ViewMode>(mode);

  const editor = useEditor({
    extensions: [...extensions],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap focus:outline-none min-h-32 sm:min-h-40 p-4 sm:p-6 text-theme text-sm sm:text-base leading-relaxed wrap-break-word",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.getHTML();
      if (onChange) {
        onChange(html);
      }
      if (cache) {
        save("content", html);
      }
    },
  });

  const previewHtml = useMemo<string>(() => {
    if (editor) return editor.getHTML();
    return initialContent;
  }, [editor, initialContent]);

  return (
    <div className="editor-shell w-full min-w-0">
      <div
        className="flex items-center justify-between gap-2 border-b border-theme px-3 py-2 sm:px-4"
        hidden={viewMode === "post"}
      >
        <div className="inline-flex items-center gap-1 rounded-lg border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] p-1">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={
              viewMode === "edit"
                ? "rounded-md px-3 py-1.5 text-xs font-semibold bg-primary text-white"
                : "rounded-md px-3 py-1.5 text-xs font-semibold text-muted hover:bg-[color-mix(in_srgb,var(--card)_80%,var(--primary))]"
            }
          >
            编辑
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={
              viewMode === "preview"
                ? "rounded-md px-3 py-1.5 text-xs font-semibold bg-primary text-white"
                : "rounded-md px-3 py-1.5 text-xs font-semibold text-muted hover:bg-[color-mix(in_srgb,var(--card)_80%,var(--primary))]"
            }
          >
            预览
          </button>
        </div>
        <span className="hidden sm:inline text-xs text-muted">
          {viewMode === "edit" ? "编辑模式" : "预览模式"}
        </span>
      </div>

      <Tiptap instance={editor}>
        {viewMode === "edit" ? (
          <>
            <MenuBar />
            <div className="editor-content">
              <Tiptap.Content className="w-full max-h-[60vh] sm:max-h-120" />
            </div>
          </>
        ) : (
          <div className="editor-content">
            {isPreviewEmpty(previewHtml) ? (
              <div className="min-h-32 sm:min-h-40 p-4 sm:p-6 text-sm text-muted">
                暂无预览内容
              </div>
            ) : (
              <div
                className="tiptap text-theme text-sm sm:text-base leading-relaxed wrap-break-word"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            )}
          </div>
        )}

        <Tiptap.Loading>
          <div className="editor-loading">
            <LoadingSpinner />
          </div>
        </Tiptap.Loading>
      </Tiptap>
    </div>
  );
}

export default TiptapEditor;
