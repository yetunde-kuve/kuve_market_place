/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    HOST: process.env.HOST || "localhost",
  },
  images: {
    domains: ["mchris.ng"],
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
