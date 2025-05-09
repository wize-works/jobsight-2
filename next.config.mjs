/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('https://placehold.co/**'),
            new URL('https://stwwmediaprodwu301.blob.core.windows.net/**')],
    }
};

export default nextConfig;
