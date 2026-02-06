"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    return mode === "system" ? getSystemTheme() : mode;
  });

  useEffect(() => {
    if (mode !== "system") {
      setResolvedTheme(mode);
      document.documentElement.classList.toggle("dark", mode === "dark");
      localStorage.setItem(STORAGE_KEY, mode);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      const nextTheme: ResolvedTheme = media.matches ? "dark" : "light";
      setResolvedTheme(nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      localStorage.setItem(STORAGE_KEY, "system");
    };

    applySystemTheme();
    if (media.addEventListener) {
      media.addEventListener("change", applySystemTheme);
    } else {
      media.addListener(applySystemTheme);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", applySystemTheme);
      } else {
        media.removeListener(applySystemTheme);
      }
    };
  }, [mode]);

  const toggle = () => {
    setMode((prev) => {
      if (prev === "system") return "light";
      if (prev === "light") return "dark";
      return "system";
    });
  };

  return { theme: resolvedTheme, mode, setMode, toggle };
}
