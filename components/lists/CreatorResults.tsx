'use client'
import { useState, useRef, useCallback } from 'react'
import { X, Check, Mail, MoreHorizontal, Users, Sparkles } from 'lucide-react'

interface Creator {
  id: string
  name: string
  country: string
  flag: string
  bio: string
  avatar: string
  posts: { src: string | null; platform: 'ig' | 'tk' | 'yt' }[]
  stats: { platform: 'ig' | 'yt' | 'tk'; followers: string; engagement: string }[]
  categories: { color: string; label: string }[]
}

const CREATORS: Creator[] = [
  {
    id: '1',
    name: 'maria clara ★│.ˈ║',
    country: 'Brazil', flag: '🇧🇷',
    bio: '⭐ galera @capricho 2026 fiel às minhas raízes, dedicada às minhas flores ██████',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092', platform: 'tk' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814', platform: 'ig' },
    ],
    stats: [
      { platform: 'ig', followers: '47K', engagement: '9.21%' },
      { platform: 'tk', followers: '267K', engagement: '3.89%' },
    ],
    categories: [],
  },
  {
    id: '2',
    name: 'John Lightyear AM',
    country: 'Mexico', flag: '🇲🇽',
    bio: 'Ser NERD Siempre fue Cool 🤓 +100k YouTube 🎮 + 90k Tiktok 📱 Contacto:...',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/14077123.png?ts=1776276405',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/14077123.png?ts=1776276405', platform: 'ig' },
      { src: null, platform: 'tk' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/8685115.png?ts=1773871287', platform: 'ig' },
    ],
    stats: [
      { platform: 'ig', followers: '13K', engagement: '28.69%' },
      { platform: 'yt', followers: '106K', engagement: '3.05%' },
      { platform: 'tk', followers: '94K', engagement: '24.1%' },
    ],
    categories: [{ color: '#f59e0b', label: 'Gaming' }, { color: '#a78bfa', label: 'Gaming Hardware' }],
  },
  {
    id: '3',
    name: 'Jordan Chua',
    country: 'Singapore', flag: '🇸🇬',
    bio: 'Content Creator in Singapore! 🎬 Find me on Youtube: Legocraze [150k] Vlog channel: Jordan Chua [40k]...',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746', platform: 'tk' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814', platform: 'ig' },
    ],
    stats: [
      { platform: 'ig', followers: '16K', engagement: '166.29%' },
      { platform: 'tk', followers: '334K', engagement: '21.32%' },
      { platform: 'yt', followers: '48K', engagement: '1.9%' },
    ],
    categories: [],
  },
  {
    id: '4',
    name: 'awkward connoisseur',
    country: 'United States', flag: '🇺🇸',
    bio: 'Chicago. weenie in media. writer. @bigkidshowchicago cofounder. R-A-Y-C-H Jackso...',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092', platform: 'tk' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814', platform: 'ig' },
    ],
    stats: [
      { platform: 'ig', followers: '20K', engagement: '162.66%' },
      { platform: 'tk', followers: '242K', engagement: '2.99%' },
    ],
    categories: [],
  },
  {
    id: '5',
    name: 'Chris Ortiz Jr',
    country: 'United States', flag: '🇺🇸',
    bio: '📧 : teamchico@stregagroup.com Coachella vibes made with Hypic ✨',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20254226.png?ts=1776876415',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20254226.png?ts=1776876415', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/14077123.png?ts=1776276405', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746', platform: 'ig' },
    ],
    stats: [
      { platform: 'ig', followers: '20K', engagement: '132.47%' },
      { platform: 'tk', followers: '257K', engagement: '0.91%' },
    ],
    categories: [{ color: '#f59e0b', label: 'Sports' }, { color: '#a78bfa', label: 'Bodybuilding' }],
  },
  {
    id: '6',
    name: 'Official Cool Kid Family',
    country: 'United States', flag: '🇺🇸',
    bio: '•YouTube: 600K+ •Indiana 📍 •Family 👨‍👩‍👧‍👦 • @djcoolkid44 @anginae23',
    avatar: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/8685115.png?ts=1773871287',
    posts: [
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/8685115.png?ts=1773871287', platform: 'ig' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092', platform: 'tk' },
      { src: 'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20254226.png?ts=1776876415', platform: 'yt' },
    ],
    stats: [
      { platform: 'ig', followers: '12K', engagement: '112.13%' },
      { platform: 'tk', followers: '105K', engagement: '11.14%' },
      { platform: 'yt', followers: '14K', engagement: '1.16%' },
    ],
    categories: [{ color: '#f59e0b', label: "Children's Entertainment" }],
  },
]

