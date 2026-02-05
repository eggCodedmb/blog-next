import type { Config } from "tailwindcss";
// import { blackA, violet, mauve } from "@radix-ui/colors";
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...blackA,
        // ...violet,
        // ...mauve,
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
} satisfies Config;
