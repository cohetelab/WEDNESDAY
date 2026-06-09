'use client'
import { Sparkles, Compass, Plus, ArrowRight } from 'lucide-react'

const TRENDING_SEARCHES = [
  {
    key: 'instagram_rising_stars',
    title: '팔로워 10만 미만의 인스타그램 라이징 스타',
    count: '+10K',
    avatars: [
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20715869.png?ts=1773188746',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814',
    ],
  },
  {
    key: 'tiktok_top_engaging',
    title: '팔로워 10만 미만의 TikTok 인기 크리에이터',
    count: '+10K',
    avatars: [
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/18771531.png?ts=1777408385',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/14077123.png?ts=1776276405',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/8685115.png?ts=1773871287',
    ],
  },
  {
    key: 'instagram_top_engaging',
    title: '팔로워 10만 미만의 Instagram 인기 크리에이터',
    count: '+10K',
    avatars: [
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/15524490.png?ts=1778361204',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/11195590.png?ts=1772273814',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/23453316.png?ts=1771675092',
      'https://reachr-assets.s3.us-west-2.amazonaws.com/influencer-server/influencer/20254226.png?ts=1776876415',
    ],
  },
]

export default function EmptyState() {
  return (
    <div className="w-empty-state">
      {/* Brand premade searches */}
      <section className="w-section">
        <div className="w-section__header">
          <span className="w-section__title">브랜드 맞춤 검색</span>
          <div className="w-tag w-tag--ai">
            <Sparkles size={11} />
            <span>Jaice 큐레이션</span>
          </div>
        </div>

        <div className="w-onboarding-card">
          <div className="w-onboarding-card__illustration">
            <img
              src="https://d4h3q4f1fpbpe.cloudfront.net/@upfluence/facade-web/assets/images/premade-search/empty-state-281acc92de206827e604be7aded38b0e.svg"
              alt=""
              role="presentation"
            />
          </div>
          <div className="w-onboarding-card__content">
            <div className="w-onboarding-card__text">
              <h3 className="w-onboarding-card__title">
                이상적인 크리에이터를 찾으려면 브랜드를 설정하세요
              </h3>
              <p className="w-onboarding-card__subtitle">
                브랜드 정보를 입력하면 브랜드 스타일과 타겟에 맞는 크리에이터 목록을 생성해 드립니다.
              </p>
            </div>
            <div className="w-onboarding-card__actions">
              <button className="w-btn w-btn--primary">
                <Plus size={14} />
                <span style={{ marginLeft: '6px' }}>브랜드 만들기</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending searches */}
      <section className="w-section">
        <h2 className="w-section__title">트렌딩 검색 탐색</h2>
        <div className="w-trending-grid">
          {TRENDING_SEARCHES.map((search) => (
            <div key={search.key} className="w-trending-card" role="button">
              <div className="w-trending-card__body">
                <div className="w-trending-card__top">
                  <div className="w-tag w-tag--discover">
                    <Compass size={11} />
                    <span>탐색</span>
                  </div>
                </div>
                <p className="w-trending-card__title">{search.title}</p>
              </div>
              <div className="w-trending-card__footer">
                <div className="w-trending-card__meta">
                  <div className="w-avatar-group">
                    {search.avatars.map((src, i) => (
                      <div key={i} className="w-avatar w-avatar--md">
                        <img src={src} alt="avatar" loading="lazy" className="w-avatar__img" />
                      </div>
                    ))}
                  </div>
                  <div className="w-trending-card__count">
                    <span className="w-trending-card__count-text">{search.count}</span>
                    <span className="w-dot--green">●</span>
                  </div>
                </div>
                <button className="w-btn w-btn--default" style={{ padding: '5px 12px' }}>
                  <ArrowRight size={13} />
                  <span style={{ marginLeft: '6px' }}>탐색하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Import from external sources */}
      <section className="w-section">
        <h2 className="w-section__title">외부 소스에서 크리에이터 가져오기</h2>
        <div className="w-import-sources">
          <div className="w-import-banner">
            <div className="w-import-banner__icon">
              <img
                src="https://d4h3q4f1fpbpe.cloudfront.net/@upfluence/facade-web/assets/images/chrome-icon-96746fb5f56eb5c5bc480eb161af11d7.svg"
                alt="Chrome"
              />
            </div>
            <div className="w-import-banner__content">
              <span className="w-import-banner__title">크롬 플러그인</span>
              <span className="w-import-banner__subtitle">
                소셜 미디어 프로필에서 크리에이터 추가
              </span>
            </div>
            <button className="w-btn w-btn--default">다운로드</button>
          </div>
          <div className="w-import-spacer" />
        </div>
      </section>
    </div>
  )
}
