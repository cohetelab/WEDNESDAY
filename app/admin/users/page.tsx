'use client'
import { useState } from 'react'
import { Search, MoreHorizontal, UserX, Mail, RefreshCw } from 'lucide-react'

const USERS = [
  { id: 1,  name: '이민준',    email: 'minjun@brand.co',    plan: '프로',     status: '활성',   credits: 342,  joined: '2025-04-24', searches: 128 },
  { id: 2,  name: 'Sarah Kim', email: 'sarah@agency.io',   plan: '비즈니스', status: '활성',   credits: 1820, joined: '2025-04-23', searches: 634 },
  { id: 3,  name: '박도현',    email: 'dohyun@startup.kr',  plan: '스타터',   status: '활성',   credits: 67,   joined: '2025-04-22', searches: 14  },
  { id: 4,  name: '최지원',    email: 'jiwon@mkt.com',      plan: '프로',     status: '활성',   credits: 230,  joined: '2025-04-21', searches: 89  },
  { id: 5,  name: 'James Oh',  email: 'james@global.io',   plan: '비즈니스', status: '정지',   credits: 1650, joined: '2025-04-20', searches: 512 },
  { id: 6,  name: '김서연',    email: 'seoyeon@corp.co',    plan: '스타터',   status: '활성',   credits: 30,   joined: '2025-04-19', searches: 7   },
  { id: 7,  name: 'Alice Park', email: 'alice@media.com',  plan: '비즈니스', status: '활성',   credits: 2100, joined: '2025-04-18', searches: 781 },
  { id: 8,  name: '정우성',    email: 'ws@brand.kr',        plan: '프로',     status: '만료',   credits: 0,    joined: '2025-04-17', searches: 201 },
  { id: 9,  name: '한지민',    email: 'jimin@h.co',         plan: '스타터',   status: '활성',   credits: 98,   joined: '2025-04-16', searches: 33  },
  { id: 10, name: 'Tom Chen',  email: 'tom@agency.sg',     plan: '프로',     status: '활성',   credits: 410,  joined: '2025-04-15', searches: 156 },
]

const PLAN_COLOR: Record<string, string> = {
  '비즈니스': 'adm-badge--purple',
  '프로':     'adm-badge--blue',
  '스타터':   'adm-badge--gray',
}

const STATUS_COLOR: Record<string, string> = {
  '활성': 'adm-badge--green',
  '정지': 'adm-badge--red',
  '만료': 'adm-badge--orange',
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="adm-page">
      <div className="adm-topbar">
        <div>
          <h1 className="adm-topbar__title">유저 관리</h1>
          <p className="adm-topbar__sub">총 {USERS.length}명의 유저</p>
        </div>
        <div className="adm-topbar__actions">
          <div className="adm-search-wrap">
            <Search size={14} className="adm-search-icon" />
            <input
              className="adm-search-input"
              placeholder="이름 또는 이메일 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="adm-card adm-card--table adm-card--full">
        <table className="adm-table">
          <thead>
            <tr>
              {['#', '이름', '이메일', '플랜', '상태', '크레딧', '검색 횟수', '가입일', ''].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="adm-table__muted">{u.id}</td>
                <td className="adm-table__name">{u.name}</td>
                <td className="adm-table__muted">{u.email}</td>
                <td><span className={`adm-badge ${PLAN_COLOR[u.plan]}`}>{u.plan}</span></td>
                <td><span className={`adm-badge ${STATUS_COLOR[u.status]}`}>{u.status}</span></td>
                <td className="adm-table__mono">{u.credits.toLocaleString()}</td>
                <td className="adm-table__mono">{u.searches.toLocaleString()}</td>
                <td className="adm-table__muted">{u.joined}</td>
                <td className="adm-table__action">
                  <div className="adm-menu-wrap">
                    <button
                      className="adm-menu-btn"
                      onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)}
                    >
                      <MoreHorizontal size={15} />
                    </button>
                    {openMenu === u.id && (
                      <div className="adm-menu-dropdown">
                        <button className="adm-menu-item"><Mail size={13} /> 이메일 발송</button>
                        <button className="adm-menu-item"><RefreshCw size={13} /> 플랜 변경</button>
                        <button className="adm-menu-item adm-menu-item--danger"><UserX size={13} /> 계정 정지</button>
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
