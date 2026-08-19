/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  reactCompiler: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
