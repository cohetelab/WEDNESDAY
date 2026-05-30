'use client'
import Sidebar from '@/components/lists/Sidebar'
import InboxEmpty from '@/components/inbox/InboxEmpty'

export default function InboxPage() {
  return (
    <div className="w-lists-app">
      <Sidebar />
      <div className="w-lists-main">
        {/* Topbar */}
        <header className="w-topbar">
          <div className="w-topbar__list-name" role="button" style={{ borderRight: 'none', minWidth: 'auto' }}>
            <span className="w-topbar__list-title">Inbox</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </header>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <InboxEmpty />
        </div>
      </div>
    </div>
  )
}
