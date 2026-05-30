'use client'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Search, Bookmark, ChevronDown, ChevronUp, SlidersHorizontal, CornerDownLeft, X } from 'lucide-react'
import FilterPlatformsPanel from './FilterPlatformsPanel'
import MoreFiltersPanel from './MoreFiltersPanel'

interface Keyword {
  id: string
  text: string
  type: 'keyword' | 'hashtag' | 'username'
}

interface Props {
  onSearch?: () => void
}

export default function SearchQueryBuilder({ onSearch }: Props) {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const platformWrapRef = useRef<HTMLDivElement>(null)
  const moreFiltersWrapRef = useRef<HTMLDivElement>(null)

  function getKeywordType(text: string): Keyword['type'] {
    if (text.startsWith('#')) return 'hashtag'
    if (text.startsWith('@')) return 'username'
    return 'keyword'
  }

  function addKeyword() {
    const trimmed = input.trim()
    if (!trimmed) return
    setKeywords((prev) => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, type: getKeywordType(trimmed) },
    ])
    setInput('')
    onSearch?.()
  }

  function removeKeyword(id: string) {
    setKeywords((prev) => prev.filter((k) => k.id !== id))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); addKeyword() }
    else if (e.key === 'Backspace' && input === '' && keywords.length > 0) {
      setKeywords((prev) => prev.slice(0, -1))
    }
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showDropdown = focused && keywords.length === 0 && input === ''

  return (
    <div className="w-query-builder">
      <div className="w-query-builder__container">
        {/* Result count */}
        <div className="w-query-builder__count">3.8M</div>

        <div className="w-query-builder__row">
          {/* Keyword search */}
          <div
            ref={wrapperRef}
            className="w-query-topic-wrap"
          >
            <div
              className={`w-query-topic w-query-topic--keyword ${focused ? 'w-query-topic--focused' : ''}`}
              onClick={() => { inputRef.current?.focus(); setFocused(true) }}
            >
              <div className="w-query-topic__inner">
                <Search size={16} className="w-query-topic__icon-svg" />

                {keywords.length === 0 && input === '' && !focused && (
                  <span className="w-query-topic__placeholder">
                    Search for any{' '}
                    <span className="w-color-yellow">keywords</span>,{' '}
                    <span className="w-color-cyan">#hashtags</span> or{' '}
                    <span className="w-color-violet">@username</span> to find creators
                  </span>
                )}

                {/* Tags */}
                {keywords.map((kw) => (
                  <span key={kw.id} className={`w-keyword-tag w-keyword-tag--${kw.type}`}>
                    {kw.text}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeKeyword(kw.id) }}
                      className="w-keyword-tag__remove"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}

                {/* Input */}
                <div className="w-keyword-input">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocused(true)}
                    className="w-keyword-input__field"
                    placeholder={keywords.length > 0 ? 'Add keyword' : ''}
                  />
                  {input && <CornerDownLeft size={12} className="w-keyword-input__enter-icon" />}
                </div>
              </div>

              {/* Saved searches */}
              <button
                className="w-square-btn"
                onClick={(e) => e.stopPropagation()}
                title="Saved searches"
              >
                <Bookmark size={13} />
              </button>
            </div>

            {/* Dropdown hint */}
            {showDropdown && (
              <div className="w-search-dropdown">
                <p className="w-search-dropdown__hint">
                  Search for any{' '}
                  <span className="w-color-yellow">keywords</span>,{' '}
                  <span className="w-color-cyan">#hashtags</span> or{' '}
                  <span className="w-color-violet">@username</span> to find creators
                </p>
              </div>
            )}
          </div>

          {/* Platform filter */}
          <div ref={platformWrapRef} className="w-query-topic-platform-wrap">
            <div
              className={`w-query-topic w-query-topic--platform ${platformOpen ? 'w-query-topic--focused' : ''}`}
              role="button"
              onClick={() => setPlatformOpen((v) => !v)}
            >
              {platformOpen ? (
                <>
                  <div className="fp-ig-mini-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#e1306c" strokeWidth="2.2"/>
                      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#e1306c" strokeWidth="2.2"/>
                      <circle cx="17.5" cy="6.5" r="1.3" fill="#e1306c"/>
                    </svg>
                  </div>
                  <ChevronUp size={14} className="w-query-topic__chevron" />
                </>
              ) : (
                <>
                  <span className="w-query-topic__placeholder">Filter platforms</span>
                  <ChevronDown size={14} className="w-query-topic__chevron" />
                </>
              )}
            </div>

            {platformOpen && (
              <FilterPlatformsPanel onClose={() => setPlatformOpen(false)} />
            )}
          </div>

          {/* More filters */}
          <div ref={moreFiltersWrapRef} className="w-query-topic-filters-wrap">
            <div
              className={`w-query-topic w-query-topic--filters ${moreFiltersOpen ? 'w-query-topic--focused' : ''}`}
              role="button"
              onClick={() => setMoreFiltersOpen((v) => !v)}
            >
              <span className="w-query-topic__placeholder">More filters</span>
              <SlidersHorizontal size={14} className="w-query-topic__placeholder" />
              <ChevronDown size={14} className="w-query-topic__chevron" />
            </div>
            {moreFiltersOpen && (
              <MoreFiltersPanel onClose={() => setMoreFiltersOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
