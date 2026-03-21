import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'JSON DERULE - JSON Tools | Format, Validate & Compare',
  description: 'A powerful JSON manipulation tool with formatting, validation, and comparison features. Format JSON with custom indentation, validate with detailed error reports, and compare objects with visual diff.',
  keywords: ['json', 'formatter', 'validator', 'comparison', 'json tools', 'json formatter', 'json validator', 'json compare', 'developer tools'],
  authors: [{ name: 'JSON DERULE Team' }],
  creator: 'JSON DERULE',
  publisher: 'JSON DERULE',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: {
      url: '/favicon.svg',
      sizes: '180x180',
      type: 'image/svg+xml',
    },
  },
  openGraph: {
    title: 'JSON DERULE - Professional JSON Tools',
    description: 'Format, validate, and compare JSON with ease. Professional-grade JSON manipulation tools for developers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON DERULE - JSON Tools',
    description: 'Professional JSON formatting, validation, and comparison tools for developers.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D9488',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}