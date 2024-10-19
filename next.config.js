/** @type {import('next').NextConfig} */
const crypto = require("crypto");

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: `script-src 'self' 'nonce-${generateNonce()}';` // Dynamically generate nonce
          // },
        ],
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

function generateNonce() {
  return crypto.randomBytes(16).toString("base64"); // Generates a secure random nonce
}

module.exports = nextConfig;
