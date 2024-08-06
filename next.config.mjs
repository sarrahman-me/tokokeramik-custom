/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokokeramik-assets.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "toko-keramik-assets.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
