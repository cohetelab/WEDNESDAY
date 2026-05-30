'use client'
import Sidebar from '@/components/lists/Sidebar'
import CommunityTable from '@/components/community/CommunityTable'

export default function CommunityPage() {
  return (
    <div className="w-lists-app">
      <Sidebar />
      <div className="w-lists-main">
        <header className="w-topbar">
          <div className="w-topbar__list-name" role="button" style={{ borderRight: 'none', minWidth: 'auto' }}>
            <span className="w-topbar__list-title">Influencer Relationship Management (IRM)</span>
          </div>
        </header>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <CommunityTable />
        </div>
      </div>
    </div>
  )
}
