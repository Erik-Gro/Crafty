/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // might need it when shipping to prod
      // {
      //   protocol: "https",
      //   hostname: "utfs.io",
      // },
    ],
  },
};

export default nextConfig;
