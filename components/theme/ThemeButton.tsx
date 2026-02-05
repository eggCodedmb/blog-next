"use client"

import { useTheme } from "@/hooks/useTheme"
import Image from "next/image"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="btn btn-outline bg-surface text-theme hover:scale-105 bg-gray-500"
      aria-label="Toggle theme"
    >
      <Image
        src="/assets/dark.svg"
        width={22}
        height={22}
        alt="dark"
        className="block dark:hidden"
      />
      <Image
        src="/assets/light.svg"
        width={22}
        height={22}
        alt="light"
        className="hidden dark:block"
      />
    </button>
  )
}
