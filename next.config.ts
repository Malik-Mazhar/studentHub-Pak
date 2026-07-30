import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ytimg.com",
        },
    ],
    domains: [
      "sgp.cloud.appwrite.io",
      "res.cloudinary.com"
    ]
  }
};

export default nextConfig;