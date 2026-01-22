import { Link, useSearchParams } from 'react-router-dom'
import { DonutChart } from '../components/ui/DonutChart'
import { CategoryBars } from '../components/ui/CategoryBars'
import { formatKrw } from '../components/ui/Format'
import { UploadCard } from '../components/UploadCard'
import { sampleSummary, sampleTransactions } from '../mocks/sample'

export function AnalyzePage() {
  const [params] = useSearchParams()
  const month = params.get('month') || sampleSummary.yearMonth

  // TODO: 백엔드 API 연결 지점
  // - GET /guest/summary?month=YYYY-MM
  // - GET /guest/transactions?month=YYYY-MM
  const summary = { ...sampleSummary, yearMonth: month }
  const tx = sampleTransactions

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>
              비회원 결과
            </h2>
            <p className="muted" style={{ margin: '6px 0 0' }}>
              {summary.yearMonth} 지출 합산(예시 데이터)
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-kakao" to="/">
              카카오 로그인하고 저장하기
            </Link>
            <span className="pill">응답이 404여도 “서버 연결”은 성공입니다</span>
          </div>
        </div>

        <div className="grid grid-3" style={{ marginTop: 14 }}>
          <div className="card glass">
            <p className="card-title">이번 달 지출</p>
            <p style={{ margin: '10px 0 0', fontSize: 26, fontWeight: 900 }}>
              {formatKrw(summary.totalAmount)}원
            </p>
            <p className="muted" style={{ margin: '8px 0 0', fontSize: 12 }}>
              업로드된 CSV를 기준으로 합산됩니다.
            </p>
          </div>

          <div className="card glass" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <DonutChart categories={summary.categories} size={170} />
            <div style={{ display: 'grid', gap: 8 }}>
              {summary.categories.slice(0, 3).map((c) => (
                <div key={c.name} className="pill" style={{ justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <span
                      aria-hidden
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: c.color,
                      }}
                    />
                    {c.name}
                  </span>
                  <b style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {formatKrw(c.amount)}원
                  </b>
                </div>
              ))}
            </div>
          </div>

          <div className="card glass">
            <p className="card-title">카테고리별 지출</p>
            <div style={{ marginTop: 12 }}>
              <CategoryBars categories={summary.categories} />
            </div>
          </div>
        </div>

        <div className="grid grid-2" style={{ marginTop: 14 }}>
          <UploadCard mode="guest" />
          <div className="card glass">
            <p className="card-title">{summary.yearMonth} 지출 내역</p>
            <p className="card-desc">API 연결 전이라 예시 데이터로 UI만 보여줍니다.</p>
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
                      <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

