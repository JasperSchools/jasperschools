/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    ENABLE_DATABASE: process.env.ENABLE_DATABASE,
    ENABLE_DONATIONS: process.env.ENABLE_DONATIONS,
    ENABLE_CHILDREN_SPONSORSHIP: process.env.ENABLE_CHILDREN_SPONSORSHIP,
    ENABLE_VOLUNTEER: process.env.ENABLE_VOLUNTEER,
    ENABLE_CONTACT: process.env.ENABLE_CONTACT,
    ENABLE_CAREERS: process.env.ENABLE_CAREERS,
    ENABLE_ADMIN: process.env.ENABLE_ADMIN,
  },
  images: {
    unoptimized: true,
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
