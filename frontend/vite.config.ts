import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // 개발 중에는 프론트에서 /api 로 호출하면 백엔드로 프록시되게 설정 (CORS 회피)
  // - 프론트 코드에서는 VITE_API_BASE_URL=/api 만 알면 됨
  // - 실제 백엔드 주소는 VITE_PROXY_TARGET 로 설정
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
