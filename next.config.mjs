/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
  // при необходимости: настройка доменов для <Image>
  images: {
    domains: ['credits-site.com', 'another-cdn.com'],
  },
  // включаем сжатие
  compress: true,
}

module.exports = nextConfig
