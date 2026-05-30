'use client'
import { TrendingUp, TrendingDown, Users, Search, DollarSign, UserPlus } from 'lucide-react'

const STATS = [
  { label: '총 유저',        value: '1,247',      change: '+23',    trend: 'up',   icon: Users,      color: '#6d28d9' },
  { label: '총 검색 횟수',   value: '48,392',     change: '+1,203', trend: 'up',   icon: Search,     color: '#0891b2' },
  { label: '이번달 매출',    value: '₩3,840,000', change: '+12%',   trend: 'up',   icon: DollarSign, color: '#059669' },
  { label: '오늘 신규 가입', value: '23',          change: '-4',     trend: 'down', icon: UserPlus,   color: '#dc2626' },
]

const CHART = [35, 52, 48, 71, 63, 89, 102, 95, 78, 115, 132, 148]
const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

const PLAN_DIST = [
  { name: '비즈니스', count: 89,  pct: 7,  color: '#6d28d9' },
  { name: '프로',     count: 342, pct: 27, color: '#8b5cf6' },
  { name: '스타터',   count: 816, pct: 66, color: '#c4b5fd' },
]

const RECENT_USERS = [
  { name: '이민준',   email: 'minjun@brand.co',   plan: '프로',     joined: '2025-04-24' },
  { name: 'Sarah Kim', email: 'sarah@agency.io', plan: '비즈니스', joined: '2025-04-23' },
  { name: '박도현',   email: 'dohyun@startup.kr', plan: '스타터',   joined: '2025-04-22' },
  { name: '최지원',   email: 'jiwon@mkt.com',     plan: '프로',     joined: '2025-04-21' },
  { name: 'James Oh', email: 'james@global.io',  plan: '비즈니스', joined: '2025-04-20' },
]

const RECENT_PAYMENTS = [
  { user: '이민준',   plan: '프로',     amount: 39000,  date: '2025-04-24', status: '완료' },
  { user: 'Sarah Kim', plan: '비즈니스', amount: 129000, date: '2025-04-23', status: '완료' },
  { user: '박도현',   plan: '스타터',   amount: 9900,   date: '2025-04-22', status: '완료' },
  { user: '최지원',   plan: '프로',     amount: 39000,  date: '2025-04-21', status: '완료' },
  { user: 'James Oh', plan: '비즈니스', amount: 129000, date: '2025-04-20', status: '환불' },
]

const PLAN_COLOR: Record<string, string> = {
  '비즈니스': 'adm-badge--purple',
  '프로':     'adm-badge--blue',
  '스타터':   'adm-badge--gray',
}

export default function AdminDashboard() {
  const maxBar = Math.max(...CHART)

  return (
    <div className="adm-page">
      {/* Topbar */}
      <div className="adm-topbar">
        <div>
          <h1 className="adm-topbar__title">대시보드</h1>
          <p className="adm-topbar__sub">2025년 5월 25일 기준</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="adm-stat-grid">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="adm-stat-card">
              <div className="adm-stat-card__header">
                <span className="adm-stat-card__label">{s.label}</span>
                <div className="adm-stat-card__icon-wrap" style={{ background: s.color + '18' }}>
                  <Icon size={15} style={{ color: s.color }} />
                </div>
              </div>
              <div className="adm-stat-card__value">{s.value}</div>
              <div className={`adm-stat-card__change ${s.trend === 'up' ? 'adm-stat-card__change--up' : 'adm-stat-card__change--down'}`}>
                {s.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{s.change} 이번 달</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="adm-two-col">
        {/* Revenue chart */}
        <div className="adm-card adm-card--wide">
          <div className="adm-card__header">
            <span className="adm-card__title">월별 매출 추이</span>
            <span className="adm-card__sub">2025년</span>
          </div>
          <div className="adm-bar-chart">
            {CHART.map((v, i) => (
              <div key={i} className="adm-bar-col">
                <div
                  className="adm-bar"
                  style={{ height: `${(v / maxBar) * 100}%` }}
                  title={`${MONTHS[i]}: ₩${(v * 26000).toLocaleString()}`}
                />
                <span className="adm-bar-label">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan distribution */}
        <div className="adm-card">
          <div className="adm-card__header">
            <span className="adm-card__title">플랜 분포</span>
            <span className="adm-card__sub">전체 1,247명</span>
          </div>
          <div className="adm-plan-dist">
            {PLAN_DIST.map((p) => (
              <div key={p.name} className="adm-plan-row">
                <div className="adm-plan-row__top">
                  <span className="adm-plan-row__name">{p.name}</span>
                  <span className="adm-plan-row__count">{p.count}명 <span className="adm-plan-row__pct">({p.pct}%)</span></span>
                </div>
                <div className="adm-plan-bar-bg">
                  <div className="adm-plan-bar-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-two-col">
        {/* Recent users */}
        <div className="adm-card adm-card--table">
          <div className="adm-card__header">
            <span className="adm-card__title">최근 가입 유저</span>
            <span className="adm-card__sub">전체 1,247명</span>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                {['이름', '이메일', '플랜', '가입일'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map((u, i) => (
                <tr key={i}>
                  <td className="adm-table__name">{u.name}</td>
                  <td className="adm-table__muted">{u.email}</td>
                  <td><span className={`adm-badge ${PLAN_COLOR[u.plan]}`}>{u.plan}</span></td>
                  <td className="adm-table__muted">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent payments */}
        <div className="adm-card adm-card--table">
          <div className="adm-card__header">
            <span className="adm-card__title">최근 결제 내역</span>
            <span className="adm-card__sub">이번 달 ₩3,840,000</span>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                {['유저', '플랜', '금액', '상태'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_PAYMENTS.map((p, i) => (
                <tr key={i}>
                  <td className="adm-table__name">{p.user}</td>
                  <td><span className={`adm-badge ${PLAN_COLOR[p.plan]}`}>{p.plan}</span></td>
                  <td className="adm-table__mono">₩{p.amount.toLocaleString()}</td>
                  <td>
                    <span className={`adm-badge ${p.status === '완료' ? 'adm-badge--green' : 'adm-badge--red'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
