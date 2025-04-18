/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
