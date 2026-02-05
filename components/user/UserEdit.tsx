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
    <div className="w-3xl bg-card border border-theme p-6 rounded-md card-glow">
      <div className="text-sm text-theme mb-3 line-clamp-2">
        <div className="flex flex-col items-center gap-3">
          <AvatarUploader
            name={name || ""}
            image={avatar || ""}
            onChange={(state, res) => {
              console.log("res", res);
              const url = res?.ufsUrl || "";
              if (state === "success") {
                setUser({
                  ...user,
                  avatar: url || "",
                });
              }
            }}
          />

          <div>
            <Form.Root onSubmit={onSubmit} className="flex flex-col gap-3">
              <Form.Field name="email" className="flex flex-col gap-1">
                <Form.Label>
                  <b>邮箱</b>
                </Form.Label>
                <Form.Control asChild>
                  <span className="text-muted">{email}</span>
                </Form.Control>
              </Form.Field>
              <Form.Field name="name" className="flex flex-col gap-1">
                <Form.Label>
                  <b>昵称</b>
                </Form.Label>
                <Form.Message name="name" match="valueMissing">
                  请输入昵称
                </Form.Message>
                <Form.Control asChild>
                  <input
                    className="w-full px-3 py-2 border border-theme bg-transparent rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20"
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
              </Form.Field>
              <Form.Submit asChild>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md transition hover:opacity-90"
                    type="submit"
                  >
                  {isPending ? "保存中..." : "保存修改"}
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
