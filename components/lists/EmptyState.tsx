'use client'
import { Sparkles, Compass, Plus, ArrowRight } from 'lucide-react'

const TRENDING_SEARCHES = [
  {
    key: 'instagram_rising_stars',
    title: "Instagram's rising stars under 100k followers",
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
    title: 'Top engaging TikTok creators under 100K followers',
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
    title: 'Top engaging Instagram creators under 100K followers',
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
          <span className="w-section__title">Searches tailored to your brand</span>
          <div className="w-tag w-tag--ai">
            <Sparkles size={11} />
            <span>Jaice curated</span>
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
                Set up your brand to discover the ideal creators
              </h3>
              <p className="w-onboarding-card__subtitle">
                Add your brand identity information so we can generate a list of creators that
                perfectly fit your brand&apos;s style and audience.
              </p>
            </div>
            <div className="w-onboarding-card__actions">
              <button className="w-btn w-btn--primary">
                <Plus size={14} />
                <span style={{ marginLeft: '6px' }}>Create brand</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending searches */}
      <section className="w-section">
        <h2 className="w-section__title">Explore trending searches</h2>
        <div className="w-trending-grid">
          {TRENDING_SEARCHES.map((search) => (
            <div key={search.key} className="w-trending-card" role="button">
              <div className="w-trending-card__body">
                <div className="w-trending-card__top">
                  <div className="w-tag w-tag--discover">
                    <Compass size={11} />
                    <span>Discover</span>
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
                  <span style={{ marginLeft: '6px' }}>Explore</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Import from external sources */}
      <section className="w-section">
        <h2 className="w-section__title">Import creators from external sources</h2>
        <div className="w-import-sources">
          <div className="w-import-banner">
            <div className="w-import-banner__icon">
              <img
                src="https://d4h3q4f1fpbpe.cloudfront.net/@upfluence/facade-web/assets/images/chrome-icon-96746fb5f56eb5c5bc480eb161af11d7.svg"
                alt="Chrome"
              />
            </div>
            <div className="w-import-banner__content">
              <span className="w-import-banner__title">Chrome plugin</span>
              <span className="w-import-banner__subtitle">
                Add creators from social media profile pages
              </span>
            </div>
            <button className="w-btn w-btn--default">Download</button>
          </div>
          <div className="w-import-spacer" />
        </div>
      </section>
    </div>
  )
}
