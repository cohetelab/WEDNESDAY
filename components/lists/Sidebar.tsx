'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search, Mail, List, ChevronLeft, ChevronRight,
  Users, Bell, HelpCircle, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/lists', icon: Search, label: 'Search' },
    { href: '/inbox', icon: Mail, label: 'Inbox' },
    { href: '/community', icon: List, label: 'Community' },
  ]

  return (
    <nav className={`w-sidebar ${collapsed ? 'w-sidebar--collapsed' : 'w-sidebar--expanded'}`}>
      {/* Logo */}
      <div className="w-sidebar__logo">
        <Link href="/lists" className="w-sidebar-item w-sidebar-item--logo">
          <div className="w-sidebar-item__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#6B21A8"/>
              <path d="M7 8l5 8 5-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      </div>

      <div className="w-sidebar__content">
        <div className="w-sidebar__nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-sidebar-item ${isActive ? 'w-sidebar-item--active' : ''}`}
              >
                <div className="w-sidebar-item__icon">
                  <Icon size={15} />
                </div>
                {!collapsed && <span className="w-sidebar-item__label">{item.label}</span>}
              </Link>
            )
          })}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-sidebar-item w-sidebar__collapse-btn"
        >
          <div className="w-sidebar-item__icon">
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </div>
          {!collapsed && <span className="w-sidebar-item__label">Collapse</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="w-sidebar__footer">
        {/* Trial */}
        {!collapsed && (
          <div className="w-sidebar__trial">
            <span className="w-sidebar__trial-text">
              <strong>7 days</strong> for $1
            </span>
            <Link href="/settings/plans" className="w-tag w-tag--primary" style={{ textDecoration: 'none' }}>
              Try Pro
            </Link>
          </div>
        )}

        {/* Community usage */}
        <Link href="/settings/billing" className="w-sidebar-item" style={{ textDecoration: 'none', flexDirection: collapsed ? 'row' : 'column', alignItems: collapsed ? 'center' : 'flex-start', height: 'auto', padding: '6px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
            <div className="w-sidebar-item__icon"><Users size={15} /></div>
            {!collapsed && <span className="w-sidebar-item__label">Community</span>}
          </div>
          {!collapsed && (
            <div className="w-sidebar__community-stats">
              <span className="w-sidebar__community-count">3</span>
              <div className="w-progress">
                <div className="w-progress__bar" style={{ width: '3%' }} />
              </div>
            </div>
          )}
        </Link>

        {/* Notification */}
        <button className="w-sidebar-item">
          <div className="w-sidebar-item__icon"><Bell size={15} /></div>
          {!collapsed && <span className="w-sidebar-item__label">Notification</span>}
        </button>

        {/* Help */}
        <button className="w-sidebar-item">
          <div className="w-sidebar-item__icon"><HelpCircle size={15} /></div>
          {!collapsed && <span className="w-sidebar-item__label">Help</span>}
        </button>

        {/* My Account */}
        <button className="w-sidebar-item w-sidebar__account">
          <div className="w-avatar w-avatar--sm">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocKG2DzPlXxDucmv1dbZwWQDKYHBQ5a-tQU82XOh5jSim1i51A=s96-c"
              alt="avatar"
              className="w-avatar__img"
            />
          </div>
          {!collapsed && (
            <span className="w-sidebar-item__label" style={{ marginLeft: '6px' }}>My account</span>
          )}
        </button>
      </div>
    </nav>
  )
}
