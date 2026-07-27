import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Le immagini dei contenuti arrivano dalla CDN di Sanity
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
