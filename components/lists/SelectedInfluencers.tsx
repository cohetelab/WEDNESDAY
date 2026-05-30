'use client'
import { useState, useRef, useEffect } from 'react'
import { X, RotateCcw, Mail, MoreHorizontal, ChevronDown, UserPlus, Search, Users, ListX } from 'lucide-react'

interface InfluencerCard {
  id: string
  name: string
  country: string
  flag: string
  bio: string
  avatar: string
  posts: string[]
  stats: { platform: 'ig' | 'yt' | 'tk'; followers: string; engagement: string }[]
  categories: string[]
}

const INITIAL_SELECTED: InfluencerCard[] = [
  {
    id: '1',
    name: 'Stevany Supardi | Hany 하니',
    country: 'Indonesia',
    flag: '🇮🇩',
    bio: 'Living in KR Foodie | Traveler 🌍 Skincare & Beauty Enthusiast 🧴 WA +6287889070770 / Kakao :...',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
    posts: [
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
    ],
    stats: [
      { platform: 'tk', followers: '949K', engagement: '0.48%' },
      { platform: 'yt', followers: '650K', engagement: '5.04%' },
      { platform: 'ig', followers: '91K', engagement: '2.22%' },
    ],
    categories: [],
  },
  {
    id: '2',
    name: 'Untamed Pixie',
    country: 'Korea, Republic Of',
    flag: '🇰🇷',
    bio: 'Indian in Korea 🇮🇳🇰🇷 Researcher by profession 🔬 YouTube channel link 🔗',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
    posts: [
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20254226.png?ts=1776876415',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
    ],
    stats: [
      { platform: 'ig', followers: '22K', engagement: '10.07%' },
      { platform: 'yt', followers: '14K', engagement: '1.69%' },
    ],
    categories: ['K-Pop', 'Ayurveda'],
  },
]

const PLATFORM_COLORS: Record<string, string> = {
  ig: '#e1306c',
  yt: '#ff0000',
  tk: '#000000',
}

const LISTS = ['My first list', 'Summer Campaign', 'Beauty KOLs']

function CardMenu({ infId, onRemove }: { infId: string; onRemove: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [showLists, setShowLists] = useState(false)
  const [addedLists, setAddedLists] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
        setShowLists(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleList(name: string) {
    setAddedLists((prev) =>
      prev.includes(name) ? prev.filter((l) => l !== name) : [...prev, name]
    )
  }

  const filteredLists = LISTS.filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={menuRef} className="sc-menu-wrap">
      <button
        className="sc-menu-btn"
        onClick={() => { setOpen((v) => !v); setShowLists(false); setSearch('') }}
        title="더보기"
      >
        <MoreHorizontal size={14} />
      </button>

      {open && (
        <div className="sc-dropdown">
          {/* Add to lists */}
          <button
            className="sc-dropdown__item"
            onClick={() => setShowLists((v) => !v)}
          >
            <Search size={13} className="sc-dropdown__icon" />
            <span>Add to lists</span>
          </button>

          {showLists && (
            <div className="sc-lists-sub">
              <div className="sc-lists-search-wrap">
                <Search size={12} className="sc-lists-search-icon" />
                <input
                  className="sc-lists-search"
                  placeholder="Search lists..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
              {filteredLists.map((listName) => (
                <button
                  key={listName}
                  className={`sc-list-option ${addedLists.includes(listName) ? 'sc-list-option--checked' : ''}`}
                  onClick={() => toggleList(listName)}
                >
                  <span className="sc-list-option__check">
                    {addedLists.includes(listName) && <span className="sc-list-option__checkmark">✓</span>}
                  </span>
                  <span>{listName}</span>
                </button>
              ))}
              {filteredLists.length === 0 && (
                <div className="sc-lists-empty">리스트가 없습니다</div>
              )}
            </div>
          )}

          <button className="sc-dropdown__item">
            <Users size={13} className="sc-dropdown__icon" />
            <span>Remove from community</span>
          </button>

          <button
            className="sc-dropdown__item sc-dropdown__item--danger"
            onClick={() => { onRemove(infId); setOpen(false) }}
          >
            <ListX size={13} className="sc-dropdown__icon" />
            <span>Remove from this list</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function SelectedInfluencers() {
  const [selected, setSelected] = useState<InfluencerCard[]>(INITIAL_SELECTED)

  function removeInfluencer(id: string) {
    setSelected((prev) => prev.filter((inf) => inf.id !== id))
  }

  return (
    <div className="selected-list">
      {selected.map((inf) => (
        <div key={inf.id} className="selected-card">
          {/* Avatar col */}
          <div className="selected-card__avatar-col">
            <div className="selected-card__avatar">
              <img src={inf.avatar} alt={inf.name} className="selected-card__avatar-img" />
            </div>
            <div className="selected-card__avatar-actions">
              <button
                className="selected-card__avatar-btn selected-card__avatar-btn--reject"
                onClick={() => removeInfluencer(inf.id)}
              >
                <X size={12} />
              </button>
              <button className="selected-card__avatar-btn selected-card__avatar-btn--undo">
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Info col */}
          <div className="selected-card__info">
            <div className="selected-card__name-row">
              <span className="selected-card__name">{inf.name}</span>
              <div className="sc-action-btns">
                <button className="sc-icon-btn" title="Add to community">
                  <UserPlus size={13} />
                </button>
                <button className="sc-icon-btn" title="Expand">
                  <ChevronDown size={13} />
                </button>
                <CardMenu infId={inf.id} onRemove={removeInfluencer} />
              </div>
            </div>
            <div className="selected-card__location">
              <span>{inf.flag}</span>
              <span className="selected-card__country">{inf.country}</span>
            </div>
            <p className="selected-card__bio">{inf.bio}</p>
          </div>

          {/* Posts col */}
          <div className="selected-card__posts">
            {inf.posts.map((src, i) => (
              <div key={i} className="selected-card__post-thumb">
                <img src={src} alt="post" className="selected-card__post-img" />
                <div className="selected-card__post-badge">
                  {i === 0 ? '🎵' : i === 1 ? '🎵' : '📷'}
                </div>
              </div>
            ))}
          </div>

          {/* Stats col */}
          <div className="selected-card__stats">
            {inf.stats.map((s) => (
              <div key={s.platform} className="selected-card__stat-row">
                <span className="selected-card__platform-dot" style={{ background: PLATFORM_COLORS[s.platform] }} />
                <span className="selected-card__stat-followers">{s.followers}</span>
                <span className="selected-card__stat-sep">|</span>
                <span className="selected-card__stat-eng">{s.engagement}</span>
              </div>
            ))}
          </div>

          {/* Category col */}
          <div className="selected-card__categories">
            {inf.categories.length === 0 ? (
              <span className="selected-card__no-category">No category available <span style={{ color: '#9ca3af' }}>ⓘ</span></span>
            ) : (
              inf.categories.map((cat) => (
                <span key={cat} className="selected-card__category-tag">
                  🏷 {cat}
                </span>
              ))
            )}
          </div>

          {/* Contact col */}
          <div className="selected-card__actions">
            <button className="w-btn w-btn--primary" style={{ gap: '6px', padding: '7px 16px' }}>
              <Mail size={13} />
              Contact
            </button>
          </div>
        </div>
      ))}

      {selected.length === 0 && (
        <div className="selected-empty">
          <p>선택된 인플루언서가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
