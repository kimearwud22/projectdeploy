/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dkjialnw3",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:"mlr1t3cf"
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
