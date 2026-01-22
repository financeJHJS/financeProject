import { Link, NavLink } from 'react-router-dom'
import { getKakaoAuthUrl } from '../lib/env'
import { useAuth } from '../features/auth/auth'

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: '8px 12px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.10)',
        background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        fontWeight: 700,
      })}
    >
      {children}
    </NavLink>
  )
}

export function TopNav() {
  const auth = useAuth()

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span>내 지출</span>
        </Link>

        <nav className="nav" aria-label="주요 메뉴">
          <NavItem to="/analyze">지출분석</NavItem>
          <NavItem to="/mypage">마이페이지</NavItem>

          {auth.isLoggedIn ? (
            <>
              <span className="pill">안녕하세요, {auth.nickname || '회원'}님</span>
              <button className="btn btn-ghost" onClick={auth.logout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-kakao" href={getKakaoAuthUrl()}>
                카카오 로그인
              </a>
              <button className="btn btn-ghost" onClick={() => auth.fakeLogin()}>
                (미리보기) 로그인
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

