"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, mode, toggle } = useTheme();

  if (typeof window === "undefined") {
    return null;
  }

  const label =
    mode === "system" ? "跟随系统主题" : theme === "dark" ? "深色主题" : "浅色主题";

  return (
    <div
      onClick={toggle}
      className="bg-surface text-theme hover:scale-105"
      aria-label={label}
      suppressHydrationWarning
      title={label}
    >
      {mode === "system" ? <Monitor /> : theme === "dark" ? <Sun /> : <Moon />}
    </div>
  );
}
