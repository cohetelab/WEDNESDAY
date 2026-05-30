'use client'
import { useState, useRef } from 'react'
import { Search, UserCheck, UserX, Sparkles, BookOpen, Lock, ChevronUp, ChevronDown } from 'lucide-react'
import ListsPanel from './ListsPanel'

type Tab = 'find' | 'selected' | 'rejected' | 'lookalikes'

interface TopbarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function Topbar({ activeTab, onTabChange }: TopbarProps) {
  const [listOpen, setListOpen] = useState(false)
  const [listName, setListName] = useState('My first list')
  const listWrapRef = useRef<HTMLDivElement>(null)

  const tabs: {
    key: Tab
    Icon: React.ElementType
    label: string
    badge?: number
    locked?: boolean
    gradient?: boolean
  }[] = [
    { key: 'find',       Icon: Search,    label: 'Find creators' },
    { key: 'selected',   Icon: UserCheck, label: 'Selected',  badge: 2 },
    { key: 'rejected',   Icon: UserX,     label: 'Rejected',  badge: 0 },
    { key: 'lookalikes', Icon: Sparkles,  label: 'Lookalikes', locked: true, gradient: true },
  ]

  return (
    <header className="w-topbar">
      {/* List name + dropdown */}
      <div ref={listWrapRef} className="w-topbar__list-wrap">
        <div
          className={`w-topbar__list-name ${listOpen ? 'w-topbar__list-name--open' : ''}`}
          role="button"
          onClick={() => setListOpen((v) => !v)}
        >
          <span className="w-topbar__list-title">{listName}</span>
          {listOpen
            ? <ChevronUp size={12} />
            : <ChevronDown size={12} />
          }
        </div>

        {listOpen && (
          <ListsPanel
            onClose={() => setListOpen(false)}
            onSelect={(name) => setListName(name)}
          />
        )}
      </div>

      <div className="w-topbar__content">
        {/* Tabs */}
        <nav className="w-topbar__tabs">
          {tabs.map(({ key, Icon, label, badge, locked, gradient }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`w-topbar__tab ${activeTab === key ? 'w-topbar__tab--active' : ''}`}
            >
              <Icon size={14} className={gradient ? 'w-topbar__tab-icon--gradient' : ''} style={gradient ? { color: '#7c3aed' } : {}} />
              <span style={gradient ? { background: 'linear-gradient(90deg, #7c3aed, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : {}}>
                {label}
              </span>
              {locked ? (
                <span className="w-tag w-tag--neutral" style={{ padding: '1px 5px' }}>
                  <Lock size={10} />
                </span>
              ) : badge !== undefined ? (
                <span className={`w-tag ${badge > 0 ? 'w-tag--success' : 'w-tag--neutral'}`}>
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="w-topbar__actions">
          <button className="w-btn w-btn--default">
            <BookOpen size={14} />
            <span style={{ marginLeft: '6px' }}>Learn</span>
          </button>
        </div>
      </div>
    </header>
  )
}
