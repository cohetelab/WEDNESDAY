'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Database, CreditCard,
  ChevronRight, Settings, LogOut, Shield,
} from 'lucide-react'

const NAV = [
  { href: '/admin',              icon: LayoutDashboard, label: '대시보드' },
  { href: '/admin/users',        icon: Users,           label: '유저 관리' },
  { href: '/admin/creators',     icon: Database,        label: '크리에이터 DB' },
  { href: '/admin/subscriptions',icon: CreditCard,      label: '구독/결제' },
]

export default function AdminSidebar() {
  const path = usePathname()

  return (
    <aside className="adm-sidebar">
      {/* Logo */}
      <div className="adm-sidebar__logo">
        <div className="adm-sidebar__logo-icon">
          <Shield size={14} />
        </div>
        <span className="adm-sidebar__logo-text">Admin</span>
      </div>

      {/* Nav */}
      <nav className="adm-sidebar__nav">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = path === href
          return (
            <Link
              key={href}
              href={href}
              className={`adm-sidebar__item ${active ? 'adm-sidebar__item--active' : ''}`}
            >
              <Icon size={15} className="adm-sidebar__item-icon" />
              <span>{label}</span>
              {active && <ChevronRight size={12} className="adm-sidebar__item-arrow" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="adm-sidebar__footer">
        <Link href="/lists" className="adm-sidebar__footer-btn">
          <ChevronRight size={13} style={{ transform: 'rotate(180deg)' }} />
          <span>서비스로 돌아가기</span>
        </Link>
        <button className="adm-sidebar__footer-btn adm-sidebar__footer-btn--danger">
          <LogOut size={13} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  )
}
