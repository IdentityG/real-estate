import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'a.tile.openstreetmap.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'b.tile.openstreetmap.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'c.tile.openstreetmap.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'server.arcgisonline.com',
        pathname: '**',
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
