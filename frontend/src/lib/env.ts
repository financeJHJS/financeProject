export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || '/api'
}

export function getKakaoAuthUrl() {
  // 백엔드에서 카카오 OAuth를 처리한다고 가정 (예: Spring Security /oauth2/authorization/kakao)
  // 필요하면 env로 완전한 URL을 지정할 수도 있습니다.
  return (
    import.meta.env.VITE_KAKAO_AUTH_URL ||
    `${getApiBaseUrl()}/oauth2/authorization/kakao`
  )
}

