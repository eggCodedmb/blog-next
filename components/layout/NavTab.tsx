"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
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
  return (
    <div className="w-full h-full flex items-center gap-4">
      {links.map((item) => (
        <Link key={item.href} href={item.href}>
          {/* <Image src={item.icon} alt={item.label} width={24} height={24} /> */}
          <span
            className={
              isActive === item.href
                ? "text-primary font-semibold text-lg"
                : "text-theme font-semibold"
            }
          >
            {item.label}
            <p
              className={
                isActive === item.href ? "border-b-2 border-primary" : ""
              }
            ></p>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default NavTab;
