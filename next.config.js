/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com", "iiitd.ac.in"],
  },
  env:{
    NEXTAUTH_URL:"http://localhost:3000",
    NEXTAUTH_SECRET:"8dfsaa9sf77f8as7f9af8df7aj2h52m5vg5d",
    SITE_KEY:"6LcnfV8pAAAAAJ1p0zvVk1PL_NJz0FtseoJX1oZ1",
    SECRET_KEY:"6LcnfV8pAAAAAHPOQFUz4cawxZJ3ozSLt3ZjKynz"
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
