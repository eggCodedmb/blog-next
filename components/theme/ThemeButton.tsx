"use client";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="btn btn-outline bg-surface text-theme hover:scale-105"
    >
      {theme === "light" ? "🌚 Dark" : "🌞 Light"}
    </button>
  );
}
