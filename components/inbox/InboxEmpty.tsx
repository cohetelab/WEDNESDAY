'use client'
import { Search, Unlock } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  { label: '1:1 Contact', starter: true, outreach: true },
  { label: 'Mass emails campaigns', starter: false, outreach: true },
  { label: 'Custom data fields', starter: false, outreach: true },
  { label: 'Gmail / Outlook integration', starter: false, outreach: true, icon: true },
]

export default function InboxEmpty() {
  return (
    <div className="inbox-empty">
      {/* Gradient background */}
      <div className="inbox-empty__bg" />

      <div className="inbox-empty__content">
        {/* Icon */}
        <div className="inbox-empty__icon-wrap">
          <div className="inbox-empty__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-10 7L2 7"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="inbox-empty__title">Ready to start the conversation?</h1>
        <p className="inbox-empty__subtitle">
          Reach out to creators individually and view all your threads in one convenient place 🙂.
        </p>

        {/* CTA */}
        <Link href="/lists" className="w-btn w-btn--primary inbox-empty__cta">
          <Search size={14} />
          <span style={{ marginLeft: '8px' }}>Find creators now</span>
        </Link>

        {/* Divider */}
        <div className="inbox-empty__divider">
          <div className="inbox-empty__divider-line" />
          <span className="inbox-empty__divider-text">Want to move faster?</span>
        </div>

        {/* Pricing comparison */}
        <div className="inbox-pricing">
          <div className="inbox-pricing__table">
            {/* Header */}
            <div className="inbox-pricing__row inbox-pricing__row--header">
              <div className="inbox-pricing__feature-col">
                <span className="inbox-pricing__category">Outreach management</span>
              </div>
              <div className="inbox-pricing__plan-col">
                <div className="inbox-pricing__plan-header">
                  <span className="inbox-pricing__plan-icon inbox-pricing__plan-icon--starter">📬</span>
                  <span className="inbox-pricing__plan-name">Starter</span>
                </div>
              </div>
              <div className="inbox-pricing__plan-col inbox-pricing__plan-col--highlight">
                <div className="inbox-pricing__plan-header">
                  <span className="inbox-pricing__plan-icon inbox-pricing__plan-icon--outreach">🚀</span>
                  <span className="inbox-pricing__plan-name">Outreach</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {FEATURES.map((f, i) => (
              <div key={i} className={`inbox-pricing__row ${i % 2 === 0 ? 'inbox-pricing__row--even' : ''}`}>
                <div className="inbox-pricing__feature-col">
                  {f.icon && (
                    <span className="inbox-pricing__feature-icons">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/24px-Gmail_icon_%282020%29.svg.png" alt="Gmail" width="14" height="14" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/24px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png" alt="Outlook" width="14" height="14" />
                    </span>
                  )}
                  <span className="inbox-pricing__feature-label">{f.label}</span>
                </div>
                <div className="inbox-pricing__plan-col">
                  {f.starter
                    ? <CheckIcon />
                    : <CrossIcon />
                  }
                </div>
                <div className="inbox-pricing__plan-col inbox-pricing__plan-col--highlight">
                  <CheckIcon />
                </div>
              </div>
            ))}

            {/* Footer buttons */}
            <div className="inbox-pricing__row inbox-pricing__row--footer">
              <div className="inbox-pricing__feature-col" />
              <div className="inbox-pricing__plan-col">
                <span className="inbox-pricing__current-plan">Current plan</span>
              </div>
              <div className="inbox-pricing__plan-col inbox-pricing__plan-col--highlight">
                <button className="inbox-pricing__unlock-btn">
                  <Unlock size={12} />
                  <span>Unlock all features</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  )
}
