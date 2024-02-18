/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
          },
          {
            protocol: "https",
            hostname: "static.wikia.nocookie.net",
          },
          {
            protocol: "https",
            hostname: "www.ptpn4.co.id",
          },
        ],
      },
};

export default nextConfig;
