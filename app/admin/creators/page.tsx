'use client'
import { useState, useEffect } from 'react'
import { Search, Plus, MoreHorizontal, Edit2, Trash2, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Creator } from '@/lib/supabase'

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
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Creator | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadCreators() }, [])

  async function loadCreators() {
    setLoading(true)
    const { data } = await supabase.from('creators').select('*').order('created_at', { ascending: true })
    if (data) setCreators(data)
    setLoading(false)
  }

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

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    setSaving(true)
    if (editTarget) {
      const { data } = await supabase.from('creators').update(form).eq('id', editTarget.id).select().single()
      if (data) setCreators((prev) => prev.map((c) => c.id === editTarget.id ? data : c))
    } else {
      const { data } = await supabase.from('creators').insert(form).select().single()
      if (data) setCreators((prev) => [...prev, data])
    }
    setSaving(false)
    closeModal()
  }

  async function handleDelete(id: string) {
    await supabase.from('creators').delete().eq('id', id)
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
              {['크리에이터', '플랫폼', '카테고리', '팔로워', '인게이지먼트', '국가', '상태', ''].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>불러오는 중...</td></tr>
            )}
            {!loading && filtered.map((c) => (
              <tr key={c.id}>
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
                <td><span className={`adm-badge ${STATUS_COLOR[c.status] ?? 'adm-badge--gray'}`}>{c.status}</span></td>
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
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>검색 결과가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="adm-modal-overlay" onClick={closeModal}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal__header">
              <h2 className="adm-modal__title">{editTarget ? '크리에이터 수정' : '크리에이터 추가'}</h2>
              <button className="adm-modal__close" onClick={closeModal}><X size={16} /></button>
            </div>

            <div className="adm-modal__body">
              <div className="adm-form-grid">
                <div className="adm-form-field">
                  <label className="adm-form-label">이름 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.name ? 'adm-form-input--error' : ''}`} placeholder="예: Maria Clara" value={form.name} onChange={(e) => field('name', e.target.value)} />
                  {errors.name && <span className="adm-form-error">{errors.name}</span>}
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">핸들 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.handle ? 'adm-form-input--error' : ''}`} placeholder="예: @mariaclara" value={form.handle} onChange={(e) => field('handle', e.target.value)} />
                  {errors.handle && <span className="adm-form-error">{errors.handle}</span>}
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">플랫폼</label>
                  <select className="adm-form-select" value={form.platform} onChange={(e) => field('platform', e.target.value)}>
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">카테고리</label>
                  <select className="adm-form-select" value={form.category} onChange={(e) => field('category', e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">팔로워 수 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.followers ? 'adm-form-input--error' : ''}`} placeholder="예: 1.2M, 890K" value={form.followers} onChange={(e) => field('followers', e.target.value)} />
                  {errors.followers && <span className="adm-form-error">{errors.followers}</span>}
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">인게이지먼트 <span className="adm-form-required">*</span></label>
                  <input className={`adm-form-input ${errors.engagement ? 'adm-form-input--error' : ''}`} placeholder="예: 4.2%" value={form.engagement} onChange={(e) => field('engagement', e.target.value)} />
                  {errors.engagement && <span className="adm-form-error">{errors.engagement}</span>}
                </div>

                <div className="adm-form-field">
                  <label className="adm-form-label">국가</label>
                  <select className="adm-form-select" value={form.country} onChange={(e) => field('country', e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

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
              <button className="adm-btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? '저장 중...' : editTarget ? '저장' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
