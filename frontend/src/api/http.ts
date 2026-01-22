import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  (res) => res,
  (error) => {
    // 여기서 공통 에러 핸들링(예: 401 로그아웃, 토스트 등)을 붙이기 좋습니다.
    return Promise.reject(error)
  },
)

