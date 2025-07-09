/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ✅ OK for Next.js 14+
  },
  env: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN, // ✅ Make token available in server code
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/api/auth/signin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
