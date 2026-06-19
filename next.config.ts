import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tpeikdlajiyuhinjtomh.supabase.co",
        pathname: "/storage/v1/object/public/recipe_images/**",
      },
    ],
  },
};

export default nextConfig;
