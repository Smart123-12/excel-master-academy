import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/excel-master-academy',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
