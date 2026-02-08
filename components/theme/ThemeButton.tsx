"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, mode, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggle}
      className="bg-surface text-theme hover:scale-105"
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      {mounted ? (
        mode === "system" ? (
          <Monitor />
        ) : theme === "dark" ? (
          <Sun />
        ) : (
          <Moon />
        )
      ) : (
        <span className="block size-5" aria-hidden="true" />
      )}
    </button>
  );
}
