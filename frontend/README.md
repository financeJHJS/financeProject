# Finance Frontend (React + TypeScript + Vite)

이 폴더는 **프론트엔드만** 담당합니다. 백엔드는 별도로 구성하고, 프론트에서는 **REST API를 호출해서 화면에 뿌리는 방식**으로 개발합니다.

## 시작하기

```bash
npm install
npm run dev
```

## 개발 중 백엔드 연동 (REST + 프록시)

개발 중에는 CORS 이슈를 피하기 위해 **Vite dev server 프록시**를 사용하도록 설정했습니다.

- 프론트 코드는 기본적으로 **`/api`** 로 호출
- Vite가 **`/api` → 백엔드 서버**로 프록시

프록시 설정: `vite.config.ts`

## 환경변수

Vite는 `VITE_`로 시작하는 환경변수만 프론트 코드에서 접근 가능합니다. 샘플은 `env.sample`을 참고하세요.

- `VITE_API_BASE_URL`: 프론트에서 사용할 API baseURL (기본값: `/api`)
- `VITE_PROXY_TARGET`: 개발 프록시 대상 백엔드 주소 (기본값: `http://localhost:8080`)

## API 코드 구조

- 공통 HTTP 클라이언트: `src/api/http.ts`
- 화면/플로우(디자인 틀): `src/pages/*`
- 공통 레이아웃/컴포넌트: `src/layouts/*`, `src/components/*`

## 화면 라우팅

- `/`: 랜딩(카카오 로그인 + 비회원 CSV 업로드)
- `/analyze`: 비회원 분석 결과(예시 데이터로 UI 틀만)
- `/mypage`: 회원 마이페이지(예시 데이터로 UI 틀만)
- `/auth/callback`: 카카오 로그인 콜백 “틀”
