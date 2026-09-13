import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [{ source: "/robot.txt", destination: "/robots.txt", permanent: true }];
  },
};

export default nextConfig;
