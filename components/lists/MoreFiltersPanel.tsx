'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

type Gender = 'all' | 'female' | 'male'
type Age = '0-17' | '18-24' | '25-34' | '35-54'

interface Props {
  onClose: () => void
}

export default function MoreFiltersPanel({ onClose }: Props) {
  const [includeBrand, setIncludeBrand] = useState(false)
  const [affiliateOnly, setAffiliateOnly] = useState(false)
  const [country, setCountry] = useState('')
  const [geolocation, setGeolocation] = useState('')
  const [geoRadius, setGeoRadius] = useState('10')
  const [language, setLanguage] = useState('')
  const [gender, setGender] = useState<Gender>('all')
  const [ages, setAges] = useState<Age[]>(['18-24'])
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

  function toggleAge(age: Age) {
    setAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    )
  }

  const AGE_OPTIONS: Age[] = ['0-17', '18-24', '25-34', '35-54']

  return (
    <div ref={panelRef} className="mf-panel">
      {/* Header */}
      <div className="mf-header">
        <span className="mf-header__title">Filter by creator</span>
      </div>

      <div className="mf-body">
        {/* Include brand accounts */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon">🏷</span>
            <span>Include brand accounts</span>
          </div>
          <button
            className={`mf-toggle ${includeBrand ? 'mf-toggle--on' : ''}`}
            onClick={() => setIncludeBrand((v) => !v)}
          >
            <span className="mf-toggle__thumb" />
          </button>
        </div>

        {/* Show only affiliate creators */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">✦</span>
            <span>Show only affiliate creators</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <button
            className={`mf-toggle ${affiliateOnly ? 'mf-toggle--on' : 'mf-toggle--dark'}`}
            onClick={() => setAffiliateOnly((v) => !v)}
          >
            <span className="mf-toggle__thumb" />
          </button>
        </div>

        <div className="mf-divider" />

        {/* Creator country */}
        <div className="mf-row mf-row--col">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">🌐</span>
            <span>Creator country</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <div className="mf-select-wrap">
            <select
              className="mf-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="kr">Korea, Republic Of</option>
              <option value="jp">Japan</option>
              <option value="gb">United Kingdom</option>
              <option value="br">Brazil</option>
              <option value="fr">France</option>
              <option value="de">Germany</option>
              <option value="in">India</option>
            </select>
            <ChevronDown size={13} className="mf-select-chevron" />
          </div>
        </div>

        {/* Creator geolocation */}
        <div className="mf-row mf-row--col">
          <div className="mf-row__label">
            <span className="mf-icon">📍</span>
            <span>Creator geolocation</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <div className="mf-geo-row">
            <input
              className="mf-geo-input"
              placeholder="i.e New York"
              value={geolocation}
              onChange={(e) => setGeolocation(e.target.value)}
            />
            <input
              className="mf-geo-radius"
              value={geoRadius}
              onChange={(e) => setGeoRadius(e.target.value)}
            />
            <span className="mf-geo-unit">Km</span>
          </div>
        </div>

        {/* Creator language */}
        <div className="mf-row mf-row--col">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">🗣</span>
            <span>Creator language</span>
            <span className="mf-ai-badge">✨</span>
            <button className="mf-select-all">Select all</button>
          </div>
          <div className="mf-select-wrap">
            <select
              className="mf-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select language</option>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
            </select>
            <ChevronDown size={13} className="mf-select-chevron" />
          </div>
        </div>

        <div className="mf-divider" />

        {/* Creator gender */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">⚧</span>
            <span>Creator gender</span>
          </div>
          <div className="mf-btn-group">
            {(['all', 'female', 'male'] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`mf-group-btn ${gender === g ? 'mf-group-btn--active' : ''}`}
              >
                {g === 'female' && <span>♀</span>}
                {g === 'male' && <span>♂</span>}
                <span style={{ textTransform: 'capitalize' }}>{g}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Creator age */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">🎂</span>
            <span>Creator age</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <div className="mf-btn-group">
            {AGE_OPTIONS.map((age) => (
              <button
                key={age}
                onClick={() => toggleAge(age)}
                className={`mf-group-btn ${ages.includes(age) ? 'mf-group-btn--active' : ''}`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upsell */}
      <div className="mf-upsell">
        <div className="mf-upsell__left">
          <Sparkles size={14} className="mf-upsell__icon" />
          <div>
            <p className="mf-upsell__title">Elevate your influencer matches 🤩</p>
            <p className="mf-upsell__sub">Expand your search abilities with Search and Contact</p>
          </div>
        </div>
        <button className="mf-upsell__btn">
          <Sparkles size={11} /> 7-day trial for $1
        </button>
      </div>
    </div>
  )
}
