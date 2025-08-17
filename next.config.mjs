/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // 👈 include the port if used
        pathname: "/uploads/**", // adjust this to match your image path
      },
    ],
  },
};

export default nextConfig;
