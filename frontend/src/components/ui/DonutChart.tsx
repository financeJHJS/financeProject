import type { CategorySpend } from '../../types/spending'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function DonutChart({
  categories,
  size = 180,
  stroke = 18,
}: {
  categories: CategorySpend[]
  size?: number
  stroke?: number
}) {
  const total = categories.reduce((acc, c) => acc + c.amount, 0) || 1
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      {categories.map((cat) => {
        const frac = clamp(cat.amount / total, 0, 1)
        const dash = c * frac
        const dasharray = `${dash} ${c - dash}`
        const circle = (
          <circle
            key={cat.name}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={cat.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeDasharray={dasharray}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            opacity={0.95}
          />
        )
        offset += dash
        return circle
      })}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="rgba(255,255,255,0.9)"
        fontSize="14"
        fontWeight="800"
      >
        카테고리
      </text>
    </svg>
  )
}

