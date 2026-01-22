import type { YearlyPoint } from '../../types/spending'

function formatKrw(n: number) {
  return new Intl.NumberFormat('ko-KR').format(n)
}

export function LineChart({
  points,
  width = 560,
  height = 180,
}: {
  points: YearlyPoint[]
  width?: number
  height?: number
}) {
  const pad = 18
  const w = width
  const h = height
  const max = Math.max(...points.map((p) => p.totalAmount), 1)
  const min = Math.min(...points.map((p) => p.totalAmount), max)
  const range = Math.max(1, max - min)

  const toX = (i: number) =>
    pad + (i * (w - pad * 2)) / Math.max(1, points.length - 1)
  const toY = (v: number) => h - pad - ((v - min) * (h - pad * 2)) / range

  const d = points
    .map((p, i) => `${toX(i).toFixed(1)},${toY(p.totalAmount).toFixed(1)}`)
    .join(' ')

  const last = points[points.length - 1]

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height={h}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={w}
          height={h}
          rx="16"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.10)"
        />
        <polyline
          points={d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3"
        />
        {points.map((p, i) => (
          <circle
            key={p.month}
            cx={toX(i)}
            cy={toY(p.totalAmount)}
            r={3.2}
            fill="rgba(255,255,255,0.85)"
            stroke="rgba(0,0,0,0.25)"
          />
        ))}
      </svg>
      {last ? (
        <p className="muted" style={{ margin: '8px 0 0', fontSize: 12 }}>
          최근월(예시): {last.month}월 {formatKrw(last.totalAmount)}원
        </p>
      ) : null}
    </div>
  )
}

