// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Use the correct port for localhost
        pathname: '/images/**', // Adjust this path if necessary
      },
      {
        protocol: 'http',
        hostname: 'ghp-school-backend.vercel.app',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ghp-school-backend.vercel.app',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https', // Adding Imgur configuration
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**', // Match all image paths
      },
      {
        protocol: 'https', // Adding Imgur configuration
        hostname: 'imgur.com',
        port: '',
        pathname: '/**', // Match all image paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
