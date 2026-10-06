import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: "/surf", destination: "/guide", permanent: true },
      { source: "/eat", destination: "/guide", permanent: true },
      { source: "/things-to-do", destination: "/guide", permanent: true },
      { source: "/day-trips", destination: "/guide", permanent: true },
      { source: "/getting-here", destination: "/guide", permanent: true },
      { source: "/good-things-to-know", destination: "/guide", permanent: true },
      { source: "/ahangama", destination: "/guide", permanent: true },
      { source: "/guide/surf", destination: "/guide", permanent: true },
      { source: "/guide/eat", destination: "/guide", permanent: true },
      { source: "/guide/things-to-do", destination: "/guide", permanent: true },
      { source: "/guide/day-trips", destination: "/guide", permanent: true },
      { source: "/guide/getting-here", destination: "/guide", permanent: true },
      { source: "/guide/good-things-to-know", destination: "/guide", permanent: true },
      { source: "/terms", destination: "/return-policy", statusCode: 301 },
    ]
  },
}

export default nextConfig
