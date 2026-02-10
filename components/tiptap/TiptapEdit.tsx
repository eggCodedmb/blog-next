"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { SimpleEditorRef } from "@/components/tiptap-templates/simple/simple-editor";
import { useRef } from "react";
const TiptapEdit = () => {
  const editorRef = useRef<SimpleEditorRef>(null);
  const onSubmit = () => {
    const json = editorRef.current?.getJSON();
    const html = editorRef.current?.getHTML()
    console.log(html);
    
    console.log(json);
  };
  // onSubmit()
  return (
    <div>
      {/* <button onClick={onSubmit}>提交</button> */}
      <SimpleEditor ref={editorRef} />
    </div>
  );
};

export default TiptapEdit;
