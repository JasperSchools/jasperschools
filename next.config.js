/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 13.4+, no experimental flag needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
