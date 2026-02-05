import { useTiptap, useTiptapState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing/uploadthing";

/**
 * Menu bar component that uses useTiptap and useTiptapState hooks
 * to access the editor from context.
 */
function MenuBar() {
  const { editor, isReady } = useTiptap();
  const editorState = useTiptapState(menuBarStateSelector);

  const addImage = () => {
    const url = window.prompt("请输入图片 URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!isReady || !editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <s>S</s>
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          <code>Code</code>
        </button> */}
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <Image
            src="./assets/清除格式.svg"
            alt="清除格式"
            width={16}
            height={16}
          />
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <Image src="./assets/标记.svg" alt="标记" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          <Image
            src="./assets/paragraph.svg"
            alt="段落"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <Image
            src="./assets/无序.svg"
            alt="无序列表"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <Image
            src="./assets/有序列表.svg"
            alt="有序列表"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : ""}
        >
          <Image src="./assets/code.svg" alt="代码" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          <Image src="./assets/引用.svg" alt="引用" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Image
            src="./assets/水平分割线.svg"
            alt="水平分割线"
            width={16}
            height={16}
          />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <Image src="./assets/换行.svg" alt="换行" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Image src="./assets/撤销.svg" alt="撤销" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Image src="./assets/重做.svg" alt="重做" width={16} height={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <Image
            src="./assets/靠左对齐.svg"
            alt="靠左对齐"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <Image
            src="./assets/居中对齐.svg"
            alt="居中对齐"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <Image
            src="./assets/靠右对齐.svg"
            alt="靠右对齐"
            width={16}
            height={16}
          />
        </button>
        {/* <button onClick={addImage}>
          <Image
            src="/assets/_图片.svg"
            alt="插入图片"
            width={20}
            height={20}
          />
        </button> */}
        <UploadButton
          endpoint="imageUploader"
          config={{
            mode: "auto",
            // label: "插入图片",
          }}
          content={{}}
        />
      </div>
    </div>
  );
}

export default MenuBar;
