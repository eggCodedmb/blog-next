import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 不限制图片来源
    domains: ["https://uploadthing.com/"],
  },
};

export default nextConfig;
