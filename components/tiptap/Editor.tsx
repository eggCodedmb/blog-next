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
// import { generateHTML } from "@tiptap/html";
import { save, load } from "@/lib/utils";
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
  }) as Editor;

  editor?.on("update", ({ editor }) => {
    onChange(editor.getHTML());
    // 缓存内容
    if (cache) {
      save("content", editor.getHTML());
    }
  });

  return (
    <div>
      <Tiptap instance={editor}>
        {/* 菜单栏 */}
        <MenuBar />
        {/* 编辑内容区域 */}
        <div className="main overflow-auto">
          <Tiptap.Content className="w-full max-h-120" />
        </div>
        {/* 目录 */}
        {/* 加载中状态 */}
        <Tiptap.Loading>
          <div className="w-full h-120 rounded-md absolute top-0 left-0 flex items-center justify-center bg-slate-100">
            加载中...
          </div>
        </Tiptap.Loading>
      </Tiptap>
    </div>
  );
}

export default TiptapEditor;
