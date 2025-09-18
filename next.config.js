/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    // allow your project host
    domains: ["ipt315-project.vercel.app"],
    // optional explicit pattern
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipt315-project.vercel.app",
      },
    ],
  },
};

export default nextConfig;
