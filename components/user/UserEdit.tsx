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
  isAdmin: boolean;
}
function UserEdit({ id, email, name, avatar, isAdmin }: UserEditProps) {
  const [user, setUser] = useState({
    avatar: avatar || "",
    name: name || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const wantsPasswordChange =
          user.currentPassword || user.newPassword || user.confirmPassword;
        await updateUser(id, {
          avatar: user.avatar,
          name: user.name || "",
          ...(wantsPasswordChange
            ? {
                currentPassword: user.currentPassword,
                newPassword: user.newPassword,
                confirmPassword: user.confirmPassword,
              }
            : {}),
        });
        if (wantsPasswordChange) {
          setUser({
            ...user,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    });
  };
  return (
    <div className="w-full px-4 sm:px-0">
      <section className="mx-auto w-full max-w-4xl bg-card border border-theme rounded-2xl p-4 sm:p-8 card-glow">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-theme">个人信息</p>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${
              isAdmin
                ? "border-primary text-primary"
                : "border-theme text-muted"
            }`}
          >
            {isAdmin ? "管理员" : "普通用户"}
          </span>
        </div>
        <div>
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

            <div className="h-px w-full bg-[color-mix(in_srgb,var(--border)_70%,transparent)]" />

            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-medium text-theme">修改密码</p>
                <p className="text-xs text-muted">
                  如果不需要修改密码，可留空。
                </p>
              </div>

              <Form.Field name="currentPassword" className="flex flex-col gap-1">
                <Form.Label className="text-sm font-medium text-theme">
                  当前密码
                </Form.Label>
                <Form.Control asChild>
                  <input
                    className="w-full rounded-lg border border-theme bg-transparent px-3 py-2 text-sm text-theme focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
                    type="password"
                    value={user.currentPassword}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        currentPassword: e.target.value,
                      });
                    }}
                    autoComplete="current-password"
                  />
                </Form.Control>
              </Form.Field>

              <div className="grid gap-3 sm:grid-cols-2">
                <Form.Field name="newPassword" className="flex flex-col gap-1">
                  <Form.Label className="text-sm font-medium text-theme">
                    新密码
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      className="w-full rounded-lg border border-theme bg-transparent px-3 py-2 text-sm text-theme focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
                      type="password"
                      value={user.newPassword}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          newPassword: e.target.value,
                        });
                      }}
                      autoComplete="new-password"
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field
                  name="confirmPassword"
                  className="flex flex-col gap-1"
                >
                  <Form.Label className="text-sm font-medium text-theme">
                    确认新密码
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      className="w-full rounded-lg border border-theme bg-transparent px-3 py-2 text-sm text-theme focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          confirmPassword: e.target.value,
                        });
                      }}
                      autoComplete="new-password"
                    />
                  </Form.Control>
                </Form.Field>
              </div>
            </div>

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
    </div>
  );
}

export default UserEdit;
