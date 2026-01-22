import { useCallback, useMemo, useSyncExternalStore } from 'react'

type AuthState = {
  isLoggedIn: boolean
  nickname?: string
}

const KEY = 'finance.auth'
const AUTH_EVENT = 'finance-auth-changed'

let cachedRaw: string | null | undefined = undefined
let cachedState: AuthState = { isLoggedIn: false }

function getSnapshot(): AuthState {
  try {
    const raw = localStorage.getItem(KEY)
    // 중요: 같은 raw면 같은 객체를 반환해야 useSyncExternalStore가 무한루프를 피합니다.
    if (raw === cachedRaw) return cachedState
    cachedRaw = raw

    if (!raw) {
      cachedState = { isLoggedIn: false }
      return cachedState
    }

    const parsed = JSON.parse(raw) as AuthState
    cachedState = { isLoggedIn: !!parsed?.isLoggedIn, nickname: parsed?.nickname }
    return cachedState
  } catch {
    cachedRaw = null
    cachedState = { isLoggedIn: false }
    return cachedState
  }
}

function writeAuth(next: AuthState) {
  localStorage.setItem(KEY, JSON.stringify(next))
  // 같은 탭에서는 storage 이벤트가 기본적으로 안 뜨므로 커스텀 이벤트로 갱신
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function useAuth() {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handler = () => onStoreChange()
    // 다른 탭 변경은 storage 이벤트로, 같은 탭 변경은 커스텀 이벤트로 받음
    window.addEventListener('storage', handler)
    window.addEventListener(AUTH_EVENT, handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener(AUTH_EVENT, handler)
    }
  }, [])

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const actions = useMemo(
    () => ({
      // 실제 카카오 로그인은 백엔드에서 처리하고, 콜백에서 토큰/유저정보를 받아 저장하도록 교체하세요.
      fakeLogin(nickname = '김가계') {
        writeAuth({ isLoggedIn: true, nickname })
      },
      logout() {
        writeAuth({ isLoggedIn: false })
      },
    }),
    [],
  )

  return { ...state, ...actions }
}

