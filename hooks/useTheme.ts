"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    return mode === "system" ? systemTheme : mode;
  }, [mode, systemTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      const nextTheme: ResolvedTheme = media.matches ? "dark" : "light";
      setSystemTheme(nextTheme);
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
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, resolvedTheme]);

  const toggle = () => {
    setMode((prev) => {
      if (prev === "system") return "light";
      if (prev === "light") return "dark";
      return "system";
    });
  };

  return { theme: resolvedTheme, mode, setMode, toggle };
}
