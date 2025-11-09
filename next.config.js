/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 13.4+, no experimental flag needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'onwvmfdvzseidwnwyobj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
