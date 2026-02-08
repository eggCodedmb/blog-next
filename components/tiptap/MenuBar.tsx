import { useTiptap, useTiptapState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";
import Image from "next/image";
import ImageUploadButton from "./ImageUploadButton";

/**
 * Menu bar component that uses useTiptap and useTiptapState hooks
 * to access the editor from context.
 */
function MenuBar() {
  const { editor, isReady } = useTiptap();
  const editorState = useTiptapState(menuBarStateSelector);

  if (!isReady || !editor) {
    return null;
  }

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-group">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={`editor-btn ${editorState.isBold ? "is-active" : ""}`}
        >
          <b>B</b>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={`editor-btn ${editorState.isItalic ? "is-active" : ""}`}
        >
          <i>I</i>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={`editor-btn ${editorState.isStrike ? "is-active" : ""}`}
        >
          <s>S</s>
        </button>
        {/* <button type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          <code>Code</code>
        </button> */}
        <button type="button"
          className="editor-btn"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <Image
            src="/assets/清除格式.svg"
            alt="清除格式"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          className="editor-btn"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <Image
            src="/assets/标记.svg"
            alt="标记"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`editor-btn ${editorState.isParagraph ? "is-active" : ""}`}
        >
          <Image
            src="/assets/paragraph.svg"
            alt="段落"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`editor-btn ${editorState.isHeading1 ? "is-active" : ""}`}
        >
          H1
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`editor-btn ${editorState.isHeading2 ? "is-active" : ""}`}
        >
          H2
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`editor-btn ${editorState.isHeading3 ? "is-active" : ""}`}
        >
          H3
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`editor-btn ${editorState.isHeading4 ? "is-active" : ""}`}
        >
          H4
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={`editor-btn ${editorState.isHeading5 ? "is-active" : ""}`}
        >
          H5
        </button>
        <button type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={`editor-btn ${editorState.isHeading6 ? "is-active" : ""}`}
        >
          H6
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`editor-btn ${editorState.isBulletList ? "is-active" : ""}`}
        >
          <Image
            src="/assets/无序.svg"
            alt="无序列表"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`editor-btn ${editorState.isOrderedList ? "is-active" : ""}`}
        >
          <Image
            src="/assets/有序列表.svg"
            alt="有序列表"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`editor-btn ${editorState.isCodeBlock ? "is-active" : ""}`}
        >
          <Image
            src="/assets/code.svg"
            alt="代码"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`editor-btn ${editorState.isBlockquote ? "is-active" : ""}`}
        >
          <Image
            src="/assets/引用.svg"
            alt="引用"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="editor-btn"
        >
          <Image
            src="/assets/水平分割线.svg"
            alt="水平分割线"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="editor-btn"
        >
          <Image
            src="/assets/换行.svg"
            alt="换行"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className="editor-btn"
        >
          <Image
            src="/assets/撤销.svg"
            alt="撤销"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className="editor-btn"
        >
          <Image
            src="/assets/重做.svg"
            alt="重做"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`editor-btn ${
            editor.isActive({ textAlign: "left" }) ? "is-active" : ""
          }`}
        >
          <Image
            src="/assets/靠左对齐.svg"
            alt="靠左对齐"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`editor-btn ${
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }`}
        >
          <Image
            src="/assets/居中对齐.svg"
            alt="居中对齐"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`editor-btn ${
            editor.isActive({ textAlign: "right" }) ? "is-active" : ""
          }`}
        >
          <Image
            src="/assets/靠右对齐.svg"
            alt="靠右对齐"
            width={16}
            height={16}
            className="editor-icon"
          />
        </button>
        <ImageUploadButton
          variant="solid"
          size="sm"
          label="插入图片"
          onUploadComplete={(url) => {
            editor.chain().focus().setImage({ src: url }).run();
          }}
          onUploadError={(error) => {
            console.error(error);
          }}
        />
      </div>
    </div>
  );
}

export default MenuBar;
