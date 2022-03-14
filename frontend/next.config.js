/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLIENT_HOST: process.env.NEXT_PUBLIC_CLIENT_HOST,
  },
};
