import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NexusBee · Digital agency',
    short_name: 'NexusBee',
    description: 'Website development, digital marketing and AI automation agency in India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#120030',
    theme_color: '#120030',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
