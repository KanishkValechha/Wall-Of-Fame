/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
