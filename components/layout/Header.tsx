// 'use cilent'
import NavTab from "./NavTab";
import Link from "next/link";
import Image from "next/image";
import AuthMenu from "@/components/auth/AuthMenu";
import ThemeToggle from "@/components/theme/ThemeButton";

function Header() {
  return (
    <header className="w-full h-16 bg-surface border-b border-theme flex justify-between">
      <div className="flex items-center m-5">
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
        <NavTab />
      </nav>
      <div className="flex items-center m-5">
        <ThemeToggle />
      </div>
      <div className="flex items-center m-5">
        <AuthMenu />
      </div>
    </header>
  );
}

export default Header;
