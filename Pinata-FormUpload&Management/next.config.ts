import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chocolate-careful-anglerfish-118.mypinata.cloud',
      },
    ],
  },
};

export default nextConfig;
