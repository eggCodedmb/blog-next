import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getUser } from "@/lib/user/user.action";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
async function AuthMenu() {
  const user = await getUser();
  if (user) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar.Root className="w-10 h-10 rounded-full">
            <Avatar.Image
              className="rounded-full  object-cover"
              src={user.avatar || ""}
              alt={user.name || ""}
              width={40}
              height={40}
            />
          </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link href="/profile">个人中心</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
  return null;
}

export default AuthMenu;
