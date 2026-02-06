// 'use cilent'
import NavTab from "./NavTab";
import Link from "next/link";
import Image from "next/image";
import AuthMenu from "@/components/auth/AuthMenu";
import ThemeToggle from "@/components/theme/ThemeButton";
import SearchBox from "@/components/search/SearchBox";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { getUser } from "@/lib/user/user.action";

async function Header() {
  const user = await getUser();
  return (
    <header className="w-full h-16 bg-surface border-b border-theme flex items-center gap-4 px-5">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center">
          <div className="mr-2">
            <MobileDrawer isAdmin={!!user?.isAdmin} />
          </div>
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
          </Link>
        </div>
        <div className="h-full flex-1 max-sm:hidden overflow-hidden">
          <NavTab isAdmin={!!user?.isAdmin} />
        </div>
        <div className="max-sm:hidden w-full max-w-xs md:max-w-sm lg:max-w-md">
          <SearchBox />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        <AuthMenu />
      </div>
    </header>
  );
}

export default Header;
