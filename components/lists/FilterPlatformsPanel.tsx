'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronUp, Sparkles } from 'lucide-react'

type Platform = 'ig' | 'tk' | 'yt' | 'x' | 'twitch' | 'pinterest' | 'blog'
type Activity = 'anytime' | 'week' | 'month' | '3months' | 'year'

interface PlatformConfig {
  id: Platform
  label: string
  bg: string
  icon: React.ReactNode
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'ig', label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'tk', label: 'TikTok', bg: '#000000',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.78 1.52V7.14a4.85 4.85 0 0 1-1.01-.45z"/>
      </svg>
    ),
  },
  {
    id: 'yt', label: 'YouTube', bg: '#ff0000',
    icon: (
      <svg width="16" height="12" viewBox="0 0 24 18" fill="white">
        <path d="M23 3s-.3-1.9-1.2-2.7C20.7-.9 19.4-.9 18.8-.8 15.7-.6 12-.6 12-.6s-3.7 0-6.8.2C4.6-.3 3.3-.3 2.2.3 1.3 1.1 1 3 1 3S.7 5.1.7 7.2v1.9C.7 11.2 1 13 1 13s.3 1.9 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 17 12 17 12 17s3.7 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2.1.3-4.2V6.9C23.3 5.1 23 3 23 3zM9.7 11.5V4.4l8.1 3.6-8.1 3.5z"/>
      </svg>
    ),
  },
  {
    id: 'x', label: 'X', bg: '#000000',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    id: 'twitch', label: 'Twitch', bg: '#9146ff',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
  },
  {
    id: 'pinterest', label: 'Pinterest', bg: '#e60023',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    id: 'blog', label: 'Blog', bg: '#6b7280',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
  },
]

const ACTIVITY_OPTIONS: { key: Activity; label: string }[] = [
  { key: 'anytime', label: 'Anytime' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: '3months', label: '3 months' },
  { key: 'year', label: 'Year' },
]

interface Props {
  onClose: () => void
}

export default function FilterPlatformsPanel({ onClose }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('ig')
  const [followers, setFollowers] = useState({ min: '10000', max: '100000' })
  const [followersGrowth, setFollowersGrowth] = useState(0)
  const [avgEngagement, setAvgEngagement] = useState(0)
  const [engagementGrowth, setEngagementGrowth] = useState(10)
  const [activity, setActivity] = useState<Activity>('3months')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const selected = PLATFORMS.find((p) => p.id === selectedPlatform)!

  return (
    <div ref={panelRef} className="fp-panel">
      {/* Search across */}
      <div className="fp-section">
        <div className="fp-heading">
          <span>Search across</span>
          <span className="fp-heading__icon">📍</span>
        </div>
        <div className="fp-platform-icons">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`fp-platform-btn ${selectedPlatform === p.id ? 'fp-platform-btn--active' : ''}`}
              style={{ background: p.bg }}
              title={p.label}
            >
              {p.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="fp-divider" />

      {/* Selected platform filters */}
      <div className="fp-section">
        <div className="fp-platform-label">
          <div className="fp-platform-badge" style={{ background: selected.bg }}>
            {selected.icon}
          </div>
          <span className="fp-platform-name">{selected.label}</span>
        </div>

        {/* Followers range */}
        <div className="fp-filter-grid">
          <div className="fp-filter-block">
            <label className="fp-label">Followers</label>
            <div className="fp-range-inputs">
              <input
                className="fp-number-input"
                value={followers.min}
                onChange={(e) => setFollowers((f) => ({ ...f, min: e.target.value }))}
              />
              <span className="fp-range-to">to</span>
              <input
                className="fp-number-input"
                value={followers.max}
                onChange={(e) => setFollowers((f) => ({ ...f, max: e.target.value }))}
              />
            </div>
          </div>

          <div className="fp-filter-block">
            <div className="fp-label-row">
              <label className="fp-label">Min. followers growth rate</label>
              <span className="fp-ai-icon">✨</span>
            </div>
            <div className="fp-slider-row">
              <input
                type="range" min={0} max={100}
                value={followersGrowth}
                onChange={(e) => setFollowersGrowth(Number(e.target.value))}
                className="fp-slider"
              />
              <div className="fp-slider-val">
                <span>{followersGrowth}</span>
                <span className="fp-unit">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="fp-filter-grid">
          <div className="fp-filter-block">
            <div className="fp-label-row">
              <label className="fp-label">Min. avg engagement</label>
              <span className="fp-ai-icon">✨</span>
              <span className="fp-tag-icon">%</span>
              <span className="fp-tag-icon">#</span>
            </div>
            <div className="fp-slider-row">
              <input
                type="range" min={0} max={100}
                value={avgEngagement}
                onChange={(e) => setAvgEngagement(Number(e.target.value))}
                className="fp-slider"
              />
              <div className="fp-slider-val">
                <span>{avgEngagement}</span>
                <span className="fp-unit">%</span>
              </div>
            </div>
          </div>

          <div className="fp-filter-block">
            <div className="fp-label-row">
              <label className="fp-label">Min. engagement growth</label>
              <span className="fp-ai-icon">✨</span>
            </div>
            <div className="fp-slider-row">
              <input
                type="range" min={0} max={100}
                value={engagementGrowth}
                onChange={(e) => setEngagementGrowth(Number(e.target.value))}
                className="fp-slider"
              />
              <div className="fp-slider-val">
                <span>{engagementGrowth}</span>
                <span className="fp-unit">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last activity */}
        <div className="fp-filter-block">
          <div className="fp-label-row">
            <label className="fp-label">Last activity</label>
            <span className="fp-ai-icon">✨</span>
          </div>
          <div className="fp-activity-btns">
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActivity(opt.key)}
                className={`fp-activity-btn ${activity === opt.key ? 'fp-activity-btn--active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fp-divider" />

      {/* Upsell */}
      <div className="fp-upsell">
        <div className="fp-upsell__left">
          <Sparkles size={14} className="fp-upsell__icon" />
          <div>
            <p className="fp-upsell__title">Elevate your influencer matches 🤩</p>
            <p className="fp-upsell__sub">Expand your search abilities with Search and Contact</p>
          </div>
        </div>
        <button className="fp-upsell__btn">
          <Sparkles size={11} /> 7-day trial for $1
        </button>
      </div>

      {/* Clear all */}
      <div className="fp-footer">
        <button
          className="fp-clear-btn"
          onClick={() => {
            setFollowers({ min: '10000', max: '100000' })
            setFollowersGrowth(0)
            setAvgEngagement(0)
            setEngagementGrowth(0)
            setActivity('anytime')
          }}
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}
