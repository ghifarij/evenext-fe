/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiketevent.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com"
      },
      {
        protocol: "https",
        hostname: "assets.loket.com"
      }
    ],
  },};

export default nextConfig;
