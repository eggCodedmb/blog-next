"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Info, FileText, ShieldCheck } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import SearchBox from "@/components/search/SearchBox";

const ICONS: Record<string, React.ElementType> = {
  "/": Home,
  "/profile": User,
  "/my-posts": FileText,
  "/about": Info,
  "/review": ShieldCheck,
};

export default function MobileDrawer({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = isAdmin
    ? [
        ...NAV_LINKS,
        { href: "/review", label: "审核", icon: "" },
      ]
    : NAV_LINKS;

  return (
    <div className="sm:hidden">
      <button
        className="btn btn-ghost btn-icon"
        aria-label="打开菜单"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="关闭菜单"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-card border-r border-theme p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">导航</p>
              <button
                className="btn btn-ghost btn-icon"
                aria-label="关闭菜单"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <SearchBox />
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              {links.map((item) => {
                const Icon = ICONS[item.href] || FileText;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={
                      active
                        ? "flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-theme hover:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
                    }
                  >
                    <Icon size={18} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
