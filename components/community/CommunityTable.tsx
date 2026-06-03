'use client'
import { useState } from 'react'
import { Search, Mail, Settings2, ChevronDown } from 'lucide-react'

interface Influencer {
  id: string
  avatar: string
  name: string
  status: 'Lead' | 'Prospect' | 'Partner'
  owner: string
  list: string | null
  tags: string[]
  country: string
  countryFlag: string
  lastContact: string
}

const INFLUENCERS: Influencer[] = [
  {
    id: '1',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
    name: 'Untamed Pixie',
    status: 'Lead',
    owner: 'connor kim',
    list: '내 첫 번째 리스트',
    tags: [],
    country: '대한민국',
    countryFlag: '🇰🇷',
    lastContact: '연락 기록 없음',
  },
  {
    id: '2',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
    name: 'Stevany Supardi | Hany 하니',
    status: 'Lead',
    owner: 'connor kim',
    list: '내 첫 번째 리스트',
    tags: [],
    country: '인도네시아',
    countryFlag: '🇮🇩',
    lastContact: '연락 기록 없음',
  },
  {
    id: '3',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/8685115.png?ts=1773871287',
    name: '밥순[Spicyking]',
    status: 'Lead',
    owner: 'connor kim',
    list: null,
    tags: ['맛집'],
    country: '대한민국',
    countryFlag: '🇰🇷',
    lastContact: '연락 기록 없음',
  },
]

const STATUS_COLORS: Record<string, string> = {
  Lead: '#f97316',
  Prospect: '#3b82f6',
  Partner: '#22c55e',
}

const STATUS_LABELS: Record<string, string> = {
  Lead: '리드',
  Prospect: '잠재 고객',
  Partner: '파트너',
}

export default function CommunityTable() {
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')

  function toggleAll() {
    setSelected(selected.length === INFLUENCERS.length ? [] : INFLUENCERS.map((i) => i.id))
  }

  function toggleOne(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const filtered = INFLUENCERS.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="irm-wrapper">
      {/* Toolbar */}
      <div className="irm-toolbar">
        <div className="irm-toolbar__left">
          <div className="irm-count">{selected.length}</div>
          <div className="irm-search">
            <Search size={13} className="irm-search__icon" />
            <input
              className="irm-search__input"
              placeholder="프로필 이름으로 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="w-btn w-btn--primary" style={{ gap: '6px' }}>
            <Mail size={13} />
            전체 연락하기
          </button>
        </div>
        <button className="w-btn w-btn--default irm-manage-btn">
          <Settings2 size={13} />
          <span style={{ marginLeft: '6px' }}>필드 관리</span>
        </button>
      </div>

      {/* Table */}
      <div className="irm-table-wrap">
        <table className="irm-table">
          <thead>
            <tr className="irm-table__head-row">
              <th className="irm-table__th irm-table__th--check">
                <input
                  type="checkbox"
                  className="irm-checkbox"
                  checked={selected.length === INFLUENCERS.length}
                  onChange={toggleAll}
                />
              </th>
              {['프로필 이름', '상태', '담당자', '리스트', '인플루언서 태그', '국가', '마지막 연락일'].map((col) => (
                <th key={col} className="irm-table__th">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inf) => (
              <tr key={inf.id} className={`irm-table__row ${selected.includes(inf.id) ? 'irm-table__row--selected' : ''}`}>
                {/* Checkbox */}
                <td className="irm-table__td irm-table__td--check">
                  <input
                    type="checkbox"
                    className="irm-checkbox"
                    checked={selected.includes(inf.id)}
                    onChange={() => toggleOne(inf.id)}
                  />
                </td>
                {/* Profile Name */}
                <td className="irm-table__td">
                  <div className="irm-profile">
                    <div className="w-avatar w-avatar--md" style={{ flexShrink: 0 }}>
                      <img src={inf.avatar} alt={inf.name} className="w-avatar__img" />
                    </div>
                    <span className="irm-profile__name">{inf.name}</span>
                  </div>
                </td>
                {/* Status */}
                <td className="irm-table__td">
                  <div className="irm-status-cell">
                    <div className="irm-status" style={{ '--status-color': STATUS_COLORS[inf.status] } as React.CSSProperties}>
                      <span className="irm-status__dot" />
                      <span className="irm-status__label">{STATUS_LABELS[inf.status] ?? inf.status}</span>
                    </div>
                    <ChevronDown size={12} className="irm-chevron" />
                  </div>
                </td>
                {/* Owner */}
                <td className="irm-table__td">
                  <div className="irm-cell-row">
                    <span className="irm-text">{inf.owner}</span>
                    <ChevronDown size={12} className="irm-chevron" />
                  </div>
                </td>
                {/* List */}
                <td className="irm-table__td">
                  <div className="irm-cell-row">
                    <span className="irm-text">{inf.list ?? '—'}</span>
                    {inf.list && <ChevronDown size={12} className="irm-chevron" />}
                  </div>
                </td>
                {/* Tags */}
                <td className="irm-table__td">
                  <div className="irm-tags-cell">
                    {inf.tags.length === 0 ? (
                      <span className="irm-add-tags">태그 추가</span>
                    ) : (
                      inf.tags.map((t) => (
                        <span key={t} className="irm-tag">{t}</span>
                      ))
                    )}
                    <ChevronDown size={12} className="irm-chevron" />
                  </div>
                </td>
                {/* Country */}
                <td className="irm-table__td">
                  <span className="irm-text">{inf.countryFlag} {inf.country}</span>
                </td>
                {/* Last Contact */}
                <td className="irm-table__td">
                  <span className="irm-text irm-text--muted">{inf.lastContact}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom summary bar */}
      <div className="irm-summary">
        <div className="irm-summary__scroll-track">
          <div className="irm-summary__scroll-thumb" />
        </div>
        <div className="irm-summary__stats">
          <span className="irm-summary__label">요약</span>
          <span className="irm-summary__info">ⓘ</span>
          <div className="irm-summary__community">
            <span>👥</span>
            <span>커뮤니티</span>
            <strong>3 / 100</strong>
          </div>
          {[
            { label: '인플루언서', val: 3 },
            { label: 'INSTAGRAM', val: 3 },
            { label: 'YOUTUBE', val: 3 },
            { label: 'TWITCH', val: 0 },
            { label: 'TIKTOK', val: 2 },
            { label: 'X', val: 0 },
            { label: 'PINTEREST', val: 1 },
            { label: '블로그', val: 0 },
          ].map((s) => (
            <div key={s.label} className="irm-summary__stat">
              <span className="irm-summary__stat-label">{s.label}</span>
              <span className={`irm-summary__stat-val ${s.val > 0 ? 'irm-summary__stat-val--active' : ''}`}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
