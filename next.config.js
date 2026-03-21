/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Static export configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure base path for GitHub Pages (change 'json-derule' to match your repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/json-derule' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/json-derule' : '',
}

module.exports = nextConfig