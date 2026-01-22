import type { CategorySpend } from '../../types/spending'

function formatKrw(n: number) {
  return new Intl.NumberFormat('ko-KR').format(n)
}

export function CategoryBars({ categories }: { categories: CategorySpend[] }) {
  const max = Math.max(...categories.map((c) => c.amount), 1)

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {categories.map((c) => (
        <div key={c.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700 }}>{c.name}</span>
            <span className="muted">{formatKrw(c.amount)}원</span>
          </div>
          <div
            style={{
              marginTop: 6,
              height: 8,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div
              style={{
                width: `${Math.round((c.amount / max) * 100)}%`,
                height: '100%',
                background: c.color,
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

