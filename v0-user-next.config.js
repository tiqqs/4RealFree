/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.freetogame.com", // <-- Hinzufügen!
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
