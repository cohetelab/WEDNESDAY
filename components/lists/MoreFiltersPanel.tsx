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

  const GENDER_LABELS: Record<Gender, string> = {
    all: '전체',
    female: '여성',
    male: '남성',
  }

  return (
    <div ref={panelRef} className="mf-panel">
      {/* Header */}
      <div className="mf-header">
        <span className="mf-header__title">크리에이터 필터</span>
      </div>

      <div className="mf-body">
        {/* Include brand accounts */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon">🏷</span>
            <span>브랜드 계정 포함</span>
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
            <span>제휴 크리에이터만 표시</span>
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
            <span>크리에이터 국가</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <div className="mf-select-wrap">
            <select
              className="mf-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">국가 선택</option>
              <option value="us">미국</option>
              <option value="kr">대한민국</option>
              <option value="jp">일본</option>
              <option value="gb">영국</option>
              <option value="br">브라질</option>
              <option value="fr">프랑스</option>
              <option value="de">독일</option>
              <option value="in">인도</option>
            </select>
            <ChevronDown size={13} className="mf-select-chevron" />
          </div>
        </div>

        {/* Creator geolocation */}
        <div className="mf-row mf-row--col">
          <div className="mf-row__label">
            <span className="mf-icon">📍</span>
            <span>크리에이터 위치</span>
            <span className="mf-ai-badge">✨</span>
          </div>
          <div className="mf-geo-row">
            <input
              className="mf-geo-input"
              placeholder="예: 서울"
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
            <span>크리에이터 언어</span>
            <span className="mf-ai-badge">✨</span>
            <button className="mf-select-all">전체 선택</button>
          </div>
          <div className="mf-select-wrap">
            <select
              className="mf-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">언어 선택</option>
              <option value="en">영어</option>
              <option value="ko">한국어</option>
              <option value="ja">일본어</option>
              <option value="es">스페인어</option>
              <option value="fr">프랑스어</option>
              <option value="de">독일어</option>
              <option value="pt">포르투갈어</option>
              <option value="zh">중국어</option>
            </select>
            <ChevronDown size={13} className="mf-select-chevron" />
          </div>
        </div>

        <div className="mf-divider" />

        {/* Creator gender */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">⚧</span>
            <span>크리에이터 성별</span>
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
                <span>{GENDER_LABELS[g]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Creator age */}
        <div className="mf-row">
          <div className="mf-row__label">
            <span className="mf-icon mf-icon--purple">🎂</span>
            <span>크리에이터 나이</span>
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
            <p className="mf-upsell__title">인플루언서 매칭을 강화하세요 🤩</p>
            <p className="mf-upsell__sub">Search and Contact로 검색 기능을 확장하세요</p>
          </div>
        </div>
        <button className="mf-upsell__btn">
          <Sparkles size={11} /> $1로 7일 체험하기
        </button>
      </div>
    </div>
  )
}
