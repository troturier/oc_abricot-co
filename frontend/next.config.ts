import type { NextConfig } from "next";

// Security headers applied to every response. The CSP is not set here because
// Next.js injects inline scripts for hydration; the other headers are safe defaults.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Every page depends on the session cookie, so Cache Components brings no benefit here
  // and makes cookie reads outside <Suspense> fail at prerender time.
  cacheComponents: false,
  // LlamaIndex and the Mistral SDK are Node-only packages: keep them out of the bundle.
  serverExternalPackages: ["llamaindex", "@llamaindex/mistral", "@mistralai/mistralai"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
