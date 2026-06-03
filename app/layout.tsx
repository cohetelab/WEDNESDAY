import type { Metadata } from 'next'
import './globals.css'
import './pretendard.css'

export const metadata: Metadata = {
  title: 'Wednesday — 인플루언서 마케팅 플랫폼',
  description: '크리에이터를 대규모로 찾고, 관리하고, 연락하세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
