import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'JSON DERULE - JSON Tools | Format, Validate & Compare',
  description: 'A powerful JSON manipulation tool with formatting, validation, and comparison features. Format JSON with custom indentation, validate with detailed error reports, and compare objects with visual diff.',
  keywords: ['json', 'formatter', 'validator', 'comparison', 'json tools', 'json formatter', 'json validator', 'json compare', 'developer tools'],
  authors: [{ name: 'JSON DERULE Team' }],
  creator: 'JSON DERULE',
  publisher: 'JSON DERULE',
  robots: 'index, follow',
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
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2196f3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}