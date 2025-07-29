/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  allowedDevOrigins: ["192.168.0.30"],
};

export default nextConfig;
