import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Newsreader } from "next/font/google";
import Header from "@/components/layout/Header";
// import LeftSidebar from "@/components/layout/LeftSidebar";
// import RightSidebar from "@/components/layout/RightSidebar";
import "@/app/globals.css";
import "@/app/style.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "1123",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${newsreader.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}
      >
        {/* 导航栏 */}
        <Header />
        <main className="flex min-w-0 flex-row relative">
          {/* 左侧边栏 */}
          {/* <LeftSidebar  /> */}
          <section className="flex min-w-0 flex-col flex-1 items-center">
            {/* 主内容 */}
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          {/* 右侧边栏 */}
          {/* <RightSidebar /> */}
          {/* 底部 */}
        </main>
      </body>
    </html>
  );
}
