import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../features/auth/auth'

// 백엔드에서 카카오 로그인 성공 후 프론트로 리다이렉트하는 경우를 위한 “틀”
// 예: /auth/callback?nickname=홍길동
export function AuthCallbackPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    const nickname = params.get('nickname') || '회원'
    auth.fakeLogin(nickname)
    navigate('/mypage', { replace: true })
  }, [auth, navigate, params])

  return (
    <section className="section">
      <div className="container">
        <div className="card glass">
          <p className="card-title">로그인 처리 중...</p>
          <p className="card-desc">잠시만 기다려주세요.</p>
        </div>
      </div>
    </section>
  )
}

