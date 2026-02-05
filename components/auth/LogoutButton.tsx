"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/user/user.action";

export default function LogoutButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout();
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
      disabled={isPending}
    >
      {isPending ? "退出中..." : "退出登录"}
    </button>
  );
}
