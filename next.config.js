/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  images: {
    loader: 'akamai',
    path: '',
  },
  trailingSlash: true,
}
