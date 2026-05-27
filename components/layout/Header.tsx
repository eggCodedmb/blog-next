import NavTab from "./NavTab";
import Link from "next/link";
import Image from "next/image";
import AuthMenu from "@/components/auth/AuthMenu";
import SearchBox from "@/components/search/SearchBox";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { getUser } from "@/lib/user/user.action";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

async function Header() {
  const user = await getUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <MobileDrawer isAdmin={!!user?.isAdmin} />
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={26} height={26} />
              <span className="hidden text-lg font-bold text-theme font-display sm:inline">
                DMB
              </span>
            </Link>
          </div>
          <div className="hidden h-full items-center lg:flex">
            <NavTab isAdmin={!!user?.isAdmin} />
          </div>
        </div>

        {/* Center: search */}
        <div className="mx-auto hidden w-full max-w-md md:block">
          <SearchBox />
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
