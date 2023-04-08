/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/articles",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
