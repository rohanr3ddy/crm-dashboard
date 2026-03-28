const fmt = (n) => n >= 1000000
  ? `$${(n / 1000000).toFixed(1)}M`
  : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

export default function KPITiles({ summary, forecast }) {
  const tiles = [
    { label: 'Total ARR', value: summary ? fmt(summary.total_arr_usd) : '—', color: '#6366f1' },
    { label: 'Deals Closed', value: summary ? summary.total_closed_deals : '—', color: '#10b981' },
    { label: 'Avg Deal Size', value: summary ? fmt(summary.avg_deal_size_usd) : '—', color: '#f59e0b' },
    { label: 'Closed Won Attainment', value: summary ? `${summary.closed_won_attainment_pct}%` : '—', color: '#10b981' },
    { label: 'Forecast Attainment', value: forecast ? `${forecast.attainment_pct}%` : '—', color: '#3b82f6' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
      {tiles.map(t => (
        <div key={t.label} className="card" style={{ borderTop: `3px solid ${t.color}` }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t.label}
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: t.color }}>
            {t.value}
          </div>
        </div>
      ))}
    </div>
  )
}