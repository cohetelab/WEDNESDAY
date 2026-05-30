'use client'
import { useState } from 'react'
import Sidebar from '@/components/lists/Sidebar'
import Topbar from '@/components/lists/Topbar'
import SearchQueryBuilder from '@/components/lists/SearchQueryBuilder'
import EmptyState from '@/components/lists/EmptyState'
import SelectedInfluencers from '@/components/lists/SelectedInfluencers'
import CreatorResults from '@/components/lists/CreatorResults'

type Tab = 'find' | 'selected' | 'rejected' | 'lookalikes'

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('find')
  const [hasResults, setHasResults] = useState(false)

  return (
    <div className="w-lists-app">
      <Sidebar />
      <div className="w-lists-main">
        <Topbar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Find creators 탭 */}
        {activeTab === 'find' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <SearchQueryBuilder onSearch={() => setHasResults(true)} />
            <div className="w-lists-content">
              {hasResults ? <CreatorResults /> : <EmptyState />}
            </div>
          </div>
        )}

        {/* Selected 탭 */}
        {activeTab === 'selected' && (
          <div className="w-lists-content">
            <SelectedInfluencers />
          </div>
        )}

        {/* Rejected 탭 */}
        {activeTab === 'rejected' && (
          <div className="w-lists-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', color: '#6b7280', fontSize: '14px' }}>
            No rejected creators yet.
          </div>
        )}

        {/* Lookalikes 탭 */}
        {activeTab === 'lookalikes' && (
          <div className="w-lists-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', color: '#6b7280', fontSize: '14px' }}>
            Upgrade to unlock Lookalikes.
          </div>
        )}
      </div>
    </div>
  )
}
