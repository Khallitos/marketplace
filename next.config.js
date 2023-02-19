/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kanmusic.s3.eu-west-2.amazonaws.com',
        port: '',
        
      },
    ],
  },
}