export function formatKrw(n: number) {
  return new Intl.NumberFormat('ko-KR').format(n)
}

