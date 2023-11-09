/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['resizedimgs.vivareal.com', 'cdn1.vivareal.com'],
  },
};
