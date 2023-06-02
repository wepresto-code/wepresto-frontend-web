/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default(
  {
    dest: "public",
    register: true,
    skipWaiting: true,
  }
);

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
});/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
