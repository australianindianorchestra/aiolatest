/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['nodemailer'],
  // Compress responses
  compress: true,
  images: {
    // Keep unoptimized in dev — localhost WordPress images can't be optimized
    // In production with a real domain this can be set to false
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      // Local WordPress (http, any port, any path)
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      // WordPress API host (Hostinger)
      {
        protocol: 'https',
        hostname: 'lightsalmon-monkey-877750.hostingersite.com',
        pathname: '/**',
      },
      // Wildcard for any Hostinger subdomain (future-proofing)
      {
        protocol: 'https',
        hostname: '*.hostingersite.com',
        pathname: '/**',
      },
      // WordPress.com hosted images
      {
        protocol: 'https',
        hostname: '*.wordpress.com',
        pathname: '/**',
      },
      // WordPress.org CDN / gravatar
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        pathname: '/**',
      },
      // Common image CDNs used by WordPress plugins (Jetpack CDN)
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
        pathname: '/**',
      },
    ],
  },
  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/(.*)\\.(webp|png|jpg|jpeg|svg|ico|mp3|mp4|mpeg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers for all HTML pages (belt-and-suspenders alongside middleware)
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
}
module.exports = nextConfig;
