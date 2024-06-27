/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wgzbocbfqqiybshzmfvx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // REVIEW: REMOVE DIS!!!!!!!!!!!!!!!!!!!!!
  typescript: {
    ignoreBuildErrors: true,
  },
  // REVIEW: and also dis!!11!
  // output: "export",
};

export default nextConfig;
