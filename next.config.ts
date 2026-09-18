import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 75 for the catalog, 85 for full-bleed campaign photography.
    qualities: [75, 85],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
