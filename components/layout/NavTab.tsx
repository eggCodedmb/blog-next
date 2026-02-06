"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { Home, User, Info, FileText, ShieldCheck } from "lucide-react";
// import Image from "next/image";
function NavTab({ isAdmin }: { isAdmin: boolean }) {
  const isActive = usePathname();
  const links = isAdmin
    ? [
        ...NAV_LINKS,
        {
          href: "/review",
          label: "审核",
          icon: "",
        },
      ]
    : NAV_LINKS;

  const iconMap: Record<string, React.ElementType> = {
    "/": Home,
    "/profile": User,
    "/my-posts": FileText,
    "/about": Info,
    "/review": ShieldCheck,
  };

  return (
    <div className="w-full h-full flex items-center gap-4 lg:gap-6 flex-nowrap whitespace-nowrap">
      {links.map((item) => (
        <Link key={item.href} href={item.href}>
          <span
            className={
              isActive === item.href
                ? "text-primary font-semibold text-lg"
                : "text-theme font-semibold"
            }
          >
            <span className="hidden md:inline-flex lg:hidden items-center">
              {(() => {
                const Icon = iconMap[item.href] || FileText;
                return <Icon size={18} />;
              })()}
            </span>
            <span className="hidden lg:inline-flex">{item.label}</span>
            <p className={isActive === item.href ? "border-b-2 border-primary" : ""}></p>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default NavTab;
