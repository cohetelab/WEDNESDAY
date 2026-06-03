'use client'
import { useState } from 'react'
import { Search, Plus, MoreHorizontal, Edit2, Trash2, X } from 'lucide-react'

interface Creator {
  id: number
  name: string
  handle: string
  platform: string
  category: string
  followers: string
  engagement: string
  country: string
  status: string
}

const INITIAL_CREATORS: Creator[] = [
  { id: 1, name: 'Maria Clara',         handle: '@mariaclara',    platform: 'Instagram', category: '라이프스타일', followers: '2.4M', engagement: '4.2%', country: '🇧🇷 브라질',     status: '활성' },
  { id: 2, name: 'John Lightyear',      handle: '@johnlightyear', platform: 'TikTok',    category: '패션',        followers: '1.8M', engagement: '6.1%', country: '🇺🇸 미국',       status: '활성' },
  { id: 3, name: 'Jordan Chua',         handle: '@jordanchua',    platform: 'YouTube',   category: '뷰티',        followers: '890K', engagement: '3.8%', country: '🇸🇬 싱가포르',   status: '활성' },
  { id: 4, name: 'Awkward Connoisseur', handle: '@awkwardc',      platform: 'Instagram', category: '유머',        followers: '450K', engagement: '8.3%', country: '🇺🇸 미국',       status: '활성' },
  { id: 5, name: 'Chris Ortiz Jr',      handle: '@chrisortizjr',  platform: 'TikTok',    category: '피트니스',    followers: '1.2M', engagement: '5.5%', country: '🇺🇸 미국',       status: '활성' },
  { id: 6, name: 'Cool Kid Family',     handle: '@coolkidfam',    platform: 'YouTube',   category: '패밀리',      followers: '3.1M', engagement: '2.9%', country: '🇰🇷 한국',       status: '활성' },
  { id: 7, name: 'Stevany Supardi',     handle: '@hany_hani',     platform: 'Instagram', category: '뷰티',        followers: '780K', engagement: '7.1%', country: '🇮🇩 인도네시아', status: '활성' },
  { id: 8, name: 'Untamed Pixie',       handle: '@untamedpixie',  platform: 'Instagram', category: '패션',        followers: '230K', engagement: '9.4%', country: '🇦🇺 호주',       status: '검토중' },
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

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'X', 'Twitch', 'Pinterest', '블로그']
const CATEGORIES = ['라이프스타일', '패션', '뷰티', '유머', '피트니스', '패밀리', '게이밍', '음식', '여행', '교육', '테크', '기타']
const COUNTRIES = ['🇰🇷 한국', '🇺🇸 미국', '🇯🇵 일본', '🇧🇷 브라질', '🇸🇬 싱가포르', '🇮🇩 인도네시아', '🇦🇺 호주', '🇬🇧 영국', '🇫🇷 프랑스', '🇩🇪 독일', '기타']
const STATUSES = ['활성', '검토중', '비활성']

const EMPTY_FORM = { name: '', handle: '', platform: 'Instagram', category: '라이프스타일', followers: '', engagement: '', country: '🇰🇷 한국', status: '활성' }

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS)
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Creator | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filtered = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.includes(search)
  )

  function openAdd() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setShowModal(true)
  }

  function openEdit(c: Creator) {
    setEditTarget(c)
    setForm({ name: c.name, handle: c.handle, platform: c.platform, category: c.category, followers: c.followers, engagement: c.engagement, country: c.country, status: c.status })
    setErrors({})
    setShowModal(true)
    setOpenMenu(null)
  }

  function closeModal() {
    setShowModal(false)
    setEditTarget(null)
    setErrors({})
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '이름을 입력하세요'
    if (!form.handle.trim()) e.handle = '핸들을 입력하세요'
    if (!form.followers.trim()) e.followers = '팔로워 수를 입력하세요'
    if (!form.engagement.trim()) e.engagement = '인게이지먼트를 입력하세요'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    if (editTarget) {
      setCreators((prev) => prev.map((c) => c.id === editTarget.id ? { ...c, ...form } : c))
    } else {
      const newId = Math.max(...creators.map((c) => c.id)) + 1
      setCreators((prev) => [...prev, { id: newId, ...form }])
    }
    closeModal()
  }

  function handleDelete(id: number) {
    setCreators((prev) => prev.filter((c) => c.id !== id))
    setOpenMenu(null)
  }

  function field(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n })
  }

  return (
    <div className="adm-page">
      <div className="adm-topbar">
        <div>
          <h1 className="adm-topbar__title">크리에이터 DB</h1>
          <p className="adm-topbar__sub">총 {creators.length}명 등록됨</p>
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
          <button className="adm-btn-primary" onClick={openAdd}>
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
                        <button className="adm-menu-item" onClick={() => openEdit(c)}><Edit2 size={13} /> 수정</button>
                        <button className="adm-menu-item adm-menu-item--danger" onClick={() => handleDelete(c.id)}><Trash2 size={13} /> 삭제</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>검색 결과가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="adm-modal-overlay" onClick={closeModal}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal__header">
              <h2 className="adm-modal__title">{editTarget ? '크리에이터 수정' : '크리에이터 추가'}</h2>
              <button className="adm-modal__close" onClick={closeModal}><X size={16} /></button>
            </div>

            <div className="adm-modal__body">
              <div className="adm-form-grid">
                {/* 이름 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">이름 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.name ? 'adm-form-input--error' : ''}`} placeholder="예: Maria Clara" value={form.name} onChange={(e) => field('name', e.target.value)} />
                  {errors.name && <span className="adm-form-error">{errors.name}</span>}
                </div>

                {/* 핸들 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">핸들 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.handle ? 'adm-form-input--error' : ''}`} placeholder="예: @mariaclara" value={form.handle} onChange={(e) => field('handle', e.target.value)} />
                  {errors.handle && <span className="adm-form-error">{errors.handle}</span>}
                </div>

                {/* 플랫폼 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">플랫폼</label>
                  <select className="adm-form-select" value={form.platform} onChange={(e) => field('platform', e.target.value)}>
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                {/* 카테고리 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">카테고리</label>
                  <select className="adm-form-select" value={form.category} onChange={(e) => field('category', e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* 팔로워 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">팔로워 수 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.followers ? 'adm-form-input--error' : ''}`} placeholder="예: 1.2M, 890K" value={form.followers} onChange={(e) => field('followers', e.target.value)} />
                  {errors.followers && <span className="adm-form-error">{errors.followers}</span>}
                </div>

                {/* 인게이지먼트 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">인게이지먼트 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.engagement ? 'adm-form-input--error' : ''}`} placeholder="예: 4.2%" value={form.engagement} onChange={(e) => field('engagement', e.target.value)} />
                  {errors.engagement && <span className="adm-form-error">{errors.engagement}</span>}
                </div>

                {/* 국가 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">국가</label>
                  <select className="adm-form-select" value={form.country} onChange={(e) => field('country', e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* 상태 */}
                <div className="adm-form-field">
                  <label className="adm-form-label">상태</label>
                  <select className="adm-form-select" value={form.status} onChange={(e) => field('status', e.target.value)}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="adm-modal__footer">
              <button className="adm-btn-ghost" onClick={closeModal}>취소</button>
              <button className="adm-btn-primary" onClick={handleSubmit}>
                {editTarget ? '저장' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
