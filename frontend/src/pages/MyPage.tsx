import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/auth'
import { LineChart } from '../components/ui/LineChart'
import { CategoryBars } from '../components/ui/CategoryBars'
import { DonutChart } from '../components/ui/DonutChart'
import { formatKrw } from '../components/ui/Format'
import { UploadCard } from '../components/UploadCard'
import { sampleSummary, sampleTransactions, sampleYearly } from '../mocks/sample'

const savedMonths = ['2025-11', '2025-12', '2026-01'] as const

export function MyPage() {
  const auth = useAuth()
  const [selected, setSelected] = useState<string>(savedMonths[savedMonths.length - 1])

  const summary = useMemo(() => ({ ...sampleSummary, yearMonth: selected }), [selected])
  const tx = sampleTransactions

  if (!auth.isLoggedIn) {
    return (
      <section className="section">
        <div className="container">
          <div className="card glass" style={{ padding: 22 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>마이페이지</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              회원 기능(월별 저장/1년 그래프)을 사용하려면 카카오 로그인이 필요해요.
            </p>
            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-kakao">
                카카오 로그인 하러가기
              </Link>
              <button className="btn" onClick={() => auth.fakeLogin()}>
                (미리보기) 로그인
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container split">
        <aside className="sidebar glass">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="avatar" aria-hidden />
            <div>
              <div style={{ fontWeight: 900, fontSize: 16 }}>{auth.nickname || '회원'}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                월별 저장 내역
              </div>
            </div>
          </div>

          <ul className="list" style={{ marginTop: 14 }}>
            {savedMonths.map((m) => (
              <li key={m}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelected(m)
                  }}
                  style={{
                    outline: selected === m ? '2px solid rgba(79,124,255,0.45)' : 'none',
                  }}
                >
                  <span style={{ fontWeight: 800 }}>{m}</span>
                  <span className="muted">보기</span>
                </a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 14 }}>
            <UploadCard mode="member" />
          </div>
        </aside>

        <div className="grid" style={{ alignContent: 'start' }}>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22 }}>마이페이지</h2>
                <p className="muted" style={{ margin: '6px 0 0' }}>
                  {selected} 월 지출(예시 데이터)
                </p>
              </div>
              <span className="pill">1년 단위 그래프 · 월별 저장</span>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="card glass">
              <p className="card-title">연간 지출 그래프</p>
              <p className="card-desc">월별 합산 지출을 1년 단위로 확인</p>
              <div style={{ marginTop: 10 }}>
                <LineChart points={sampleYearly} />
              </div>
            </div>
            <div className="card glass" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <p className="card-title">이번 달 지출</p>
                <div style={{ fontSize: 26, fontWeight: 900 }}>
                  {formatKrw(summary.totalAmount)}원
                </div>
                <p className="muted" style={{ margin: 0, fontSize: 12 }}>
                  선택한 월의 저장 데이터(백엔드) 기반
                </p>
                <div style={{ marginTop: 8 }}>
                  <CategoryBars categories={summary.categories.slice(0, 4)} />
                </div>
              </div>
              <DonutChart categories={summary.categories} size={170} />
            </div>
          </div>

          <div className="card glass">
            <p className="card-title">{selected} 지출 내역</p>
            <p className="card-desc">월별 저장된 지출 내역을 테이블로 확인</p>
            <div style={{ marginTop: 12, overflow: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>내용</th>
                    <th style={{ textAlign: 'right' }}>금액</th>
                  </tr>
                </thead>
                <tbody>
                  {tx.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.category}</td>
                      <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.memo}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800 }}>
                        {formatKrw(t.amount)}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

