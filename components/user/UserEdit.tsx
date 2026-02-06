"use client";
import AvatarUploader from "@/components/user/AvatarUploader";
import * as Form from "@radix-ui/react-form";
import { updateUser } from "@/lib/user/user.action";
import { useState, useTransition } from "react";
export interface UserEditProps {
  id: number;
  email: string;
  name: string | null;
  avatar: string;
}
function UserEdit({ id, email, name, avatar }: UserEditProps) {
  const [user, setUser] = useState({
    avatar: avatar || "",
    name: name || "",
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateUser(id, {
          avatar: user.avatar,
          name: user.name || "",
        });
      } catch (err) {
        console.error(err);
      }
    });
  };
  return (
    <section className="w-full max-w-3xl bg-card border border-theme rounded-2xl p-6 sm:p-8 card-glow">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold text-theme">个人信息</p>
          <p className="text-xs text-muted">更新头像和昵称，展示更完整的个人资料。</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3 sm:w-44">
            <AvatarUploader
              name={name || ""}
              image={avatar || ""}
              onChange={(state, res) => {
                const url = res?.ufsUrl || "";
                if (state === "success") {
                  setUser({
                    ...user,
                    avatar: url || "",
                  });
                }
              }}
            />
            <p className="text-xs text-muted text-center">
              推荐使用正方形图片，清晰展示头像。
            </p>
          </div>

          <Form.Root onSubmit={onSubmit} className="flex-1 flex flex-col gap-4">
            <Form.Field name="email" className="flex flex-col gap-1">
              <Form.Label className="text-sm font-medium text-theme">
                邮箱
              </Form.Label>
              <Form.Control asChild>
                <div className="rounded-lg border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] px-3 py-2 text-sm text-muted">
                  {email}
                </div>
              </Form.Control>
            </Form.Field>

            <Form.Field name="name" className="flex flex-col gap-1">
              <Form.Label className="text-sm font-medium text-theme">
                昵称
              </Form.Label>
              <Form.Message name="name" match="valueMissing" className="text-xs text-red-500">
                请输入昵称
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="w-full rounded-lg border border-theme bg-transparent px-3 py-2 text-sm text-theme focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      name: e.target.value,
                    });
                  }}
                />
              </Form.Control>
              <p className="text-xs text-muted">昵称会显示在你的帖子与评论中。</p>
            </Form.Field>

            <div className="flex items-center gap-3">
              <Form.Submit asChild>
                <button
                  className="btn btn-primary hover:opacity-90"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "保存中..." : "保存修改"}
                </button>
              </Form.Submit>
              <span className="text-xs text-muted">
                修改会立即生效
              </span>
            </div>
          </Form.Root>
        </div>
      </div>
    </section>
  );
}

export default UserEdit;
