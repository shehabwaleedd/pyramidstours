/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    experimental: { optimizeCss: true },
    images: {
        domains: ['res.cloudinary.com'],
    }
};

export default nextConfig;
