// 'use cilent'
import NavTab from "./NavTab";
import Link from "next/link";
import Image from "next/image";
import AuthMenu from "@/components/auth/AuthMenu";
import ThemeToggle from "@/components/theme/ThemeButton";
import SearchBox from "@/components/search/SearchBox";
import { getUser } from "@/lib/user/user.action";

async function Header() {
  const user = await getUser();
  return (
    <header className="w-full h-16 bg-surface border-b border-theme flex items-center gap-4 px-5">
      <div className="flex items-center">
        <div className="mr-2 hover:cursor-pointer hidden max-sm:block">
          <button className="btn btn-ghost btn-icon">
            <Image src="/assets/菜单.svg" alt="menu" width={24} height={24} />
          </button>
        </div>
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
          {/* <p className="text-lg font-semibold text-theme font-display pl-3 max-sm:hidden">
            
          </p> */}
        </Link>
      </div>
      <nav className="w-full h-full flex-1 max-sm:hidden">
        <NavTab isAdmin={!!user?.isAdmin} />
      </nav>
      <div className="max-sm:hidden w-full max-w-xs md:max-w-sm lg:max-w-md">
        <SearchBox />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <AuthMenu />
      </div>
    </header>
  );
}

export default Header;