const PLATFORM_COLORS: Record<string, string> = {
  ig: '#e1306c', yt: '#ff0000', tk: '#000000',
}

// 플랫폼 아이콘 (SVG 인라인)
function PlatformIcon({ p }: { p: 'ig' | 'tk' | 'yt' }) {
  if (p === 'ig') return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#e1306c"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="#e1306c" strokeWidth="2.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="#e1306c" strokeWidth="2.5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#e1306c"/></svg>
  )
  if (p === 'tk') return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#000"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.78 1.52V7.14a4.85 4.85 0 0 1-1.01-.45z" fill="#000"/></svg>
  )
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#ff0000"><path d="M23 7s-.3-1.9-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.1 3 12 3 12 3s-4.1 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5.3 1 7 1 7S.7 9.1.7 11.2v1.9C.7 15.2 1 17 1 17s.3 1.9 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21 12 21 12 21s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2.1.3-4.2v-1.9C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" fill="#ff0000"/></svg>
  )
}

const ACTIVE_FILTERS = [
  { label: 'Instagram', color: '#e1306c' },
  { label: 'Last activity: 3 months ago', color: '#e1306c' },
  { label: 'Followers: 10K - 100K', color: '#e1306c' },
  { label: 'Min. engagement growth: 10%', color: '#e1306c' },
]

const PAYWALL_AVATARS = [
  'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746',
  'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092',
  'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
  'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814',
]

// 스크롤 3번 이후 락 걸리는 인덱스
const LOCK_AFTER = 3

