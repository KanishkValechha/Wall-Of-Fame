/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
