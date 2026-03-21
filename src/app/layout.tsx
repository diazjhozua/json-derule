import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'JSON DERULE - Free JSON Formatter, Validator & Comparison Tool Online',
  description: 'Free online JSON tools for developers. Format JSON with custom indentation, validate with detailed error messages, and compare JSON objects with visual diff highlighting. No signup required - works offline.',
  keywords: [
    'json formatter online free', 'json validator', 'json comparison tool',
    'format json online', 'validate json', 'json diff', 'json tools',
    'json parser', 'json editor', 'prettify json', 'minify json',
    'developer tools', 'json syntax checker', 'json beautifier'
  ],
  authors: [{ name: 'JSON DERULE Team' }],
  creator: 'JSON DERULE',
  publisher: 'JSON DERULE',
  robots: 'index, follow',
  category: 'Developer Tools',
  classification: 'Business',
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
    title: 'JSON DERULE - Free Online JSON Formatter, Validator & Comparison Tool',
    description: 'Free JSON tools for developers. Format, validate, and compare JSON online with real-time error checking and visual diff highlighting. Works offline, no signup required.',
    type: 'website',
    locale: 'en_US',
    url: 'https://jhozuad.github.io/json-derule',
    siteName: 'JSON DERULE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON DERULE - Professional JSON Tools for Developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON DERULE - Free JSON Tools Online',
    description: 'Format, validate & compare JSON with professional developer tools. Real-time validation, visual diff, custom formatting. Free & works offline.',
    creator: '@json_derule',
    images: ['/twitter-image.png'],
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
        <StructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}