"use client";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Tiptap, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TableOfContents from "@tiptap/extension-table-of-contents";
import MenuBar from "./MenuBar";
import { Editor } from "@tiptap/core";
import { Markdown } from "@tiptap/markdown";
import { save, load } from "@/lib/utils";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import "@/app/style.css";

const extensions = [
  TextStyleKit,
  StarterKit,
  Image,
  TextAlign,
  TableOfContents,
  Markdown,
];
interface TiptapEditorProps {
  content?: string;
  onChange: (html: string) => void;
  // 开启缓存
  cache?: boolean;
}

function TiptapEditor({ content, onChange, cache = false }: TiptapEditorProps) {
  const cachedContent = load("content");
  const editor = useEditor({
    extensions: [...extensions],
    content: cachedContent || content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap focus:outline-none min-h-40 p-6 text-theme leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      if (cache) {
        save("content", html);
      }
    },
  }) as Editor;

  return (
    <div className="editor-shell">
      <Tiptap instance={editor}>
        {/* 菜单栏 */}
        <MenuBar />
        {/* 编辑内容区域 */}
        <div className="editor-content">
          <Tiptap.Content className="w-full max-h-120" />
        </div>
        {/* 目录 */}
        {/* 加载中状态 */}
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
