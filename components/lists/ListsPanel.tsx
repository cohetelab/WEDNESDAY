'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, Plus, X, Check } from 'lucide-react'

interface ListItem {
  id: number
  name: string
  count: number
}

interface Props {
  onClose: () => void
  onSelect: (name: string) => void
}

const INITIAL_LISTS: ListItem[] = [
  { id: 1, name: '내 첫 번째 리스트', count: 2 },
]

export default function ListsPanel({ onClose, onSelect }: Props) {
  const [tab, setTab] = useState<'lists' | 'archived'>('lists')
  const [search, setSearch] = useState('')
  const [lists, setLists] = useState<ListItem[]>(INITIAL_LISTS)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const newInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (creating) newInputRef.current?.focus()
  }, [creating])

  function createList() {
    const name = newName.trim()
    if (!name) { setCreating(false); return }
    setLists((prev) => [...prev, { id: Date.now(), name, count: 0 }])
    setNewName('')
    setCreating(false)
  }

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={panelRef} className="lp-panel">
      {/* Tabs + add */}
      <div className="lp-tabs-row">
        <div className="lp-tabs">
          <button
            className={`lp-tab ${tab === 'lists' ? 'lp-tab--active' : ''}`}
            onClick={() => setTab('lists')}
          >리스트</button>
          <button
            className={`lp-tab ${tab === 'archived' ? 'lp-tab--active' : ''}`}
            onClick={() => setTab('archived')}
          >보관됨</button>
        </div>
        <button
          className="lp-add-btn"
          onClick={() => setCreating(true)}
          title="새 리스트 만들기"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Search */}
      <div className="lp-search-wrap">
        <Search size={13} className="lp-search-icon" />
        <input
          className="lp-search-input"
          placeholder="검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table header */}
      <div className="lp-table-head">
        <span className="lp-table-head__name">이름</span>
        <span className="lp-table-head__count">선택된 크리에이터</span>
      </div>

      {/* List rows */}
      <div className="lp-list-body">
        {tab === 'lists' && filtered.map((l) => (
          <button
            key={l.id}
            className="lp-list-row"
            onClick={() => { onSelect(l.name); onClose() }}
          >
            <input type="checkbox" className="lp-checkbox" onClick={(e) => e.stopPropagation()} readOnly />
            <span className="lp-list-row__name">{l.name}</span>
            <span className="lp-list-row__count">{l.count}</span>
          </button>
        ))}

        {tab === 'archived' && (
          <div className="lp-empty">보관된 리스트가 없습니다</div>
        )}

        {tab === 'lists' && filtered.length === 0 && !creating && (
          <div className="lp-empty">검색 결과가 없습니다</div>
        )}

        {/* New list input row */}
        {creating && (
          <div className="lp-new-row">
            <input
              ref={newInputRef}
              className="lp-new-input"
              placeholder="리스트 이름 입력"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') createList()
                if (e.key === 'Escape') { setCreating(false); setNewName('') }
              }}
            />
            <button className="lp-new-confirm" onClick={createList}><Check size={13} /></button>
            <button className="lp-new-cancel" onClick={() => { setCreating(false); setNewName('') }}><X size={13} /></button>
          </div>
        )}
      </div>
    </div>
  )
}
