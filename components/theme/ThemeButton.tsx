"use client";

import { useTheme } from "@/hooks/useTheme";
// import Image from "next/image";
import { Sun, Moon } from "lucide-react";
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="btn btn-outline bg-surface text-theme hover:scale-105 bg-gray-500"
      aria-label="Toggle theme"
    >
      {/* <Image
        src="/assets/dark.svg"
        width={22}
        height={22}
        alt="dark"
        className="block dark:hidden"
      /> */}
      <Moon className="block dark:hidden" />
      {/* <Image
        src="/assets/light.svg"
        width={22}
        height={22}
        alt="light"
        className="hidden dark:block"
      /> */}
      <Sun className="hidden dark:block" />
    </button>
  );
}
