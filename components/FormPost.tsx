"use client";
import Editor from "@/components/tiptap/Editor";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { CreatePostParams } from "@/lib/post/post.action";
function FormPost({
  onSubmit,
}: {
  onSubmit: (post: CreatePostParams) => void;
}) {
  const [post, setPost] = useState({
    published: false,
    title: "",
    content: "",
    cover: "",
    authorId: 0,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    console.log(post, "提交");

    e.preventDefault();
    if (post.content.trim() === "<p></p>" || post.content.trim() === "") {
      return;
    }
    onSubmit(post);
  };
  // 校验
  return (
    <div className="w-3xl rounded-md bg-card border border-theme card-glow">
      <Form.Root onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Form.Field name="title" className="mb-2 grid">
          <div className="flex items-baseline justify-end">
            {/* <Form.Label className="text-[15px] font-medium leading-8.75">
              标题
            </Form.Label> */}
            <Form.Message
              className="text-[13px] text-red-500 opacity-80"
              match="valueMissing"
            >
              标题不能为空
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              required
              type="text"
              className="w-full h-10 px-4 border border-theme bg-transparent rounded-md text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
              placeholder="请输入标题"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="content" className="mb-2 grid">
          <div className="flex items-baseline justify-between">
            <Form.Message
              className="text-[13px] text-muted opacity-80"
              match="valueMissing"
            >
              内容不能为空
            </Form.Message>
          </div>
          <Editor
            onChange={(html) => setPost({ ...post, content: html.trim() })}
            cache={true}
          />
          <Form.Control asChild>
            <textarea
              required
              value={post.content.replace(/<[^>]+>/g, "").trim()}
              readOnly
              className="hidden"
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="flex justify-center pb-1">
            <button
              className="btn btn-primary mt-2.5 h-9 w-30 shadow-sm hover:opacity-90"
              type="submit"
            >
              发布
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default FormPost;
