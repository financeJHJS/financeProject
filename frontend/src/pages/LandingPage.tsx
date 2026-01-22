import { useNavigate } from 'react-router-dom'
import { UploadCard } from '../components/UploadCard'
import { getKakaoAuthUrl } from '../lib/env'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <a className="btn btn-kakao" href={getKakaoAuthUrl()}>
              카카오로 로그인
            </a>
            <h1 style={{ marginTop: 16 }}>내 지출, 한눈에 정리</h1>
            <p className="hero-sub">
              은행 3곳의 지출 내역(.csv)을 업로드하면 월 합산 지출을 한 번에 보여줘요.
              비회원은 즉시 결과를 확인하고, 회원은 월별로 저장해서 마이페이지에서 1년 그래프로
              볼 수 있어요.
            </p>

            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/analyze')}>
                비회원으로 분석하기
              </button>
              <span className="pill">REST API 기반 · 백엔드 데이터 렌더링</span>
            </div>
          </div>

          <UploadCard
            mode="guest"
            onUploaded={({ yearMonth }) => navigate(`/analyze?month=${yearMonth}`)}
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-3">
          <div className="card glass">
            <p className="card-title">비회원</p>
            <p className="card-desc">업로드 즉시 해당 월 합산 · 카테고리 비율 · 내역 확인</p>
          </div>
          <div className="card glass">
            <p className="card-title">회원(카카오)</p>
            <p className="card-desc">월별 저장 · 마이페이지에서 히스토리 관리</p>
          </div>
          <div className="card glass">
            <p className="card-title">1년 그래프</p>
            <p className="card-desc">월별 합산 지출을 1년 단위로 추세 확인</p>
          </div>
        </div>
      </section>
    </div>
  )
}