export default function CreatorResults() {
  const [smartTab, setSmartTab] = useState<'all' | 'smart'>('all')
  const [statuses, setStatuses] = useState<Record<string, 'none' | 'selected' | 'rejected'>>({})
  const [scrollCount, setScrollCount] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const lastScrollTop = useRef(0)

  const locked = showPaywall

  function setStatus(id: string, s: 'selected' | 'rejected') {
    setStatuses((prev) => ({ ...prev, [id]: prev[id] === s ? 'none' : s }))
  }

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (showPaywall) return
    const el = e.currentTarget
    const scrollTop = el.scrollTop
    if (scrollTop > lastScrollTop.current + 30) {
      lastScrollTop.current = scrollTop
      setScrollCount((prev) => {
        const next = prev + 1
        if (next >= LOCK_AFTER) setShowPaywall(true)
        return next
      })
    }
  }, [showPaywall])

  return (
    <div className="results-wrapper">
      {/* Active filters */}
      <div className="results-filters">
        {ACTIVE_FILTERS.map((f) => (
          <div key={f.label} className="results-filter-tag">
            <span className="results-filter-tag__dot" style={{ background: f.color }} />
            <span>{f.label}</span>
            <button className="results-filter-tag__remove"><X size={10} /></button>
          </div>
        ))}
        <button className="results-clear-btn">Clear all filters</button>
      </div>

      {/* All / Smart tabs */}
      <div className="results-tabs">
        <button className={`results-tab ${smartTab === 'all' ? 'results-tab--active' : ''}`} onClick={() => setSmartTab('all')}>
          All results
        </button>
        <button className={`results-tab ${smartTab === 'smart' ? 'results-tab--active' : ''}`} onClick={() => setSmartTab('smart')}>
          Smart results
          <span className="results-tab__beta">Beta</span>
        </button>
      </div>

      {/* Scrollable list */}
      <div className="results-list" onScroll={handleScroll}>
        {CREATORS.map((creator, idx) => {
          const isBlurred = locked && idx >= CREATORS.length - 2
          return (
            <div
              key={creator.id}
              className={`creator-card ${statuses[creator.id] === 'selected' ? 'creator-card--selected' : statuses[creator.id] === 'rejected' ? 'creator-card--rejected' : ''} ${isBlurred ? 'creator-card--blurred' : ''}`}
            >
              {/* Avatar */}
              <div className="creator-card__avatar-col">
                <div className="creator-card__avatar">
                  <img src={creator.avatar} alt={creator.name} className="creator-card__avatar-img" />
                </div>
                <div className="creator-card__avatar-actions">
                  <button className={`creator-card__action-btn creator-card__action-btn--reject ${statuses[creator.id] === 'rejected' ? 'active' : ''}`} onClick={() => setStatus(creator.id, 'rejected')}>
                    <X size={12} />
                  </button>
                  <button className={`creator-card__action-btn creator-card__action-btn--select ${statuses[creator.id] === 'selected' ? 'active' : ''}`} onClick={() => setStatus(creator.id, 'selected')}>
                    <Check size={12} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="creator-card__info">
                <div className="creator-card__name-row">
                  <span className="creator-card__name">{creator.name}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="creator-card__icon-btn"><Users size={14} /></button>
                    <button className="creator-card__icon-btn"><X size={8} style={{ transform: 'rotate(0deg)' }} /></button>
                    <button className="creator-card__menu-btn"><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div className="creator-card__location">
                  <span>{creator.flag}</span>
                  <span className="creator-card__country">{creator.country}</span>
                </div>
                <p className="creator-card__bio">{creator.bio}</p>
              </div>

              {/* Posts */}
              <div className="creator-card__posts">
                {creator.posts.map((post, i) => (
                  <div key={i} className="creator-card__post-thumb">
                    {post.src ? (
                      <img src={post.src} alt="post" className="creator-card__post-img" />
                    ) : (
                      <div className="creator-card__post-empty">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 9 6 6m0-6-6 6"/></svg>
                      </div>
                    )}
                    <div className="creator-card__post-platform-icon">
                      <PlatformIcon p={post.platform} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="creator-card__stats">
                {creator.stats.map((s) => (
                  <div key={s.platform} className="creator-card__stat-row">
                    <span className="creator-card__platform-dot" style={{ background: PLATFORM_COLORS[s.platform] }} />
                    <span className="creator-card__stat-val">{s.followers}</span>
                    <span className="creator-card__stat-sep">|</span>
                    <span className="creator-card__stat-eng">{s.engagement}</span>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div className="creator-card__categories">
                {creator.categories.length === 0 ? (
                  <span className="creator-card__no-cat">No category available <span style={{ color: '#9ca3af' }}>ⓘ</span></span>
                ) : (
                  creator.categories.map((cat) => (
                    <div key={cat.label} className="creator-card__cat-tag">
                      <span className="creator-card__cat-dot" style={{ background: cat.color }} />
                      <span>{cat.label}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Contact */}
              <div className="creator-card__contact">
                <button className="w-btn w-btn--primary" style={{ gap: '6px', padding: '7px 16px' }}>
                  <Mail size={13} />
                  Contact
                </button>
              </div>
            </div>
          )
        })}

        {/* 스크롤 여백 */}
        <div style={{ height: locked ? '160px' : '32px' }} />
      </div>

      {/* Paywall 배너 */}
      {locked && (
        <div className="paywall-banner">
          <div className="paywall-banner__inner">
            <div className="paywall-banner__left">
              <div className="paywall-banner__avatars">
                {PAYWALL_AVATARS.map((src, i) => (
                  <div key={i} className="paywall-banner__avatar">
                    <img src={src} alt="creator" />
                  </div>
                ))}
              </div>
              <div className="paywall-banner__text">
                <p className="paywall-banner__title">
                  Unlock <span className="paywall-banner__count">9,990 more perfect creators</span> waiting for you to contact them 🤩
                </p>
                <p className="paywall-banner__sub">Want to know who? Upgrade to Pro for the full list!</p>
              </div>
            </div>
            <button className="paywall-banner__cta">
              <Sparkles size={13} />
              7-day trial for $1
            </button>
          </div>
          <div className="paywall-banner__referral">
            🎁 Psssst, you can have{' '}
            <span className="paywall-banner__referral-link">+25 results per search</span>
            {' '}as soon as your friend subscribes!
          </div>
        </div>
      )}
    </div>
  )
}
