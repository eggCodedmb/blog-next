"use client";

import { useTheme } from "@/hooks/useTheme";
// import Image from "next/image";
import { Sun, Moon } from "lucide-react";
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <div
      onClick={toggle}
      className="bg-surface text-theme hover:scale-105 bg-gray-500"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </div>
  );
}
