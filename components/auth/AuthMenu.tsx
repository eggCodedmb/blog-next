import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getUser } from "@/lib/user/user.action";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import LogoutButton from "@/components/auth/LogoutButton";
async function AuthMenu() {
  const user = await getUser();
  if (user) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-theme bg-surface px-2 py-1.5 transition hover:shadow-sm">
            <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden border border-theme">
              <Avatar.Image
                className="size-full object-cover"
                src={user.avatar || ""}
                alt={user.name || ""}
                width={32}
                height={32}
              />
            </Avatar.Root>
            <div className="hidden max-sm:hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-medium text-theme">
                {user.name || "匿名用户"}
              </span>
              <span className="text-xs text-muted">{user.email}</span>
            </div>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="min-w-56 rounded-xl border border-theme bg-card p-2 shadow-lg"
          >
            <DropdownMenu.Label className="px-2 py-1 text-xs text-muted">
              已登录
            </DropdownMenu.Label>
            <DropdownMenu.Item asChild>
              <Link
                href="/profile"
                className="flex w-full items-center rounded-lg px-2 py-2 text-sm text-theme transition hover:bg-[color-mix(in_srgb,var(--card)_80%,var(--primary))]"
              >
                个人中心
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 h-px bg-(--border)" />
            <DropdownMenu.Item asChild>
              <LogoutButton className="flex w-full items-center rounded-lg px-2 py-2 text-sm text-muted transition hover:bg-[color-mix(in_srgb,var(--card)_80%,var(--primary))] hover:text-theme disabled:opacity-60" />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
  return (
    <Link href="/login" className="btn btn-outline bg-surface text-theme">
      登录 / 注册
    </Link>
  );
}

export default AuthMenu;
