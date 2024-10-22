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
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Powered-By",
            value: "Next.js",
          },
          {
            key: "Server",
            value: "Next.js",
          },
          {
            key: "X-Download-Options",
            value: "noopen",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "content-security-policy",
            value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
