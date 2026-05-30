import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wednesday — Influencer Marketing Platform',
  description: 'Find, manage, and contact creators at scale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
