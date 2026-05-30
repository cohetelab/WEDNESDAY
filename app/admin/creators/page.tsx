'use client'
import { useState } from 'react'
import { Search, Plus, MoreHorizontal, Edit2, Trash2 } from 'lucide-react'

const CREATORS = [
  { id: 1,  name: 'Maria Clara',      handle: '@mariaclara',   platform: 'Instagram', category: '라이프스타일', followers: '2.4M', engagement: '4.2%', country: '🇧🇷 브라질',    status: '활성' },
  { id: 2,  name: 'John Lightyear',   handle: '@johnlightyear',platform: 'TikTok',    category: '패션',        followers: '1.8M', engagement: '6.1%', country: '🇺🇸 미국',      status: '활성' },
  { id: 3,  name: 'Jordan Chua',      handle: '@jordanchua',   platform: 'YouTube',   category: '뷰티',        followers: '890K', engagement: '3.8%', country: '🇸🇬 싱가포르',  status: '활성' },
  { id: 4,  name: 'Awkward Connoisseur', handle: '@awkwardc', platform: 'Instagram', category: '유머',        followers: '450K', engagement: '8.3%', country: '🇺🇸 미국',      status: '활성' },
  { id: 5,  name: 'Chris Ortiz Jr',   handle: '@chrisortizjr', platform: 'TikTok',    category: '피트니스',    followers: '1.2M', engagement: '5.5%', country: '🇺🇸 미국',      status: '활성' },
  { id: 6,  name: 'Cool Kid Family',  handle: '@coolkidfam',   platform: 'YouTube',   category: '패밀리',      followers: '3.1M', engagement: '2.9%', country: '🇰🇷 한국',      status: '활성' },
  { id: 7,  name: 'Stevany Supardi',  handle: '@hany_hani',    platform: 'Instagram', category: '뷰티',        followers: '780K', engagement: '7.1%', country: '🇮🇩 인도네시아', status: '활성' },
  { id: 8,  name: 'Untamed Pixie',    handle: '@untamedpixie', platform: 'Instagram', category: '패션',        followers: '230K', engagement: '9.4%', country: '🇦🇺 호주',      status: '검토중' },
]

const PLATFORM_COLOR: Record<string, string> = {
  Instagram: 'adm-badge--pink',
  TikTok:    'adm-badge--gray',
  YouTube:   'adm-badge--red',
}

const STATUS_COLOR: Record<string, string> = {
  '활성':   'adm-badge--green',
  '검토중': 'adm-badge--orange',
}

export default function AdminCreatorsPage() {
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const filtered = CREATORS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.includes(search)
  )

  return (
    <div className="adm-page">
      <div className="adm-topbar">
        <div>
          <h1 className="adm-topbar__title">크리에이터 DB</h1>
          <p className="adm-topbar__sub">총 {CREATORS.length}명 등록됨</p>
        </div>
        <div className="adm-topbar__actions">
          <div className="adm-search-wrap">
            <Search size={14} className="adm-search-icon" />
            <input
              className="adm-search-input"
              placeholder="이름, 핸들, 카테고리 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="adm-btn-primary">
            <Plus size={14} /> 크리에이터 추가
          </button>
        </div>
      </div>

      <div className="adm-card adm-card--table adm-card--full">
        <table className="adm-table">
          <thead>
            <tr>
              {['#', '크리에이터', '플랫폼', '카테고리', '팔로워', '인게이지먼트', '국가', '상태', ''].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td className="adm-table__muted">{c.id}</td>
                <td>
                  <div className="adm-table__creator">
                    <div className="adm-table__avatar">{c.name[0]}</div>
                    <div>
                      <div className="adm-table__name">{c.name}</div>
                      <div className="adm-table__muted">{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`adm-badge ${PLATFORM_COLOR[c.platform] ?? 'adm-badge--gray'}`}>{c.platform}</span></td>
                <td className="adm-table__muted">{c.category}</td>
                <td className="adm-table__mono">{c.followers}</td>
                <td className="adm-table__mono adm-table__eng">{c.engagement}</td>
                <td className="adm-table__muted">{c.country}</td>
                <td><span className={`adm-badge ${STATUS_COLOR[c.status]}`}>{c.status}</span></td>
                <td className="adm-table__action">
                  <div className="adm-menu-wrap">
                    <button
                      className="adm-menu-btn"
                      onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                    >
                      <MoreHorizontal size={15} />
                    </button>
                    {openMenu === c.id && (
                      <div className="adm-menu-dropdown">
                        <button className="adm-menu-item"><Edit2 size={13} /> 수정</button>
                        <button className="adm-menu-item adm-menu-item--danger"><Trash2 size={13} /> 삭제</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
