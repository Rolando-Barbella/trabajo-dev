/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    GREETING: process.env.NEXT_PUBLIC_PRODUCT_ID_PROD,
  }
}

module.exports = nextConfig
