'use client'
import { useState } from 'react'
import { Search, Download, MoreHorizontal, RefreshCw, XCircle } from 'lucide-react'

const SUBS = [
  { id: 1,  user: '이민준',    email: 'minjun@brand.co',    plan: '프로',     amount: 39000,  period: '월간', start: '2025-04-01', next: '2025-05-01', status: '활성' },
  { id: 2,  user: 'Sarah Kim', email: 'sarah@agency.io',   plan: '비즈니스', amount: 129000, period: '월간', start: '2025-03-15', next: '2025-05-15', status: '활성' },
  { id: 3,  user: '박도현',    email: 'dohyun@startup.kr',  plan: '스타터',   amount: 9900,   period: '월간', start: '2025-04-10', next: '2025-05-10', status: '활성' },
  { id: 4,  user: '최지원',    email: 'jiwon@mkt.com',      plan: '프로',     amount: 39000,  period: '월간', start: '2025-04-05', next: '2025-05-05', status: '활성' },
  { id: 5,  user: 'James Oh',  email: 'james@global.io',   plan: '비즈니스', amount: 129000, period: '연간', start: '2025-01-01', next: '2026-01-01', status: '환불' },
  { id: 6,  user: '김서연',    email: 'seoyeon@corp.co',    plan: '스타터',   amount: 9900,   period: '월간', start: '2025-04-20', next: '2025-05-20', status: '활성' },
  { id: 7,  user: 'Alice Park', email: 'alice@media.com',  plan: '비즈니스', amount: 1290000,period: '연간', start: '2025-02-01', next: '2026-02-01', status: '활성' },
  { id: 8,  user: '정우성',    email: 'ws@brand.kr',        plan: '프로',     amount: 39000,  period: '월간', start: '2025-03-10', next: '—',          status: '취소' },
]

const PLAN_COLOR: Record<string, string> = {
  '비즈니스': 'adm-badge--purple',
  '프로':     'adm-badge--blue',
  '스타터':   'adm-badge--gray',
}

const STATUS_COLOR: Record<string, string> = {
  '활성': 'adm-badge--green',
  '환불': 'adm-badge--red',
  '취소': 'adm-badge--orange',
}

const totalMRR = SUBS
  .filter((s) => s.status === '활성' && s.period === '월간')
  .reduce((sum, s) => sum + s.amount, 0)

const totalARR = SUBS
  .filter((s) => s.status === '활성' && s.period === '연간')
  .reduce((sum, s) => sum + s.amount, 0)

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const filtered = SUBS.filter(
    (s) =>
      s.user.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="adm-page">
      <div className="adm-topbar">
        <div>
          <h1 className="adm-topbar__title">구독/결제 관리</h1>
          <p className="adm-topbar__sub">MRR ₩{totalMRR.toLocaleString()} · ARR ₩{totalARR.toLocaleString()}</p>
        </div>
        <div className="adm-topbar__actions">
          <div className="adm-search-wrap">
            <Search size={14} className="adm-search-icon" />
            <input
              className="adm-search-input"
              placeholder="유저 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="adm-btn-secondary">
            <Download size={14} /> CSV 내보내기
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="adm-stat-grid adm-stat-grid--3">
        <div className="adm-stat-card">
          <div className="adm-stat-card__label">활성 구독</div>
          <div className="adm-stat-card__value">{SUBS.filter((s) => s.status === '활성').length}개</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-card__label">이번달 MRR</div>
          <div className="adm-stat-card__value">₩{totalMRR.toLocaleString()}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-card__label">연간 ARR</div>
          <div className="adm-stat-card__value">₩{totalARR.toLocaleString()}</div>
        </div>
      </div>

      <div className="adm-card adm-card--table adm-card--full">
        <table className="adm-table">
          <thead>
            <tr>
              {['#', '유저', '플랜', '금액', '주기', '시작일', '다음 결제', '상태', ''].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="adm-table__muted">{s.id}</td>
                <td>
                  <div className="adm-table__name">{s.user}</div>
                  <div className="adm-table__muted">{s.email}</div>
                </td>
                <td><span className={`adm-badge ${PLAN_COLOR[s.plan]}`}>{s.plan}</span></td>
                <td className="adm-table__mono">₩{s.amount.toLocaleString()}</td>
                <td className="adm-table__muted">{s.period}</td>
                <td className="adm-table__muted">{s.start}</td>
                <td className="adm-table__muted">{s.next}</td>
                <td><span className={`adm-badge ${STATUS_COLOR[s.status]}`}>{s.status}</span></td>
                <td className="adm-table__action">
                  <div className="adm-menu-wrap">
                    <button
                      className="adm-menu-btn"
                      onClick={() => setOpenMenu(openMenu === s.id ? null : s.id)}
                    >
                      <MoreHorizontal size={15} />
                    </button>
                    {openMenu === s.id && (
                      <div className="adm-menu-dropdown">
                        <button className="adm-menu-item"><RefreshCw size={13} /> 플랜 변경</button>
                        <button className="adm-menu-item adm-menu-item--danger"><XCircle size={13} /> 구독 취소</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
